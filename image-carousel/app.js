const sliderImages = document.querySelectorAll(".gallery-image");
const slider = document.querySelector(".gallery-slider");
// buttons
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

const imgSize = sliderImages[0].clientWidth;
let count = 1;

// start from first one, not duplicate

// Event listeners
nextBtn.addEventListener("click", () => {
  if (count >= sliderImages.length) count = 0;
  slider.style.transition = "transform 0.4s ease-in-out";
  slider.style.transform = "translateX(" + -imgSize * count + "px)";
  count++;
});

prevBtn.addEventListener("click", () => {
  //   if (count < 1) return;
  if (count <= 0) count = sliderImages.length;
  slider.style.transition = "transform 0.4s ease-in-out";
  count--;
  slider.style.transform = "translateX(" + -imgSize * count + "px)";
});
