// openModal.js

import * as basicLightbox from 'basiclightbox';
import { fetchMovieTrailers } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';

// Funkcja otwierająca modal i wyświetlająca szczegóły filmu
export const openModal = async movieData => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <div class="modal-container">
      <div class="movie-poster-modal">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${
          movieData.poster_path
        }" alt="${movieData.title} Photo" data-movie-id="${movieData.id}">
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
            )}</span> / <span class="count-vote">${movieData.vote_count}</span></p>
            <p>${movieData.popularity}</p>
            <p>${movieData.original_title}</p>
            <p>${movieData.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
        <div class="about-movie">
          <p><span class="about-movie-details">About</span><br> ${movieData.overview}</p>
        </div>
        <div class="modal-buttons">
          <button class="watchedButton">Add to Watched</button>
          <button class="queuedButton">Add to Queue</button>
          <button id="movieTrailerButton">Trailer</button>
        </div>
      </div>
    </div>
  `;

  const watchedButton = document.querySelector('.watchedButton');
  watchedButton.addEventListener('click', () => {
    addToWatchedMovies(movieData);
  });

  const queuedButton = document.querySelector('.queuedButton');
  queuedButton.addEventListener('click', () => {
    addToQueue(movieData);
  });

  // Obsługa zdarzenia kliknięcia przycisku "Trailer"
  const trailerButton = document.querySelector('#movieTrailerButton');
  trailerButton.addEventListener('click', async () => {
    try {
      const trailersResponse = await fetchMovieTrailers(movieData.id);
      if (trailersResponse.results && trailersResponse.results.length > 0) {
        const firstTrailer = trailersResponse.results[0];
        if (firstTrailer.site === 'YouTube') {
          const trailerUrl = `https://www.youtube.com/embed/${firstTrailer.key}`;
          openTrailerModal(trailerUrl);
        }
      } else {
        console.log('No trailers available');
      }
    } catch (error) {
      console.error('Error fetching movie trailers:', error);
    }
  });

  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
};

// Funkcja otwierająca modal z odtwarzaczem filmu
const openTrailerModal = trailerUrl => {
  const trailerModal = basicLightbox.create(`
    <iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
  `);

  trailerModal.show();
};
