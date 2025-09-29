import itemList from "./itemList.js";

const menu = document.querySelector(".menu");
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
const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  footerYear.innerText = year;
};

handleCurrentYear();
