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

// Matrix background animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const chars = '01'.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;
    
    for(let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);