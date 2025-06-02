import { WeatherService } from './weather.js';
import { MapService } from './map.js';
import { EventService } from './events.js';

class App {
    constructor() {
        this.weatherService = new WeatherService();
        this.mapService = new MapService();
        this.eventService = new EventService();
        this.init();
    }

    async init() {
        // Initialize map
        this.mapService.initMap();

        // Load and render events
        const events = this.eventService.getEvents();
        this.eventService.renderEvents();

        // Add event locations to map
        events.forEach(event => {
            this.mapService.addCleanupLocation({
                id: event.id,
                ...event.location
            });
        });

        // Get Singapore weather forecast
        try {
            const forecast = await this.weatherService.get4DayForecast();
            await this.weatherService.updateWeatherWidget(forecast);

            // Update weather every 30 minutes
            setInterval(async () => {
                const newForecast = await this.weatherService.get4DayForecast();
                await this.weatherService.updateWeatherWidget(newForecast);
            }, 30 * 60 * 1000);
        } catch (error) {
            console.error('Error updating weather:', error);
        }

        // Set up event handlers
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Join Event handler
        window.joinEvent = (eventId) => {
            const event = this.eventService.events.find(e => e.id === eventId);
            if (event && event.participants < event.maxParticipants) {
                event.participants++;
                this.eventService.renderEvents();
                alert('You have successfully joined the cleanup event!');
            } else {
                alert('Sorry, this event is full! Please try another event.');
            }
        };

        // Join Cleanup handler (for map popups)
        window.joinCleanup = (eventId) => {
            window.joinEvent(eventId);
        };

        // CTA button handler
        document.querySelector('.cta-button').addEventListener('click', () => {
            document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Initialize the application
new App();
