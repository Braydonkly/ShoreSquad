export class EventService {
    constructor() {
        this.events = [
            {
                id: 1,
                name: "East Coast Beach Cleanup",
                date: "2025-06-15",
                time: "8:00 AM",
                location: {
                    name: "East Coast Park Area C",
                    lat: 1.3019,
                    lng: 103.9106,
                    description: "Meet at East Coast Park Area C, near the bicycle rental shop"
                },
                participants: 12,
                maxParticipants: 25
            },
            {
                id: 2,
                name: "Pasir Ris Beach Cleanup",
                date: "2025-06-22",
                time: "8:30 AM",
                location: {
                    name: "Pasir Ris Beach",
                    lat: 1.3721,
                    lng: 103.9493,
                    description: "Meet at Pasir Ris Park Car Park D"
                },
                participants: 8,
                maxParticipants: 20
            },
            {
                id: 3,
                name: "Changi Beach Cleanup",
                date: "2025-06-29",
                time: "8:00 AM",
                location: {
                    name: "Changi Beach Park",
                    lat: 1.3891,
                    lng: 103.9915,
                    description: "Meet at Changi Beach Park Area A"
                },
                participants: 5,
                maxParticipants: 15
            }
        ];
    }

    getEvents() {
        return this.events;
    }

    renderEvents() {
        const eventsGrid = document.querySelector('.events-grid');
        eventsGrid.innerHTML = this.events.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <h3>${event.name}</h3>
                    <span class="event-date">${event.date} at ${event.time}</span>
                </div>
                <div class="event-details">
                    <p><strong>Location:</strong> ${event.location.name}</p>
                    <p><strong>Spots Available:</strong> ${event.maxParticipants - event.participants} of ${event.maxParticipants}</p>
                </div>
                <div class="event-footer">
                    <button class="join-button" onclick="window.joinEvent(${event.id})">
                        Join Event
                    </button>
                    <span class="participants">${event.participants} joined</span>
                </div>
            </div>
        `).join('');
    }
}
