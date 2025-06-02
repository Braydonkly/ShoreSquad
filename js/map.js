export class MapService {
    constructor() {
        this.map = null;
        this.markers = [];
    }

    initMap() {
        // Center on Singapore
        this.map = L.map('map-container').setView([1.3521, 103.8198], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    addCleanupLocation(location) {
        const marker = L.marker([location.lat, location.lng])
            .bindPopup(`
                <h3>${location.name}</h3>
                <p>${location.date}</p>
                <p>${location.description}</p>
                <button onclick="window.joinCleanup(${location.id})">Join Cleanup</button>
            `)
            .addTo(this.map);
        this.markers.push(marker);
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }
}
