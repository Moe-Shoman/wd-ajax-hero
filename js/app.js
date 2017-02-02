(function() {
    'use strict';

    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();

        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.id);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.title);
            const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            const $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    // ADD YOUR CODE HERE
    function fetchMovie(movie) {
        let url = `http://www.omdbapi.com/?s=${movie}`;
        console.log(url)
        return fetch(url).then((result) => {
                return result.json();
            })
            .then((jayson) => {
                jayson.Search.forEach(movie => {
                    movies.push({
                        title: movie.Title,
                        poster: movie.Poster,
                        year: movie.Year,
                        id: movie.imdbID
                    })
                })
                renderMovies()
            })
    }
    document.getElementById('searchButton').addEventListener("click", (event) => {
        event.preventDefault();
        let searchParam = document.getElementById('search').value;
        if (searchParam.length === 0) {
            Materialize.toast("Please input title", 5000)
            return
        }
        movies.length = 0;
        fetchMovie(searchParam);
    })
})();
