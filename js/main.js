function createProjectCard(project) {
  return `
    <article class="carte-projet" data-project-id="${project.id || ''}" tabindex="0" role="button" aria-label="Voir le projet ${project.title || ''}">
      <div class="carte-projet__illustration ${project.illustrationClass || ''}">
        <span class="carte-projet__annee">${project.year || ''}</span>
      </div>

      <div class="carte-projet__contenu">
        <p class="carte-projet__etiquette">${project.category || ''}</p>
        <h3 class="carte-projet__titre">${project.title || ''}</h3>
        <p class="carte-projet__sous-titre">${project.subtitle || ''}</p>
        <p class="carte-projet__description">${project.description || ''}</p>
        <button class="carte-projet__lien" type="button" data-project-id="${project.id || ''}" aria-label="Voir le projet ${project.title || ''}">
          VOIR LE PROJET →
        </button>
      </div>
    </article>
  `;
}

async function loadProjects() {
  const response = await fetch('./data/projets.json');

  if (!response.ok) {
    throw new Error(`Impossible de charger les projets (${response.status})`);
  }

  return response.json();
}

function renderProjects(projects) {
  const grid = document.querySelector('.projets__grid');

  if (!grid) {
    return;
  }

  grid.innerHTML = projects.map(createProjectCard).join('');
}

function initProjectModal(projects) {
  if (typeof window.initModaleProjet !== 'function') {
    return;
  }

  window.initModaleProjet(projects);
}

async function init() {
  try {
    const projects = await loadProjects();
    renderProjects(projects);
    initProjectModal(projects);
  } catch (error) {
    console.error(error);
    const grid = document.querySelector('.projets__grid');

    if (grid) {
      grid.innerHTML = '<p>Les projets n\'ont pas pu être chargés pour le moment.</p>';
    }
  }
}

init();