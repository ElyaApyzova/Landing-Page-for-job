

// Constants variables - DOM elements
const prodItems = document.querySelector('.prod-items');
const prevBtn = document.querySelector('.left-btn');
const nextBtn = document.querySelector('.right-btn');
// Declare slideTimer variable globally for better control
let slideTimer;

function createProductElement(prodDetails) {
  const { imageUrl, itemName, euSize, price } = prodDetails;
  const productItem = document.createElement('div');
  productItem.classList.add('prod-item');
  productItem.innerHTML = `
        <div class="img-cont">
          <img src="${imageUrl}" />
        </div>
        <h3 class="item-name">${itemName}</h3>
        <p class="size"><b>EU Size:</b> ${euSize}</p>
        <p class="price"><b>Price:</b> ${price}</p>
        <a class="addCart" href="#">Add to Cart</a>
        `;
  return productItem;
}

function displayProducts(items = data) {
  prodItems.innerHTML = '';
  items.forEach(item => {
    const productItem = createProductElement(item);
    prodItems.appendChild(productItem);
  });
}

displayProducts();

// Function to handle slide animation
function handleSlide(direction) {
  // Clear any existing slide timer
  clearInterval(window.slideTimer);

  // Set the direction of slide based on input
  const increment = direction === 'next' ? 5 : -5;

  // Start slide animation
  window.slideTimer = setInterval(() => {
    // Update scrollLeft based on direction
    prodItems.scrollLeft += increment;
    if (prodItems.scrollLeft % 100 === 0) {
      // Use window.slideTimer to clear the interval
      clearInterval(window.slideTimer);
    }
  }, 15);
}

// Previous button scroll event (Scrolling to Left)
prevBtn.addEventListener('click', () => {
  handleSlide('prev'); // Call handleSlide with 'prev' direction
});

// Next button scroll event (Scrolling to Right)
nextBtn.addEventListener('click', () => {
  handleSlide('next'); // Call handleSlide with 'next' direction
});

// Autoplay function
function autoplay() {
  if (
    prodItems.scrollLeft >=
    prodItems.scrollWidth - prodItems.clientWidth - 1
  ) {
    prodItems.scrollLeft = 0;
  } else {
    prodItems.scrollLeft += 1;
  }
}

let play = setInterval(autoplay, 15);

// Pause slide when hover
prodItems.addEventListener('mouseover', () => {
  clearInterval(play);
});



// Resume slide after pause
prodItems.addEventListener('mouseout', () => {
  play = setInterval(autoplay, 15);
});