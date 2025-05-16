const html = document.documentElement;
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const themeIcon = document.getElementById("theme-icon");

function toggleMobileMenu() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

// AIzaSyBVwcNGmuDqtSlekoY9Zfq_jIyjVO5fcgY

// Toggle theme
function toggleTheme() {
  html.classList.toggle("dark-theme");

  if (html.classList.contains("dark-theme")) {
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }
}

// Changing Views
