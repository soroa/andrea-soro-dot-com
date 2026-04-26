(function() {
  "use strict";

  // ============================================
  // 1. LANGUAGE MANAGEMENT
  // ============================================

  function getLanguage() {
    return localStorage.getItem("portfolio-lang") || "de";
  }

  function setLanguage(lang) {
    localStorage.setItem("portfolio-lang", lang);
    applyLanguage(lang);
  }

  function applyLanguage(lang) {
    // Update all bilingual text elements
    const elements = document.querySelectorAll("[data-de][data-en]");
    elements.forEach(el => {
      el.textContent = el.getAttribute("data-" + lang);
    });

    // Update language toggle active state
    const toggles = document.querySelectorAll(".lang-toggle span");
    toggles.forEach(span => {
      if (span.textContent.toLowerCase() === lang) {
        span.classList.add("active");
      } else {
        span.classList.remove("active");
      }
    });

    // Update document language attribute
    document.documentElement.lang = lang;
  }

  // ============================================
  // 2. NAVIGATION INJECTION
  // ============================================

  function buildNav() {
    const navContainer = document.getElementById("nav");
    if (!navContainer) return;

    // Detect if we're in /cases/ subdirectory
    const isInCases = window.location.pathname.includes("/cases/");
    const prefix = isInCases ? "../" : "";

    // Determine active page
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf("/") + 1);

    let activePage = "";
    if (filename === "index.html" || filename === "") {
      activePage = "work";
    } else if (filename === "about.html") {
      activePage = "about";
    } else if (isInCases) {
      activePage = "work";
    }

    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.innerHTML = `
      <div class="container">
        <a href="${prefix}index.html" class="nav-logo">Leon Marenbach</a>
        <div class="nav-links">
          <a href="${prefix}index.html" class="${activePage === 'work' ? 'active' : ''}" data-de="Arbeiten" data-en="Work">Arbeiten</a>
          <a href="${prefix}about.html" class="${activePage === 'about' ? 'active' : ''}" data-de="Über mich & Kontakt" data-en="About & Contact">Über mich & Kontakt</a>
          <div class="lang-toggle">
            <span>DE</span> | <span>EN</span>
          </div>
        </div>
        <button class="nav-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;

    navContainer.appendChild(nav);

    // Setup mobile menu toggle
    const menuBtn = nav.querySelector(".nav-menu-btn");
    const navLinks = nav.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Setup language toggle
    const langSpans = nav.querySelectorAll(".lang-toggle span");
    langSpans.forEach(span => {
      span.addEventListener("click", () => {
        const lang = span.textContent.toLowerCase();
        setLanguage(lang);
      });
    });
  }

  // ============================================
  // 3. FOOTER INJECTION
  // ============================================

  function buildFooter() {
    const footerContainer = document.getElementById("footer");
    if (!footerContainer) return;

    const year = new Date().getFullYear();

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container">
        <p>&copy; ${year} Leon Marenbach. <span data-de="Alle Rechte vorbehalten." data-en="All rights reserved.">Alle Rechte vorbehalten.</span></p>
      </div>
    `;

    footerContainer.appendChild(footer);
  }

  // ============================================
  // 4. INITIALIZATION
  // ============================================

  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    buildFooter();
    applyLanguage(getLanguage());
  });

})();
