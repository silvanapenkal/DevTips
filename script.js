KEY_BD = "DevTips";
let formulario = document.getElementById("formulario");
let divCards = document.getElementById("apresentacaoCartoes");
let listaRegistros = new Array;


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (localStorage.hasOwnProperty("DevTips")) {
        listaRegistros = JSON.parse(localStorage.getItem("DevTips"))
    }
    console.log(listaRegistros.length);
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
    console.log(listaRegistros);
    gravar();
    acrescentarCard(id, titulo, linguagem, categoria, descricao, video);
});

window.addEventListener('load', () => {
    const data = localStorage.getItem(KEY_BD)
    data?listaRegistros = JSON.parse(data):null;
    inicializarCards();
})

function carregar(){
    dadosLocalStorage?inicializarCards():null;
}

function ler(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


function pesquisar(value){
    FILTRO = value;
    desenhar()
}

function gravar(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) )
}

function inicializarCards(){

    let dadosLocalStorage = JSON.parse(localStorage.getItem("DevTips"));

    dadosLocalStorage.map( (dica,index) => {
      
            let cartao = document.createElement("div");
            cartao.className="card";
            divCards.appendChild(cartao);
            cartao.id="cartao"+dica.id;

            let corpoCartao = document.createElement("div");
            corpoCartao.className="card-body";
            cartao.appendChild(corpoCartao);

            let titulo = document.createElement("h5");
            corpoCartao.appendChild(titulo);
            titulo.className="card-title";
            titulo.innerText = dica.titulo;

            let linguagem = document.createElement("p");
            corpoCartao.appendChild(linguagem);
            linguagem.className = "card-text";
            linguagem.innerText = dica.linguagem;

            let categoria = document.createElement("p");
            corpoCartao.appendChild(categoria);
            categoria.className = "card-text";
            categoria.innerText = dica.categoria;

            let descricao= document.createElement("p");
            corpoCartao.appendChild(descricao);
            descricao.className = "card-text";
            descricao.innerText = dica.descricao;

            let editar = document.createElement("a");
            corpoCartao.appendChild(editar);
            editar.className = "btn btn-primary";
            editar.id = "editar" + dica.id;
            editar.innerText = "Editar";

            let apagar = document.createElement("a");
            corpoCartao.appendChild(apagar);
            apagar.className = "btn btn-primary";
            apagar.id = "apagar" + dica.id;
            apagar.innerText = "Apagar";
            apagar.setAttribute('onclick','apagar (id)');

            let link = document.createElement("a");
            corpoCartao.appendChild(link);
            link.className = "btn btn-primary";
            link.id = "link" + dica.id;
            link.innerText = "Link";
            link.setAttribute('href', dica.video);
        }
    )
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

            let editar = document.createElement("a");
            corpoCartao.appendChild(editar);
            editar.className = "btn btn-primary";
            editar.id = "editar" + novoId;
            editar.innerText = "Editar";

            let apagar = document.createElement("a");
            corpoCartao.appendChild(apagar);
            apagar.className = "btn btn-primary";
            apagar.id = "apagar" + novoId;
            apagar.innerText = "Apagar";
            apagar.setAttribute('onclick','apagar (id)');

            let link = document.createElement("a");
            corpoCartao.appendChild(link);
            link.className = "btn btn-primary";
            link.id = "link" + novoId;
            link.innerText = "Link";
            link.setAttribute('href', novoVideo);


}

function apagar(id){
    let dadosLocalStorage = JSON.parse(localStorage.getItem("DevTips"));
    let tamanhoId = id.length;
    let identificacao = id.slice(6,tamanhoId);
    if (window.confirm(`Você tem certeza que quer apagar a dica ${identificacao}`)) {               
        dadosLocalStorage = dadosLocalStorage.filter( dica => { return dica.id != identificacao } );
    };
    localStorage.setItem(KEY_BD, JSON.stringify(dadosLocalStorage));

    // if (window.confirm(`Você tem certeza que quer apagar a dica ${identificacao}`)){               
    //         const apagarDica = dadosLocalStorage.filter(dica => (dica.id != identificacao));
    //         return apagarDica}
    let valor = ("cartao"+identificacao);
    console.log(valor)
    let filho = document.getElementById(valor);
    divCards.removeChild(filho);
    
    
        // window.location.reload(true);
}

 

  

// function listar(){
//     const divCards = document.getElementById("apresentacaoCartoes");
//     if(divCards){
//         var data = listaRegistros.dicas;
//         if(FILTRO.trim()){
//             const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
//             data = data.filter( usuario => {
//                 return expReg.test( usuario.nome ) || expReg.test( usuario.fone )
//             } )
//         }
//         data = data
//             .sort( (a, b) => {
//                 return a.nome < b.nome ? -1 : 1
//             })
//             .map( usuario => {
//                 return `<tr>
//                         <td>${usuario.id}</td>
//                         <td>${usuario.nome}</td>
//                         <td>${usuario.fone}</td>
//                         <td>
//                             <button onclick='vizualizar("cadastro",false,${usuario.id})'>Editar</button>
//                             <button class='vermelho' onclick='perguntarSeDeleta(${usuario.id})'>Deletar</button>
//                         </td>
//                     </tr>`
//             } )
//         tbody.innerHTML = data.join('')
//     }
// }