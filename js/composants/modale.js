function createModalMarkup() {
	const modal = document.createElement('section');
	modal.className = 'project-modal';
	modal.hidden = true;
	modal.innerHTML = `
		<div class="project-modal__backdrop" data-modal-close></div>
		<article class="project-modal__panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
			<button class="project-modal__close" type="button" data-modal-close aria-label="Fermer la fenêtre">
				×
			</button>
			<div class="project-modal__media" data-modal-media></div>
			<div class="project-modal__content">
				<p class="project-modal__meta" data-modal-category></p>
				<h3 id="project-modal-title" class="project-modal__title" data-modal-title></h3>
				<p class="project-modal__subtitle" data-modal-subtitle></p>
				<p class="project-modal__description" data-modal-description></p>
			</div>
		</article>
	`;

	return modal;
}

function getModal() {
	let modal = document.querySelector('.project-modal');

	if (!modal) {
		modal = createModalMarkup();
		document.body.appendChild(modal);
	}

	return modal;
}

function fillModal(modal, project) {
	const media = modal.querySelector('[data-modal-media]');
	const category = modal.querySelector('[data-modal-category]');
	const title = modal.querySelector('[data-modal-title]');
	const subtitle = modal.querySelector('[data-modal-subtitle]');
	const description = modal.querySelector('[data-modal-description]');

	media.className = `project-modal__media ${project.illustrationClass || ''}`.trim();
	category.textContent = project.year && project.category ? `${project.year} • ${project.category}` : project.category || project.year || '';
	title.textContent = project.title || '';
	subtitle.textContent = project.subtitle || '';
	description.textContent = project.description || '';
}

function openModal(modal) {
	modal.hidden = false;
	document.body.classList.add('is-modal-open');
}

function closeModal(modal) {
	modal.hidden = true;
	document.body.classList.remove('is-modal-open');
}

function bindModalCloseEvents(modal) {
	modal.addEventListener('click', (event) => {
		const target = event.target;
		const closeButton = target instanceof Element ? target.closest('[data-modal-close]') : null;

		if (closeButton) {
			closeModal(modal);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !modal.hidden) {
			closeModal(modal);
		}
	});
}

function bindProjectTriggers(modal, projects) {
	const grid = document.querySelector('.projets__grid');

	if (!grid) {
		return;
	}

	const cards = grid.querySelectorAll('.carte-projet[data-project-id]');

	cards.forEach((card) => {
		const projectId = card.getAttribute('data-project-id');
		const project = projects.find((item) => item.id === projectId);

		if (!project) {
			return;
		}

		card.addEventListener('click', () => {
			fillModal(modal, project);
			openModal(modal);
		});

		card.addEventListener('keydown', (event) => {
			if (event.key !== 'Enter' && event.key !== ' ') {
				return;
			}

			event.preventDefault();
			fillModal(modal, project);
			openModal(modal);
		});
	});
}

function initModaleProjet(projects) {
	const modal = getModal();

	bindModalCloseEvents(modal);
	bindProjectTriggers(modal, projects);
}

window.initModaleProjet = initModaleProjet;
