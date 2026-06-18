/* =========================
   CONTENT
========================= */
const content = {
  peace_above_terror: {
    title: "Peace Above Terror",
    images: ["img/manipulation-ori/croco.jpg"],
    raw_final: [
      "img/manipulation-ori/croco.jpg",
      "img/manipulation-ori/croco_raw.jpg",
    ],
    video: "vid/croco.mp4",
    poster: "img/manipulation-ori/croco.jpg",
    text: "...",
  },

  unseen: {
    title: "Unseen",
    images: ["img/manipulation-ori/fisherman.jpg"],
    raw_final: [
      "img/manipulation-ori/fisherman.jpg",
      "img/manipulation-ori/fisherman_raw.jpg",
    ],
    video: "vid/fisherman.mp4",
    poster: "img/manipulation-ori/fisherman.jpg",
    text: "...",
  },

  swamp: {
    title: "Swamp",
    images: ["img/manipulation-ori/swamp.jpg"],
    raw_final: [
      "img/manipulation-ori/swamp.jpg",
      "img/manipulation-ori/swamp_raw.jpg",
    ],
    video: "vid/swamp.mp4",
    poster: "img/manipulation-ori/swamp.jpg",
    text: "...",
  },

  tech_ace: {
    title: "Tech Ace",
    images: ["img/manipulation-ori/tech.jpg"],
    raw_final: [
      "img/manipulation-ori/tech.jpg",
      "img/manipulation-ori/tech_raw.jpg",
    ],
    video: "vid/tech.mp4",
    poster: "img/manipulation-ori/tech.jpg",
    text: "...",
  },

  behind_the_curtain: {
    title: "Behind the Curtain",
    images: ["img/manipulation-ori/masterpiece.jpg"],
    raw_final: [
      "img/manipulation-ori/masterpiece.jpg",
      "img/manipulation-ori/masterpiece_raw.jpg",
    ],
    video: "vid/masterpiece.mp4",
    poster: "img/manipulation-ori/masterpiece.jpg",
    text: "...",
  },

  down_bad: {
    title: "Down Bad",
    images: [
      "img/manipulation-ori/downbad.jpg",
      "img/manipulation-ori/downbad_ts.jpg",
    ],
    raw_final: [
      "img/manipulation-ori/downbad.jpg",
      "img/manipulation-ori/downbad_raw.jpg",
    ],
    video: "vid/downbad.mp4",
    poster: "img/manipulation-ori/downbad.jpg",
    text: "...",
  },

  cat: {
    title: "Cat",
    images: ["img/manipulation-ori/cat.jpg"],
    raw_final: [
      "img/manipulation-ori/cat.jpg",
      "img/manipulation-ori/cat_raw.jpg",
    ],
    video: "vid/cat.mp4",
    poster: "img/manipulation-ori/cat.jpg",
    text: "...",
  },

  a_bank: {
    title: "A Bank",
    images: ["img/manipulation-ori/monopoly.jpg"],
    raw_final: [
      "img/manipulation-ori/monopoly.jpg",
      "img/manipulation-ori/monopoly_raw.jpg",
    ],
    video: "vid/monopoly.mp4",
    poster: "img/manipulation-ori/monopoly.jpg",
    text: "...",
  },

  tiger_beer: {
    title: "Tiger Beer",
    images: ["img/manipulation-ori/tiger.jpg"],
    raw_final: [
      "img/manipulation-ori/tiger.jpg",
      "img/manipulation-ori/tiger_raw.jpg",
    ],
    video: "vid/tiger.mp4",
    poster: "img/manipulation-ori/tiger.jpg",
    text: "...",
  },

  dreamio: {
    title: "Dreamio",
    images: ["img/manipulation-ori/dream.jpg"],
    raw_final: [
      "img/manipulation-ori/dream.jpg",
      "img/manipulation-ori/dream_raw.jpg",
    ],
    video: "vid/dream.mp4",
    poster: "img/manipulation-ori/dream.jpg",
    text: "...",
  },

  big_brother: {
    title: "Big Brother",
    images: ["img/manipulation-ori/eyes.jpg"],
    raw_final: [
      "img/manipulation-ori/eyes.jpg",
      "img/manipulation-ori/eyes_raw.jpg",
    ],
    video: "vid/eyes.mp4",
    poster: "img/manipulation-ori/eyes.jpg",
    text: "...",
  },
};

/* =========================
   PAGE CHECK
========================= */
const isDetailPage =
  window.location.pathname.includes("detail.html") ||
  window.location.pathname.includes("details.html");

/* =========================
   GLOBAL STATE
========================= */
let data = null;
let gallery = [];
let currentIndex = 0;

/* =========================
   GALLERY CLICK (PAGE 1)
========================= */
if (!isDetailPage) {
  document.querySelectorAll(".mani_verti_photo, .mhp_div").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const id = item.dataset.id;

      const page = item.classList.contains("mhp_div")
        ? "details.html"
        : "detail.html";

      window.location.href = `${page}?id=${id}`;
    });
  });
}

/* =========================
   LOAD DETAIL PAGE DATA
========================= */
if (isDetailPage) {
  const id = new URLSearchParams(window.location.search).get("id");

  data = content[id];

  if (data) {
    document.querySelector(".mani_text_header").textContent = data.title;
    document.querySelector(".mani_text_para").textContent = data.text;

    const container = document.querySelector(".main_ph_vid_verti");

    // FIRST IMAGE (always exists)
    const firstBox = document.querySelector(".main_ph_vid_img");
    firstBox.querySelector("img").src = data.images[0];

    // SECOND IMAGE (only if exists)
    if (data.images[1]) {
      let secondBox = document.querySelector(".main_ph_vid_img_1");

      // create if not already in HTML
      if (!secondBox) {
        secondBox = document.createElement("div");
        secondBox.className = "main_ph_vid_img_1";

        const img = document.createElement("img");
        secondBox.appendChild(img);

        // insert before pom (so layout stays correct)
        const pom = document.querySelector(".pom");
        container.insertBefore(secondBox, pom);
      }

      secondBox.querySelector("img").src = data.images[1];
    }

    const pom = document.querySelector(".pom");
    pom.querySelector(".base").src = data.raw_final[0];
    pom.querySelector(".top").src = data.raw_final[1];

    const video = document
      .querySelectorAll(".main_ph_vid_img")[1]
      .querySelector("video");

    video.src = data.video;
    video.poster = data.poster;

    gallery = [
      { type: "image", src: data.images[0] },
      { type: "image", src: data.raw_final[1] },
      { type: "video", src: data.video, poster: data.poster },
    ];
  }
}

/* =========================
   ZOOM ELEMENTS
========================= */
const zoom = document.querySelector(".zooming_image");
const zoomContainer = document.querySelector(".zooming_image_div");

const prevBtn = document.querySelector(".zooming_image_prev");
const nextBtn = document.querySelector(".zooming_image_next");

/* =========================
   ZOOM STATE
========================= */
let scale = 1;
let posX = 0;
let posY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

/* =========================
   APPLY TRANSFORM
========================= */
function applyTransform() {
  const media = zoomContainer.querySelector("img, video");

  if (!media) return;

  // container size
  const containerRect = zoomContainer.getBoundingClientRect();

  // scale-based image size estimate
  const scaledWidth = containerRect.width * scale;
  const scaledHeight = containerRect.height * scale;

  // max movement (how far you can drag)
  const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
  const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);

  // clamp position
  posX = Math.max(-maxX, Math.min(maxX, posX));
  posY = Math.max(-maxY, Math.min(maxY, posY));

  media.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;

  zoomContainer.style.cursor = scale > 1 ? "grab" : "default";
}

/* =========================
   RENDER GALLERY ITEM
========================= */
function renderGalleryItem(index) {
  if (!gallery.length) return;

  zoomContainer.innerHTML = "";

  const item = gallery[index];

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    zoomContainer.appendChild(img);
  }

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;
    video.poster = item.poster;

    video.controls = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    zoomContainer.appendChild(video);
  }

  scale = 1;
  posX = 0;
  posY = 0;

  applyTransform();
}

/* =========================
   OPEN ZOOM
========================= */
function openGallery(index) {
  if (!gallery.length) return;

  currentIndex = index;

  renderGalleryItem(currentIndex);

  zoom.classList.add("active");
}

/* =========================
   OPENERS
========================= */
if (isDetailPage) {
  document
    .querySelectorAll(".main_ph_vid_img")[0]
    ?.addEventListener("click", () => openGallery(0));

  // document
  //   .querySelectorAll(".main_ph_vid_img_1")
  //   ?.addEventListener("click", () => openGallery(0));

  document
    .querySelector(".pom")
    ?.addEventListener("click", () => openGallery(1));

  document
    .querySelectorAll(".main_ph_vid_img")[1]
    ?.addEventListener("click", () => openGallery(2));
}

/* =========================
   WHEEL ZOOM
========================= */
zoomContainer.addEventListener("wheel", (e) => {
  e.preventDefault();

  const zoomSpeed = 0.1;

  scale += e.deltaY < 0 ? zoomSpeed : -zoomSpeed;

  scale = Math.min(Math.max(scale, 1), 4);

  applyTransform();
});

/* =========================
   DRAG (ONLY WHEN ZOOMED)
========================= */
zoomContainer.addEventListener("mousedown", (e) => {
  if (scale <= 1) return;

  isDragging = true;

  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging || scale <= 1) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;

  applyTransform();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

/* =========================
   PREV / NEXT
========================= */
prevBtn?.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;

  renderGalleryItem(currentIndex);
});

nextBtn?.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex = (currentIndex + 1) % gallery.length;

  renderGalleryItem(currentIndex);
});

/* =========================
   CLOSE ZOOM
========================= */
zoom?.addEventListener("click", (e) => {
  if (e.target === zoom || e.target === zoomContainer) {
    zoom.classList.remove("active");

    zoomContainer.innerHTML = "";

    scale = 1;
    posX = 0;
    posY = 0;
  }
});

const videoWrapper = document.querySelectorAll(".main_ph_vid_img")[1];
const video = videoWrapper.querySelector("video");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // ENTER VIEW → restart + play
        video.currentTime = 0;
        video.play();
      } else {
        // EXIT VIEW → stop + reset
        video.pause();
        video.currentTime = 0;
      }
    });
  },
  {
    threshold: 0.05, // play when 60% visible (adjust if you want)
  },
);

observer.observe(videoWrapper);
