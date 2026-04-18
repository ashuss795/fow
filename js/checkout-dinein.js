document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch Cart Data
    const cartData = JSON.parse(localStorage.getItem('eleganceCart')) || [];
    const dm = parseFloat(localStorage.getItem('eleganceDemandMultiplier')) || 1.0;
    
    if (cartData.length === 0) {
        alert("Your cart is empty. Redirecting to menu.");
        window.location.href = "index.html";
        return;
    }

    // 2. Render Order Summary
    const checkoutItems = document.getElementById('checkoutItems');
    let subtotalMrp = 0;
    let subtotalPrice = 0;
    let totalBulkDiscount = 0;
    
    cartData.forEach(item => {
        const qty = item.quantity;
        const itemMrp = item.mrp || item.price;
        const lineMrp = itemMrp * qty * dm;
        let linePrice = item.price * qty * dm;
        
        let bulkMsg = '';
        if (qty >= 3) {
            const bulkDiscount = linePrice * 0.10;
            totalBulkDiscount += bulkDiscount;
            linePrice -= bulkDiscount;
            bulkMsg = `<div style="color:var(--success); font-size:0.8rem; font-weight:600;">Bulk -10%</div>`;
        }

        subtotalMrp += lineMrp;
        subtotalPrice += linePrice;
        
        const div = document.createElement('div');
        div.className = 'checkout-item';
        div.innerHTML = `
            <div class="ci-info">
                <span class="ci-name">${item.name}</span>
                <span class="ci-qty">Qty: ${qty}</span>
            </div>
            <div style="text-align: right;">
                <div class="ci-price" style="text-decoration:line-through; font-size:0.85rem; color:var(--text-muted);">₹${lineMrp.toFixed(2)}</div>
                <div class="ci-price">₹${linePrice.toFixed(2)}</div>
                ${bulkMsg}
            </div>
        `;
        checkoutItems.appendChild(div);
    });

    let cartValueDiscount = 0;
    if (subtotalPrice >= 500) {
        cartValueDiscount = 100;
        subtotalPrice -= cartValueDiscount;
    }

    const finalTotal = subtotalPrice;
    const totalSavings = subtotalMrp - subtotalPrice;

    const billDetails = document.querySelector('.bill-details');
    billDetails.innerHTML = `
        ${totalSavings > 0 ? `<div class="savings-banner" style="margin-bottom: 15px;">You saved ₹${totalSavings.toFixed(2)}!</div>` : ''}
        <div class="bill-row">
            <span>Item Total (MRP)</span>
            <span style="text-decoration: line-through;">₹${subtotalMrp.toFixed(2)}</span>
        </div>
        ${totalBulkDiscount > 0 ? `<div class="bill-row" style="color:var(--success);"><span>Bulk Item Discount</span><span>-₹${totalBulkDiscount.toFixed(2)}</span></div>` : ''}
        ${cartValueDiscount > 0 ? `<div class="bill-row" style="color:var(--success);"><span>Cart Value Discount</span><span>-₹${cartValueDiscount.toFixed(2)}</span></div>` : ''}
        ${dm > 1.0 ? `<div class="bill-row" style="color:var(--accent-color);"><span>Peak Surcharge</span><span>Included</span></div>` : ''}
        <div class="bill-row total">
            <span>To Pay</span>
            <span id="billTotal">₹${finalTotal.toFixed(2)}</span>
        </div>
    `;

    // 4. Payment Options Interactivity
    const payOptions = document.querySelectorAll('.pay-option');
    payOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            payOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // 5. Submit Order & Validation
    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        // Collect & Validate required fields
        const name = document.getElementById('fullName').value.trim();
        const table = document.getElementById('tableNumber').value;

        if (!name || (!isNaN(name))) return alert("Please enter a valid name.");
        if (!table) return alert("Please select your table number.");

        alert(`Order confirmed for ${name} at Table ${table}! The kitchen is preparing your dishes.\n\nEnjoy your meal at Elegance!`);
        
        // Push order into persistent storage for admin panel
        const currentOrders = JSON.parse(localStorage.getItem('eleganceOrders')) || [];
        const orderId = '#DINE-' + Math.floor(1000 + Math.random() * 9000);
        currentOrders.unshift({
            id: orderId,
            customerName: `${name} (Table ${table})`,
            amount: finalTotal,
            status: 'Preparing',
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        });
        localStorage.setItem('eleganceOrders', JSON.stringify(currentOrders));

        // Clear logic
        localStorage.removeItem('eleganceCart');
        window.location.href = "index.html";
    });
});
