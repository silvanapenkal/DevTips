KEY_BD = "DevTips";
let formulario = document.getElementById("formulario");
let divCards = document.getElementById("apresentacaoCartoes");
let listaRegistros = new Array;
let identificacao;

function ler(){
    if (localStorage.hasOwnProperty(KEY_BD)) {
        listaRegistros = JSON.parse(localStorage.getItem(KEY_BD))
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    ler();
    let id = 1;
    (listaRegistros.length>0) ? id = listaRegistros[listaRegistros.length-1].id+1 : null;
    let titulo = document.getElementById("titulo").value;
    let linguagem = document.getElementById("linguagem").value;
    let categoria = document.getElementById("categoria").value;
    let descricao = document.getElementById("descricao").value;
    let video = document.getElementById("video").value;
    listaRegistros.push({
        id, titulo, linguagem, categoria, descricao, video
    })
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros));
    acrescentarCard(id, titulo, linguagem, categoria, descricao, video);
    formulario.reset();
});

window.addEventListener('load', () => {
    ler();
    inicializarCards(listaRegistros);
})

function inicializarCards(dadosLocalStorage){
    console.log(dadosLocalStorage);
    dadosLocalStorage = dadosLocalStorage.sort( (a, b) => {
        return parseInt(a.id) < parseInt(b.id) ? -1 : 1
    })
    console.log(dadosLocalStorage);
    dadosLocalStorage.map( (dica) => {
        acrescentarCard(dica.id, dica.titulo, dica.linguagem, dica.categoria, dica.descricao, dica.video)            
    })
    calcularTotais(dadosLocalStorage);     
}

function calcularTotais(dadosLocalStorage) {

    totalBackend =  (dadosLocalStorage.filter( dica => { return dica.categoria == "BackEnd" } )).length;
    totalFrontend =  (dadosLocalStorage.filter( dica => { return dica.categoria == "FrontEnd" } )).length;
    totalFullstack =  (dadosLocalStorage.filter( dica => { return dica.categoria == "FullStack" } )).length;
    totalComportamental =  (dadosLocalStorage.filter( dica => { return dica.categoria == "Comportamental" } )).length;
    total =  dadosLocalStorage.length;

    let backend = document.getElementById("somaBackend");
    backend.innerText = totalBackend;

    let frontend = document.getElementById("somaFrontend");
    frontend.innerText = totalFrontend;

    let fullstack = document.getElementById("somaFullstack");
    fullstack.innerText = totalFullstack;

    let comportamentais = document.getElementById("somaComportamental");
    comportamentais.innerText = totalComportamental;

    let todas = document.getElementById("somaDicas");
    todas.innerText = total;
}

function acrescentarCard(novoId, novoTitulo, novaLinguagem, novaCategoria, novaDescricao, novoVideo){

    let cartao = document.createElement("div");
    cartao.className="card";
    divCards.appendChild(cartao);
    cartao.id="cartao"+novoId;

    let corpoCartao = document.createElement("div");
    corpoCartao.className="card-body";
    cartao.appendChild(corpoCartao);

    let titulo = document.createElement("h5");
    corpoCartao.appendChild(titulo);
    titulo.className="card-title";
    titulo.innerText = novoTitulo;

    let linguagem = document.createElement("p");
    corpoCartao.appendChild(linguagem);
    linguagem.className = "card-text";
    linguagem.innerText = novaLinguagem;

    let categoria = document.createElement("p");
    corpoCartao.appendChild(categoria);
    categoria.className = "card-text";
    categoria.innerText = novaCategoria;

    let descricao= document.createElement("p");
    corpoCartao.appendChild(descricao);
    descricao.className = "card-text";
    descricao.innerText = novaDescricao;

    let editar = document.createElement("button");
    corpoCartao.appendChild(editar);
    editar.className = "btn btn-primary";
    editar.id = "editar" + novoId;
    editar.innerText = "Editar";
    editar.setAttribute("data-bs-toggle","modal");
    editar.setAttribute("data-bs-target","#myModal");
    editar.setAttribute("onclick", "editar(id)");

    let apagar = document.createElement("button");
    corpoCartao.appendChild(apagar);
    apagar.className = "btn btn-primary";
    apagar.id = "apagar" + novoId;
    apagar.innerText = "Apagar";
    apagar.setAttribute('onclick','apagar(id)');

    if (novoVideo){
        let link = document.createElement("a");
        corpoCartao.appendChild(link);
        link.className = "btn btn-primary";
        link.id = "link" + novoId;
        link.innerText = "Link";
        link.setAttribute('href', novoVideo);
    }
}

function apagar(id){
    let dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    let tamanhoId = id.length;
    let identificacao = id.slice(6,tamanhoId);
    if (window.confirm(`Você tem certeza que quer apagar essa dica?`)) {               
        dadosLocalStorage = dadosLocalStorage.filter( dica => { return dica.id != identificacao } );
    };
    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));
    let valor = ("cartao"+identificacao);
    let filho = document.getElementById(valor);
    divCards.removeChild(filho); 
    inicializarCards(dadosLocalStorage);
}

function pesquisar(value) {
    let filtro = value;
    let dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    const divCards = document.getElementById("apresentacaoCartoes");
    if(filtro.trim()){
        divCards.innerHTML ="";
        const expReg = eval(`/${filtro.trim().replace(/[^\d\w]+/g,'.*')}/i`)
        dadosLocalStorage = dadosLocalStorage.filter( dica => {
            return expReg.test( dica.titulo ) || expReg.test( dica.categoria) || expReg.test( dica.descricao) || expReg.test( dica.linguagem)
        })
    }
    inicializarCards(dadosLocalStorage);
}

function editar(id) {
    let dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    let tamanhoId = id.length;
    identificacao = id.slice(6,tamanhoId);

    let registro = dadosLocalStorage.filter( dica => { return dica.id == identificacao } );
    
    document.getElementById("edicaoTitulo").value = registro[0].titulo;
    document.getElementById("edicaoDescricao").value = registro[0].descricao;
    document.getElementById("edicaoVideo").value = registro[0].video;
    document.getElementById("edicaoLinguagem").value = registro[0].linguagem;
    document.getElementById("edicaoCategoria").value = registro[0].categoria;

}

function editaDica(titulo, linguagem, categoria, descricao, video) {
    e.preventDefault();
    let dicaEditada = {
        "id": identificacao,
        "categoria": categoria,
        "titulo": titulo,
        "video": video,
        "descricao": descricao,
        "linguagem": linguagem
    }
    console.log(dicaEditada);
    let posicao = dadosLocalStorage.findIndex(localStorage.id == dicaEditada.id);
    let dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    dadosLocalStorage = dadosLocalStorage.splice(posicao, 1, dicaEditada);
    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));
    inicializarCards(dadosLocalStorage);
}