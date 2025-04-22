document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector("header");

  // Criar e adicionar o overlay
  const overlay = document.createElement("div");
  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay);

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Fechar menu ao clicar em links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Header scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
  });
});
