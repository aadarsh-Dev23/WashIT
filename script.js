let map;

function initMap() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Initialize map centered on the user's location
                map = new google.maps.Map(document.getElementById('map-container'), {
                    center: userLocation,
                    zoom: 14,
                });

                // Place a marker for the user's current location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here",
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });

                // Add laundry centers near the user's location
                addLaundryCenters(userLocation);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        position: pos,
        content: browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    });
    infoWindow.open(map);
}

// Example function to add laundry centers (you can replace this with real data)
function addLaundryCenters(userLocation) {
    const laundryCenters = [
        { lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01, name: "Laundry Center 1" },
        { lat: userLocation.lat - 0.01, lng: userLocation.lng - 0.01, name: "Laundry Center 2" },
        { lat: userLocation.lat + 0.02, lng: userLocation.lng - 0.02, name: "Laundry Center 3" },
    ];

    laundryCenters.forEach(center => {
        new google.maps.Marker({
            position: center,
            map: map,
            title: center.name,
        });
    });
}
