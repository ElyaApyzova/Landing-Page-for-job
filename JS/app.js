class Slider {
  constructor(items) {
    this.active = 0;
    this.items = items;
    document
      .querySelectorAll(".slider__btn-switch[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleClick(btn.dataset.type);
      });
    this.renderItem();
  }

  renderItem() {
    const { img, category, title, price, bgColor } = this.items[this.active];

    const sliderContent = `
      <img class="slider__img" src="${img}" alt="${title}" />
      <div class="slider__context flex-column">
        <h3 class="slider__category">${category}</h3>
        <strong class="slider__title">${title}</strong>
        <small class="slider__price">${price}</small>
      </div>
    `;
    const sliderIndex = `
      <span>${this.active < 9 ? "0" + (this.active + 1) : this.active + 1}</span>
      <span>${this.items.length < 10 ? "0" + this.items.length : this.items.length}</span>
    `;

    document.querySelector(".slider__content").innerHTML = sliderContent;
    document.querySelector(".slider__index").innerHTML = sliderIndex;
    document.querySelector(".slider").style.backgroundColor = bgColor;
  }

  basicAnimation(dir, delay) {
    const sliderImg = document.querySelector(".slider__img");
    const sliderContext = document.querySelectorAll(".slider__context *");

    sliderImg.style.transition = "transform 1s ease, opacity 1s ease";
    sliderImg.style.transform = `translateX(${150 * dir}px)`;
    sliderImg.style.opacity = 0;

    sliderContext.forEach((el) => {
      el.style.transition = "transform 0.7s ease, opacity 0.7s ease";
      el.style.transform = `translateX(${50 * dir}px)`;
      el.style.opacity = 0;
    });

    setTimeout(() => {
      sliderImg.style.transform = "translateX(0)";
      sliderImg.style.opacity = 1;

      sliderContext.forEach((el) => {
        el.style.transform = "translateX(0)";
        el.style.opacity = 1;
      });
    }, delay * 1000);
  }

  handleClick(type) {
    const dir = type === "next" ? 1 : -1;

    const sliderImg = document.querySelector(".slider__img");
    const sliderContext = document.querySelectorAll(".slider__context *");

    sliderImg.style.transition = "transform 1s ease, opacity 1s ease";
    sliderImg.style.transform = `translateX(${-250 * dir}px)`;
    sliderImg.style.opacity = 0;

    sliderContext.forEach((el) => {
      el.style.transition = "transform 0.7s ease, opacity 0.7s ease";
      el.style.transform = `translateX(${-100 * dir}px)`;
      el.style.opacity = 0;
    });

    setTimeout(() => {
      if (type === "next") {
        this.active = this.active === this.items.length - 1 ? 0 : this.active + 1;
      } else {
        this.active = this.active <= 0 ? this.items.length - 1 : this.active - 1;
      }

      this.renderItem();
      this.basicAnimation(dir, 0);
    }, 1000);
  }
}

const items = [
  {
    img: "image1.jpg",
    category: "Category 1",
    title: "Title 1",
    price: "$10",
    bgColor: "#ff0000",
  },
  {
    img: "image2.jpg",
    category: "Category 2",
    title: "Title 2",
    price: "$20",
    bgColor: "#00ff00",
  },
  {
    img: "image3.jpg",
    category: "Category 3",
    title: "Title 3",
    price: "$30",
    bgColor: "#0000ff",
  },
];

const slider = new Slider(items);