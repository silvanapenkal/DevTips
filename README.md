# DevTips
Terceiro projeto do DevinHouse - Ilog

## INTRODUÇÃO

A LAB School, uma renomada escola de desenvolvimento de software, está iniciando 10
novas turmas no decorrer do próximo mês. Os professores entendem que com a chegada
dos novos alunos, será necessária a utilização de um software para que eles possam
cadastrar as dicas de programação que irão aprender no dia a dia das aulas. Para isso, foi
solicitado a criação de um sistema chamado DEVtips, com objetivo de manter as dicas e
padronização de código em um único lugar de fácil acesso.
Mãos à Obra! Pois você foi escolhido como desenvolvedor responsável pela criação da
aplicação que deverá ser escrita com HTML, CSS e JavaScript.

## REQUISITOS

1. Um título na aba do navegador, para que o usuário encontre a sua aplicação no meio
das várias abas que constantemente mantém abertas;

2. Um cabeçalho dentro da página, para que o usuário saiba facilmente em que página se
encontra e do que se trata o conteúdo;

3. Um formulário para que o usuário cadastre a dica, contendo:

        a. Título:
        i. Preenchimento: Obrigatório
        ii. Tipo de campo: Input
        iii. Mínimo de caracteres: 5
        iv. Máximo de caracteres: 50

        b. Linguagem/Skill:
        i. Preenchimento: Obrigatório
        ii. Tipo de campo: Input
        iii. Mínimo de caracteres: 2
        iv. Máximo de caracteres: 20

        c. Categoria:
        i. Preenchimento: Obrigatório
        ii. Tipo de campo: Input Dropdown
        iii. Pré-Cadastrado: FrontEnd, BackEnd, FullStack e Comportamental

        d. Descrição:
        i. Preenchimento: Obrigatório
        ii. Tipo de campo: Input Text Area
        iii. Mínimo de caracteres: 10
        iv. Máximo de caracteres: 600

        e. Vídeo do YouTube:
        i. Preenchimento: Opcional
        ii. Tipo de campo: Input
        2iii. Caracteres: Validar URL

        f. Botões de ação:
        i. Botão Salvar para cadastrar caso as regras sejam atendidas
        ii. Botão Limpar para limpar os campos do formulário

4. Cards indicativos que mostram ao usuário as estatísticas do sistema. Devem
apresentar a quantidade total de dicas cadastradas e a quantidade de dicas para cada
categoria.

5. Uma barra de busca para que o usuário consiga pesquisar por uma dica através de seu
título. Botões para pesquisar e limpar podem ser utilizados.

6. Uma lista de dicas contendo todas as informações cadastradas.

        a. Usar cards para agrupar as informações
        b. Adicionar botão para deletar a dica
        c. Adicionar botão para editar a dica
        i. Ideia: Quando clicado pode carregar o formulário de cadastro para
        edição, facilitando a codificação do sistema.
        d. Adicionar botão para abrir o vídeo com a dica
        i. Ideia: Quando não houver vídeo cadastrado, o botão pode desaparecer
        do card.

7. Utilização do alert ou modal customizado para informar as ações realizadas. Por
exemplo: Dica Cadastrada, Dica Deletada e etc

8. Mensagens de confirmação, via prompt ou modal customizado para as ações realizadas.
Por exemplo: "Você realmente deseja deletar essa dica?"

9. Lógica de programação para manipulação dos dados inseridos em um array json com
salvamento em localStorage ou em um servidor utilizando json-server.

## EXTRAS

* 100% de acessibilidade na avaliação do Lighthouse
* Responsividade