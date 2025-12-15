// Campus data with coordinates for the campus image
const campusData = {
    // Center of the campus (adjust based on your campus location)
    center: [16.5318, 82.0758],
    zoom: 18,
    
    // Bounds for the campus image overlay
    imageBounds: [
        [16.5300, 82.0730],  // Southwest corner
        [16.5350, 82.0790]   // Northeast corner
    ],
    
    // Campus buildings and facilities
    buildings: [
        {
            id: "AEC",
            name: "Aditya Engineering College (AEC)",
            type: "academic",
            description: "Main engineering college with CSE, ECE, EEE, Mechanical, and Civil departments. The primary academic block of the campus.",
            coords: [16.5320, 82.0745],
            icon: "fas fa-graduation-cap",
            color: "#4285f4"
        },
        {
            id: "ACET",
            name: "Aditya College of Engineering & Technology",
            type: "academic",
            description: "Engineering and technology focused institution with modern labs and research facilities.",
            coords: [16.5325, 82.0750],
            icon: "fas fa-flask",
            color: "#4285f4"
        },
        {
            id: "AGBS",
            name: "Aditya Global Business School",
            type: "academic",
            description: "Premier business school offering MBA, BBA and commerce programs.",
            coords: [16.5315, 82.0740],
            icon: "fas fa-chart-line",
            color: "#4285f4"
        },
        {
            id: "PHARMACY",
            name: "Aditya Pharmacy College",
            type: "academic",
            description: "College of Pharmacy offering D.Pharm, B.Pharm and M.Pharm courses.",
            coords: [16.5328, 82.0755],
            icon: "fas fa-prescription-bottle-alt",
            color: "#4285f4"
        },
        {
            id: "ADMIN",
            name: "Administrative Block",
            type: "administrative",
            description: "Main administrative offices, reception, and principal's office.",
            coords: [16.5310, 82.0735],
            icon: "fas fa-building",
            color: "#ea4335"
        },
        {
            id: "LIBRARY",
            name: "Central Library",
            type: "library",
            description: "Central library with digital resources, study spaces, and computer lab.",
            coords: [16.5322, 82.0748],
            icon: "fas fa-book",
            color: "#00bcd4"
        },
        {
            id: "AUDITORIUM",
            name: "Main Auditorium",
            type: "facility",
            description: "Large auditorium for events, seminars, and cultural programs.",
            coords: [16.5318, 82.0742],
            icon: "fas fa-theater-masks",
            color: "#8b5cf6"
        }
    ],
    
    canteens: [
        {
            id: "CANTEEN1",
            name: "AEC Food Court",
            type: "canteen",
            description: "Popular among engineering students. Known for biryani and snacks.",
            coords: [16.5323, 82.0752],
            icon: "fas fa-utensils",
            color: "#34a853"
        },
        {
            id: "CANTEEN2",
            name: "Central Canteen",
            type: "canteen",
            description: "Largest canteen with diverse menu options and juice bar.",
            coords: [16.5315, 82.0745],
            icon: "fas fa-hamburger",
            color: "#34a853"
        },
        {
            id: "CANTEEN3",
            name: "Polytechnic Canteen",
            type: "canteen",
            description: "Famous for authentic Andhra meals at affordable prices.",
            coords: [16.5330, 82.0758],
            icon: "fas fa-utensil-spoon",
            color: "#34a853"
        }
    ],
    
    hostels: [
        {
            id: "HOSTEL1",
            name: "Boys Hostel - Block A",
            type: "hostel",
            description: "Main boys hostel with modern facilities and WiFi.",
            coords: [16.5335, 82.0738],
            icon: "fas fa-bed",
            color: "#fbbc04"
        },
        {
            id: "HOSTEL2",
            name: "Girls Hostel - Block B",
            type: "hostel",
            description: "Girls hostel with security, common room, and amenities.",
            coords: [16.5338, 82.0742],
            icon: "fas fa-female",
            color: "#fbbc04"
        }
    ],
    
    parking: [
        {
            id: "PARKING1",
            name: "Main Parking Area",
            type: "parking",
            description: "Main parking area for students and staff.",
            coords: [16.5308, 82.0738],
            icon: "fas fa-parking",
            color: "#8b5cf6"
        },
        {
            id: "PARKING2",
            name: "Visitor Parking",
            type: "parking",
            description: "Designated parking area for visitors.",
            coords: [16.5312, 82.0732],
            icon: "fas fa-car",
            color: "#8b5cf6"
        }
    ]
};

// Global variables
let map;
let campusImage;
let routingControl = null;
let selectedLocation = null;
let layers = {
    buildings: null,
    canteens: null,
    hostels: null,
    parking: null
};

// Custom icons
const customIcons = {
    academic: L.divIcon({
        html: '<div style="background-color: #4285f4; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-graduation-cap" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    }),
    
    administrative: L.divIcon({
        html: '<div style="background-color: #ea4335; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-building" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    }),
    
    canteen: L.divIcon({
        html: '<div style="background-color: #34a853; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-utensils" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    }),
    
    hostel: L.divIcon({
        html: '<div style="background-color: #fbbc04; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-bed" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    }),
    
    library: L.divIcon({
        html: '<div style="background-color: #00bcd4; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-book" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    }),
    
    parking: L.divIcon({
        html: '<div style="background-color: #8b5cf6; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-parking" style="color: white; font-size: 12px;"></i></div>',
        className: 'custom-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
    })
};

// Initialize the map
function initMap() {
    // Create map instance
    map = L.map('map', {
        center: campusData.center,
        zoom: campusData.zoom,
        zoomControl: false,
        attributionControl: true
    });

    // Add OpenStreetMap base layer
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20
    }).addTo(map);

    // Add Satellite layer
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20
    });

    // Add Campus Image Overlay
    campusImage = L.imageOverlay('WhatsApp Image 2025-12-11 at 12.14.49_cbc6cbae.jpg', campusData.imageBounds, {
        className: 'campus-image-overlay',
        opacity: 0.9,
        interactive: false
    }).addTo(map);

    // Initialize layer groups
    layers.buildings = L.layerGroup().addTo(map);
    layers.canteens = L.layerGroup().addTo(map);
    layers.hostels = L.layerGroup().addTo(map);
    layers.parking = L.layerGroup().addTo(map);

    // Load campus data
    loadCampusData();

    // Add layer control
    const baseLayers = {
        "OpenStreetMap": osmLayer,
        "Satellite": satelliteLayer
    };

    const overlayLayers = {
        "Campus Map Image": campusImage,
        "Academic Buildings": layers.buildings,
        "Canteens": layers.canteens,
        "Hostels": layers.hostels,
        "Parking Areas": layers.parking
    };

    L.control.layers(baseLayers, overlayLayers, {
        collapsed: true,
        position: 'topright'
    }).addTo(map);

    // Add zoom control
    L.control.zoom({
        position: 'topleft'
    }).addTo(map);

    // Add scale control
    L.control.scale({
        imperial: false,
        position: 'bottomleft'
    }).addTo(map);

    // Hide loading overlay
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 1500);
}

// Load campus data onto the map
function loadCampusData() {
    // Add buildings
    campusData.buildings.forEach(building => {
        const marker = L.marker(building.coords, {
            icon: customIcons[building.type] || customIcons.academic,
            title: building.name
        });

        marker.bindPopup(`
            <div class="popup-content">
                <h3>${building.name}</h3>
                <p>${building.description}</p>
                <p><strong>Type:</strong> ${building.type.charAt(0).toUpperCase() + building.type.slice(1)}</p>
                <button onclick="selectLocation('${building.id}')" class="popup-btn">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        `);

        marker.on('click', () => {
            showLocationInfo(building);
        });

        layers.buildings.addLayer(marker);
    });

    // Add canteens
    campusData.canteens.forEach(canteen => {
        const marker = L.marker(canteen.coords, {
            icon: customIcons.canteen,
            title: canteen.name
        });

        marker.bindPopup(`
            <div class="popup-content">
                <h3>${canteen.name}</h3>
                <p>${canteen.description}</p>
                <button onclick="selectLocation('${canteen.id}')" class="popup-btn">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
                <button onclick="openMenu('${canteen.name}')" class="popup-btn" style="background-color: #34a853;">
                    <i class="fas fa-utensils"></i> View Menu
                </button>
            </div>
        `);

        marker.on('click', () => {
            showLocationInfo(canteen);
        });

        layers.canteens.addLayer(marker);
    });

    // Add hostels
    campusData.hostels.forEach(hostel => {
        const marker = L.marker(hostel.coords, {
            icon: customIcons.hostel,
            title: hostel.name
        });

        marker.bindPopup(`
            <div class="popup-content">
                <h3>${hostel.name}</h3>
                <p>${hostel.description}</p>
                <button onclick="selectLocation('${hostel.id}')" class="popup-btn">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        `);

        marker.on('click', () => {
            showLocationInfo(hostel);
        });

        layers.hostels.addLayer(marker);
    });

    // Add parking areas
    campusData.parking.forEach(parking => {
        const marker = L.marker(parking.coords, {
            icon: customIcons.parking,
            title: parking.name
        });

        marker.bindPopup(`
            <div class="popup-content">
                <h3>${parking.name}</h3>
                <p>${parking.description}</p>
                <button onclick="selectLocation('${parking.id}')" class="popup-btn">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        `);

        marker.on('click', () => {
            showLocationInfo(parking);
        });

        layers.parking.addLayer(marker);
    });
}

// Show location info in sidebar
function showLocationInfo(location) {
    selectedLocation = location;
    
    const infoHtml = `
        <h4>${location.name}</h4>
        <p>${location.description}</p>
        <p><strong>Type:</strong> ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}</p>
        <p><strong>Coordinates:</strong> ${location.coords[0].toFixed(6)}, ${location.coords[1].toFixed(6)}</p>
        <div class="location-actions">
            <button onclick="startNavigationToSelected()" class="action-btn">
                <i class="fas fa-directions"></i> Navigate Here
            </button>
            ${location.type === 'canteen' ? `
            <button onclick="openMenu('${location.name}')" class="action-btn" style="background-color: #34a853;">
                <i class="fas fa-utensils"></i> View Menu
            </button>
            ` : ''}
        </div>
    `;
    
    document.getElementById('locationInfo').innerHTML = infoHtml;
}

// Select location for navigation
function selectLocation(id) {
    // Find location in data
    const allLocations = [
        ...campusData.buildings,
        ...campusData.canteens,
        ...campusData.hostels,
        ...campusData.parking
    ];
    
    const location = allLocations.find(loc => loc.id === id);
    if (location) {
        showLocationInfo(location);
    }
}

// Start navigation to selected location
function startNavigationToSelected() {
    if (!selectedLocation) {
        alert('Please select a location first!');
        return;
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                createRoute(userCoords, selectedLocation.coords);
            },
            () => {
                // Use campus center as fallback
                createRoute(campusData.center, selectedLocation.coords);
            }
        );
    } else {
        // Use campus center as fallback
        createRoute(campusData.center, selectedLocation.coords);
    }
}

// Create route between two points
function createRoute(fromCoords, toCoords) {
    // Clear existing route
    if (routingControl) {
        map.removeControl(routingControl);
    }
    
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(fromCoords[0], fromCoords[1]),
            L.latLng(toCoords[0], toCoords[1])
        ],
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
            styles: [{ color: '#1a73e8', weight: 5, opacity: 0.7 }]
        },
        showAlternatives: false,
        fitSelectedRoutes: true,
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        createMarker: function(i, wp) {
            if (i === 0) {
                return L.marker(wp.latLng, {
                    icon: L.divIcon({
                        html: '<div style="background-color: #1a73e8; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                        className: 'route-marker'
                    })
                }).bindPopup('Start Point');
            }
            return L.marker(wp.latLng, {
                icon: L.divIcon({
                    html: '<div style="background-color: #34a853; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                    className: 'route-marker'
                })
            }).bindPopup('Destination');
        }
    }).addTo(map);
    
    // Show route instructions
    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        const distance = (summary.totalDistance / 1000).toFixed(2);
        const time = (summary.totalTime / 60).toFixed(1);
        
        document.getElementById('locationInfo').innerHTML += `
            <div class="route-info">
                <h5><i class="fas fa-route"></i> Route Found</h5>
                <p><strong>Distance:</strong> ${distance} km</p>
                <p><strong>Estimated Time:</strong> ${time} minutes</p>
                <p><i>Route shown on map in blue line</i></p>
            </div>
        `;
    });
}

// Open menu function (to be integrated with main site menu)
function openMenu(canteenName) {
    alert(`Opening menu for ${canteenName}\n\nThis feature is integrated with the main site's menu system.`);
    
    // In a complete implementation, this would open the menu modal
    // window.location.href = `index.html?canteen=${encodeURIComponent(canteenName)}`;
}

// Initialize UI controls
function initUIControls() {
    // Toggle control panel
    document.getElementById('togglePanel').addEventListener('click', function() {
        const panel = document.querySelector('.control-panel');
        panel.classList.toggle('collapsed');
        this.innerHTML = panel.classList.contains('collapsed') ? 
            '<i class="fas fa-chevron-right"></i>' : 
            '<i class="fas fa-chevron-left"></i>';
    });

    // Close sidebar
    document.getElementById('closeSidebar').addEventListener('click', function() {
        document.querySelector('.info-sidebar').style.display = 'none';
    });

    // Start navigation button
    document.getElementById('startNavigation').addEventListener('click', startNavigationToSelected);

    // Clear route button
    document.getElementById('clearRoute').addEventListener('click', function() {
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    });

    // Quick action buttons
    document.getElementById('zoomIn').addEventListener('click', function() {
        map.zoomIn();
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
        map.zoomOut();
    });

    document.getElementById('currentLocation').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                map.setView([position.coords.latitude, position.coords.longitude], 18);
                
                // Add user marker
                L.marker([position.coords.latitude, position.coords.longitude], {
                    icon: L.divIcon({
                        html: '<div style="background-color: #1a73e8; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                        className: 'user-marker'
                    })
                }).addTo(map).bindPopup('Your Location').openPopup();
            });
        } else {
            map.setView(campusData.center, 17);
        }
    });

    document.getElementById('fullscreen').addEventListener('click', function() {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            this.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Toggle campus image
    document.getElementById('toggleCampusImage').addEventListener('change', function(e) {
        if (e.target.checked) {
            campusImage.addTo(map);
        } else {
            map.removeLayer(campusImage);
        }
    });

    // Toggle building markers
    document.getElementById('toggleBuildings').addEventListener('change', function(e) {
        if (e.target.checked) {
            layers.buildings.addTo(map);
        } else {
            map.removeLayer(layers.buildings);
        }
    });

    // Toggle canteen markers
    document.getElementById('toggleCanteens').addEventListener('change', function(e) {
        if (e.target.checked) {
            layers.canteens.addTo(map);
        } else {
            map.removeLayer(layers.canteens);
        }
    });

    // Toggle hostel markers
    document.getElementById('toggleHostels').addEventListener('change', function(e) {
        if (e.target.checked) {
            layers.hostels.addTo(map);
        } else {
            map.removeLayer(layers.hostels);
        }
    });

    // Toggle parking markers
    document.getElementById('toggleParking').addEventListener('change', function(e) {
        if (e.target.checked) {
            layers.parking.addTo(map);
        } else {
            map.removeLayer(layers.parking);
        }
    });

    // Header buttons
    document.getElementById('toggleImage').addEventListener('click', function(e) {
        e.preventDefault();
        const checkbox = document.getElementById('toggleCampusImage');
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });

    document.getElementById('resetView').addEventListener('click', function(e) {
        e.preventDefault();
        map.setView(campusData.center, campusData.zoom);
    });
}

// Search function
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    // Combine all locations
    const allLocations = [
        ...campusData.buildings,
        ...campusData.canteens,
        ...campusData.hostels,
        ...campusData.parking
    ];
    
    // Search for matching locations
    const results = allLocations.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.type.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        alert('No locations found matching your search.');
        return;
    }
    
    // Zoom to first result and show info
    const firstResult = results[0];
    map.setView(firstResult.coords, 18);
    showLocationInfo(firstResult);
    
    // Open sidebar if closed
    document.querySelector('.info-sidebar').style.display = 'block';
    
    if (results.length > 1) {
        document.getElementById('locationInfo').innerHTML += `
            <div class="search-results">
                <h5>Other matches (${results.length - 1}):</h5>
                <ul>
                    ${results.slice(1).map(loc => `
                        <li>
                            <button onclick="selectLocation('${loc.id}'); map.setView([${loc.coords[0]}, ${loc.coords[1]}], 18)" class="result-btn">
                                ${loc.name}
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initUIControls();
    
    // Add CSS for popup buttons
    const style = document.createElement('style');
    style.textContent = `
        .popup-content {
            min-width: 250px;
        }
        
        .popup-btn {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            text-align: center;
            transition: background 0.3s;
        }
        
        .popup-btn:hover {
            background: #0d62d9;
        }
        
        .action-btn {
            display: inline-block;
            padding: 8px 16px;
            margin: 5px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s;
        }
        
        .action-btn:hover {
            background: #0d62d9;
        }
        
        .result-btn {
            background: none;
            border: none;
            color: var(--primary);
            cursor: pointer;
            text-align: left;
            padding: 5px;
            width: 100%;
        }
        
        .result-btn:hover {
            text-decoration: underline;
        }
        
        .route-info {
            margin-top: 15px;
            padding: 15px;
            background: rgba(26, 115, 232, 0.1);
            border-radius: 8px;
        }
        
        .search-results {
            margin-top: 15px;
            max-height: 150px;
            overflow-y: auto;
        }
        
        .search-results ul {
            list-style: none;
            padding: 0;
        }
        
        .search-results li {
            margin: 5px 0;
        }
    `;
    document.head.appendChild(style);
});

// Handle fullscreen change
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    const btn = document.getElementById('fullscreen');
    if (!document.fullscreenElement) {
        btn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}