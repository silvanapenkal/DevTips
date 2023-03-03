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

    let qtdadeRegistros = dadosLocalStorage.length;

    

    console.log(dadosLocalStorage, qtdadeRegistros, dadosLocalStorage[0]);
            
    for (let i=0; i < qtdadeRegistros; i++) {


        
     
            let cartao = document.createElement("div");
            cartao.className="card";
            divCards.appendChild(cartao);
            let corpoCartao = document.createElement("div");
            corpoCartao.className="card-body";
            cartao.appendChild(corpoCartao);
            let titulo = document.createElement("h5");
            titulo.className="card-title";
            // titulo.value=item.titulo;
  

        


            // let valor1= JSON.stringify(valor);

            // let linhas = corpoTabela.rows.length;
            // let linha = corpoTabela.insertRow(linhas);

            // let musica = linha.insertCell(0);
            // let cantor = linha.insertCell(1);

            // musica.innerHTML = valor.nome;
            // cantor.innerHTML = valor.cantor;
            // botao = document.createElement("button");
            // linha.appendChild(botao)
            // botao.innerText = 'Apagar';

            // botao.setAttribute('onclick','apagar (id)');
            // botao.setAttribute('id','botao'+i);
        
            
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