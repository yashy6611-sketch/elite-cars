document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Car Inventory Data
    const cars = [
        {
            id: 1,
            name: 'Porsche 911 Turbo S',
            price: '$203,500',
            year: '2023',
            miles: '1,200',
            type: 'sports',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e'
        },
        {
            id: 2,
            name: 'Mercedes-Benz S-Class',
            price: '$118,950',
            year: '2023',
            miles: '3,500',
            type: 'luxury',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8'
        },
        {
            id: 3,
            name: 'Range Rover Autobiography',
            price: '$167,500',
            year: '2023',
            miles: '2,800',
            type: 'suv',
            image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7'
        },
        {
            id: 4,
            name: 'Audi R8 V10',
            price: '$148,700',
            year: '2023',
            miles: '1,500',
            type: 'sports',
            image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927'
        },
        {
            id: 5,
            name: 'BMW 7 Series',
            price: '$96,400',
            year: '2023',
            miles: '4,200',
            type: 'luxury',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e'
        },
        {
            id: 6,
            name: 'Lamborghini Urus',
            price: '$225,000',
            year: '2023',
            miles: '1,800',
            type: 'suv',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39'
        },
        {
            id: 7,
            name: 'Ferrari 488 GTB',
            price: '$335,000',
            year: '2023',
            miles: '900',
            type: 'sports',
            image: 'https://images.unsplash.com/photo-1593941707882-a5bba53b0998'
        },
        {
            id: 8,
            name: 'Rolls-Royce Ghost',
            price: '$332,500',
            year: '2023',
            miles: '2,300',
            type: 'luxury',
            image: 'https://images.unsplash.com/photo-1624704761431-6ad2f001dd59'
        }
    ];
    
    // Display cars in inventory
    const inventoryGrid = document.querySelector('.inventory-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    function displayCars(filter = 'all') {
        inventoryGrid.innerHTML = '';
        
        const filteredCars = filter === 'all' 
            ? cars 
            : cars.filter(car => car.type === filter);
        
        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <div class="car-meta">
                        <span>${car.year}</span>
                        <span>${car.miles} miles</span>
                    </div>
                    <div class="car-price">${car.price}</div>
                    <button class="btn" onclick="showCarDetails(${car.id})">View Details</button>
                </div>
            `;
            inventoryGrid.appendChild(carCard);
        });
    }
    
    // Filter cars
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter cars
            const filter = this.getAttribute('data-filter');
            displayCars(filter);
        });
    });
    
    // Initialize with all cars
    displayCars();
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        goToTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        goToTestimonial(currentIndex);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto slide
    let slideInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
});

// Global function to show car details (would typically open a modal)
function showCarDetails(carId) {
    alert(`Showing details for car ID: ${carId}\nThis would typically open a detailed modal with more information.`);
}