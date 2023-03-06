KEY_BD = "DevTips";
const formulario = document.getElementById("formulario");
const formularioEdicao = document.getElementById("formularioEdicao");
const divCards = document.getElementById("apresentacaoCartoes");
const modalEdicao = document.getElementById("edicaoModal");
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
    const titulo = document.getElementById("titulo").value;
    const linguagem = document.getElementById("linguagem").value;
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const video = document.getElementById("video").value;
    listaRegistros.push({
        id, titulo, linguagem, categoria, descricao, video
    })
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros));
    acrescentarCard(id, titulo, linguagem, categoria, descricao, video);
    calcularTotais(listaRegistros);
    formulario.reset();
});

formularioEdicao.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("edicaoTitulo").value;
    const linguagem = document.getElementById("edicaoLinguagem").value;
    const categoria = document.getElementById("edicaoCategoria").value;
    const descricao = document.getElementById("edicaoDescricao").value;
    const video = document.getElementById("edicaoVideo").value;
    editaDica(titulo, linguagem, categoria, descricao, video)
});

window.addEventListener('load', () => {
    ler();
    inicializarCards(listaRegistros);
})

function inicializarCards(dadosLocalStorage){
    divCards.innerHTML="";
    dadosLocalStorage.map( (dica) => {
        acrescentarCard(dica.id, dica.titulo, dica.linguagem, dica.categoria, dica.descricao, dica.video)            
    })
    calcularTotais(dadosLocalStorage);     
}

function calcularTotais(dadosLocalStorage) {

    const totalBackend =  (dadosLocalStorage.filter( dica => { return dica.categoria == "BackEnd" } )).length;
    const totalFrontend =  (dadosLocalStorage.filter( dica => { return dica.categoria == "FrontEnd" } )).length;
    const totalFullstack =  (dadosLocalStorage.filter( dica => { return dica.categoria == "FullStack" } )).length;
    const totalComportamental =  (dadosLocalStorage.filter( dica => { return dica.categoria == "Comportamental" } )).length;
    const total =  dadosLocalStorage.length;

    const backend = document.getElementById("somaBackend");
    backend.innerText = totalBackend;

    const frontend = document.getElementById("somaFrontend");
    frontend.innerText = totalFrontend;

    const fullstack = document.getElementById("somaFullstack");
    fullstack.innerText = totalFullstack;

    const comportamentais = document.getElementById("somaComportamental");
    comportamentais.innerText = totalComportamental;

    const todas = document.getElementById("somaDicas");
    todas.innerText = total;
}

function acrescentarCard(novoId, novoTitulo, novaLinguagem, novaCategoria, novaDescricao, novoVideo){

    const cartao = document.createElement("div");
    cartao.className="card";
    divCards.appendChild(cartao);
    cartao.id="cartao"+novoId;

    const corpoCartao = document.createElement("div");
    corpoCartao.className="card-body";
    cartao.appendChild(corpoCartao);

    const titulo = document.createElement("h2");
    corpoCartao.appendChild(titulo);
    titulo.className="card-title";
    titulo.innerText = novoTitulo;

    const linguagem = document.createElement("p");
    corpoCartao.appendChild(linguagem);
    linguagem.className = "card-text";
    linguagem.innerText = `Linguagem/Skill: ${novaLinguagem}`;

    const categoria = document.createElement("p");
    corpoCartao.appendChild(categoria);
    categoria.className = "card-text";
    categoria.innerText = `Categoria: ${novaCategoria}`;

    const descricao= document.createElement("p");
    corpoCartao.appendChild(descricao);
    descricao.className = "card-text";
    descricao.innerText = novaDescricao;

    const editar = document.createElement("button");
    corpoCartao.appendChild(editar);
    editar.className = "btn btn-primary";
    editar.id = "editar" + novoId;
    editar.innerText = "Editar";
    editar.setAttribute("data-bs-toggle","modal");
    editar.setAttribute("data-bs-target","#edicaoModal");
    editar.setAttribute("onclick", "editar(id)");

    const apagar = document.createElement("button");
    corpoCartao.appendChild(apagar);
    apagar.className = "btn btn-primary";
    apagar.id = "apagar" + novoId;
    apagar.innerText = "Apagar";
    apagar.setAttribute('onclick','apagar(id)');

    if (novoVideo){
        const link = document.createElement("a");
        corpoCartao.appendChild(link);
        link.className = "btn btn-primary";
        link.id = "link" + novoId;
        link.innerText = "Link";
        link.setAttribute('href', novoVideo);
    }
}

function apagar(id){
    let dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    const tamanhoId = id.length;
    let identificacao = id.slice(6,tamanhoId);
    if (window.confirm(`Você tem certeza que quer apagar essa dica?`)) {               
        dadosLocalStorage = dadosLocalStorage.filter( dica => { return dica.id != identificacao } );
    };
    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));
    const valor = ("cartao"+identificacao);
    const filho = document.getElementById(valor);
    divCards.removeChild(filho); 
    inicializarCards(dadosLocalStorage);
}

function pesquisar(value) {
    const filtro = value;
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
    const dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));
    const tamanhoId = id.length;
    identificacao = id.slice(6,tamanhoId);

    const registro = dadosLocalStorage.filter( dica => { return dica.id == identificacao } );
    
    document.getElementById("edicaoTitulo").value = registro[0].titulo;
    document.getElementById("edicaoDescricao").value = registro[0].descricao;
    document.getElementById("edicaoVideo").value = registro[0].video;
    document.getElementById("edicaoLinguagem").value = registro[0].linguagem;
    document.getElementById("edicaoCategoria").value = registro[0].categoria;

}

function editaDica(titulo, linguagem, categoria, descricao, video) {
    const dadosLocalStorage = JSON.parse(localStorage.getItem(KEY_BD));

    dadosLocalStorage.forEach((dica,index) => {
        if(dica.id == identificacao){
            dadosLocalStorage[index].titulo = titulo;
            dadosLocalStorage[index].linguagem = linguagem;
            dadosLocalStorage[index].categoria = categoria;
            dadosLocalStorage[index].descricao = descricao;
            dadosLocalStorage[index].video = video;
        }
    });

    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));

    location.reload();

}