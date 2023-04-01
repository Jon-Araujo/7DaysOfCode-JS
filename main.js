const allCards = document.querySelector(".filmes-cards");

//################################################# Recarregar página com resultados gerais:
const tituloPrincipal = document.getElementById('titulo-principal');
tituloPrincipal.addEventListener("click", () => { window.location.reload() })

//################################################# Função que puxa dados gerais da API:

const movies = [];

async function solicitaMovies() {
    var KeyAPI = await (await fetch('./KeyAPI.json')).json();

    var moviesAPI = await (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KeyAPI.chave.key}`)).json();
    for (let i = 0; i < moviesAPI.results.length; i++) {
        movies.push(moviesAPI.results[i])
    }

    allCards.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        renderMovie(i, movies)
    }

    //############################################# Botão de favoritar:

    const btnHeart = document.querySelectorAll('.icone-coracao');
    const card = document.querySelectorAll(".card");
    for (let i = 0; i < btnHeart.length; i++) {
        btnHeart[i].addEventListener("click", () => {
            favoriteMovies(card[i])
        })
    }

};

//######################################### Funcionalidade que permite buscar apertando Enter ou clicando no icone de busca:
const pesquisa = document.querySelector('.lupa');
pesquisa.addEventListener("click", () => {
    filmesPesquisados.splice(0, filmesPesquisados.length)
    pesquisaMovies()
})
document.querySelector('.pesquisa').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        filmesPesquisados.splice(0, filmesPesquisados.length)
        pesquisaMovies();
    }
});

//################################################# Função que puxa dados selecionados da API  para buscar pelo nome do filme:

const filmesPesquisados = [];

async function pesquisaMovies() {
    var KeyAPI = await (await fetch('./KeyAPI.json')).json();
    const nomeDigitado = document.querySelector('.pesquisa').value;

    var resultado = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KeyAPI.chave.key}&query=${nomeDigitado}`)).json();

    for (let i = 0; i < resultado.results.length; i++) {
        filmesPesquisados.push(resultado.results[i])
    };

    allCards.innerHTML = "";

    for (let i = 0; i < filmesPesquisados.length; i++) {
        renderMovie(i, filmesPesquisados)
    };


};

//################################################# Função que recebe dados já puxados da API para mostrar resultados na tela:

async function renderMovie(qtd, lista) {
    if (lista[qtd].backdrop_path == null) {
        allCards.innerHTML += `
        <article class="card">
            <img class="img-filme" src="./img/semImagem.png">
            <div class="box-card">
                <p class="texto-card1">${lista[qtd].title} (${lista[qtd].release_date.slice(0, 4)})</p>
                <div class="classificacao">
                    <img src="img/Star.svg" alt="Icone de estrela">
                    <p class="texto-card2">${lista[qtd].vote_average}</p>
                    <img alt="Icone do coração" class="icone-coracao">
                    <p class="texto-card2">Favoritar</p>
                </div>
            </div>
            <p class="sinopse">${lista[qtd].overview}</p>
        </article>
        `
    } else {
        allCards.innerHTML += `
        <article class="card">
            <img class="img-filme" src="https://image.tmdb.org/t/p/w500/${lista[qtd].backdrop_path}">
            <div class="box-card">
                <p class="texto-card1">${lista[qtd].title} (${lista[qtd].release_date.slice(0, 4)})</p>
                <div class="classificacao">
                    <img src="img/Star.svg" alt="Icone de estrela">
                    <p class="texto-card2">${lista[qtd].vote_average}</p>
                    <img class="icone-coracao" src="img/Heart.svg" alt="Icone de coração">
                    <p class="texto-card2">Favoritar</p>
                </div>
            </div>
            <p class="sinopse">${lista[qtd].overview}</p>
        </article>
        `
    }
};

//################################################# Função para favoritar filmes:

function favoriteMovies(card) {

    if (localStorage.favoriteMovies) {
        listFavorites = JSON.parse(localStorage.getItem('favoriteMovies'))
    }

    else {
        var listFavorites = []
    }

    listFavorites.push(card.outerHTML)
    localStorage.favoriteMovies = JSON.stringify(listFavorites);
};

//################################################# Função para mostrar apenas cards favoritados:

var onlyFav = document.querySelector('.check');
onlyFav.addEventListener("click", showFavorites)

 function showFavorites() {
    allCards.innerHTML = "";

    if (localStorage.favoriteMovies) {
        var listJSON = JSON.parse(localStorage.getItem('favoriteMovies'));
        for (let i = 0; i < listJSON.length; i++) {
            allCards.innerHTML = `${listJSON[i]}`
        };
        onlyFav.addEventListener("click", () => {window.location.reload()})
    } else {
        allCards.innerHTML = `<h2>Não há filmes favoritados!</h2>`;
        onlyFav.addEventListener("click", () => {window.location.reload()})
    }
 }
