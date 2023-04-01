//################################################# Recarregar página com resultados gerais:
const tituloPrincipal = document.getElementById('titulo-principal');
tituloPrincipal.addEventListener("click", () => { window.location.reload() })

//################################################# Função que puxa dados gerais da API:

const allCards = document.querySelector(".filmes-cards");

const movies = [];

const noFavImg = '<img class="icone-coracao" src="img/Heart.svg" alt="Icone de coração">';
const favImg = '<img class="icone-coracao" id="favoritado" src="img/Vector.svg" alt="Icone de coração">'

async function solicitaMovies() {

    var KeyAPI = await (await fetch('./KeyAPI.json')).json();

    var moviesAPI = await (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KeyAPI.chave.key}`)).json();
    for (let i = 0; i < moviesAPI.results.length; i++) {
        movies.push(moviesAPI.results[i])
    }

    allCards.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        renderMovie(i, movies, noFavImg)
    }

    //############################################# Botão de favoritar:
    const btnHeart = document.querySelectorAll('.icone-coracao');
    const card = document.querySelectorAll(".card");
    const spanFavImg = document.querySelectorAll(".spanFavImg");

    for (let i = 0; i < btnHeart.length; i++) {
        btnHeart[i].addEventListener("click", () => {
            spanFavImg[i].innerHTML = favImg
            favoriteMovies(card[i])
        })
    }

    // //############################################# Funcionalidade de trocar img so coração de favorito:
    // const btnNoFavImg = document.querySelectorAll('#favoritado')
    // btnNoFavImg.setAttribute("src", "img/Heart.svg")
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

async function renderMovie(qtd, lista, favImg) {
    if (lista[qtd].backdrop_path == null) {
        allCards.innerHTML += `
        <article class="card">
            <img class="img-filme" src="./img/semImagem.png">
            <div class="box-card">
                <p class="texto-card1">${lista[qtd].title} (${lista[qtd].release_date.slice(0, 4)})</p>
                <div class="classificacao">
                    <img src="img/Star.svg" alt="Icone de estrela">
                    <p class="texto-card2">${lista[qtd].vote_average}</p>
                    <span class="spanFavImg">${favImg}</span>
                    <p class="texto-card2">Favoritar</p>
                </div>
            </div>
            <p class="sinopse">${lista[qtd].overview}</p>
        </article>
        `
    } else {
        allCards.innerHTML += `
        <article class="card" id="${qtd}">
            <img class="img-filme" src="https://image.tmdb.org/t/p/w500/${lista[qtd].backdrop_path}">
            <div class="box-card">
                <p class="texto-card1">${lista[qtd].title} (${lista[qtd].release_date.slice(0, 4)})</p>
                <div class="classificacao">
                    <img src="img/Star.svg" alt="Icone de estrela">
                    <p class="texto-card2">${lista[qtd].vote_average}</p>
                    <span class="spanFavImg">${favImg}</span>
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
        var listFavorites = JSON.parse(localStorage.getItem('favoriteMovies'))
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
            allCards.innerHTML += `${listJSON[i]}`;
        };
        onlyFav.addEventListener("click", () => {window.location.reload()})
    } else {
        allCards.innerHTML = `
        <div class="sem-fav">
        <h2>Não há filmes favoritados!</h2>
        <img class="img-bandeja" src="img/bandeja.png" alt="bandeja vazia">
        </div>`;
        onlyFav.addEventListener("click", () => {window.location.reload()})
    }
    disFavor()
 }

 //################################################ Função para retirar cards da lista de favoritados:

 function disFavor() {
    var listFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
    const btnHeart = document.querySelectorAll('.icone-coracao');
    
    for (let i = 0; i < btnHeart.length; i++) {
        btnHeart[i].addEventListener("click", () => {
            listFavorites.splice(i, 1);
            if (listFavorites.length > 0) {
                localStorage.favoriteMovies = JSON.stringify(listFavorites)
                showFavorites()
            } else {
                localStorage.clear()
                allCards.innerHTML = `
        <div class="sem-fav">
        <h2>Não há filmes favoritados!</h2>
        <img class="img-bandeja" src="img/bandeja.png" alt="bandeja vazia">
        </div>`;
            }
        })
    }

    
    
 }
