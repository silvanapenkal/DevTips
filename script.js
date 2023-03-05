KEY_BD = "DevTips";
let formulario = document.getElementById("formulario");
let divCards = document.getElementById("apresentacaoCartoes");
let listaRegistros = new Array;


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (localStorage.hasOwnProperty("DevTips")) {
        listaRegistros = JSON.parse(localStorage.getItem("DevTips"))
    }
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
    gravar();
    acrescentarCard(id, titulo, linguagem, categoria, descricao, video);
});

window.addEventListener('load', () => {
    const data = localStorage.getItem(KEY_BD)
    data?listaRegistros = JSON.parse(data):null;
    inicializarCards(listaRegistros);
})

function ler(){
    const localStorage = localStorage.getItem(KEY_BD)
    if(localStorage){
        listaRegistros = JSON.parse(localStorage)
    }
    inicializarCards(listaRegistros)
}

function gravar(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) )
}

function inicializarCards(dadosLocalStorage){

    dadosLocalStorage.map( (dica,index) => {
        acrescentarCard(dica.id, dica.titulo, dica.linguagem, dica.categoria, dica.descricao, dica.video)            
    })

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

    let softskills = document.getElementById("somaSoftskills");
    softskills.innerText = totalComportamental;

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
    editar.setAttribute("data-bs-toggle","myModal");
    editar.setAttribute("data-bs-target","#exampleModal");

    let apagar = document.createElement("button");
    corpoCartao.appendChild(apagar);
    apagar.className = "btn btn-primary";
    apagar.id = "apagar" + novoId;
    apagar.innerText = "Apagar";
    apagar.setAttribute('onclick','apagar (id)');

    if (novoVideo){
        console.log("oi");
        let link = document.createElement("a");
        corpoCartao.appendChild(link);
        link.className = "btn btn-primary";
        link.id = "link" + novoId;
        link.innerText = "Link";
        link.setAttribute('href', novoVideo);
    }
}

function apagar(id){
    let dadosLocalStorage = JSON.parse(localStorage.getItem("DevTips"));
    let tamanhoId = id.length;
    let identificacao = id.slice(6,tamanhoId);
    if (window.confirm(`Você tem certeza que quer apagar a dica ${identificacao}`)) {               
        dadosLocalStorage = dadosLocalStorage.filter( dica => { return dica.id != identificacao } );
    };
    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));
    let valor = ("cartao"+identificacao);
    let filho = document.getElementById(valor);
    divCards.removeChild(filho); 
}

function pesquisar(value){
    let filtro = value;
    let dadosLocalStorage = JSON.parse(localStorage.getItem("DevTips"));
    const divCards = document.getElementById("apresentacaoCartoes");
        if(filtro.trim()){
            divCards.innerHTML ="";
            const expReg = eval(`/${filtro.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            dadosLocalStorage = dadosLocalStorage.filter( dica => {
                return expReg.test( dica.titulo ) || expReg.test( dica.categoria) || expReg.test( dica.descricao) || expReg.test( dica.linguagem)
            } )      
        }
        inicializarCards(dadosLocalStorage);
        
    }

    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('editar1')
    
    myModal.addEventListener('shown.bs.modal', () => {
      editar1.focus()
    })