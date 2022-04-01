const url = 'https://detailed-deadpan-professor.glitch.me/movies'

//url to see database
//https://glitch.com/edit/#!/detailed-deadpan-professor?path=db.json%3A46%3A5

loadScreen()

function loadScreen() {
    //language=HTML
    $('#movies').append('<div id="loadingDiv"><div class="loader"></div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 1000);
    });

    function removeLoader() {
        $("#loadingDiv").remove();
    }

    setTimeout(getFetch, 1000)
}

function getFetch() {
    //language=HTML
    fetch(url)
        .then(data => data.json())
        .then(data => getMovies(data))
}


//displays all movies with fetch
function getMovies(movies) {
    let moviesCards = ""
    //languages=HTML
    movies.forEach((movie) => {
        moviesCards += getMovieCard(movie)
    })
    $('#movies').append(moviesCards)
    editMovieClick()
}

function getMovieCard(movie) {
    let movieTitle = movie.title
    let moviePoster = movie.poster
    let moviePlot = movie.plot
    let movieRating = movie.rating
    let idNumber = movie.id
    return `
            <h1>Movie Number: ${idNumber}</h1>
            <div class="card">
                <div class="card-front">
                    <img class="card-img" src="${moviePoster}" alt="Movie Image"></div>
                <div class="card-back">
                    <h3>${movieTitle}</h3>
                    <p>${moviePlot}</p>
                    <label for="edit-movie">edit movie:</label>
                    <button id="edit-movie" class="edit-movie">${idNumber}</button>
                    <button class="delete-movie">-</button>
                </div>
            </div>
        `
}

//when click, form pops up
$("#addMe").click(function () {
    $('#newMovie').css('display', 'block')
});


//get values from form and do post request
$('#info').click(function (e) {
    e.preventDefault()
    let movieTitle = $("#mTitle").val()
    let movieRating = $("#mRating").val()
    let moviePlot = $("#mPlot").val()
    const newMovie = {
        title: `${movieTitle}`,
        rating: `${movieRating}`,
        year: "2020",
        genre: "Action, Sci-Fi",
        director: "Christopher Nolan",
        plot: `${moviePlot}`,
        actors: ""
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(`${url}`, options)
        .then(response => response.json())
        .then(movie => {
            alert("movie added")
            let movieCard = $(getMovieCard(movie));
            movieCard.find('.edit-movie').hover(function () {
                let movieNumber = parseInt($(this).html())
                editMovieClick()
                editMovie(movieNumber)
            })
            $('#movies').append(movieCard)
        })
        .catch(error => console.error(error));

    $('#newMovie').css('display', 'none')
})


//closes form
$(".close-icon").click(function () {

    $('#newMovie').css('display', 'none')
})


//delete movies function
function deleteMovie(id) {
    const deleteMovie = {
        id: `${id}`
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteMovie),
    };
    fetch(`${url}/${id}`, options)
        .then(response => response.json())
        .catch(error => console.error(error));
}

// deleteMovie(6)
$("#delete").click(function (e) {
    e.preventDefault()
    let valueForm = parseInt($("#movieid").val())
    deleteMovie(valueForm)
})

$("#deleteMe").click(function () {
    $("#deleteOneMovie").css('display', 'block')
    $(".close-icon").click(function () {

        $("#deleteOneMovie").css('display', 'none')
    })
})

//edit movies function
function editMovie(id, movieTitle, movieRating, moviePoster, movieActors, movieGenre,
                   movieDirector, movieYear, moviePlot) {
    const editMovie = {
        title: `${movieTitle}`,
        rating: `${movieRating}`,
        year: `${movieYear}`,
        genre: `${movieGenre}`,
        director: `${movieDirector}`,
        plot: `${moviePlot}`,
        actors: `${movieActors}`,
        poster: `${moviePoster}`
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMovie),
    };
    fetch(`${url}/${id}`, options)
        .then(response => response.json())
        .catch(error => console.error(error));
}


//listener for edit button
function editMovieClick() {
    $(".edit-movie").click(function () {
        let movieNumber = parseInt($(this).html())
        getEditMovieValues(movieNumber)
        console.log('click')
    })
}


//listener for edit movie
function getEditMovieValues(id) {
    $("#editBtn").click(function () {
        console.log("click after the click")
        let movieTitle = $("#editTitle").val()
        let movieRating = $("#editRating").val()
        let moviePoster = $("#editPoster").val()

        let moviePlot = $("#editPlot").val()
        let movieYear = $("#editYear").val()
        let movieGenre = $("#editGenre").val()
        let movieDirector = $("#editDirector").val()
        let movieActors = $("#editActors").val()
        editMovie(id, movieTitle, movieRating, moviePoster, movieActors, movieGenre,
            movieDirector, movieYear, moviePlot)
    })
}


//98