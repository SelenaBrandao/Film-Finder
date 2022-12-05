const movieList = document.querySelector("#filmlijst");

const removeMoviesFromDom = () => {
  while (movieList.hasChildNodes()) {
    movieList.removeChild(movieList.firstChild);
  }
};

const addMoviesToDom = (movies) => {
  removeMoviesFromDom();
  const moviesToList = movies.map((item) => {
    const newA = document.createElement("a");
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");

    newImg.src = item.poster;
    newA.href = "https://www.imdb.com/title/" + item.imdbID;
    newLi.appendChild(newA);
    newA.appendChild(newImg);
    return newLi;
  });

  moviesToList.forEach((node) => {
    movieList.appendChild(node);
  });
};

addMoviesToDom(movies);

const handleOnChangeEvent = (event) => {
  switch (event.target.value) {
    case "alle":
      addMoviesToDom(movies);
      break;    
    case "nieuwe":
      addMoviesToDom(filterLatestMovies());
      break;
    case "prinses":
      addMoviesToDom(filterMovies("Princess"));
      break;
    case "batman":
      addMoviesToDom(filterMovies("Batman"));
      break;
    case "x-men":
      addMoviesToDom(filterMovies("X-Men"));
      break;
    case "avenger":
      addMoviesToDom(filterMovies("Avengers"));
      break;
    
  }
};

const radioButton = document.querySelectorAll(`[name="film-filter"]`);
radioButton.forEach((radio) => {
  radio.addEventListener("change", handleOnChangeEvent);
});

function filterMovies(wordInMovie) {
  removeMoviesFromDom();
  return movies.filter((movie) => {
    return movie.title.includes(wordInMovie);
  });
}

const filterLatestMovies = () => {
  removeMoviesFromDom();
  return movies.filter((movie) => {
    return movie.year >= 2014;
  });
};