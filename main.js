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
};

//######################################### Funcionalidade que permite buscar apertando Enter ou clicando no icone de busca:
const pesquisa = document.querySelector('.lupa');
pesquisa.addEventListener("click", pesquisaMovies)
document.querySelector('.pesquisa').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
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
    // if (movies[qtd].isFavorited === false) {
    //     var iconHeart = "img/Heart.svg"
    // } else {
    //     var iconHeart = "img/Vector.svg"
    // };

    if (lista[qtd].backdrop_path == null) {
        allCards.innerHTML += `
        <article class="card">
            <img class="img-filme" src="./img/semImagem.png">
            <div class="box-card">
                <p class="texto-card1">${lista[qtd].title} (${lista[qtd].release_date.slice(0, 4)})</p>
                <div class="classificacao">
                    <img src="img/Star.svg" alt="Icone de estrela">
                    <p class="texto-card2">${lista[qtd].vote_average}</p>
                    <img src="img/Heart.svg" alt="Icone do coração" class="icone-coracao">
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
                    <img src="img/Heart.svg" alt="Icone do coração" class="icone-coracao">
                    <p class="texto-card2">Favoritar</p>
                </div>
            </div>
            <p class="sinopse">${lista[qtd].overview}</p>
        </article>
        `
    }

};
