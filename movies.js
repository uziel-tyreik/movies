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

//
// $(window).load(function () {
//     $('#loadingDiv').hide();
// });


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


function addMovies() {
    const newMovie = {
        title: "tenet",
        rating: "5",
        poster: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg",
        year: "2020",
        genre: "Action, Sci-Fi",
        director: "Christopher Nolan",
        plot: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
        actors: "Elizabeth Debicki, Robert Pattinson, John David Washington, Aaron Taylor-Johnson",
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };

    fetch(`${url}`, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

// addMovies();

$("#addMe").click(function () {

});

function newMovie() {
    return ``
}