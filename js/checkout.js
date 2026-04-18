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

    const deliveryFee = 40.00;
    const finalTotal = subtotalPrice + deliveryFee;
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
        <div class="bill-row">
            <span>Delivery Fee</span>
            <span>₹${deliveryFee.toFixed(2)}</span>
        </div>
        <div class="bill-row total">
            <span>To Pay</span>
            <span id="billTotal">₹${finalTotal.toFixed(2)}</span>
        </div>
    `;

    // Generate QR Code Payment Mock based on a completely free API
    const upiLink = encodeURIComponent(`upi://pay?pa=elegance@ybl&pn=Elegance&am=${finalTotal.toFixed(2)}&cu=INR`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${upiLink}`;
    document.getElementById('trackingQR').src = qrUrl;

    // 3. Map Initialization (Leaflet)
    // Default coordinates (e.g. Center of India or Delhi)
    let mapLat = 28.6139;
    let mapLng = 77.2090;
    
    // Create the map and set tile layer
    const map = L.map('map').setView([mapLat, mapLng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker = L.marker([mapLat, mapLng], { draggable: true }).addTo(map);

    // Reverse Geocoding with Nominatim completely free API
    function reverseGeocode(lat, lng) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
            headers: {
                'Accept-Language': 'en'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.address) {
                    const addr = data.address;
                    // Format best possible address line
                    let add1 = data.display_name.split(',').slice(0, 2).join(',').trim();
                    if (!add1) add1 = addr.road || addr.suburb || "Unnamed Location";
                    
                    document.getElementById('address1').value = add1;
                    document.getElementById('city').value = addr.city || addr.town || addr.village || addr.county || '';
                    document.getElementById('state').value = addr.state || '';
                    document.getElementById('pincode').value = addr.postcode || '';
                }
            })
            .catch(err => console.error("Geocoding failed", err));
    }

    // Capture Drag Movement
    marker.on('dragend', function (e) {
        const pos = e.target.getLatLng();
        reverseGeocode(pos.lat, pos.lng);
    });

    // Capture "Use Current Location" Click
    document.getElementById('useLocationBtn').addEventListener('click', () => {
        if ("geolocation" in navigator) {
            document.getElementById('useLocationBtn').innerHTML = 'Locating...';
            navigator.geolocation.getCurrentPosition(position => {
                mapLat = position.coords.latitude;
                mapLng = position.coords.longitude;
                map.setView([mapLat, mapLng], 17);
                marker.setLatLng([mapLat, mapLng]);
                reverseGeocode(mapLat, mapLng);
                
                // Reset button UI
                document.getElementById('useLocationBtn').innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 5px; vertical-align: text-bottom;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Location Found!
                `;
            }, err => {
                alert("Location permission denied or unavailable. Please drag the marker.");
                document.getElementById('useLocationBtn').innerHTML = 'Current Location';
            });
        } else {
            alert("Geolocation not supported by your browser.");
        }
    });

    // Address Prediction Logic
    const addressSearch = document.getElementById('addressSearch');
    const addressSuggestions = document.getElementById('addressSuggestions');
    let searchTimeout = null;

    if (addressSearch) {
        addressSearch.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            if (query.length < 3) {
                addressSuggestions.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`, {
                    headers: { 'Accept-Language': 'en' }
                })
                .then(res => res.json())
                .then(data => {
                    addressSuggestions.innerHTML = '';
                    if (data && data.length > 0) {
                        addressSuggestions.style.display = 'block';
                        data.forEach(place => {
                            const div = document.createElement('div');
                            div.style.padding = '10px';
                            div.style.borderBottom = '1px solid var(--card-border)';
                            div.style.cursor = 'pointer';
                            div.style.fontSize = '0.9rem';
                            div.textContent = place.display_name;
                            
                            div.addEventListener('mouseover', () => div.style.background = 'rgba(255,255,255,0.05)');
                            div.addEventListener('mouseout', () => div.style.background = 'transparent');
                            
                            div.addEventListener('click', () => {
                                addressSearch.value = place.display_name;
                                addressSuggestions.style.display = 'none';
                                
                                const lat = parseFloat(place.lat);
                                const lon = parseFloat(place.lon);
                                
                                mapLat = lat;
                                mapLng = lon;
                                map.setView([mapLat, mapLng], 17);
                                marker.setLatLng([mapLat, mapLng]);
                                
                                // Call reverseGeocode to fill the exact form fields correctly
                                reverseGeocode(mapLat, mapLng);
                            });
                            addressSuggestions.appendChild(div);
                        });
                    } else {
                        addressSuggestions.style.display = 'none';
                    }
                })
                .catch(err => {
                    console.error("Address search failed", err);
                    addressSuggestions.style.display = 'none';
                });
            }, 500); // 500ms debounce
        });
        
        // Hide if clicked outside
        document.addEventListener('click', (e) => {
            if (e.target !== addressSearch && !addressSuggestions.contains(e.target)) {
                addressSuggestions.style.display = 'none';
            }
        });
    }

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
        const phone = document.getElementById('phone').value.trim();
        const add1 = document.getElementById('address1').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const pincode = document.getElementById('pincode').value.trim();

        if (!name || !isNaN(name)) return alert("enter valid name");
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) return alert("Please enter a valid 10-digit Indian Phone Number.");
        if (!add1) return alert("Please enter your primary Address Line 1.");
        if (!city) return alert("Please enter your City.");
        if (!state) return alert("Please enter your State.");
        if (!pincode) return alert("Please enter your Pincode.");

        alert(`Order verified and placed successfully, ${name}! Your total is ₹${finalTotal.toFixed(2)}.\n\nThank you for dining with Elegance!`);
        
        // Push order into persistent storage for admin panel
        const currentOrders = JSON.parse(localStorage.getItem('eleganceOrders')) || [];
        const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
        currentOrders.unshift({
            id: orderId,
            customerName: name,
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
