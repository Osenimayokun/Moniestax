const navMenu = document.querySelector(".nav-menu");
const navItem = document.querySelectorAll(".nav-item");
const displayContents = document.querySelectorAll(".main-content");

navMenu.addEventListener("click", (e) => {
  const clicked = e.target.closest(".nav-item");
  if (!clicked) return;

  navItem.forEach((link) => {
    if (link !== clicked) {
      link.classList.remove("active");
      clicked.classList.add("active");
    }
  });
  displayContents.forEach((content) => content.classList.add("hidden"));
  document
    .querySelector(`.main-content-${clicked.dataset.src}`)
    .classList.remove("hidden");
});
