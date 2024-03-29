function toggleDescription(orderId) {
    var description = document.getElementById(orderId);
    if (description) {
        description.classList.toggle("active");
    }
}

// Accepting an order
function acceptOrder(orderId) {
    // Mark the order as accepted
}

// Adding a new order to the list
function addOrder(order) {
    var orderHtml = `
        <div class="order">
            <div class="order-title" onclick="toggleDescription('${order.id}')">${order.title}</div>
            <div class="order-description" id="${order.id}">
                ${order.description !== "" ? order.description : "No Description"}
            </div>
            <button onclick="acceptOrder('${order.id}')">Accept Order</button>
        </div>
    `;

    var orderList = document.getElementById("order-list");
    if (orderList) {
        orderList.innerHTML += orderHtml;
    } else {
        console.error("Order list container not found.");
    }
}

// Orders from the backend API
fetch('http://localhost:3000/api/orders')
    .then(response => response.json())
    .then(orders => {
        orders.forEach(addOrder);
    })
    .catch(error => {
        console.error('Error:', error);
    });
