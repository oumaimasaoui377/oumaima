// ===== Car Data =====
const carsData = [
    {
        id: 1,
        name: "Tesla Model S",
        category: "luxury",
        price: 150,
        seats: 5,
        transmission: "Automatic",
        fuel: "Electric",
        badge: "Popular"
    },
    {
        id: 2,
        name: "BMW X5",
        category: "suv",
        price: 120,
        seats: 7,
        transmission: "Automatic",
        fuel: "Diesel",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        category: "sedan",
        price: 90,
        seats: 5,
        transmission: "Automatic",
        fuel: "Petrol",
        badge: "New"
    },
    {
        id: 4,
        name: "Porsche 911",
        category: "sports",
        price: 200,
        seats: 4,
        transmission: "Manual",
        fuel: "Petrol",
        badge: "Premium"
    },
    {
        id: 5,
        name: "Audi Q7",
        category: "suv",
        price: 130,
        seats: 7,
        transmission: "Automatic",
        fuel: "Diesel",
        badge: "Popular"
    },
    {
        id: 6,
        name: "Toyota Camry",
        category: "sedan",
        price: 60,
        seats: 5,
        transmission: "Automatic",
        fuel: "Hybrid",
        badge: null
    },
    {
        id: 7,
        name: "Ferrari Roma",
        category: "sports",
        price: 350,
        seats: 4,
        transmission: "Automatic",
        fuel: "Petrol",
        badge: "Exclusive"
    },
    {
        id: 8,
        name: "Range Rover",
        category: "suv",
        price: 180,
        seats: 5,
        transmission: "Automatic",
        fuel: "Diesel",
        badge: "Luxury"
    },
    {
        id: 9,
        name: "Honda Civic",
        category: "sedan",
        price: 50,
        seats: 5,
        transmission: "Manual",
        fuel: "Petrol",
        badge: "Economy"
    }
];

// ===== DOM Elements =====
const carsGrid = document.getElementById('carsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchForm = document.getElementById('searchForm');
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const closeBtn = document.querySelector('.close-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderCars(carsData);
    setupEventListeners();
});

// ===== Render Cars =====
function renderCars(cars) {
    carsGrid.innerHTML = '';
    
    cars.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const badgeHTML = car.badge ? `<span class="car-badge">${car.badge}</span>` : '';
        
        card.innerHTML = `
            <div class="car-image">
                <i class="fas fa-car"></i>
                ${badgeHTML}
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <p class="car-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</p>
                <div class="car-features">
                    <span><i class="fas fa-user"></i> ${car.seats} Seats</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                </div>
                <div class="car-price">
                    <div class="price">$${car.price}<span>/day</span></div>
                    <button class="btn btn-primary" onclick="openBooking(${car.id})">Book Now</button>
                </div>
            </div>
        `;
        
        carsGrid.appendChild(card);
    });
}

// ===== Filter Cars =====
function filterCars(category) {
    if (category === 'all') {
        renderCars(carsData);
    } else {
        const filtered = carsData.filter(car => car.category === category);
        renderCars(filtered);
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCars(btn.dataset.category);
        });
    });

    // Search form
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = searchForm.querySelector('input[type="text"]').value;
        const pickupDate = searchForm.querySelector('input[type="date"]:nth-of-type(1)').value;
        const returnDate = searchForm.querySelector('input[type="date"]:nth-of-type(2)').value;
        
        if (location && pickupDate && returnDate) {
            alert(`Searching for cars at ${location} from ${pickupDate} to ${returnDate}!`);
            document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeModal();
        }
    });

    // Booking form
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your booking! We will contact you shortly.');
        closeModal();
        bookingForm.reset();
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== Booking Modal Functions =====
function openBooking(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        document.getElementById('selectedCar').value = carId;
        bookingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    bookingModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll reveal animation
window.addEventListener('scroll', debounce(() => {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => {
                card.classList.add('slide-up');
            }, index * 100);
        }
    });
}, 100));

// ===== Contact Form Handler =====
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    e.target.reset();
});

// ===== Newsletter Form Handler =====
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        e.target.reset();
    }
});
