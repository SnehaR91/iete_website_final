// ===============================
// Preloader
// ===============================
const video = document.getElementById("preloaderVideo");
const preloader = document.getElementById("preloader");
const mainContent = document.getElementById("mainContent");

if (video) {
  video.addEventListener("ended", () => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
    }, 1000); // matches CSS transition
  });
}

// ===============================
// Section Switching
// ===============================
let currentSection = "landing"; // default

function showSection(sectionId, event) {
  // Hide all sections
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
    currentSection = sectionId; // ✅ remember choice
  }

  // Update active nav link
  document.querySelectorAll(".common-nav-link").forEach(link => {
    link.classList.remove("active-link");
  });
  if (event && event.target) {
    event.target.classList.add("active-link");
  }

  // Close mobile dropdown
 document.querySelectorAll(".common-nav-list").forEach(navList => {
  if (navList.classList.contains("active")) {
    navList.classList.remove("active");
  }
});

  // If Events section is shown → init carousel
  if (sectionId === "events") {
    initCarousel();
  }
}

// ===============================
// Carousel
// ===============================
function initCarousel() {
  const eventsCarousel = document.querySelector("#events .carousel-container");
  if (!eventsCarousel) return;

  const panels = eventsCarousel.querySelectorAll(".carousel-panel");
  const btnLeft = eventsCarousel.querySelector(".nav-left");
  const btnRight = eventsCarousel.querySelector(".nav-right");

  let current = 0;

  function updatePanels() {
    panels.forEach((panel, i) => {
      panel.classList.remove("active", "next", "prev");
      if (i === current) {
        panel.classList.add("active");
      } else if (i === (current + 1) % panels.length) {
        panel.classList.add("next");
      } else if (i === (current - 1 + panels.length) % panels.length) {
        panel.classList.add("prev");
      }
    });
  }

  // Attach listeners once
  if (btnLeft && !btnLeft.dataset.bound) {
    btnLeft.dataset.bound = "true";
    btnLeft.addEventListener("click", () => {
      current = (current - 1 + panels.length) % panels.length;
      updatePanels();
    });
  }

  if (btnRight && !btnRight.dataset.bound) {
    btnRight.dataset.bound = "true";
    btnRight.addEventListener("click", () => {
      current = (current + 1) % panels.length;
      updatePanels();
    });
  }

  // Initialize positions
  updatePanels();
}

// ===============================
// Init on DOM load
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Show first section by default (change "home" if needed)
  showSection(currentSection);
});



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".common-nav-toggle").forEach((toggleBtn, i) => {
    const navList = toggleBtn.closest("nav").querySelector(".common-nav-list");

    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  });
});

