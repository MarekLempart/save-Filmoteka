// Funkcja openModal

const openModal = movieData => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <div class="modal-container">
      <div class="movie-poster-modal">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${
          movieData.poster_path
        }" alt="${movieData.title} Photo">
      </div>
      <div class="modal-movie-info">
        <h2>${movieData.title}</h2>

        <div class="info-item">
          <div class="pernament-item">
            <p>Vote / Votes </p>
            <p>Popularity </p>
            <p>Orginal Title </p>
            <p>Genre </p>
          </div>

          <div class="variables-item">
            <p><span class="average-vote">${movieData.vote_average.toFixed(
              1,
            )} </span>/ <span class="count-vote">${movieData.vote_count}</span></p>
              <p>${movieData.popularity}</p>
              <p>${movieData.original_title}</p>
              <p>${movieData.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
        <div class="about-movie">
          <p><span class="about-movie-details">About</span></br> ${movieData.overview}</p>
        </div>

        <div class="modal-buttons">
          <button class="watchedButton">Add to Watched</button>
          <button class="queuedButton">Add to Queue</button>
          <button id="movieTrailerButton">Trailer</button>
        </div>
      </div>
    </div>
    `;

    const watchedButton = document.getElementsByClassName('watchedButton')[0];
    watchedButton.onclick = () => {
      addToWatchedMovies(movieData);
    };
    const queuedButton = document.getElementsByClassName('queuedButton')[0];
    queuedButton.onclick = () => {
      addToQueue(movieData);
    };

    // // Obsługa zdarzenia kliknięcia przycisku "Trailer"
    // const trailerButton = document.querySelector('#movieTrailerButton');
    // trailerButton.addEventListener('click', async () => {
    //   try {
    //     // Pobranie identyfikatora filmu
    //     const movieId = movieData.id;
    //     // Wysłanie żądania do API w celu pobrania zwiastunu filmu
    //     const trailersResponse = await fetchMovieTrailers(movieId);
    //     // Wyświetlenie danych zwiastunu w konsoli
    //     console.log('Trailers:', trailersResponse);

    //     // Sprawdzenie, czy istnieją zwiastuny
    //     if (trailersResponse.results && trailersResponse.results.length > 0) {
    //       // Otwarcie zwiastunu w modalnym oknie za pomocą biblioteki basicLightbox
    //       const firstTrailer = trailersResponse.results[0];
    //       if (firstTrailer.site === 'YouTube') {
    //         const trailerUrl = `https://www.youtube-nocookie.com/embed/${firstTrailer.key}`;
    //         // const trailerUrl = `https://www.youtube.com/embed/${firstTrailer.key}`;
    //         // const trailerUrl = `https://www.youtube.com/watch?v=${firstTrailer.key}`;
    //         const trailerModal = basicLightbox.create(`
    //         <iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
    //       `);
    //         trailerModal.show();
    //       }
    //     } else {
    //       console.log('No trailers available');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching movie trailers:', error);
    //   }
    // });

    // Obsługa zdarzenia kliknięcia przycisku "Trailer"
    const trailerButton = document.querySelector('#movieTrailerButton');
    trailerButton.addEventListener('click', async () => {
      try {
        // Pobranie identyfikatora filmu
        const movieId = movieData.id;
        // Wysłanie żądania do API w celu pobrania zwiastunu filmu
        const trailersResponse = await fetchMovieTrailers(movieId);
        // Wyświetlenie danych zwiastunu w konsoli
        console.log('Trailers:', trailersResponse);

        // Sprawdzenie, czy istnieją zwiastuny
        if (trailersResponse.results && trailersResponse.results.length > 0) {
          // Iteracja przez zwiastuny i otwarcie ich w nowej karcie przeglądarki
          trailersResponse.results.forEach(trailer => {
            if (trailer.site === 'YouTube') {
              window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
            }
          });
        } else {
          console.log('No trailers available');
        }
      } catch (error) {
        console.error('Error fetching movie trailers:', error);
      }
    });