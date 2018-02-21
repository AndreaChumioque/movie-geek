$(document).ready(function() {
  // Declarando variables
  var inputFld = $('#titleFld');
  var $searchBtn = $('#searchBtn');
  var movieList = $('#movieList');

  const apiKey = '104b6b3edad3ec946caa9bae8940699c';

  var arrResults = [];

  var $movie = $('.movie');

  // Asociando eventos
  $searchBtn.click(handleSearchBtn);
  $(document).on('click', $movie, getDetails);

  // Función para hacer la busqueda general
  function handleSearchBtn() {
    let title = inputFld.val();
    // console.log(title);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURI(title)}`;

    $.ajax({
      url: url,
      success: renderMovies,
    });
  };

  // Función para mostrar filtrando por genero Sci-fi, Adventure y/o Fantasy
  function renderMovies(response) {
    $('#movieList').empty();
    var data = response.results;

    for (const movie of data) {
      if (movie.genre_ids.includes(28) || movie.genre_ids.includes(878)) {
        console.log(movie);
        let image;

        if (movie.poster_path) {
          image = `<div class="col-4">
          <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        </div>`;
        } else {
          image = `<div class="col-4">
          <img class="img-fluid" src="assets/images/not-picture.svg">
        </div>`;
        }

        let info = `<div class="col-8 info">
                      <h4>${movie.title}</h4>
                      <p><i class="fas fa-users"></i> ${movie.popularity.toFixed(1)}%</p>
                      <p><i class="fas fa-star"></i> ${movie.vote_average}</p>
                      <p class="d-none d-sm-block"><i class="fas fa-file-alt"></i> ${movie.overview}</p>
                    </div>`;

        let structure = `<li class="d-block mt-3 p-2 box-shadow col-10 offset-1 col-md-8 offset-md-2 movie" id="${movie.original_title}">
                          <div class="row">
                          ${image}
                          ${info}
                          </div>
                        </li>`;

        $('#movieList').append(structure);
      }
    }
  }

  function getDetails(event) {
    var target = $(event.target).closest('li');
    if (target.hasClass('movie')) {
      localStorage.selectedMovieID = target.attr('id');
      console.log('holi');
      $(location).attr('href', 'movie-info.html');
    }
  }
});
