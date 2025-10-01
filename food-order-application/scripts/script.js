import itemList from "./itemList.js";

const menu = document.querySelector(".menu");
const modal = document.querySelector(".modal");
const loginButton = document.querySelector(".login-button");
const cartButton = document.querySelector(".cart-button");
const modalLogin = document.querySelector(".modal-login");
const userInfo = document.querySelector(".user-info");
const userNameInput = document.querySelector(".modal-username");
const passwordInput = document.querySelector(".modal-password");
const userNameDisplay = document.querySelector(".login-username");
const cartModal = document.querySelector(".cart");
const cartQuantity = document.querySelector(".cart-quantity");
const checkout = document.querySelector("#checkout-button");
const payment = document.querySelector(".payment");
const clearCart = document.querySelector("#clear-cart");

const footerYear = document.querySelector(".footer-year");

const itemListDisplay = () => {
  itemList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");
    itemDiv.innerHTML = `
    <div class="menu-item__info">
            <div>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            </div>
          </div>
          <div class="menu-item__price">
            <p>$${item.price}</p>
            <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">
              <span class="textFor425">Add to Cart</span>
              <span class="textSmall">+</span>
            </button>
          </div>`;
    menu.appendChild(itemDiv);
  });
  const allAddToCart = document.querySelectorAll(".add-to-cart");
  allAddToCart.forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(
        button.getAttribute("data-name"),
        button.getAttribute("data-price")
      );
    });
  });
};
itemListDisplay();

const usenameIsValid = false;
const passwordIsValid = false;
const saveName = () => {
  if (userNameInput.value === "") {
    alert("Please enter your name");
    return;
  }
  if (passwordInput.value === "password") {
    const userName = userNameInput.value;
    userInfo.style.display = "block";
    loginButton.style.display = "none";
    userNameDisplay.textContent = userName;
  } else {
    alert("Invalid password");
  }
};

let cart = [];

const addToCart = (name, price) => {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
    console.log(cart);
  }
  updateCart();
};
const removeItem = (name) => {
  const item = cart.find((item) => item.name === name);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter((item) => item.name !== name);
    }
  }
  updateCart();
};

cartQuantity.textContent = 0;
const updateCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  let itemQuantity = 0;
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div>
        <span>${item.name}</span>
        <span>(${item.price})</span>
      </div>
      <div class="cart-item-actions">
        <button class='remove-in-cart' data-name='${item.name}'>-</button>
        <span>${item.quantity}</span>
        <button class='add-in-cart' data-name='${item.name}' data-price="${item.price}">+</button>
      </div>`;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
    itemQuantity += item.quantity;
  });
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartQuantity.textContent = itemQuantity;

  const removeButtons = document.querySelectorAll(".remove-in-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeItem(button.getAttribute("data-name"));
    });
  });

  const addButtons = document.querySelectorAll(".add-in-cart");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(
        button.getAttribute("data-name"),
        button.getAttribute("data-price")
      );
    });
  });
};
const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  footerYear.innerText = year;
};

handleCurrentYear();

loginButton.addEventListener("click", () => {
  modal.showModal();
});
modalLogin.addEventListener("click", saveName);

cartButton.addEventListener("click", () => {
  cartModal.showModal();
});

checkout.addEventListener("click", () => {
  cart.length > 0
    ? (cartModal.close(), payment.showModal())
    : alert("Your cart is empty");
});

clearCart.addEventListener("click", () => {
  cart = [];
  updateCart();
  cartModal.close();
});
