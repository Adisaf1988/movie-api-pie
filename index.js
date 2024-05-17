// fetch Api
// HTTP requests
// Return a Promise
const API_URL = `https://www.omdbapi.com/?apikey=ffa5acbc&s=`
const API_URL_COUNTRIES = `https://restcountries.com/v3.1/all`

const loader = document.querySelector("#spinner")
const refreshMoviesButton = document.querySelector("#refreshMovies")
const searchButton = document.querySelector("#search-button")
const searchInput = document.querySelector("#search-input")

function initMovies() {
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value
        loadMovies(searchTerm)
        loadMoviesByYear(searchTerm)


    })
    refreshMoviesButton.addEventListener("click", () => {
        loadMovies()
        loadMoviesByYear()
    })
    loadMovies()
    loadMoviesByYear()

}
async function loadMovies(s) {
    try {
        clearData()
        loader.style.display = "block"
        const moviesArray = await getMoviesApi(s)
        draw(moviesArray)
        const result = moviesArray.reduce((acc, currentMovie) => {
            if (acc[currentMovie.Type]) {
                acc[currentMovie.Type] = acc[currentMovie.Type] + 1
            } else {
                acc[currentMovie.Type] = 1
            }
            return acc;
        }, {})
        const barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
            "#1e7145"
        ];
        new Chart("myChart", {
            type: "pie",
            data: {
                labels: Object.keys(result),
                datasets: [{
                    backgroundColor: barColors,
                    data: Object.values(result)
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Types"
                }
            }
        });
    } catch (ex) {
        alert("Harel - application")
    } finally {
        loader.style.display = "none"
    }
}

async function loadMoviesByYear(s) {
    try {
        clearData()
        loader.style.display = "block"
        const moviesArray = await getMoviesApi(s)
        console.log('Retrieved Movies:', moviesArray)

        draw(moviesArray)
        const result2 = moviesArray.reduce((year, currentMovie) => {
            if (year[currentMovie.Year]) {
                year[currentMovie.Year] = year[currentMovie.Year] + 1
            } else {
                year[currentMovie.Year] = 1
            }
            return year;
        }, {})
        const barColors = [
            "red",
            "yellow",
            "blue",
            "green",
            "pink",
            "purple",
            "lightblue",
            "brown",
            "black",
            "gold"
        ];
        new Chart("myChartByYear", {
            type: "pie",
            data: {
                labels: Object.keys(result2),
                datasets: [{
                    backgroundColor: barColors,
                    data: Object.values(result2)
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Year Aggregation"
                }
            }
        });
    } catch (ex) {
        alert("Harel - application")
    } finally {
        loader.style.display = "none"
    }
}
function clearData() {
    document.querySelector("#movies-content").innerHTML = "";

}

function draw(Movies) {
    if (!Array.isArray(Movies)) return
    clearData();
    const moviesContainer = document.querySelector("#movies-content")
    const moviesCards = Movies.map(movie => getSingleMovie(movie))
    moviesContainer.append(...moviesCards)
}
function getSingleMovie(movie) {
    if (typeof movie !== 'object') return;
    const singleMovieDiv = document.createElement("div")
    singleMovieDiv.id = movie.imdbID
    singleMovieDiv.classList.add("singleMovieDiv")
    const title = document.createElement("h3")
    const year = document.createElement("h5")
    const imdbID = document.createElement("h5")
    const type = document.createElement("h5")
    const poster = document.createElement("img")

    title.innerText = movie.Title
    year.innerText = "Year: " + movie.Year
    imdbID.innerText = "imdbID: " + movie.imdbID
    type.innerText = "Type: " + movie.Type
    poster.src = movie.Poster

    singleMovieDiv.append(title, year, imdbID, type, poster)
    return singleMovieDiv
}
async function initCountries() {

    try {
        const countriesArray = await getCountriesApi()
        document.querySelector("#countries-length").innerText = `the number of countries is: ${countriesArray.length}`
    } catch (error) {

    }

}
async function getMoviesApi(movieSearch = "scream") {
    const result = await fetch(API_URL + movieSearch, {
        method: "GET",
    })
    const data = await result.json()
    return data.Search;
}
async function getCountriesApi() {
    const result = await fetch(API_URL_COUNTRIES, {
        method: "GET",
    })
    const data = await result.json()
    return data;
}




initMovies()
initCountries()


