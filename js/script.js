/* =========================
   LOAD NAVBAR
========================= */

fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // init everything AFTER navbar loads
    initSmallNav();
    initHeaderScroll();
    initHoverEffects();
    initImageTransitions();
    initThemeToggle();
  })
  .catch((err) => {
    console.error("Failed to load navbar:", err);
  });

/* =========================
   SMALL NAV (MENU TOGGLE)
========================= */

function initSmallNav() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".small_nav_div");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("menu-open");
    navMenu.classList.toggle("menu-open");
  });
}

/* =========================
   HEADER SCROLL HIDE/SHOW
========================= */

function initHeaderScroll() {
  const header = document.querySelector(".header");

  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    const scrollingDown = currentScrollY > lastScrollY;
    const pastThreshold = currentScrollY > 80;

    if (scrollingDown && pastThreshold) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  });
}

/* =========================
   THEME TOGGLE (DAY / NIGHT)
========================= */

function initThemeToggle() {
  const toggles = document.querySelectorAll(".day_night");

  if (!toggles.length) return;

  // apply saved theme on every page load
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "night") {
    document.body.classList.add("night");
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("night");

      // save theme
      const isNight = document.body.classList.contains("night");
      localStorage.setItem("theme", isNight ? "night" : "day");
    });
  });
}

/* =========================
   DESIGN HOVER IMAGE SWITCH
========================= */

function initHoverEffects() {
  const links = document.querySelectorAll(".design_landing_text a");
  const images = document.querySelectorAll(".design_landing_img");

  if (!links.length || !images.length) return;

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const target = link.dataset.target;

      images.forEach((img) => img.classList.remove("active"));

      const targetImg = document.querySelector("." + target);

      if (targetImg) {
        targetImg.classList.add("active");
      }
    });
  });
}

/* =========================
   IMAGE DIM / FOCUS EFFECT
========================= */

function initImageTransitions() {
  const items = document.querySelectorAll(".map_h");

  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      items.forEach((el) => el.classList.add("dim"));
      item.classList.remove("dim");
    });

    item.addEventListener("mouseleave", () => {
      items.forEach((el) => el.classList.remove("dim"));
    });
  });
}
