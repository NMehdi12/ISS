
    let map;
    let marker;

    function getLatLong() {
    fetch("http://api.open-notify.org/iss-now.json")
        .then(data => data.json())
        .then(json => {
            // Iss Location
            const latitude = json['iss_position']['latitude'];
            const longitude = json.iss_position.longitude;
            // target
            document.getElementById('position').innerText = latitude + ' ' + longitude;
            // locate
            marker.setLatLng([latitude, longitude]);
            // Move to
            map.flyTo([latitude, longitude], 4);
        });
}

    function init() {
        // Define map
        map = L.map('map').setView([51.505, -0.09], 13);
        // Create icon
        let uneIcone = L.icon({
            iconUrl: 'image/deathStar.png',
            iconSize: [64, 64],
            iconAnchor: [32, 32],
            popupAnchor: [-3, -76]
        });
        // Place icon on map
        marker = L.marker([51.505, -0.09], {icon: uneIcone}).addTo(map);
        // Add Layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        // Every 1 sec
        setInterval(
            getLatLong,
            1000
        );
    }

    // Start on load
    onload = init;

