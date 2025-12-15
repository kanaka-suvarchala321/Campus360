// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Buildings data
const buildings = [
    {
        id: 1,
        name: "Aditya Engineering College (AEC)",
        description: "Main engineering college with departments like CSE, ECE, EEE, Mechanical, Civil.",
        category: "academic",
        location: "Near Main Gate, Block A",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 2,
        name: "Aditya College of Engineering & Technology (ACET)",
        description: "Engineering and technology focused institution with modern labs.",
        category: "academic",
        location: "North Campus, Block B",
        icon: "fas fa-flask"
    },
    {
        id: 3,
        name: "Aditya College of Education (ACOE)",
        description: "Teacher education and B.Ed programs.",
        category: "academic",
        location: "East Campus, Block C",
        icon: "fas fa-chalkboard-teacher"
    },
    {
        id: 4,
        name: "Aditya Polytechnic College (APC)",
        description: "Diploma courses in various engineering disciplines.",
        category: "academic",
        location: "West Campus, Block D",
        icon: "fas fa-tools"
    },
    {
        id: 5,
        name: "Aditya Global Business School (AGBS)",
        description: "Premier business school offering MBA, BBA and commerce programs.",
        category: "management",
        location: "Commerce Block, Central Campus",
        icon: "fas fa-chart-line"
    },
    {
        id: 6,
        name: "Aditya Pharmacy College",
        description: "College of Pharmacy offering D.Pharm, B.Pharm and M.Pharm courses.",
        category: "health",
        location: "Health Sciences Zone, Block F",
        icon: "fas fa-prescription-bottle-alt"
    },
    {
        id: 7,
        name: "University Library",
        description: "Central library with digital resources and study spaces.",
        category: "academic",
        location: "Central Campus",
        icon: "fas fa-book"
    },
    {
        id: 8,
        name: "Administrative Block",
        description: "Main administrative offices and reception.",
        category: "academic",
        location: "Main Entrance",
        icon: "fas fa-building"
    }
];

// Canteens data
const canteens = [
    {
        id: 1,
        name: "AEC Food Court",
        rating: 4.5,
        location: "Ground Floor, AEC Building",
        timing: "8:00 AM - 9:00 PM",
        foodTypes: ["South Indian", "Chinese", "Snacks", "Beverages"],
        description: "Popular among engineering students. Known for biryani and snacks."
    },
    {
        id: 2,
        name: "Central Canteen",
        rating: 4.2,
        location: "Between AEC and ACET Blocks",
        timing: "7:30 AM - 8:30 PM",
        foodTypes: ["North Indian", "South Indian", "Fast Food", "Juices"],
        description: "Largest canteen with diverse menu options."
    },
    {
        id: 3,
        name: "Polytechnic Canteen",
        rating: 4.0,
        location: "APC Building, West Campus",
        timing: "9:00 AM - 7:00 PM",
        foodTypes: ["Andhra Meals", "Tiffins", "Tea & Coffee"],
        description: "Famous for authentic Andhra meals at affordable prices."
    },
    {
        id: 4,
        name: "Campus Cafe",
        rating: 4.7,
        location: "Near Library",
        timing: "10:00 AM - 10:00 PM",
        foodTypes: ["Coffee", "Sandwiches", "Pastries", "Desserts"],
        description: "Premium cafe with coffee, snacks and WiFi facility."
    }
];

// DOM Elements
const buildingsContainer = document.getElementById('buildings-container');
const canteensContainer = document.getElementById('canteens-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to render buildings
function renderBuildings() {
    buildingsContainer.innerHTML = '';
    
    buildings.forEach(building => {
        const buildingCard = document.createElement('div');
        buildingCard.className = 'building-card';
        buildingCard.setAttribute('data-category', building.category);
        
        buildingCard.innerHTML = `
            <div class="building-img">
                <i class="${building.icon}"></i>
            </div>
            <div class="building-info">
                <h3>${building.name}</h3>
                <p>${building.description}</p>
                <div class="building-tags">
                    <span class="tag">${building.location}</span>
                    <span class="tag">${building.category.toUpperCase()}</span>
                </div>
                <a href="#" class="building-link">
                    <i class="fas fa-directions"></i> Get Directions
                </a>
            </div>
        `;
        
        buildingsContainer.appendChild(buildingCard);
    });
}

// Function to render canteens
function renderCanteens() {
    canteensContainer.innerHTML = '';
    
    canteens.forEach(canteen => {
        const canteenCard = document.createElement('div');
        canteenCard.className = 'canteen-card';
        
        // Generate stars based on rating
        let stars = '';
        const fullStars = Math.floor(canteen.rating);
        const hasHalfStar = canteen.rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(canteen.rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        // Generate food type tags
        const foodTypeTags = canteen.foodTypes.map(type => 
            `<span class="food-type">${type}</span>`
        ).join('');
        
        canteenCard.innerHTML = `
            <div class="canteen-header">
                <h3>${canteen.name}</h3>
                <div class="canteen-rating">
                    ${stars}
                    <span>${canteen.rating}</span>
                </div>
            </div>
            <div class="canteen-info">
                <p><i class="fas fa-map-marker-alt"></i> ${canteen.location}</p>
                <p><i class="far fa-clock"></i> ${canteen.timing}</p>
                <p>${canteen.description}</p>
            </div>
            <div class="canteen-footer">
                <div class="food-types">
                    ${foodTypeTags}
                </div>
                <a href="#" class="btn primary">View Menu</a>
            </div>
        `;
        
        canteensContainer.appendChild(canteenCard);
    });
}

// Filter buildings
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const buildingCards = document.querySelectorAll('.building-card');
        
        buildingCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter buildings
    document.querySelectorAll('.building-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Filter canteens
    document.querySelectorAll('.canteen-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('.canteen-info p:nth-child(3)').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBuildings();
    renderCanteens();
});