const url = 'https://wandering-morning-tortellini.glitch.me/movies'


loadScreen()

function loadScreen() {
    //language=HTML
    $('#movies').append('<div id="loadingDiv"><div class="loader"></div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

    function removeLoader() {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    }

    setTimeout(getFetch, 1000)

    function getFetch() {
        //language=HTML
        fetch(url)
            .then(data => data.json())
            .then(data => getMovies(data))
    }
}


$(window).load(function () {
    $('#loadingDiv').hide();
});


function getMovies(movie) {

    let moviesCards = ""
    //languages=HTML
    movie.forEach((movie, movies) => {
        console.log(movie)
        let movieTitle = movie.title
        let moviePoster = movie.poster
        let moviePlot = movie.plot
        let movieRating = movie.rating
        moviesCards += ` <div class="card">
        <div class="card-front">
            <img class="card-img" src="${moviePoster}" alt="Movie Image"></div>
        <div class="card-back">
            <h3>${movieTitle}</h3>
            <p>${moviePlot}</p>
         <button id="edit-movie">+</button><button id="delete-movie">-</button>
        </div>
    </div>
 `


    })
    $('#movies').append(moviesCards)
}