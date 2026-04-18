// State
let currentCategory = 'all';
let currentTimeSlot = 'lunch';
let cart = [];
let demandMultiplier = 1.0; // Dynamic pricing multiplier

// DOM Elements
const timeSlotText = document.getElementById('currentTimeSlot');
const menuGrid = document.getElementById('menuGrid');
const filterTabs = document.querySelectorAll('.tab');
// Cart
const cartBtn = document.getElementById('cartBtn');
const sidebarCart = document.getElementById('sidebarCart');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const pricingAlert = document.getElementById('pricingAlert');
const cartPricingAdjustment = document.getElementById('cartPricingAdjustment');
// Modals
const nutritionModal = document.getElementById('nutritionModal');
const closeNutritionBtn = document.getElementById('closeNutritionBtn');
const nutritionContent = document.getElementById('nutritionContent');
const nutritionTitle = document.getElementById('nutritionTitle');
// Order Type Modal
const orderTypeModal = document.getElementById('orderTypeModal');
const dineInBtn = document.getElementById('dineInBtn');
const orderLocationBtn = document.getElementById('orderLocationBtn');
// QR
const qrcodeDiv = document.getElementById('qrcode');
// Recommendations
const recommendationsSection = document.getElementById('recommendationsSection');
const recommendationsGrid = document.getElementById('recommendationsGrid');

// --- Core Initialization ---
function init() {
    determineTimeSlot();
    calculateDynamicPricing();
    renderMenu();
    setupEventListeners();
    generateQR();
    showOrderTypeModal();
}

function showOrderTypeModal() {
    if (!sessionStorage.getItem('eleganceOrderType')) {
        orderTypeModal.classList.add('active');
    }
}

// --- Time and Pricing Logic ---
function determineTimeSlot() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) {
        currentTimeSlot = 'breakfast';
    } else if (hour >= 11 && hour < 16) {
        currentTimeSlot = 'lunch';
    } else {
        currentTimeSlot = 'dinner';
    }
    timeSlotText.textContent = currentTimeSlot.charAt(0).toUpperCase() + currentTimeSlot.slice(1) + " Menu";
}

function calculateDynamicPricing() {
    // Simulate high demand during typical peak hours (e.g., 7-9 PM, 12-2 PM)
    const hour = new Date().getHours();
    if ((hour >= 18 && hour <= 21) || (hour >= 12 && hour <= 14)) {
        demandMultiplier = 1.15; // 15% surcharge during peak
        pricingAlert.style.display = 'flex';
    } else {
        demandMultiplier = 1.0;
        pricingAlert.style.display = 'none';
    }
}

// --- Rendering Logic ---
function renderMenu() {
    menuGrid.innerHTML = '';
    
    // Filter data
    const filteredData = menuData.filter(item => {
        const matchCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchTime = item.timeSlots.includes(currentTimeSlot);
        return matchCategory && matchTime;
    });

    if (filteredData.length === 0) {
        menuGrid.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; color: var(--text-muted);">No items available for this selection.</p>';
        return;
    }

    filteredData.forEach(item => {
        menuGrid.appendChild(createFoodCard(item));
    });
}

function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    const isOutOfStock = item.stock <= 0;
    const isLowStock = item.stock > 0 && item.stock <= 5;
    
    let stockHTML = `<span class="stock-pill">Available</span>`;
    if (isOutOfStock) stockHTML = `<span class="stock-pill out">Sold Out</span>`;
    else if (isLowStock) stockHTML = `<span class="stock-pill low">Only ${item.stock} left</span>`;

    const finalPrice = (item.price * demandMultiplier).toFixed(2);
    const trueMrp = item.mrp ? (item.mrp * demandMultiplier).toFixed(2) : finalPrice;
    
    let tagsHTML = '';
    if (item.tags && item.tags.length > 0) {
        tagsHTML = '<div class="card-tags">';
        item.tags.forEach(tag => {
            const isDiscount = tag.includes('%');
            tagsHTML += `<span class="badge ${isDiscount ? 'discount' : ''}">${tag}</span>`;
        });
        tagsHTML += '</div>';
    }

    const priceHTML = trueMrp > finalPrice ? 
        `<span class="mrp-price">₹${trueMrp}</span>` : '';

    const cartItem = cart.find(i => i.id === item.id);
    const qtyHTML = cartItem ? `
        <div class="qty-controls">
            <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
            <span class="qty-display">${cartItem.quantity}</span>
            <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
        </div>
    ` : `
        <button class="add-btn" data-id="${item.id}" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Unavailable' : 'Add to Cart'}
        </button>
    `;

    card.innerHTML = `
        <div class="card-img-container">
            <img src="${item.image}" alt="${item.name}" class="card-img" />
            ${tagsHTML}
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price">${priceHTML}<span class="final-price">₹${finalPrice}</span></div>
            </div>
            <p class="card-desc">${item.description}</p>
            <div class="card-meta">
                ${stockHTML}
                <span class="nutrition-link" data-id="${item.id}">Nutrition Info</span>
            </div>
            ${qtyHTML}
        </div>
    `;

    return card;
}

// --- Cart Logic ---
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item || item.stock <= 0) return;

    // Real-time stock depletion logic
    item.stock -= 1;
    
    // Add to cart
    const cartItem = cart.find(i => i.id === itemId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    renderMenu(); // Re-render to update stock numbers & show qty controls
    updateRecommendations(itemId);
    
    // Open sidebar automatically
    sidebarCart.classList.add('open');
}

function decrementCart(itemId) {
    const cartIndex = cart.findIndex(i => i.id === itemId);
    if (cartIndex > -1) {
        const item = cart[cartIndex];
        const globalItem = menuData.find(i => i.id === itemId);
        if (globalItem) globalItem.stock += 1;
        
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart.splice(cartIndex, 1);
        }
        updateCartUI();
        renderMenu();
    }
}

function removeFromCart(itemId) {
    const cartIndex = cart.findIndex(i => i.id === itemId);
    if (cartIndex > -1) {
        const item = cart[cartIndex];
        // Restore stock
        const globalItem = menuData.find(i => i.id === itemId);
        if (globalItem) globalItem.stock += item.quantity;
        
        cart.splice(cartIndex, 1);
        updateCartUI();
        renderMenu();
    }
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let subtotalMrp = 0;
    let subtotalPrice = 0;
    let count = 0;
    let totalBulkDiscount = 0;

    cart.forEach(item => {
        const qty = item.quantity;
        const itemMrp = item.mrp || item.price;
        const lineMrp = itemMrp * qty * demandMultiplier;
        let linePrice = item.price * qty * demandMultiplier;
        
        let bulkMsg = '';
        if (qty >= 3) {
            const bulkDiscount = linePrice * 0.10;
            totalBulkDiscount += bulkDiscount;
            linePrice -= bulkDiscount;
            bulkMsg = `<span class="discount-tag-text">Bulk -10%</span>`;
        }

        subtotalMrp += lineMrp;
        subtotalPrice += linePrice;
        count += qty;

        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-title">${item.name} x${qty}</span>
                <div class="cart-item-price">
                    <span class="mrp-price">₹${lineMrp.toFixed(2)}</span>
                    <span class="final-price">₹${linePrice.toFixed(2)}</span>
                    ${bulkMsg}
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="qty-controls" style="width:80px; height: 30px; margin-right: 10px;">
                    <button class="qty-btn dec-btn" data-id="${item.id}" style="padding: 2px 8px; font-size:1.2rem;">-</button>
                    <span class="qty-display" style="font-size:1rem;">${qty}</span>
                    <button class="qty-btn inc-btn" data-id="${item.id}" style="padding: 2px 8px; font-size:1.2rem;">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartCount.textContent = count;
    
    let cartValueDiscount = 0;
    if (subtotalPrice >= 500) {
        cartValueDiscount = 100;
        subtotalPrice -= cartValueDiscount;
    }
    
    const totalSavings = subtotalMrp - subtotalPrice;
    
    document.querySelector('.cart-summary').innerHTML = `
        ${totalSavings > 0 ? `<div class="savings-banner">You saved ₹${totalSavings.toFixed(2)} on this order!</div>` : ''}
        <div class="summary-line">
            <span>Item Total (MRP)</span>
            <span style="text-decoration: line-through;">₹${subtotalMrp.toFixed(2)}</span>
        </div>
        ${totalBulkDiscount > 0 ? `<div class="summary-line" style="color:var(--success);"><span>Bulk Item Discount</span><span>-₹${totalBulkDiscount.toFixed(2)}</span></div>` : ''}
        ${cartValueDiscount > 0 ? `<div class="summary-line" style="color:var(--success);"><span>Cart Value Discount (over ₹500)</span><span>-₹${cartValueDiscount.toFixed(2)}</span></div>` : ''}
        ${demandMultiplier > 1.0 ? `<div class="summary-line dynamic-pricing-alert"><span>Peak Surcharge</span><span>Included</span></div>` : ''}
        <div class="summary-line total">
            <span>To Pay</span>
            <span id="cartTotal">₹${subtotalPrice.toFixed(2)}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
}

// --- Recommendations Engine ---
function updateRecommendations(lastAddedItemId) {
    let recIds = recommendationRules[lastAddedItemId] || recommendationRules.default;
    
    // Filter out items already in cart or out of stock
    const availableRecs = menuData.filter(i => 
        recIds.includes(i.id) && i.stock > 0 && !cart.find(c => c.id === i.id)
    );

    if (availableRecs.length > 0) {
        recommendationsSection.classList.remove('hidden');
        recommendationsGrid.innerHTML = '';
        availableRecs.forEach(item => {
            recommendationsGrid.appendChild(createFoodCard(item));
        });
    } else {
        recommendationsSection.classList.add('hidden');
    }
}

// --- Nutrition Info Logic ---
function showNutrition(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    const cartItem = cart.find(i => i.id === itemId);
    const qty = cartItem ? cartItem.quantity : 1;

    nutritionTitle.textContent = `${item.name} - Nutrition Facts`;
    nutritionContent.innerHTML = `
        <p style="color: var(--accent-color); font-size: 0.9rem; margin-bottom: 15px; font-weight: 600;">Showing totals for ${qty} serving(s)</p>
        <div class="nutrition-row"><span>Calories</span><span>${(item.nutrition.calories * qty).toFixed(0)} kcal</span></div>
        <div class="nutrition-row"><span>Protein</span><span>${(item.nutrition.protein * qty).toFixed(1)}g</span></div>
        <div class="nutrition-row"><span>Carbohydrates</span><span>${(item.nutrition.carbs * qty).toFixed(1)}g</span></div>
        <div class="nutrition-row"><span>Fats</span><span>${(item.nutrition.fats * qty).toFixed(1)}g</span></div>
    `;
    
    nutritionModal.classList.add('active');
}

// --- Digital Menu QR ---
function generateQR() {
    qrcodeDiv.innerHTML = ''; // Clear previous QR
    const currentUrl = 'https://drive.google.com/file/d/1PJklY9paY0wK9agoECDy4J97gxe0Z5QL/view?usp=sharing';
    
    new QRCode(qrcodeDiv, {
        text: currentUrl,
        width: 120,
        height: 120,
        colorDark : "#0d0f12",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

// --- Event Listeners ---
function setupEventListeners() {
    // Filtering
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-category');
            renderMenu();
        });
    });

    // Delegation for dynamic buttons
    document.body.addEventListener('click', (e) => {
        // Add to cart or increment
        if (e.target.classList.contains('add-btn') || e.target.classList.contains('inc-btn')) {
            addToCart(e.target.getAttribute('data-id'));
        }
        // Decrement
        if (e.target.classList.contains('dec-btn')) {
            decrementCart(e.target.getAttribute('data-id'));
        }
        // Remove from cart
        if (e.target.classList.contains('cart-item-remove')) {
            removeFromCart(e.target.getAttribute('data-id'));
        }
        // Nutrition Info
        if (e.target.classList.contains('nutrition-link')) {
            showNutrition(e.target.getAttribute('data-id'));
        }
    });

    // Modals & Sidebars
    cartBtn.addEventListener('click', () => sidebarCart.classList.add('open'));
    closeCartBtn.addEventListener('click', () => sidebarCart.classList.remove('open'));
    
    closeNutritionBtn.addEventListener('click', () => nutritionModal.classList.remove('active'));
    nutritionModal.addEventListener('click', (e) => {
        if (e.target === nutritionModal) nutritionModal.classList.remove('active');
    });

    // Order Type Modals
    if (dineInBtn) {
        dineInBtn.addEventListener('click', () => {
            sessionStorage.setItem('eleganceOrderType', 'Dine In');
            orderTypeModal.classList.remove('active');
        });
    }
    if (orderLocationBtn) {
        orderLocationBtn.addEventListener('click', () => {
            sessionStorage.setItem('eleganceOrderType', 'Location');
            orderTypeModal.classList.remove('active');
        });
    }
    // Checkout Routing via Delegation (since summary replaces HTML inside)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkout-btn')) {
            if (cart.length === 0) {
                alert('Your cart is empty! Please add some items to proceed.');
                return;
            }
            // Pass cart data explicitly for the checkout page session
            localStorage.setItem('eleganceCart', JSON.stringify(cart));
            localStorage.setItem('eleganceDemandMultiplier', demandMultiplier);
            const orderType = sessionStorage.getItem('eleganceOrderType');
            if (orderType === 'Dine In') {
                window.location.href = 'checkout-dinein.html';
            } else {
                window.location.href = 'checkout.html';
            }
        }
    });
}
// Run App
window.addEventListener('DOMContentLoaded', init);
