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
        .then(data => {getMovies(data)
        appendLogoText()})
}


// append image logo and text

function appendLogoText(){
    $("#rock").html("<img class=\"groudon\" src=\"groudon.gif\" width=\"800px\" height=\"340px\">")
    $("#rock-text").html("<h1 class=\"fire\">UNDERGROUND MOVIE MADNESS!!!</h1>")
}


//displays all movies with fetch
function getMovies(movies) {
    let moviesCards = ""
    //languages=HTML
    movies.forEach((movie) => {
        moviesCards += getMovieCard(movie)

    })
    $('#movies').html(moviesCards)
    editMovieClick()
}

function getMovieCard(movie) {
    let movieTitle = movie.title
    let moviePoster = movie.poster
    let moviePlot = movie.plot
    let movieRating = movie.rating
    let idNumber = movie.id
    let movieGenre = movie.genre
    return `

            <h1 class="title-cards">Movie #${idNumber}: ${movieTitle}
            <br>Rating: ${movieRating}/10</h1>
            
            <div class="card">
                <div class="card-front">
                    <img class="card-img" src="${moviePoster}" alt="Movie Image"></div>
                <div class="card-back">
                    <h3>${movieTitle}</h3>
                    <h6>Genre: <br>
                    ${movieGenre}</h6>
                    <summary>Plot:
                    <details class="movie-plot">${moviePlot}</details>
                    </summary>
                    <label for="edit-movie">edit movie:</label>
                    <button class="edit-movie">${idNumber}</button>
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
                // editMovie(movieNumber)
                // getEditMovieValues()
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
        .then(movie => {
            alert("movie deleted successfully")
            getFetch(movie)
        })
        .catch(error => console.error(error))
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
function editMovie(id, thisImg, movieTitle, movieRating, movieActors, movieGenre,
                   movieDirector, movieYear, moviePlot) {
    const editMovie = {
        title: `${movieTitle}`,
        rating: `${movieRating}`,
        year: `${movieYear}`,
        genre: `${movieGenre}`,
        director: `${movieDirector}`,
        plot: `${moviePlot}`,
        actors: `${movieActors}`,
        poster: `${thisImg}`
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
        .then(movie => {
            getFetch(movie)
        })
        .catch(error => console.error(error));
}


//listener for edit button
function editMovieClick() {
    $(".edit-movie").click(function () {
        $("#edit-movie-form").css('display', 'block')
        let movieNumber = parseInt($(this).html())
        let thisImg = $(this).parent().parent().children('.card-front').children('.card-img').attr('src')
        getEditMovieValues(movieNumber, thisImg)
    })
}


//listener for edit movie
function getEditMovieValues(id, thisImg) {

    $("#editBtn").click(function () {
        $("#editBtn").off('click');
        let movieTitle = $("#editTitle").val()
        let movieRating = $("#editRating").val()
        let moviePoster = $("#editPoster").val()
        if (moviePoster) {
            thisImg = moviePoster
        }
        let moviePlot = $("#editPlot").val()
        let movieYear = $("#editYear").val()
        let movieGenre = $("#editGenre").val()
        let movieDirector = $("#editDirector").val()
        let movieActors = $("#editActors").val()
        editMovie(id, thisImg, movieTitle, movieRating, moviePoster, movieActors, movieGenre,
            movieDirector, movieYear, moviePlot)
    })
}

//close model
$(".close-model").click(function () {

    $("#editBtn").off('click');
    $("#edit-movie-form").css('display', 'none')
})


//go back up

let myBtn = document.getElementById('btn')
window.onscroll = function () {
    scrollBtn()
};

//destroy btm
let destroyBtn = document.getElementById('destroy')

function scrollBtn() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        myBtn.style.display = "block";
    } else {
        myBtn.style.display = "none";
    }
}

function goTop() {
    document.documentElement.scrollTop = 0
}

