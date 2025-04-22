document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loading-screen");

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);

  // Dados dos cafés
  const coffeeData = {
    "montanha-dourada": {
      name: "Montanha Dourada",
      description:
        "Um blend equilibrado com notas de chocolate amargo, caramelo e frutas vermelhas. Ideal para métodos de extração como espresso e coado.",
      origin: "Sul de Minas Gerais",
      roast: "Média",
      intensity: "7/10",
      price: "R$ 49,90",
      image: "img/montanha_dourada.jpg",
    },
    amanhecer: {
      name: "Amanhecer",
      description:
        "Blend com notas cítricas, floral com toque de mel e finalização limpa. Perfeito para iniciar o dia com uma experiência refrescante.",
      origin: "Chapada Diamantina, Bahia",
      roast: "Média-clara",
      intensity: "6/10",
      price: "R$ 52,90",
      image: "img/amanhecer.jpg",
    },
    "reserva-especial": {
      name: "Reserva Especial",
      description:
        "Edição limitada com notas de amêndoas, caramelo e finalização prolongada. Um café para momentos especiais.",
      origin: "Mantiqueira de Minas",
      roast: "Média-escura",
      intensity: "8/10",
      price: "R$ 59,90",
      image: "img/reserva especial.jpg",
    },
    organico: {
      name: "Orgânico",
      description:
        "Cultivado sem agrotóxicos, com notas de frutas amarelas, corpo médio e acidez equilibrada. Certificação orgânica.",
      origin: "Mogiana Paulista",
      roast: "Média",
      intensity: "6/10",
      price: "R$ 54,90",
      image: "img/organico.jpg",
    },
    "bourbon-vermelho": {
      name: "Bourbon Vermelho",
      description:
        "Variedade rara com notas de chocolate ao leite, nozes e toque de cereja. Uma experiência premium para conhecedores.",
      origin: "Carmo de Minas",
      roast: "Média",
      intensity: "7/10",
      price: "R$ 64,90",
      image: "img/csfr raro.jpg",
    },
    "cerrado-mineiro": {
      name: "Cerrado Mineiro",
      description:
        "Café com Indicação Geográfica, apresenta notas de caramelo, rapadura e finalização suave. Corpo aveludado.",
      origin: "Cerrado Mineiro",
      roast: "Média-escura",
      intensity: "8/10",
      price: "R$ 56,90",
      image: "img/cafe brasil.jpg",
    },
  };

  // Elementos do DOM
  const modal = document.getElementById("coffee-modal");
  const modalBody = modal.querySelector(".modal-body");
  const closeModal = modal.querySelector(".close-modal");
  const infoButtons = document.querySelectorAll(".more-info-btn");

  // Corrigir caminhos das imagens nos cards
  document.querySelectorAll(".coffee-item").forEach((item) => {
    const coffeeId = item
      .querySelector(".more-info-btn")
      .getAttribute("data-coffee");
    const coffeeData = getCoffeeData(coffeeId);

    if (coffeeData) {
      const imgElement = item.querySelector(".coffee-image img");
      if (imgElement) {
        imgElement.src = coffeeData.image;

        // Adicionar tratamento de erro para imagens
        imgElement.onerror = function () {
          this.src = "https://via.placeholder.com/300x300?text=Café";
          this.classList.add("error");
        };
      }
    }
  });

  // Função para obter dados do café pelo ID
  function getCoffeeData(coffeeId) {
    return coffeeData[coffeeId];
  }

  // Atualizar a função que gera o conteúdo do modal
  infoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const coffeeId = this.getAttribute("data-coffee");
      const coffee = getCoffeeData(coffeeId);

      if (coffee) {
        modalBody.innerHTML = `
                  <div class="modal-coffee-details">
                      <div class="modal-coffee-image">
                          <img src="${coffee.image}" alt="${coffee.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Café';">
                      </div>
                      <div class="modal-coffee-info">
                          <h3>${coffee.name}</h3>
                          <div class="coffee-content">
                              <p class="coffee-description">${coffee.description}</p>
                              <div class="coffee-specs">
                                  <p><strong>Origem:</strong> ${coffee.origin}</p>
                                  <p><strong>Torra:</strong> ${coffee.roast}</p>
                                  <p><strong>Intensidade:</strong> ${coffee.intensity}</p>
                              </div>
                              <div class="price-cart-container">
                                  <p class="coffee-price">${coffee.price}</p>
                                  <button class="cta-button add-to-cart-btn">Adicionar ao Carrinho</button>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
        openModal();

        // Adicionar evento ao botão de adicionar ao carrinho
        const addToCartBtn = modalBody.querySelector(".add-to-cart-btn");
        if (addToCartBtn) {
          addToCartBtn.addEventListener("click", function () {
            alert(`${coffee.name} adicionado ao carrinho!`);
          });
        }
      }
    });
  });

  // Fechar modal
  closeModal.addEventListener("click", function () {
    closeModal();
  });

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // Menu mobile toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // Controle do menu mobile
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    menuToggle.querySelector("i").classList.toggle("fa-bars");
    menuToggle.querySelector("i").classList.toggle("fa-times");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.querySelector("i").classList.add("fa-bars");
      menuToggle.querySelector("i").classList.remove("fa-times");
    });
  });

  // Inicializar AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }

  // Slider de depoimentos
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => (slide.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[n].style.display = "block";
    dots[n].classList.add("active");
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    nextBtn.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // Inicializar o slider
  if (slides.length > 0) {
    showSlide(currentSlide);
  }

  // Formulário de assinatura
  const subscriptionForm = document.getElementById("subscription-form");
  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Obrigado por se inscrever! Em breve entraremos em contato.");
      this.reset();
    });
  }

  // Formulário de newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Obrigado por se inscrever à nossa newsletter!");
      this.reset();
    });
  }

  // Toggle menu ao clicar no botão hamburger
  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Fechar menu ao redimensionar a tela para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Controle do Modal
function openModal() {
  const modal = document.querySelector(".modal");
  document.body.style.overflow = "hidden";
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

// Event Listeners
document.querySelectorAll(".more-info-btn").forEach((btn) => {
  btn.addEventListener("click", openModal);
});

document.querySelector(".close-modal").addEventListener("click", closeModal);
