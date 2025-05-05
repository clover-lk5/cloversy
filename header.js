document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.querySelector(".nav-links");
    const header = document.getElementById("mainHeader");
    const pageToggle = document.getElementById("pageToggle");
    const pageMenu = document.getElementById("pageMenu");
  
    // slide-in mobile menu
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  
    // sticky scroll effect
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  
    // click to toggle Page dropdown
    pageToggle.addEventListener("click", (e) => {
      e.preventDefault();
      pageMenu.style.display = pageMenu.style.display === "flex" ? "none" : "flex";
    });
  
    // close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!pageToggle.contains(e.target) && !pageMenu.contains(e.target)) {
        pageMenu.style.display = "none";
      }
    });
  });

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

