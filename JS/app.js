// Constants variables - DOM elements
const prodItems = document.querySelector(".participants__box");
const prevBtn = document.querySelector(
  ".participants__arrows-btn:first-of-type"
);
const nextBtn = document.querySelector(
  ".participants__arrows-btn:last-of-type"
);
let slideTimer;

function createProductElement(prodDetails) {
  const { image, title, description } = prodDetails;
  const productItem = document.createElement("div");
  productItem.classList.add("participants__items");
  productItem.innerHTML = `
    <div class="participants__background">
      <img class="participants__background-img" src="${image}" alt="" />
    </div>
    <h6 class="participants__items-title">${title}</h6>
    <p class="participants__items-text">${description}</p>
    <div class="participants__btn">
      <a class="participants__btn-link" href="#">Подробнее</a>
    </div>
  `;
  return productItem;
}

function displayProducts(items) {
  prodItems.innerHTML = "";
  items.forEach((item) => {
    const productItem = createProductElement(item);
    prodItems.appendChild(productItem);
  });
}

displayProducts(data);

function handleSlide(direction) {
  clearInterval(slideTimer);
  const increment = direction === "next" ? 5 : -5;

  slideTimer = setInterval(() => {
    prodItems.scrollLeft += increment;
    if (
      prodItems.scrollLeft % 100 === 0 ||
      prodItems.scrollLeft <= 0 ||
      prodItems.scrollLeft >= prodItems.scrollWidth - prodItems.clientWidth
    ) {
      clearInterval(slideTimer);
    }
  }, 15);
}

prevBtn.addEventListener("click", () => {
  handleSlide("prev");
});

nextBtn.addEventListener("click", () => {
  handleSlide("next");
});

function autoplay() {
  if (
    prodItems.scrollLeft >=
    prodItems.scrollWidth - prodItems.clientWidth - 1
  ) {
    prodItems.scrollLeft = 0;
  } else {
    prodItems.scrollLeft += 3;
  }
}

let play = setInterval(autoplay, 15);

prodItems.addEventListener("mouseover", () => {
  clearInterval(play);
});

prodItems.addEventListener("mouseout", () => {
  play = setInterval(autoplay, 15);
});
