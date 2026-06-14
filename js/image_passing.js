const content = {
  peace_above_terror: {
    title: "Peace Above Terror",
    images: [
      "img/manipulation-ori/croco.jpg",
      "img/manipulation-ori/croco_raw.jpg",
    ],
    raw_final: [
      "img/manipulation-ori/croco.jpg",
      "img/manipulation-ori/croco_raw.jpg",
    ],
    video: "vid/croco.mp4",
    poster: "img/manipulation-ori/croco.jpg",
    text: "I started out trying to make a simple wallpaper, but it gradually turned into a darker, atmospheric piece inspired by underwater creature edits and thalassophobia themes, centered around a crocodile. The idea was to show a man sleeping peacefully on a calm lake, representing serenity, while a giant crocodile moves beneath his boat, hidden in the depths. In the end, I liked the contrast between the calm surface and the tension underneath, especially how the orange boat stands out against the bluish-green lake environment. I titled it “Peace Above Terror” to reflect that duality.",
  },

  unseen: {
    title: "Unseen",
    images: [
      "img/manipulation-ori/fisherman.jpg",
      "img/manipulation-ori/fisherman_raw.jpg",
    ],
    raw_final: [
      "img/manipulation-ori/fisherman.jpg",
      "img/manipulation-ori/fisherman_raw.jpg",
    ],
    video: "vid/fisherman.mp4",
    poster: "img/manipulation-ori/fisherman.jpg",
    text: "...",
  },
};

/* =========================
   PAGE DETECTION
========================= */
const path = window.location.pathname;

const isDetailPage =
  path.includes("detail.html") || path.includes("details.html");

/* =========================
   GALLERY PAGES
========================= */
if (!isDetailPage) {
  document.querySelectorAll(".mani_verti_photo, .mhp_div").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const id = item.dataset.id;

      // choose page based on class OR attribute if needed
      const targetPage = item.classList.contains("mhp_div")
        ? "details.html"
        : "detail.html";

      window.location.href = `${targetPage}?id=${id}`;
    });
  });
}

/* =========================
   DETAIL + DETAILS PAGES
========================= */
if (isDetailPage) {
  const id = new URLSearchParams(window.location.search).get("id");
  const data = content[id];

  if (!data) {
    console.error("No content found:", id);
  } else {
    // TITLE + TEXT
    document.querySelector(".mani_text_header").textContent = data.title;
    document.querySelector(".mani_text_para").textContent = data.text;

    // MAIN IMAGE
    const mainImg = document.querySelectorAll(".main_ph_vid_img")[0];
    mainImg.querySelector("img").src = data.images[0];

    // RAW FINAL
    const pom = document.querySelector(".pom");
    pom.querySelector(".base").src = data.raw_final[0];
    pom.querySelector(".top").src = data.raw_final[1];

    // VIDEO
    const video = document
      .querySelectorAll(".main_ph_vid_img")[1]
      .querySelector("video");

    video.src = data.video;
    video.poster = data.poster;
  }
}

/* =========================
   ZOOM GALLERY
========================= */

const zoom = document.querySelector(".zooming_image");
const zoomContainer = document.querySelector(".zooming_image_div");

const prevBtn = document.querySelector(".zooming_image_prev");
const nextBtn = document.querySelector(".zooming_image_next");

let currentIndex = 0;

const gallery = [
  {
    type: "image",
    src: data.images[0],
  },
  {
    type: "image",
    src: data.raw_final[1],
  },
  {
    type: "video",
    src: data.video,
    poster: data.poster,
  },
];

function renderGalleryItem(index) {
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

    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    zoomContainer.appendChild(video);
  }
}

function openGallery(index) {
  currentIndex = index;

  renderGalleryItem(currentIndex);

  zoom.classList.add("active");
}

/* =========================
   OPENERS
========================= */

// Main image
document
  .querySelectorAll(".main_ph_vid_img")[0]
  .addEventListener("click", () => {
    openGallery(0);
  });

// Before / After
document.querySelector(".pom").addEventListener("click", () => {
  openGallery(1);
});

// Video
document
  .querySelectorAll(".main_ph_vid_img")[1]
  .addEventListener("click", () => {
    openGallery(2);
  });

/* =========================
   PREVIOUS
========================= */

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex =
    (currentIndex - 1 + gallery.length) %
    gallery.length;

  renderGalleryItem(currentIndex);
});

/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex =
    (currentIndex + 1) %
    gallery.length;

  renderGalleryItem(currentIndex);
});

/* =========================
   CLOSE
========================= */

zoom.addEventListener("click", (e) => {
  if (
    e.target === zoom ||
    e.target === zoomContainer
  ) {
    zoom.classList.remove("active");

    zoomContainer.innerHTML = "";
  }
});
