import createCardsSection from "./selecoes.js";
import createGroupSection from "./grupos.js";

const teams = document.getElementById('teamsLink');
const groups = document.getElementById('groupsLink');
const content = document.getElementById('content');

teams.addEventListener('click', async () => {
    content.innerHTML = '';
    const section = createSection("Seleções");
    await createCardsSection(section);
    content.appendChild(section);
});

groups.addEventListener('click', async () => {
    content.innerHTML = '';
    const section = createSection("Grupos");
    await createGroupSection(section);
    content.appendChild(section);
});

function createSection(titulo){
    const section = document.createElement('section');
    section.className = 'section__content';
    section.innerHTML = `<h2 class="content__title">${titulo}</h2>`;
    return section;
}


