const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const navMenu = document.querySelector(".nav-links");
const nav = document.querySelector(".nav");
const carousel = document.querySelector(".carousel--1");

// SCROLL MENU START
navMenu.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
// SCROLL MENU END

// CHANGE MENU STAERT
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  // 1 found the tabs buttons
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  // 3 return buttons
  if (!clicked) return;
  // 4 remove buttons
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // 6 remove  container
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // 2 add
  clicked.classList.add("operations__tab--active");

  // 5 found containers
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
// CHANGE MENU END

// SCROLL SHOW YOU MENU START
const initialCoords = carousel.getBoundingClientRect();
// console.log(initialCoords);
window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
// SCROLL SHOW YOU MENU END
