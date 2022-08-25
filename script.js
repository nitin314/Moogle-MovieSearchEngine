// function to fetch search results
async function SearchFetch(e){
    if(e.target.value === ''){
        clearSearchWindow();
        AnimationShow();
        return;
    }
    console.log(e.target.value);
    let response = await fetch(`http://omdbapi.com/?apikey=33e7e6c6&s=${e.target.value}`);
    let movies = await response.json();
    console.log(movies);
    if(movies.Response === 'False'){
        noMovieFound();
        return;
    }
    showSearchResults(movies.Search);
}

// no movie found function
function noMovieFound(){
    root.innerHTML = `<p class="noMovie">No Movie Found</p>`;
    document.querySelector('.noMovie').classList.add('noMovieFound');
}
// funciton to search movie by the ID
async function FetchFullMovie(e){
    console.log(e.currentTarget.imdbID);
    let response = await fetch(`http://omdbapi.com/?apikey=33e7e6c6&i=${e.currentTarget.imdbID}`);
    let movie = await response.json();
    console.log(movie);
    updateInputText(movie.Title);
    showSelectedMovie(movie);
}

// reusable debounce maker function
function debounce(func,delay=1000){
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(null,args);
        },delay);
    }

}

const input = document.querySelector('input');
input.addEventListener('input', debounce(SearchFetch,500))


const root = document.querySelector('.root');
// function to create html for the search result items
function searchItemCreator(movie){
    return `
        <div class="poster">
            <img src="${movie.Poster}">
        </div>
        <div class="movieNameYear">
            <h3 class="movieTitle">${movie.Title}</h3>
            <p class="movieYear">${movie.Year}</p>
        </div>
    `
}
// function to create seaarch result and append it to root element.
function showSearchResults(movies){
    clearSearchWindow();
    for(let movie of movies){
        let item = document.createElement('div');
        item.classList.add('searchItem');
        if(movie.Poster == "N/A"){
            movie.Poster = '';
        }
        item.innerHTML = searchItemCreator(movie);
        item.imdbID = movie.imdbID;
        root.appendChild(item);
        item.addEventListener('click',FetchFullMovie);
    }
}

// function which cleares the Search window
function clearSearchWindow(){
    root.innerHTML = '';
    selectedMovieContainer.innerHTML ='';
    root.classList.remove('display-none');
}

// function to update input text

function updateInputText(inputValue){
    input.value = inputValue;
}

const selectedMovieContainer = document.querySelector('.SelectedMovie');
// function to create selected movie item's HTML style
function SelectedMovieItemStyle(movie){
    return `
    <div class="section1">
        <div class="movie-header">
            <div class="image-container">
                <img class = "movie-image" src="${movie.Poster}">
            </div>
            <div class="movie-header-text-container">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
            </div>
        </div>
        <div class="movie-IMDB-Rating movie-section-style">
            <h3>IMDB RATING</h3>
            <p>${movie.imdbRating}</p>
        </div>
    </div>
    <div class="section2">
        <div class="movie-section-style">
            <h3>Box Office</h3>
            <p>${movie.BoxOffice}</p>
        </div>
        <div class="movie-section-style">
            <h3>Rated</h3>
            <p>${movie.Rated}</p>
        </div>
        <div class="movie-section-style">
            <h3>Run Time</h3>
            <p>${movie.Runtime}</p>
        </div>
    </div>
    `
}

// function to show selected Movie
function showSelectedMovie(movie){
    root.classList.add('display-none');
    selectedMovieContainer.innerHTML = SelectedMovieItemStyle(movie);

    

}

// clear everything using skull button
const clearAll = document.querySelector('.skull');
clearAll.addEventListener('click',()=>{
    clearSearchWindow();
    input.value ='';
    AnimationShow();
    
});


// amimation show
function AnimationShow(){
    root.innerHTML = `
    <div class="start-animation center">
        <p>Search a movie you want to know about</p>
        <div class="dots">
            <span class="d1">.</span><span class="d2">.</span><span class="d3">.</span><span class="d4">.</span><span class="d5">.</span>
        </div>
    </div>
    `
}
