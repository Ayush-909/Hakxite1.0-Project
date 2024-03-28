// Function to toggle order description visibility
function toggleDescription(orderId) {
    var description = document.getElementById(orderId);
    if (description) {
        description.classList.toggle("active");
    }
}

// Function to add a new order to the list
function addOrder() {
    var titleInput = document.getElementById("order-title");
    var descriptionInput = document.getElementById("order-description");

    var title = titleInput.value.trim();
    var description = descriptionInput.value.trim();

    if (title !== "") {
        var orderId = "order-" + Date.now(); // Generate unique ID for the order
        var orderHtml = `
            <div class="order">
                <div class="order-title" onclick="toggleDescription('${orderId}')">${title}</div>
                <div class="order-description" id="${orderId}">
                    ${description !== "" ? description : "No Description"}
                </div>
            </div>
        `;

        var orderList = document.getElementById("order-list");
        if (orderList) {
            orderList.innerHTML += orderHtml;
        } else {
            console.error("Order list container not found.");
        }

        // Clear input fields after adding order
        titleInput.value = "";
        descriptionInput.value = "";
    } else {
        console.error("Title cannot be empty.");
    }
}

// Event listener for Add Order button click
var addOrderBtn = document.getElementById("add-order-btn");
if (addOrderBtn) {
    addOrderBtn.addEventListener("click", addOrder);
} else {
    console.error("Add Order button not found.");
}
