// Main app initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    fetchWeatherData();
    loadEvents();
});

// Map initialization (using Leaflet.js)
async function initializeMap() {
    // We'll need to add Leaflet.js CDN to index.html and implement this
    // For now, we'll add a placeholder message
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '<p>Map loading...</p>';
}

// Weather data fetching
async function fetchWeatherData() {
    const weatherWidget = document.querySelector('.weather-widget');
    try {
        // We'll implement weather API integration here
        // For now, show placeholder
        weatherWidget.innerHTML = `
            <div class="weather-info">
                <h3>Weather Forecast</h3>
                <p>Loading weather data...</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherWidget.innerHTML = '<p>Unable to load weather data</p>';
    }
}

// Event loading and management
function loadEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    
    // Sample events data (to be replaced with actual API data)
    const sampleEvents = [
        {
            title: 'Weekend Beach Cleanup',
            date: '2025-06-15',
            location: 'Sunny Beach',
            participants: 24
        },
        {
            title: 'Youth Ocean Action Day',
            date: '2025-06-22',
            location: 'Crystal Cove',
            participants: 15
        },
        {
            title: 'Community Shore Sweep',
            date: '2025-06-29',
            location: 'Harbor Beach',
            participants: 32
        }
    ];

    // Render events
    eventsGrid.innerHTML = sampleEvents.map(event => `
        <div class="event-card">
            <h3>${event.title}</h3>
            <p>Date: ${formatDate(event.date)}</p>
            <p>Location: ${event.location}</p>
            <p>${event.participants} people joined</p>
            <button onclick="joinEvent('${event.title}')" class="join-button">
                Join Event
            </button>
        </div>
    `).join('');
}

// Helper function to format dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Event joining functionality
function joinEvent(eventTitle) {
    // We'll implement actual join logic here
    alert(`Thanks for joining ${eventTitle}! We'll send you the details soon.`);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
