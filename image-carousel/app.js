const sliderImages = document.querySelectorAll(".gallery-image");
const slider = document.querySelector(".gallery-slider");
// buttons
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

const imgSize = sliderImages[0].clientWidth;
let count = 0;

// Event listeners
nextBtn.addEventListener("click", () => {
  //   if (count > sliderImages.length - 2) return;

  if (count >= 5) {
    count = -1;
    slider.style.transition = "none";
  }
  slider.style.transition = "transform 0.4s ease-in-out";
  count++;
  slider.style.transform = "translateX(" + -imgSize * count + "px)";
  console.log(slider.style.transform);
});

prevBtn.addEventListener("click", () => {
  if (count < 1) return;
  console.log(count);
  slider.style.transition = "transform 0.4s ease-in-out";
  count--;
  slider.style.transform = "translateX(" + -imgSize * count + "px)";
});
