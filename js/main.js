async function loadProjects() {
    const response = await fetch('data/projects.json');
    const projects = await response.json();
    return projects;
}

async function init() {
    const projects = await loadProjects();
    console.table(projects);
    // ÉTAPE 2 : parcourir le tableau avec forEach()
    // Afficher le titre de chaque projet dans la console
    projects.forEach(project => {
        console.log(project.title);
    });
    const grid = document.querySelector('.projects__grid');
    projects.forEach(project => {
    grid.innerHTML += createProjectCard(project);
  });

}

init();

function createProjectCard(project) {
  return `
    <article class="carte-projet">
      <div class="carte-projet__illustration ${project.illustrationClass || ''}">
        <span class="carte-projet__annee">${project.year || ''}</span>
      </div>

      <div class="carte-projet__contenu">
        <p class="carte-projet__etiquette">${project.category || ''}</p>
        <h3 class="carte-projet__titre">${project.title || ''}</h3>
        <p class="carte-projet__sous-titre">${project.subtitle || ''}</p>
        <p class="carte-projet__description">${project.description || ''}</p>
        <a class="carte-projet__lien" href="${project.link || '#'}" aria-label="Voir le projet ${project.title || ''}">
          VOIR LE PROJET →
        </a>
      </div>
    </article>
  `;
}

function renderProjects() {
  const grid = document.querySelector('.projets__grid');

  if (!grid) {
    return;
  }

  grid.innerHTML = projects.map(createProjectCard).join('');
}

renderProjects();