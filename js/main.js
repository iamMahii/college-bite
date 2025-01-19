// Cart state
let cart = [];

// DOM Elements
const trendingItemsContainer = document.getElementById('trending-items');
const menuItemsContainer = document.getElementById('menu-items');
const cartModal = document.getElementById('cart-modal');
const cartFab = document.querySelector('.cart-fab');
const cartCount = document.querySelector('.cart-count');
const categoryFilters = document.querySelector('.category-filters');

// Initialize the page
function init() {
    renderTrendingItems();
    renderMenuItems();
    setupEventListeners();
    setupScrollAnimations();
}

// Setup scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all item cards
    document.querySelectorAll('.item-card').forEach(card => {
        observer.observe(card);
    });
}

// Render trending items with staggered animation
function renderTrendingItems() {
    const html = trendingItems
        .map((item, index) => createItemCard(item, index * 100))
        .join('');
    
    trendingItemsContainer.innerHTML = html;
}

// Render all menu items with staggered animation
function renderMenuItems(category = 'All') {
    const filteredItems = category === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    const html = filteredItems
        .map((item, index) => createItemCard(item, index * 100))
        .join('');

    menuItemsContainer.innerHTML = html;
    setupScrollAnimations();
}

// Create HTML for item card with animation delay
function createItemCard(item, delay = 0) {
    return `
        <div class="item-card" style="animation-delay: ${delay}ms">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h3 class="item-title">${item.name}</h3>
                <div class="item-meta">
                    <span class="item-price">₹${item.price}</span>
                    <span class="item-rating">⭐ ${item.rating}</span>
                </div>
                <button 
                    onclick="addToCart(${item.id})" 
                    class="add-to-cart-btn"
                    ${!item.available ? 'disabled' : ''}
                >
                    <i class="fas fa-shopping-cart"></i>
                    ${item.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
}

// Add item to cart with animation
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    // Create flying element
    const button = event.target.closest('.add-to-cart-btn');
    const buttonRect = button.getBoundingClientRect();
    const cartRect = cartFab.getBoundingClientRect();

    const flyingItem = document.createElement('div');
    flyingItem.className = 'flying-item';
    flyingItem.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-gradient);
        border-radius: 50%;
        top: ${buttonRect.top}px;
        left: ${buttonRect.left}px;
        z-index: 1000;
        pointer-events: none;
    `;

    document.body.appendChild(flyingItem);

    // Animate flying element
    flyingItem.animate([
        { 
            transform: 'scale(1)',
            top: `${buttonRect.top}px`,
            left: `${buttonRect.left}px`
        },
        { 
            transform: 'scale(0.5)',
            top: `${cartRect.top + cartRect.height/2}px`,
            left: `${cartRect.left + cartRect.width/2}px`
        }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => {
        flyingItem.remove();
        
        // Update cart
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        updateCartCount();
        showToast('Added to cart!');
        
        // Shake cart icon
        cartFab.classList.add('shake');
        setTimeout(() => cartFab.classList.remove('shake'), 500);
    };
}

// Update cart count with bounce animation
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.add('bounce');
    setTimeout(() => cartCount.classList.remove('bounce'), 300);
}

// Show toast message with slide animation
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    // Category filter clicks with smooth transitions
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Remove active class from all buttons
            categoryFilters.querySelectorAll('button').forEach(btn => 
                btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Animate menu items out
            menuItemsContainer.style.opacity = '0';
            menuItemsContainer.style.transform = 'translateY(20px)';
            
            // Filter items after brief delay
            setTimeout(() => {
                renderMenuItems(e.target.textContent.trim());
                // Animate menu items in
                menuItemsContainer.style.opacity = '1';
                menuItemsContainer.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Cart FAB click with modal animation
    cartFab.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        setTimeout(() => cartModal.classList.add('show'), 10);
    });

    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
            setTimeout(() => cartModal.style.display = 'none', 300);
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Add smooth transitions for menu items
menuItemsContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
