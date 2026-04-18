document.addEventListener('DOMContentLoaded', () => {
    const totalItemsStat = document.getElementById('totalItemsStat');
    const inventoryTableBody = document.getElementById('inventoryTableBody');

    // Update total items based on menuData from data.js
    if (typeof menuData !== 'undefined') {
        totalItemsStat.textContent = menuData.length;

        // Populate inventory table
        menuData.forEach(item => {
            const tr = document.createElement('tr');
            
            let stockBadgeClass = 'success';
            if (item.stock <= 5 && item.stock > 0) stockBadgeClass = 'warning';
            if (item.stock === 0) stockBadgeClass = 'danger';

            tr.innerHTML = `
                <td>${item.id}</td>
                <td><strong>${item.name}</strong></td>
                <td style="text-transform: capitalize;">${item.category}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <span class="badge ${stockBadgeClass}">
                        ${item.stock}
                    </span>
            `;
            inventoryTableBody.appendChild(tr);
        });
    }

    // Populate Orders Table and Stats
    const ordersTableBody = document.getElementById('ordersTableBody');
    const ordersTodayStat = document.getElementById('ordersTodayStat');
    const revenueStat = document.getElementById('revenueStat');

    const recentOrders = JSON.parse(localStorage.getItem('eleganceOrders')) || [];
    
    if (ordersTableBody) {
        function renderOrders() {
            ordersTableBody.innerHTML = '';
            if (recentOrders.length === 0) {
                ordersTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No orders placed yet.</td></tr>`;
                if(ordersTodayStat) ordersTodayStat.textContent = 0;
                if(revenueStat) revenueStat.textContent = '₹0';
            } else {
                let totalRevenue = 0;
                recentOrders.forEach((order, index) => {
                    totalRevenue += order.amount;
                    const tr = document.createElement('tr');
                    
                    let badgeClass = 'warning';
                    if (order.status.toLowerCase() === 'delivered') badgeClass = 'success';
                    if (order.status.toLowerCase() === 'fulfilled') badgeClass = 'success';
                    
                    tr.innerHTML = `
                        <td><strong>${order.id}</strong></td>
                        <td>${order.customerName}</td>
                        <td><span class="badge ${badgeClass}">${order.status}</span></td>
                        <td>₹${order.amount.toFixed(2)}</td>
                        <td>${order.time}</td>
                        <td>
                            <button class="action-btn deliver-btn" data-index="${index}" style="background: rgba(46, 204, 113, 0.2); color: var(--success); border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px; font-size: 0.8rem;">Deliver</button>
                            <button class="action-btn fulfill-btn" data-index="${index}" style="background: rgba(52, 152, 219, 0.2); color: #3498db; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px; font-size: 0.8rem;">Fulfill</button>
                            <button class="action-btn remove-btn" data-index="${index}" style="background: rgba(231, 76, 60, 0.2); color: var(--danger); border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.8rem;">Remove</button>
                        </td>
                    `;
                    ordersTableBody.appendChild(tr);
                });
                
                // Update Top Board Stats
                if(ordersTodayStat) ordersTodayStat.textContent = recentOrders.length;
                if(revenueStat) revenueStat.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;

                // Add event listeners to the buttons
                document.querySelectorAll('.deliver-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.getAttribute('data-index');
                        recentOrders[idx].status = 'Delivered';
                        localStorage.setItem('eleganceOrders', JSON.stringify(recentOrders));
                        renderOrders();
                    });
                });
                document.querySelectorAll('.fulfill-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.getAttribute('data-index');
                        recentOrders[idx].status = 'Fulfilled';
                        localStorage.setItem('eleganceOrders', JSON.stringify(recentOrders));
                        renderOrders();
                    });
                });
                document.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = e.target.getAttribute('data-index');
                        recentOrders.splice(idx, 1);
                        localStorage.setItem('eleganceOrders', JSON.stringify(recentOrders));
                        renderOrders();
                    });
                });
            }
        }
        
        renderOrders();
    }
});
