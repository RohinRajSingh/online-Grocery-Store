const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "14 Nov 2024";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);




// Load the cart from local storage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault(); // Prevent the default action of the link
        const productId = button.getAttribute('data-product-id');
        addToCart(productId);
    });
});

// Function to add product to the cart
function addToCart(productId) {
    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Increase quantity if the product is already in the cart
        existingProduct.quantity++;
    } else {
        // Add new product to the cart
        cart.push({ id: productId, quantity: 1 });
    }

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    displayCart();
    updateCartCount();
}

// Function to display the cart
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.innerText = `Product ID: ${item.id}, Quantity: ${item.quantity}`;
        cartContainer.appendChild(productElement);
    });
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalCount;
}

// Display the cart and update the cart count when the page loads
displayCart();
updateCartCount();
