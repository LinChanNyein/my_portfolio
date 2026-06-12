/* =========================
   LOAD NAVBAR
========================= */

fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    initSmallNav();
    initHeaderScroll();
    initHoverEffects();
    initImageTransitions();
    initThemeToggle();

    const dot = document.querySelector(".cursor-dot");

    if (!dot) {
      console.error("cursor-dot not found in navbar.html");
      return;
    }

    document.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });
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
   Animation SCROLL
========================= */

function createObserver(selector) {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
}

// init all 3
createObserver(".reveal");
createObserver(".reveal_left");
createObserver(".reveal_right");
createObserver(".reveal_little_up");

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

/* =========================
   CAT
========================= */

const pom = document.querySelector(".pom");

pom.addEventListener("mousemove", (e) => {
  const rect = pom.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  pom.style.setProperty("--x", `${x}px`);
  pom.style.setProperty("--y", `${y}px`);
});
