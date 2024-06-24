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
    <div class="participants__background">
      <img class="participants__background-img" src="${image}" alt="" />
      </div>
      <h6 class="participants__items-title">${title}</h6>
      <p class="participants__items-text">${description}</p>
        <div class="participants__btn">
         <a class="participants__btn-link" href="#">Подробнее</a>
        </div>
    `;
    const sliderIndex = `
      <span class="participants__numbers">${this.active < 9 ? "0" + (this.active + 3) : this.active + 3}</span>
      <span>/</span>
      <span  class="participants__numbers">${this.data.length < 10 ? "" + this.data.length : this.data.length}</span>
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
    const dir = type === "prev" ? 3 : -3;

    const sliderImg = document.querySelector(".participants__box");

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
        this.active = this.active <= 3 ? this.data.length - 3 : this.active - 3;
      }

      this.renderItem();
      this.basicAnimation(dir, 0.5);
    }, 1000);
  }
}



const slider = new Slider(data);

