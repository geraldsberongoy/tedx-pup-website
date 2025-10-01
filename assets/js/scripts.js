/**
 * ==========================================
 * TEDxPUP EVENT WEBSITE - MAIN SCRIPT
 * ==========================================
 * Modern, class-based JavaScript architecture
 * Mobile-first, accessible, and performant
 */

/**
 * Navigation Manager Class
 * Handles hamburger menu, smooth scrolling, and sticky navigation
 */
class NavigationManager {
  constructor() {
    this.hamburger = document.getElementById("hamburger");
    this.navLinks = document.getElementById("nav-links");
    this.navContainer = document.querySelector(".nav-container");
    this.lastScrollY = window.pageYOffset;
    this.scrollTicking = false;

    this.init();
  }

  init() {
    this.setupHamburgerMenu();
    this.setupSmoothScrolling();
    this.setupStickyNavigation();
  }

  setupHamburgerMenu() {
    if (!this.hamburger || !this.navLinks) return;

    // Toggle menu on hamburger click
    this.hamburger.addEventListener("click", () => this.toggleMenu());

    // Close menu when clicking on nav links
    const navLinksItems = this.navLinks.querySelectorAll("a");
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) =>
      this.handleOutsideClick(event)
    );

    // Close menu on escape key
    document.addEventListener("keydown", (event) => this.handleKeydown(event));

    // Handle window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupStickyNavigation() {
    if (!this.navContainer) return;

    window.addEventListener("scroll", () => this.requestScrollTick());
    this.handleNavScroll(); // Initial check
  }

  toggleMenu() {
    this.hamburger.classList.toggle("active");
    this.navLinks.classList.toggle("active");

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.navLinks.classList.contains("active")
      ? "hidden"
      : "";
  }

  closeMenu() {
    this.hamburger.classList.remove("active");
    this.navLinks.classList.remove("active");
    document.body.style.overflow = "";
  }

  handleOutsideClick(event) {
    const isClickInsideNav =
      this.navLinks.contains(event.target) ||
      this.hamburger.contains(event.target);

    if (!isClickInsideNav && this.navLinks.classList.contains("active")) {
      this.closeMenu();
    }
  }

  handleKeydown(event) {
    if (event.key === "Escape" && this.navLinks.classList.contains("active")) {
      this.closeMenu();
    }
  }

  handleResize() {
    if (window.innerWidth >= 768) {
      this.closeMenu();
    }
  }

  requestScrollTick() {
    if (!this.scrollTicking) {
      requestAnimationFrame(() => this.handleNavScroll());
      this.scrollTicking = true;
    }
  }

  handleNavScroll() {
    const currentScrollY = window.pageYOffset;

    // Add scrolled class when scrolled past 50px
    if (currentScrollY > 50) {
      this.navContainer.classList.add("scrolled");
    } else {
      this.navContainer.classList.remove("scrolled");
    }

    this.lastScrollY = currentScrollY;
    this.scrollTicking = false;
  }
}

/**
 * UI Effects Manager Class
 * Handles button interactions, ripple effects, and parallax animations
 */
class UIEffectsManager {
  constructor() {
    this.parallaxTicking = false;
    this.init();
  }

  init() {
    this.setupRippleEffects();
    this.setupParallaxEffects();
  }

  setupRippleEffects() {
    const heroButtons = document.querySelectorAll(".hero-actions .btn");
    heroButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.createRipple(e));
    });
  }

  setupParallaxEffects() {
    window.addEventListener("scroll", () => this.requestParallaxTick());
  }

  createRipple(event) {
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

  requestParallaxTick() {
    if (!this.parallaxTicking) {
      requestAnimationFrame(() => this.updateButtonParallax());
      this.parallaxTicking = true;
    }
  }

  updateButtonParallax() {
    const scrolled = window.pageYOffset;
    const heroActions = document.querySelector(".hero-actions");

    if (heroActions) {
      const rate = scrolled * -0.1;
      heroActions.style.transform = `translateY(${rate}px)`;
    }

    this.parallaxTicking = false;
  }
}

/**
 * Speaker Modal Manager Class
 * Handles speaker bio modal functionality with accessibility features
 */
class SpeakerModalManager {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalBio = document.getElementById("modalBio");
    this.closeButton = document.getElementById("closeModal");

    this.init();
  }

  init() {
    if (!this.modal) return;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add event listeners to all bio buttons
    document.querySelectorAll(".speaker-card .btn").forEach((button) => {
      button.addEventListener("click", (e) => this.openModal(e.target));
    });

    // Close modal event listeners
    this.closeButton?.addEventListener("click", () => this.closeModal());

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
    this.closeButton?.focus();
  }

  closeModal() {
    this.modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll
  }
}

/**
 * Schedule Manager Class
 * Handles switching between different days in the event schedule
 */
class ScheduleManager {
  constructor() {
    this.tabs = document.querySelectorAll(".tab");
    this.scheduleTable = document.getElementById("scheduleTable");
    this.scheduleData = this.getScheduleData();

    this.init();
  }

  init() {
    if (!this.scheduleTable) return;

    this.setupEventListeners();
    this.switchDay("1"); // Load initial day
  }

  setupEventListeners() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.switchDay(tab.dataset.day);
        this.setActiveTab(tab);
      });
    });
  }

  getScheduleData() {
    return {
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

    const strongTitle = document.createElement("strong");
    strongTitle.textContent = title;
    sessionElement.appendChild(strongTitle);

    if (description) {
      const separator = document.createTextNode(" • ");
      sessionElement.appendChild(separator);
      const descNode = document.createTextNode(description);
      sessionElement.appendChild(descNode);
    }

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

/**
 * Registration Manager Class
 * Handles form submission, validation, and user feedback
 */
class RegistrationManager {
  constructor() {
    this.form = document.getElementById("ticketsForm");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const submitButton = this.form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector(".btn-text");
    const btnLoading = submitButton.querySelector(".btn-loading");

    // Show loading state
    this.setLoadingState(submitButton, btnText, btnLoading, true);

    // Collect form data
    const formData = new FormData(this.form);
    const registrationData = this.buildRegistrationData(formData);

    try {
      await this.simulateRegistration(registrationData);
      this.showSuccessMessage(registrationData);
      this.form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
      this.showErrorMessage("Registration failed. Please try again.");
    } finally {
      this.setLoadingState(submitButton, btnText, btnLoading, false);
    }
  }

  setLoadingState(submitButton, btnText, btnLoading, isLoading) {
    submitButton.classList.toggle("loading", isLoading);
    submitButton.disabled = isLoading;

    if (btnLoading && btnText) {
      btnLoading.style.display = isLoading ? "block" : "none";
      btnText.style.display = isLoading ? "none" : "block";
    }
  }

  buildRegistrationData(formData) {
    const registrationData = Object.fromEntries(formData.entries());

    // Add registration metadata
    registrationData.eventName = "TEDxPUP 2025";
    registrationData.eventDate = "October 18, 2025";
    registrationData.registrationFee = "FREE";
    registrationData.registrationTime = new Date().toISOString();

    return registrationData;
  }

  async simulateRegistration(data) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Free registration data:", data);
        resolve(data);
      }, 2000);
    });
  }

  showSuccessMessage(data) {
    const affiliationLabel = this.getAffiliationLabel(data.affiliation);

    const message = `Registration Successful! 🎉

Welcome to TEDxPUP 2025, ${data.firstName} ${data.lastName}!

Registration Details:
• Affiliation: ${affiliationLabel}
• College: ${data.college || "Not specified"}
• Organization: ${data.organization || "Individual registration"}
• Event: October 18, 2025 - FREE

A confirmation email with your digital ticket and event details has been sent to ${
      data.email
    }.

See you at Brigade Hall, PUP Manila! 🚀`;

    alert(message);
  }

  getAffiliationLabel(affiliation) {
    const labels = {
      "pup-student": "PUP Student",
      "pup-faculty": "PUP Faculty",
      "pup-staff": "PUP Staff",
      "pup-alumni": "PUP Alumni",
      organization: "Student Organization",
      guest: "Guest/Visitor",
    };
    return labels[affiliation] || affiliation;
  }

  showErrorMessage(message) {
    alert(`Error: ${message}`);
  }
}

/**
 * Countdown Manager Class
 * Handles event countdown timer functionality with animations
 */
class CountdownManager {
  constructor() {
    this.countdownContainer = document.querySelector(".hero-countdown");
    this.targetDate = new Date("2025-10-18T08:00:00+08:00"); // October 18, 2025, 8:00 AM PHT
    this.interval = null;
    this.isRunning = false;
    
    this.init();
  }

  init() {
    if (!this.countdownContainer) {
      console.warn("Countdown container not found. Looking for element with class 'hero-countdown'");
      return;
    }

    this.cacheElements();
    this.startCountdown();
  }

  cacheElements() {
    // Cache DOM elements based on existing HTML structure
    this.elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("mins"), // Note: HTML uses "mins"
      seconds: document.getElementById("secs")  // Note: HTML uses "secs"
    };

    // Verify all elements exist
    const missingElements = Object.entries(this.elements).filter(([key, element]) => !element);
    if (missingElements.length > 0) {
      console.warn("Missing countdown elements:", missingElements.map(([key]) => key));
    }
  }

  startCountdown() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.updateCountdown(); // Initial update
    
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  stopCountdown() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.isRunning = false;
    }
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.handleCountdownEnd();
      return;
    }

    const timeLeft = this.calculateTimeLeft(distance);
    this.updateDisplay(timeLeft);
  }

  calculateTimeLeft(distance) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }

  updateDisplay(timeLeft) {
    // Update each element with animation
    this.updateElement(this.elements.days, timeLeft.days);
    this.updateElement(this.elements.hours, timeLeft.hours);
    this.updateElement(this.elements.minutes, timeLeft.minutes);
    this.updateElement(this.elements.seconds, timeLeft.seconds);
  }

  updateElement(element, value) {
    if (!element) return;

    const formattedValue = value.toString().padStart(2, '0');
    
    if (element.textContent !== formattedValue) {
      // Add pulse animation for change
      element.style.transform = 'scale(1.1)';
      element.style.transition = 'transform 0.2s ease';
      
      setTimeout(() => {
        element.textContent = formattedValue;
        element.style.transform = 'scale(1)';
      }, 100);
    }
  }

  handleCountdownEnd() {
    this.stopCountdown();
    
    // Display event started message in the existing countdown grid
    const countdownGrid = this.countdownContainer.querySelector('.countdown-grid');
    if (countdownGrid) {
      countdownGrid.innerHTML = `
        <div class="countdown-ended" style="grid-column: 1 / -1; text-align: center; padding: 20px;">
          <h3 style="color: var(--accent); margin: 0 0 8px 0;">🎉 TEDxPUP 2025 is Live!</h3>
          <p style="margin: 0; color: var(--muted); font-size: 14px;">The event has started. Join us for an inspiring experience!</p>
        </div>
      `;
    }

    // Add some celebration animation
    this.countdownContainer.style.animation = 'pulse 2s infinite';
  }

  // Public methods for external control
  setTargetDate(dateString) {
    this.targetDate = new Date(dateString);
    if (this.isRunning) {
      this.stopCountdown();
      this.startCountdown();
    }
  }

  getTimeLeft() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;
    
    if (distance < 0) return null;
    
    return this.calculateTimeLeft(distance);
  }

  restart() {
    this.stopCountdown();
    this.startCountdown();
  }
}

/**
 * Main Application Class
 * Coordinates all managers and handles initialization
 */
class TEDxPUPApp {
  constructor() {
    this.managers = {};
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeManagers();
      this.setupGlobalEventListeners();
    });
  }

  initializeManagers() {
    // Initialize all manager classes
    this.managers.navigation = new NavigationManager();
    this.managers.uiEffects = new UIEffectsManager();
    this.managers.speakerModal = new SpeakerModalManager();
    this.managers.schedule = new ScheduleManager();
    this.managers.registration = new RegistrationManager();
    this.managers.countdown = new CountdownManager();

    // Make managers globally accessible for debugging
    window.tedxApp = this;
  }

  setupGlobalEventListeners() {
    // Global error handling
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.error);
    });

    // Performance monitoring
    window.addEventListener("load", () => {
      console.log("TEDxPUP App loaded successfully");
    });
  }

  // Public API for external access
  getManager(name) {
    return this.managers[name];
  }

  // Utility method for debugging
  debug() {
    console.log("TEDxPUP App Managers:", this.managers);
  }
}

/**
 * Initialize the application
 */
const app = new TEDxPUPApp();
