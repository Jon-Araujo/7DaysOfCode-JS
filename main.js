const movies = [];
async function solicitaMovies() {
    var KeyAPI = await( await fetch('./KeyAPI.json')).json();

    var moviesAPI = await( await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KeyAPI.chave.key}`)).json();
    for (let i = 0; i < moviesAPI.results.length; i++) {
        movies.push(moviesAPI.results[i])
    }
    
    for (let i = 0; i < movies.length; i++) {
        renderMovie(i)
    }
    console.log(KeyAPI.chave.key)
};
    

async function renderMovie(qtd) {
    const allCards = document.querySelector(".filmes-cards");
    // if (movies[qtd].isFavorited === false) {
    //     var iconHeart = "img/Heart.svg"
    // } else {
    //     var iconHeart = "img/Vector.svg"
    // };

    allCards.innerHTML += `
    <article class="card">
        <img class="img-filme" src="https://image.tmdb.org/t/p/w500/${movies[qtd].backdrop_path}">
        <div class="box-card">
            <p class="texto-card1">${movies[qtd].title} (${movies[qtd].release_date.slice(0, 4)})</p>
            <div class="classificacao">
                <img src="img/Star.svg" alt="Icone de estrela">
                <p class="texto-card2">${movies[qtd].vote_average}</p>
                <img src="img/Heart.svg" alt="Icone do coração" class="icone-coracao">
                <p class="texto-card2">Favoritar</p>
            </div>
        </div>
        <p class="sinopse">${movies[qtd].overview}</p>
    </article>
    `
};
