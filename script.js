KEY_BD = "DevTips";
var formulario = document.getElementById("formulario");
var divCards = document.getElementById("apresentacaoCartoes");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let listaRegistros = new Array;
    if (localStorage.hasOwnProperty("DevTips")) {
        listaRegistros = JSON.parse(localStorage.getItem("DevTips"))
    }
    let id = listaRegistros.length+1;
    let titulo = document.getElementById("titulo").value;
    let linguagem = document.getElementById("linguagem").value;
    let categoria = document.getElementById("categoria").value;
    let descricao = document.getElementById("descricao").value;
    let video = document.getElementById("video").value;
    listaRegistros.push({
        id, titulo, linguagem, categoria, descricao, video
    })
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros));
    atualizar();
});



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

function confirmarExclusao(id){
    if(confirm('Você tem certeza que quer apagar a dica de id '+id)){
        apagarDica(id)
    }
}

function apagarDica (id){
    listaRegistros.dicas= listaRegistros.dicas.filter( dica => {
        return usuario.id != id
    } )
    gravarBD();
}

function atualizar(){

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

        }
    )
}
 

        function apagar(id){
            let dadosLocalStorage = JSON.parse(localStorage.getItem("DevTips"));
            let tamanhoId = id.length;
            let identificacao = id.slice(6,tamanhoId);

            if (window.confirm(`Você tem certeza que quer apagar id ${identificacao}`)){               
                let valor = ("cartao"+identificacao);
                localStorage.removeItem(valor);
                let novoValorLocalStorage = dadosLocalStorage.slice(identificacao-1,identificacao);
                console.log(valor, novoValorLocalStorage);
                atualizar();
            }
            
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