function toggleDescription(orderId) {
    var description = document.getElementById(orderId);
    if (description) {
        description.classList.toggle("active");
    }
}

// Displaying the list of orders
function displayOrders() {
    fetch('http://localhost:3000/api/orders')
        .then(response => response.json())
        .then(orders => {
            orders.forEach(order => {
                addOrderToList(order);
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Adding a new order to the list
function addOrder() {
    var titleInput = document.getElementById("order-title");
    var descriptionInput = document.getElementById("order-description");

    var title = titleInput.value.trim();
    var description = descriptionInput.value.trim();

    if (title !== "") {
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(data => {
            addOrderToList(data);
        })
        .catch(error => {
            console.error('Error adding order:', error);
        });

        titleInput.value = "";
        descriptionInput.value = "";
    } else {
        console.error("Title cannot be empty.");
    }
}

// Adding a new order to the list
function addOrderToList(order) {
    var orderHtml = `
        <div class="order">
            <div class="order-title" onclick="toggleDescription('${order.id}')">${order.title}</div>
            <div class="order-description" id="${order.id}">
                ${order.description !== "" ? order.description : "No Description"}
            </div>
        </div>
    `;

    var orderList = document.getElementById("order-list");
    if (orderList) {
        orderList.innerHTML += orderHtml;
    } else {
        console.error("Order list container not found.");
    }
}

var addOrderBtn = document.getElementById("add-order-btn");
if (addOrderBtn) {
    addOrderBtn.addEventListener("click", addOrder);
} else {
    console.error("Add Order button not found.");
}

window.addEventListener('load', displayOrders);
