class Slider {
  constructor(data) {
    this.active = 0;
    this.data = data;
    document
      .querySelectorAll(".participants__arrows-btn[data-type]")
      .forEach((btn) => {
        btn.onclick = () => this.handleClick(btn.dataset.type);
      });
    this.renderItem();
  }

  renderItem() {
    const { image, title, description } = this.data[this.active];

    const sliderContent = `
      <img class="participants__background-img" src="${image}" alt="" />
      <h6 class="participants__items-title">${title}</h6>
      <p class="participants__items-text">${description}</p>
    `;
    const sliderIndex = `
      <span>${this.active < 9 ? "0" + (this.active + 1) : this.active + 1}</span>
      <span>${this.data.length < 10 ? "" + this.data.length : this.data.length}</span>
    `;

    document.querySelector(".participants__items").innerHTML = sliderContent;
    document.querySelector(".participants__numbers").innerHTML = sliderIndex;
  }

  basicAnimation(dir, delay) {
    const sliderImg = document.querySelector(".participants__background-img");
    const sliderContext = sliderImg.children;

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

    const sliderImg = document.querySelector(".participants__items");

    sliderImg.style.transition = "transform 1s ease, opacity 1s ease";
    sliderImg.style.transform = `translateX(${-250 * dir}px)`;
    sliderImg.style.opacity = 0;

    const sliderContext = sliderImg.children;
    sliderContext.forEach((el) => {
      el.style.transition = "transform 0.7s ease, opacity 0.7s ease";
      el.style.transform = `translateX(${-100 * dir}px)`;
      el.style.opacity = 0;
    });

    setTimeout(() => {
      if (type === "next") {
        this.active = this.active === this.data.length - 3 ? 0 : this.active + 3;
      } else {
        this.active = this.active <= 0 ? this.data.length - 3 : this.active - 3;
      }

      this.renderItem();
      this.basicAnimation(dir, 0.5);
    }, 1000);
  }
}



const slider = new Slider(data);