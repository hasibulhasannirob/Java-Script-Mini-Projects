// Sample list of products (you can add more)
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 10.00
    },
    {
        id: 2,
        name: "Product 2",
        price: 15.00
    },
    {
        id: 3,
        name: "Product 3",
        price: 20.00
    },
    {
        id: 4,
        name: "Product 4",
        price: 12.00
    }
];

// Initialize cart and total
const cart = [];
let total = 0.00;

// Function to render product cards
function renderProducts() {
    const productList = document.querySelector(".product-list");

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

// Function to update the cart and total
function updateCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    total = 0.00;

    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            ${products.find(product => product.id === item.id).name} -
            $${products.find(product => product.id === item.id).price.toFixed(2)}
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(cartItem);
        total += products.find(product => product.id === item.id).price;
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Event listener for adding items to the cart
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        cart.push({ id: productId });
        updateCart();
    }
});

// Event listener for removing items from the cart
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const index = cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }
});

// Initialize the app
renderProducts();
updateCart();
