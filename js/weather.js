export class WeatherService {
    constructor() {
        this.baseUrl = 'https://api.data.gov.sg/v1/environment';
    }

    async get4DayForecast() {
        try {
            const response = await fetch(`${this.baseUrl}/4-day-weather-forecast`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return null;
        }
    }

    async getCurrentWeather() {
        try {
            const [tempResponse, humidityResponse, windResponse] = await Promise.all([
                fetch(`${this.baseUrl}/air-temperature`),
                fetch(`${this.baseUrl}/relative-humidity`),
                fetch(`${this.baseUrl}/wind-speed`)
            ]);

            const tempData = await tempResponse.json();
            const humidityData = await humidityResponse.json();
            const windData = await windResponse.json();

            return {
                temperature: this.getLatestReading(tempData),
                humidity: this.getLatestReading(humidityData),
                windSpeed: this.getLatestReading(windData)
            };
        } catch (error) {
            console.error('Error fetching current weather:', error);
            return null;
        }
    }

    getLatestReading(data) {
        if (!data || !data.items || !data.items[0] || !data.items[0].readings) {
            return null;
        }
        return data.items[0].readings[0];
    }

    async updateWeatherWidget(weatherData) {
        const widget = document.querySelector('.weather-widget');
        if (!weatherData || !weatherData.items || !weatherData.items[0]) {
            widget.innerHTML = '<p>Unable to fetch weather data</p>';
            return;
        }

        const forecast = weatherData.items[0].forecasts;
        const currentDate = new Date();
        
        const forecastHTML = forecast.map((day, index) => {
            const date = new Date();
            date.setDate(currentDate.getDate() + index);
            return `
                <div class="forecast-day ${index === 0 ? 'current-day' : ''}">
                    <div class="forecast-date">
                        <h3>${this.formatDate(date)}</h3>
                        <p class="day-name">${this.getDayName(date)}</p>
                    </div>
                    <div class="forecast-icon">
                        <img src="${this.getWeatherIcon(day.forecast)}" alt="${day.forecast}">
                    </div>
                    <div class="forecast-details">
                        <p class="forecast-temp">
                            <span class="high">${day.temperature.high}°C</span>
                            <span class="low">${day.temperature.low}°C</span>
                        </p>
                        <p class="forecast-desc">${day.forecast}</p>
                        <p class="forecast-humidity">Humidity: ${day.relative_humidity.high}%-${day.relative_humidity.low}%</p>
                    </div>
                </div>
            `;
        }).join('');

        widget.innerHTML = `
            <div class="weather-card">
                <div class="forecast-grid">
                    ${forecastHTML}
                </div>
            </div>
        `;
    }

    formatDate(date) {
        return date.toLocaleDateString('en-SG', { day: 'numeric', month: 'short' });
    }

    getDayName(date) {
        return date.toLocaleDateString('en-SG', { weekday: 'short' });
    }

    getWeatherIcon(forecast) {
        // Map NEA weather descriptions to weather icons
        const iconMap = {
            'Partly Cloudy': 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png',
            'Cloudy': 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
            'Light Rain': 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
            'Moderate Rain': 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
            'Heavy Rain': 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
            'Showers': 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
            'Thundery Showers': 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png',
            'Fair': 'https://cdn-icons-png.flaticon.com/512/1163/1163662.png',
            'Fair & Warm': 'https://cdn-icons-png.flaticon.com/512/1163/1163662.png',
            'Fair (Night)': 'https://cdn-icons-png.flaticon.com/512/1163/1163645.png'
        };
        return iconMap[forecast] || 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png';
    }
}
