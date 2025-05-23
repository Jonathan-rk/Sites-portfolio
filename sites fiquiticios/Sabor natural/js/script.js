document.addEventListener("DOMContentLoaded", () => {
  // Menu Mobile Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Botão voltar
  const btnVoltar = document.querySelector('.btn-voltar-flutuante');
  if (btnVoltar) {
      btnVoltar.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Verifica se há histórico para voltar
          if (window.history.length > 1) {
              window.history.back();
          } else {
              // Fallback: redireciona para a página inicial se não houver histórico
              window.location.href = 'index.html';
          }
      });

      // Adiciona tratamento para toque em dispositivos móveis
      btnVoltar.addEventListener('touchend', (e) => {
          e.preventDefault();
          
          if (window.history.length > 1) {
              window.history.back();
          } else {
              window.location.href = 'index.html';
          }
      });
  }

  // Header Scroll Effect
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    lastScroll = currentScroll;
  });

  // Filtros de Receitas
  const filtrosBtns = document.querySelectorAll(".filtro-btn");
  const receitasGrid = document.querySelector(".receitas-grid");
  const receitasCards = document.querySelectorAll(".receita-card");
  let cardsPerSection = window.innerWidth <= 768 ? 14 : 16;
  let currentSection = 1;

  function adjustCardsPerSection() {
    cardsPerSection = window.innerWidth <= 768 ? 14 : 16;
    organizarSecoes();
  }

  window.addEventListener("resize", adjustCardsPerSection);

  function organizarSecoes() {
    const totalSections = Math.ceil(receitasCards.length / cardsPerSection);
    const visibleCards = Array.from(receitasCards).filter(
      (card) => card.dataset.visible !== "false"
    );
    
    receitasCards.forEach((card) => {
      card.style.display = "none";
    });

    visibleCards.forEach((card, index) => {
      const section = Math.floor(index / cardsPerSection) + 1;
      if (section === currentSection) {
        card.style.display = "block";
      }
    });

    atualizarPaginacao(Math.ceil(visibleCards.length / cardsPerSection));
  }

  function atualizarPaginacao(totalSections) {
    const paginacao = document.querySelector(".paginacao");
    paginacao.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.className = "pag-btn prev";
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    paginacao.appendChild(prevBtn);

    for (let i = 1; i <= totalSections; i++) {
      const btn = document.createElement("button");
      btn.className = `pag-btn ${i === currentSection ? "ativo" : ""}`;
      btn.textContent = i;
      paginacao.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "pag-btn next";
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    paginacao.appendChild(nextBtn);

    document.querySelectorAll(".pag-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (btn.classList.contains("prev") && currentSection > 1) {
          currentSection--;
        } else if (
          btn.classList.contains("next") &&
          currentSection < totalSections
        ) {
          currentSection++;
        } else if (
          !btn.classList.contains("prev") &&
          !btn.classList.contains("next")
        ) {
          currentSection = parseInt(btn.textContent);
        }
        organizarSecoes();

        const receitasSection = document.querySelector(".receitas-section");
        if (receitasSection) {
          receitasSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Sistema de Pesquisa
  const searchBar = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");

  function pesquisarReceitas(termo) {
    const termoPesquisa = termo.toLowerCase();
    currentSection = 1;

    receitasCards.forEach((card) => {
      const titulo = card
        .querySelector(".receita-titulo")
        .textContent.toLowerCase();
      const categoria = card
        .querySelector(".receita-categoria")
        .textContent.toLowerCase();

      if (titulo.includes(termoPesquisa) || categoria.includes(termoPesquisa)) {
        card.dataset.visible = "true";
      } else {
        card.dataset.visible = "false";
      }
    });

    organizarSecoes();
  }

  searchBtn.addEventListener("click", () => {
    const searchTerm = searchBar.value.trim();
    if (searchTerm) {
      pesquisarReceitas(searchTerm);
    }
  });

  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchBar.value.trim();
      if (searchTerm) {
        pesquisarReceitas(searchTerm);
      }
    }
  });

  // Animação de Scroll Suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Filtros com paginação automática
  filtrosBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filtrosBtns.forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      currentSection = 1;
      const categoria = btn.textContent.toLowerCase();

      receitasCards.forEach((card) => {
        const cardCategoria = card
          .querySelector(".receita-categoria")
          .textContent.toLowerCase();
        // Corrigido: "todas as receitas" mostra tudo
        if (
          categoria === "todas as receitas" ||
          categoria === "todas" ||
          cardCategoria.includes(categoria)
        ) {
          card.dataset.visible = "true";
        } else {
          card.dataset.visible = "false";
        }
      });

      organizarSecoes();

      const receitasSection = document.querySelector(".receitas-section");
      if (receitasSection) {
        receitasSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Fechar menu mobile ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  // Animações de entrada
  const observador = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document
    .querySelectorAll(".receita-card, .blog-card, .categoria-card")
    .forEach((card) => {
      observador.observe(card);
    });

  // Filtro por Categorias
  const categoriaCards = document.querySelectorAll(".categoria-card");

  categoriaCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const categoria = card.querySelector("h3").textContent.toLowerCase();

      // Remove classe ativo de todos os botões de filtro
      document
        .querySelectorAll(".filtro-btn")
        .forEach((btn) => btn.classList.remove("ativo"));

      // Reseta para primeira página
      currentSection = 1;

      // Filtra as receitas
      receitasCards.forEach((receitaCard) => {
        const cardCategoria = receitaCard
          .querySelector(".receita-categoria")
          .textContent.toLowerCase();

        // Atualiza a visibilidade do card
        if (cardCategoria === categoria) {
          receitaCard.dataset.visible = "true";
          receitaCard.style.display = "block";
        } else {
          receitaCard.dataset.visible = "false";
          receitaCard.style.display = "none";
        }
      });

      // Reorganiza a exibição
      organizarSecoes();

      // Scroll suave até a seção de receitas
      const receitasSection = document.querySelector(".receitas-section");
      if (receitasSection) {
        receitasSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Inicialização
  organizarSecoes();
});
