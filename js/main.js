async function loadProjects() {
    const response = await fetch('data/projects.json');
    const projects = await response.json();
    return projects;
}

async function init() {
    const projects = await loadProjects();
    console.table(projects);
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
        <article class="project-card">
            <img class="project-card__image" src="..." alt="...">
            <div class="project-card__content">
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__meta">catégorie · année</p>
                <p class="project-card__description">...</p>
            </div>
        </article>
    `;
}