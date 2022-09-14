let form = document.querySelector("form");
let search = document.getElementById("search");
let main = document.getElementById("main");

const API_URl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=efd555caed25c343367fde5ea872cd58&page=1";

const API_SEARCH_URl =
  'https://api.themoviedb.org/3/search/movie?api_key=efd555caed25c343367fde5ea872cd58&query="';

const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

getMovies(API_URl);

async function getMovies(url) {
  let response = await fetch(url);
  let data = await response.json();

  console.log(data.results);

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;

    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");

    movieEL.innerHTML = `<img
             src="${API_IMAGE_URL + poster_path}"
             alt="${title}"
    />

        <div class="info">
            <h3>${title}</h3>
            <span id="rating" class="${changeRatingClass(
              vote_average
            )}">${vote_average}</span>
        </div>

  <div class="overview">
    <h3>Overview</h3>
    <p>
      ${overview}
    </p>
  </div>`;

    main.appendChild(movieEL);
  });
}

function changeRatingClass(vote) {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else if (vote < 5) {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchTerm = search.value;

  if (searchTerm && searchTerm != "") {
    getMovies(API_SEARCH_URl + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
