document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const contentDiv = document.getElementById("content");

  // Load default page (Home)
  loadPage("home");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      loadPage(page);
    });
  });

  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((data) => {
        contentDiv.innerHTML = data;
    })
  }
});

const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save the user's preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
// navbar
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-btn");
  const navbar = document.querySelector(".navbar");

  toggleButton.addEventListener("click", function () {
    navbar.classList.toggle("dark-mode");
  });
});
//collapse when user click other side
document.addEventListener("click", function (event) {
  let navbar = document.getElementById("navbarNav");
  let toggler = document.querySelector(".navbar-toggler");

  // Check if the click is outside the navbar and toggler button
  if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
    let bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
    bsCollapse.hide();
  }
});

// Toggle navbar collapse when clicking the toggler
document.querySelector(".navbar-toggler").addEventListener("click", function () {
  let navbar = document.getElementById("navbarNav");
  let bsCollapse = new bootstrap.Collapse(navbar);
  
  if (navbar.classList.contains('show')) {
    bsCollapse.hide();
  } else {
    bsCollapse.show();
  }
});

// Collapse when user scrolls down on smartphone screen
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbarNav");
  let st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop && window.innerWidth < 768) {
    // Scroll down
    let bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
    bsCollapse.hide();
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});