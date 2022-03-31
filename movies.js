const url = 'https://detailed-deadpan-professor.glitch.me/movies'

//url to see database
//https://glitch.com/edit/#!/detailed-deadpan-professor?path=db.json%3A46%3A5

loadScreen()

function loadScreen() {
    //language=HTML
    $('#movies').append('<div id="loadingDiv"><div class="loader"></div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
    });

    function removeLoader() {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
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
function getMovies(movie) {

    console.log(movie)
    let moviesCards = ""
    //languages=HTML
    movie.forEach((movie, movies) => {
        let movieTitle = movie.title
        let moviePoster = movie.poster
        let moviePlot = movie.plot
        let movieRating = movie.rating
        let idNumber = movie.id
        console.log(idNumber)
        moviesCards += `
            <h1 class="info-number">${idNumber}</h1>
            <div class="card">
                <div class="card-front">
                    <img class="card-img" src="${moviePoster}" alt="Movie Image"></div>
                <div class="card-back">
                    <h3>${movieTitle}</h3>
                    <p>${moviePlot}</p>
                    <button class="edit-movie">+</button>
                    <button class="delete-movie">-</button>
                </div>
            </div>
        `
    })

    $('#movies').append(moviesCards)
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
        .then(response => console.log(response))
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
        .then(response => console.log(response))
        .catch(error => console.error(error));
}

// deleteMovie(6)
$("#delete").click(function (e){
    e.preventDefault()
    let valueForm = parseInt($("#movieid").val())
    deleteMovie(valueForm)
})

$("#deleteMe").click(function (){
    $("#deleteOneMovie").css('display', 'block')
    $(".close-icon").click(function () {

        $("#deleteOneMovie").css('display', 'none')
    })
})