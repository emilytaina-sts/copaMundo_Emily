const response = await fetch('/api/selecoes');
const selecoes = await response.json();

function createGroup(group) {
    const nomeGrupo = ((group.group).split(' '))[1];
}

function createTeam(team) {
    const selecao = searchTeam(team.name);
    return {
        posicao: team.position,
        nome: selecao.nome,
        bandeira: ``,
        score: team.points,
        matches: []
    };
}

function searchTeam(name){
    return (selecoes.find(team => team.name === name));
}