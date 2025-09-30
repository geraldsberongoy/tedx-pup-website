// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Toggle menu on hamburger click
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking on a nav link
  const navLinksItems = navLinks.querySelectorAll("a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      navLinks.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInsideNav && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Enhanced Button Interactions
document.addEventListener("DOMContentLoaded", function () {
  // Button Ripple Effect
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    // Remove existing ripples
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add ripple effect to hero buttons
  const heroButtons = document.querySelectorAll(".hero-actions .btn");
  heroButtons.forEach((button) => {
    button.addEventListener("click", createRipple);
  });

  heroButtons.forEach((button) => {
    button.addEventListener("mouseenter", playHoverSound);
  });

  // Parallax effect for hero buttons on scroll
  let ticking = false;

  function updateButtonParallax() {
    const scrolled = window.pageYOffset;
    const heroActions = document.querySelector(".hero-actions");

    if (heroActions) {
      const rate = scrolled * -0.1;
      heroActions.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
  }

  function requestParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateButtonParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestParallaxTick);
});

// Modern Sticky Navigation with Black Opacity
document.addEventListener("DOMContentLoaded", function () {
  const navContainer = document.querySelector(".nav-container");
  let lastScrollY = window.pageYOffset;

  function handleModernNavScroll() {
    const currentScrollY = window.pageYOffset;

    // Add scrolled class when scrolled past 50px
    if (currentScrollY > 50) {
      navContainer.classList.add("scrolled");
    } else {
      navContainer.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  } // Optimize scroll performance with requestAnimationFrame
  let ticking = false;

  function requestScrollTick() {
    if (!ticking) {
      requestAnimationFrame(handleModernNavScroll);
      ticking = true;
    }
  }

  function resetTicking() {
    ticking = false;
  }

  // Add scroll listener
  window.addEventListener("scroll", function () {
    requestScrollTick();
    setTimeout(resetTicking, 16); // Reset after one frame (60fps)
  });

  // Initial check in case page loads scrolled
  handleModernNavScroll();
});

// Speaker Modal Functionality
class SpeakerModal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalBio = document.getElementById("modalBio");
    this.closeButton = document.getElementById("closeModal");

    this.init();
  }

  init() {
    // Add event listeners to all bio buttons
    document.querySelectorAll(".speaker-card .btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.openModal(e.target);
      });
    });

    // Close modal event listeners
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });

    // Close modal when clicking outside
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("show")) {
        this.closeModal();
      }
    });
  }

  openModal(button) {
    const speakerCard = button.closest(".speaker-card");
    const name = speakerCard.dataset.name;
    const bio = speakerCard.dataset.bio;

    this.modalTitle.textContent = name;
    this.modalBio.textContent = bio;

    // Show modal with animation
    this.modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Focus management for accessibility
    this.closeButton.focus();
  }

  closeModal() {
    this.modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll
  }
}

// Initialize speaker modal functionality
document.addEventListener("DOMContentLoaded", () => {
  window.speakerModal = new SpeakerModal();
});

/**
 * Schedule Tab Functionality
 * Handles switching between different days in the event schedule
 */

class ScheduleManager {
  constructor() {
    this.tabs = document.querySelectorAll(".tab");
    this.scheduleTable = document.getElementById("scheduleTable");

    // Schedule data for different days
    this.scheduleData = {
      1: [
        ["08:00", "Registration", "Doors open & welcome"],
        ["09:00", "Opening Remarks", "Welcome from TEDxPUP organizers"],
        [
          "09:30",
          "Keynote",
          "Dr. Maria Santos - The Future of Community-led Innovation",
        ],
        ["10:15", "Coffee Break", "Networking and refreshments"],
        ["10:45", "Talk Session A", "Jonas dela Cruz - Teaching with Purpose"],
        [
          "11:15",
          "Talk Session B",
          "Aisha Romero - Open Data for Local Impact",
        ],
        ["11:45", "Talk Session C", "Miguel Tan - Storytelling Through Tech"],
        ["12:30", "Lunch Break", "Networking lunch and sponsor showcase"],
        ["13:30", "Talk Session D", "Liza Gomez - Designing for Resilience"],
        ["14:00", "Talk Session E", "Rafael Ortiz - Micro-Enterprise for Good"],
        [
          "14:30",
          "Panel Discussion",
          "Reimagining Tomorrow: A Community Perspective",
        ],
        ["15:30", "Closing Remarks", "Thank you and call to action"],
        ["16:00", "Networking", "Final networking and photo opportunities"],
      ],
      2: [
        ["08:30", "Registration", "Day 2 check-in"],
        ["09:00", "Morning Workshops", "Parallel sessions - Choose your track"],
        ["10:30", "Coffee Break", "Networking and workshop discussions"],
        [
          "11:00",
          "Panel Discussion",
          "Communities & Technology: Building Bridges",
        ],
        ["12:00", "Lunch Break", "Community lunch and informal discussions"],
        ["13:30", "Student Showcase", "PUP student innovation presentations"],
        ["14:30", "Interactive Workshop", "Design thinking for social impact"],
        ["15:30", "Wrap-up Session", "Action planning and next steps"],
        ["16:00", "Closing Ceremony", "Certificates and group photo"],
      ],
    };

    this.init();
  }

  init() {
    // Add click listeners to tabs
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.switchDay(tab.dataset.day);
        this.setActiveTab(tab);
      });
    });

    // Load initial day (Day 1)
    this.switchDay("1");
  }

  switchDay(day) {
    const schedule = this.scheduleData[day];
    if (!schedule) return;

    // Clear existing content
    this.scheduleTable.innerHTML = "";

    // Add schedule items with animation
    schedule.forEach((item, index) => {
      const row = this.createScheduleRow(item[0], item[1], item[2] || "");
      row.style.opacity = "0";
      row.style.transform = "translateY(20px)";
      row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      row.style.transitionDelay = `${index * 50}ms`;
      this.scheduleTable.appendChild(row);
    });

    // Trigger animation for all rows in the next frame
    requestAnimationFrame(() => {
      Array.from(this.scheduleTable.children).forEach((row) => {
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      });
    });
  }

  createScheduleRow(time, title, description) {
    const row = document.createElement("div");
    row.className = "row";

    const timeElement = document.createElement("div");
    timeElement.className = "time";
    timeElement.textContent = time;

    const sessionElement = document.createElement("div");
    sessionElement.className = "session";
    sessionElement.innerHTML = `<strong>${title}</strong>${
      description ? " • " + description : ""
    }`;

    row.appendChild(timeElement);
    row.appendChild(sessionElement);

    return row;
  }

  setActiveTab(activeTab) {
    this.tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    activeTab.classList.add("active");
  }
}

// Initialize schedule manager
document.addEventListener("DOMContentLoaded", () => {
  window.scheduleManager = new ScheduleManager();
});
