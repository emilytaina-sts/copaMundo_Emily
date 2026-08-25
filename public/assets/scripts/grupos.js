export default async function createGroupSection(section) {
    try {
        const cardsContainer = document.createElement('div');
        cardsContainer.className = "content__card";
        const response = await fetch('/api/grupos');
        const grupos = await response.json();
        grupos.forEach(grupo => {
            const group = createGroup(grupo);
            cardsContainer.appendChild(group);
        });
        section.appendChild(cardsContainer);
    } catch (error) {
        console.log(`Sorry, we couldn´t process the request: ${error}`);
        section.style.color = '#FF0000';
        section.innerHTML = `Bad request: ${error}`;
    }
}

function createGroup(group){
    const grupo = document.createElement('div');
    grupo.className = 'card__grupo';
    grupo.innerHTML = `
        <span class="grupo__letra">Grupo ${group.grupo}</span>
    `;
    (group.selecoes).forEach(selecao => {
        const sel = document.createElement('div');
        sel.className = 'grupo__selecao';
        sel.innerHTML = `
            <img src="https://api.fifa.com/api/v3/picture/flags-sq-1/${selecao}" alt="Bandeira da(o/e) ${selecao.sigla}" class="selecao__flag">
            <h3 class="selecao__sigla">${selecao}</h3>
        `;
        grupo.appendChild(sel);
    });
    return grupo;
}