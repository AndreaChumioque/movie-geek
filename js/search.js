$(document).ready(function() {
  // Declarando variables
  var inputFld = $('#titleFld');
  var searchBtn = $('#searchBtn');
  var movieList = $('#movieList');
  var arrResults = [];

  var $movie = $('.movie');

  // Asociando eventos
  searchBtn.click(handleSearchBtn);
  $(document).on('click', $movie, getDetails);

  // Función para hacer la busqueda general
  function handleSearchBtn() {
    var title = inputFld.val();
    console.log(title);
    var url = 'https://www.omdbapi.com/?&apikey=5bb8748d&s=' + encodeURI(title) + '&type=movie';
    $.ajax({
      url: url,
      success: renderMovies,
    });
  };

  // Función para mostrar filtrando por genero Sci-fi, Adventure y/o Fantasy
  function renderMovies(response) {
    $('#movieList').empty();
    arrResults = [];

    console.log(response);

    for (var i in response.Search) {
      var movie = response.Search[i];
      var idmovie = movie.imdbID;
      arrResults.push(idmovie);
    }

    console.log(arrResults);

    for (var i = 0; i < arrResults.length; i++) {
      $.getJSON('https://www.omdbapi.com/?&apikey=3a181f1c&i=' + arrResults[i])
        .then(function(response) {
          if ((response.Genre.indexOf('Sci-Fi') !== -1 || response.Genre.indexOf('Adventure') !== -1 || response.Genre.indexOf('Fantasy') !== -1) && response.Genre.indexOf('Animation') === -1) {
            console.log(response);
            var li = $('<li class="d-block mt-3 p-2 box-shadow col-10 offset-1 col-md-8 offset-md-2 movie" id="' + response.imdbID + '"></li>');
            var movieRow = $('<div class="row"></div>');
            var img = '';
            if (response.Poster !== 'N/A') {
              img = $('<div class="col-4"><img class="img-fluid" src="' + response.Poster + '"></div>');
            } else {
              img = $('<div class="col-4"><img class="img-fluid" src="../assets/images/not-picture.svg"></div>');
            }
            var info = $('<div class="col-8 info"></div>');
            var title = $('<h4>' + response.Title + '</h4>');
            var runtime = $('<p class="d-none d-sm-block">Runtime: ' + response.Runtime + '</p>');
            var director = $('<p>Director: ' + response.Director + '</p>');
            var tag = $('<p class="d-none d-sm-block">Genre: ' + response.Genre + '</p>');

            li.append(movieRow);
            movieRow.append(img);
            movieRow.append(info);
            info.append(title);
            info.append(runtime);
            info.append(director);
            info.append(tag);
            movieList.append(li);
          } else if (arrResults.length === 0) {
            movieList.append('li').addClass('p-3').text('Oops... we did not find that. Try again');
          }
        });
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
