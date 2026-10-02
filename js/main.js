// Construit le HTML d'une carte de projet avec les données du fichier JSON.
function createProjectCard(project) {
  return `
    <article class="carte-projet" data-project-id="${project.id || ""}" tabindex="0" role="button" aria-label="Voir le projet ${project.title || ""}">
      <div class="carte-projet__illustration">
        <img
          class="carte-projet__image"
          src="${project.image || ""}"
          alt="${project.title || ""}"
          loading="lazy"
        />
        <span class="carte-projet__annee">${project.year || ""}</span>
      </div>

      <div class="carte-projet__contenu">
        <p class="carte-projet__etiquette">${project.category || ""}</p>
        <h3 class="carte-projet__titre">${project.title || ""}</h3>
        <p class="carte-projet__sous-titre">${project.subtitle || ""}</p>
        <p class="carte-projet__description">${project.description || ""}</p>
        <button class="carte-projet__lien" type="button" data-project-id="${project.id || ""}" aria-label="Voir le projet ${project.title || ""}">
          VOIR LE PROJET →
        </button>
      </div>
    </article>
  `;
}

// Associe les images avec les fichiers png ou jpg et le texte alternatif si on trouve pas la photo
function applyProjectImages(grid, projects) {
  projects.forEach((project) => {
    const illustration = grid.querySelector(
      `[data-project-id="${project.id}"] .carte-projet__illustration`,
    );
    const image = illustration?.querySelector(".carte-projet__image");

    if (image && project.image) {
      image.src = project.image;
      image.alt = project.title || "";
    }
  });
}

// Cherche les données du projet dans le tableau du projets.json
async function loadProjects() {
  const response = await fetch("./data/projets.json");

  if (!response.ok) {
    throw new Error(`Impossible de charger les projets (${response.status})`);
  }

  return response.json();
}

// Amène les cartes aux html qu'on veut
function renderProjects(projects) {
  const grid = document.querySelector(".projets__grid");

  if (!grid) {
    return;
  }

  grid.innerHTML = projects.map(createProjectCard).join("");
  applyProjectImages(grid, projects);
}

// Donne les projets aux modales pour les pop ups
function initProjectModal(projects) {
  if (typeof window.initModaleProjet !== "function") {
    return;
  }

  window.initModaleProjet(projects);
}

// Gère l'ouverture du menu hamburger et sa fermeture après un clic sur un lien.
function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".site-header__menu-toggle");
  const menuLinks = document.querySelectorAll(".site-header__nav a");

  if (!header || !menuToggle) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("site-header--menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("site-header--menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
  });

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

// donne le message d'erreur si le projet n'est pas trouvé
async function init() {
  initMobileMenu();

  try {
    const projects = await loadProjects();
    renderProjects(projects);
    initProjectModal(projects);
  } catch (error) {
    console.error(error);
    const grid = document.querySelector(".projets__grid");

    if (grid) {
      grid.innerHTML =
        "<p>Les projets n'ont pas pu être chargés pour le moment.</p>";
    }
  }
}

init();
