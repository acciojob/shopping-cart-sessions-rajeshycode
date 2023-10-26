<!DOCTYPE html>
<html>
<head>
  <title>Shopping Cart</title>
</head>
<body>
  <h2>Product List</h2>
  <ul id="product-list"></ul>
  <h2>Shopping Cart</h2>
  <ul id="cart"></ul>

  <script>
    // Product data
    const products = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 30 },
      { id: 4, name: "Product 4", price: 40 },
      { id: 5, name: "Product 5", price: 50 },
    ];

    // DOM elements
    const productList = document.getElementById("product-list");
    const cartList = document.getElementById("cart");

    // Function to render the product list
    function renderProducts() {
      products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
      });
    }

    // Function to render the cart
    function renderCart() {
      cartList.innerHTML = ''; // Clear the cart list first
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      cart.forEach((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
        cartList.appendChild(li);
      });
    }

    // Function to add an item to the cart
    function addToCart(productId) {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      if (cart.find((item) => item.productId === productId)) {
        // If the item is already in the cart, increase its quantity
        cart.forEach((item) => {
          if (item.productId === productId) {
            item.quantity++;
          }
        });
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        cart.push({ productId, quantity: 1 });
      }

      sessionStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }

    // Function to remove an item from the cart
    function removeFromCart(productId) {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      const itemIndex = cart.findIndex((item) => item.productId === productId);
      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    }

    // Function to clear the cart
    function clearCart() {
      sessionStorage.removeItem('cart');
      renderCart();
    }

    // Event listener for adding items to the cart
    productList.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        addToCart(productId);
      }
    });

    // Event listener for removing items from the cart
    cartList.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-from-cart-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        removeFromCart(productId);
      }
    });

    // Initial render
    renderProducts();
    renderCart();
  </script>
</body>
</html>
