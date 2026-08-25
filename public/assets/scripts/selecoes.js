export default async function createCardsSection(section) {
    try {
        const cardsContainer = document.createElement('div');
        cardsContainer.className = "content__card";
        const response = await fetch('/api/selecoes');
        const selecoes = await response.json();
        selecoes.forEach(selecao => {
            const card = createCard(selecao);
            cardsContainer.appendChild(card);
        });
        section.appendChild(cardsContainer);
    } catch (error) {
        console.log(`Sorry, we couldn´t process the request: ${error}`);
        section.style.color = '#FF0000';
        section.innerHTML = `Bad request: ${error}`;
    }
}

function createCard(selecao){
    const card = document.createElement('div');
    card.className = 'card__selecao';
    card.innerHTML = `
        <div class="selecao__identity">
            <img src="https://api.fifa.com/api/v3/picture/flags-sq-1/${selecao.sigla}" alt="Bandeira da(o/e) ${selecao.sigla}" class="selecao__flag">
            <h3 class="selecao__sigla">${selecao.sigla}</h3>
        </div>
        <p class="selecao__nome">${selecao.nome}</p>`;
    if((selecao.titulos).length > 0){
        const titulos = document.createElement('div');
        titulos.className = 'selecao__titulos';
        (selecao.titulos).forEach(titulo => {
            const item = document.createElement('span');
            item.className = 'titulos__item';
            item.innerHTML = `${titulo}`;
            titulos.appendChild(item);
        });
        card.appendChild(titulos);
    }
    return card;
}