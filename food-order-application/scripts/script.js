import itemList from "./itemList.js";

const menu = document.querySelector(".menu");
const modal = document.querySelector(".modal");
const loginButton = document.querySelector(".login-button");
const modalLogin = document.querySelector(".modal-login");
const userInfo = document.querySelector(".user-info");
const userNameInput = document.querySelector(".modal-username");
const passwordInput = document.querySelector(".modal-password");
const invalidPassword = document.querySelector(".invalid-password");
const userNameDisplay = document.querySelector(".login-username");
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
              Add to Cart
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

const saveName = () => {
  if (passwordInput.value === "password") {
    const userName = userNameInput.value;
    userInfo.style.display = "block";
    loginButton.style.display = "none";
    userNameDisplay.textContent = userName;
  } else {
    invalidPassword.style.display = "block";
  }
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
