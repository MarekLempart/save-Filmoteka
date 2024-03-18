// openModal.js

// import basicLightbox from 'basiclightbox';
// import * as basicLightbox from 'basiclightbox';
import { fetchMovieTrailers } from './api';
import { addToQueue, addToWatchedMovies } from './localstorage';

// Funkcja otwierająca modal i wyświetlająca szczegóły filmu
export const openModal = movieData => {
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

  const watchedButton = document.getElementsByClassName('watchedButton')[0];
  watchedButton.onclick = () => {
    addToWatchedMovies(movieData);
  };

  const queuedButton = document.getElementsByClassName('queuedButton')[0];
  queuedButton.onclick = () => {
    addToQueue(movieData);
  };

  //   // Obsługa zdarzenia kliknięcia przycisku "Trailer"
  //   const trailerButton = document.querySelector('#movieTrailerButton');
  //   trailerButton.addEventListener('click', async () => {
  //     try {
  //       // Pobranie identyfikatora filmu
  //       const movieId = movieData.id;
  //       // Wysłanie żądania do API w celu pobrania zwiastunu filmu
  //       const trailersResponse = await fetchMovieTrailers(movieId);
  //       // Wyświetlenie danych zwiastunu w konsoli
  //       console.log('Trailers:', trailersResponse);

  //       // Sprawdzenie, czy istnieją zwiastuny
  //       if (trailersResponse.results && trailersResponse.results.length > 0) {
  //         // Iteracja przez zwiastuny i otwarcie ich w nowej karcie przeglądarki
  //         trailersResponse.results.forEach(trailer => {
  //           if (trailer.site === 'YouTube') {
  //             // Odtwarzanie losowego zwiastunu z listy, jeśli nie ma "Official Trailer"
  //             const randomTrailer =
  //               trailersResponse.results[Math.floor(Math.random() * trailersResponse.results.length)];
  //             window.open(`https://www.youtube.com/watch?v=${randomTrailer.key}`, '_blank');
  //           }
  //         });
  //       } else {
  //         console.log('No trailers available');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching movie trailers:', error);
  //     }
  //   });

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
        // Stworzenie nowego modalu dla odtwarzacza filmów
        const trailerModal = document.createElement('div');
        trailerModal.classList.add('trailer-modal');

        // Dodanie odtwarzacza filmów na górę okna modalnego
        trailerModal.innerHTML = `
            <div class="trailer-content">
              <button class="close-trailer">&times;</button>
              <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
            </div>
          `;

        // Wyłączenie przewijania strony podczas otwartego modalu
        document.body.style.overflow = 'hidden';

        // Dodanie odtwarzacza filmów do dokumentu
        document.body.appendChild(trailerModal);

        // Wyświetlenie tła okna modalnego
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        // Wyświetlenie tła okna modalnego po kliknięciu poza obszarem odtwarzacza filmów
        overlay.addEventListener('click', () => {
          closeModal();
        });

        // Obsługa zdarzenia kliknięcia przycisku zamykającego odtwarzacz filmów
        const closeTrailerButton = document.querySelector('.close-trailer');
        closeTrailerButton.addEventListener('click', () => {
          closeModal();
        });

        // Ustawienie adresu URL dla odtwarzacza filmów
        const iframe = trailerModal.querySelector('iframe');
        const firstTrailer = trailersResponse.results[0];
        if (firstTrailer.site === 'YouTube') {
          iframe.src = `https://www.youtube.com/embed/${firstTrailer.key}`;
        }

        // Wycentrowanie okna modalnego z odtwarzaczem
        trailerModal.style.top = `${(window.innerHeight - trailerModal.offsetHeight) / 2}px`;
        trailerModal.style.left = `${(window.innerWidth - trailerModal.offsetWidth) / 2}px`;
      } else {
        console.log('No trailers available');
      }
    } catch (error) {
      console.error('Error fetching movie trailers:', error);
    }
  });

  // Dodanie event listenera dla kliknięcia na każdy plakat filmu
  const moviePosters = document.querySelectorAll('.movie-poster');
  moviePosters.forEach(poster => {
    poster.addEventListener('click', async () => {
      try {
        // Pobranie identyfikatora filmu z atrybutu data
        const movieId = poster.getAttribute('data-movie-id');
        // Sprawdzenie, czy identyfikator filmu nie jest pusty
        if (movieId) {
          // Wysłanie żądania do API w celu pobrania zwiastunu filmu
          const trailersResponse = await fetchMovieTrailers(movieId);
          // Wyświetlenie danych zwiastunu w konsoli
          console.log('Trailers:', trailersResponse);

          // Sprawdzenie, czy istnieją zwiastuny
          if (trailersResponse.results && trailersResponse.results.length > 0) {
            // Sprawdzenie, czy istnieje zwiastun o nazwie "Official Trailer"
            const officialTrailer = trailersResponse.results.find(
              trailer => trailer.name === 'Official Trailer',
            );
            if (officialTrailer) {
              // Odtwarzanie zwiastunu "Official Trailer", jeśli istnieje
              window.open(`https://www.youtube.com/watch?v=${officialTrailer.key}`, '_blank');
            } else {
              // Odtwarzanie losowego zwiastunu z listy, jeśli nie ma "Official Trailer"
              const randomTrailer =
                trailersResponse.results[
                  Math.floor(Math.random() * trailersResponse.results.length)
                ];
              window.open(`https://www.youtube.com/watch?v=${randomTrailer.key}`, '_blank');
            }
          } else {
            console.log('No trailers available');
          }
        } else {
          console.error('Movie ID is missing'); // Komunikat o błędzie, gdy identyfikator filmu jest pusty
        }
      } catch (error) {
        console.error('Error fetching movie trailers:', error);
      }
    });
  });

  const closeButton = document.querySelector('.close');
  closeButton.onclick = () => {
    modal.style.display = 'none';
  };

  // Obsługa zdarzenia keydown
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

// // Wersja testowa z biblioteką basicLightbox:
// import { fetchMovieTrailers } from './api';
// import { addToQueue, addToWatchedMovies } from './localstorage';
// import basicLightbox from 'basiclightbox';

// export const openModal = movieData => {
//   const modal = document.getElementById('myModal');
//   modal.style.display = 'block';

//   const modalContent = document.getElementById('modalContent');
//   modalContent.innerHTML = `
//     <div class="modal-container">
//       <div class="movie-poster-modal">
//         <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title} Photo" data-movie-id="${movieData.id}">
//       </div>

//       <div class="modal-movie-info">
//         <h2>${movieData.title}</h2>
//         <div class="info-item">
//           <div class="pernament-item">
//             <p>Vote / Votes </p>
//             <p>Popularity </p>
//             <p>Orginal Title </p>
//             <p>Genre </p>
//           </div>
//           <div class="variables-item">
//             <p><span class="average-vote">${movieData.vote_average.toFixed(1)}</span> / <span class="count-vote">${movieData.vote_count}</span></p>
//             <p>${movieData.popularity}</p>
//             <p>${movieData.original_title}</p>
//             <p>${movieData.genres.map(genre => genre.name).join(', ')}</p>
//           </div>
//         </div>
//         <div class="about-movie">
//           <p><span class="about-movie-details">About</span><br> ${movieData.overview}</p>
//         </div>
//         <div class="modal-buttons">
//           <button class="watchedButton">Add to Watched</button>
//           <button class="queuedButton">Add to Queue</button>
//           <button id="movieTrailerButton">Trailer</button>
//         </div>
//       </div>
//     </div>
//   `;

//   const watchedButton = document.querySelector('.watchedButton');
//   watchedButton.addEventListener('click', () => {
//     addToWatchedMovies(movieData);
//   });

//   const queuedButton = document.querySelector('.queuedButton');
//   queuedButton.addEventListener('click', () => {
//     addToQueue(movieData);
//   });

//   const trailerButton = document.getElementById('movieTrailerButton');
//   trailerButton.addEventListener('click', async () => {
//     try {
//       const movieId = movieData.id;
//       const trailersResponse = await fetchMovieTrailers(movieId);
//       if (trailersResponse.results && trailersResponse.results.length > 0) {
//         const officialTrailer = trailersResponse.results.find(trailer => trailer.name === 'Official Trailer');
//         const trailerToPlay = officialTrailer ? officialTrailer : trailersResponse.results[Math.floor(Math.random() * trailersResponse.results.length)];
//         basicLightbox.create(`
//           <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerToPlay.key}" frameborder="0" allowfullscreen></iframe>
//         `).show();
//       } else {
//         console.log('No trailers available');
//       }
//     } catch (error) {
//       console.error('Error fetching movie trailers:', error);
//     }
//   });

//   const moviePosters = document.querySelectorAll('.movie-poster');
//   moviePosters.forEach(poster => {
//     poster.addEventListener('click', async () => {
//       try {
//         const movieId = poster.getAttribute('data-movie-id');
//         const trailersResponse = await fetchMovieTrailers(movieId);
//         if (trailersResponse.results && trailersResponse.results.length > 0) {
//           const officialTrailer = trailersResponse.results.find(trailer => trailer.name === 'Official Trailer');
//           const trailerToPlay = officialTrailer ? officialTrailer : trailersResponse.results[Math.floor(Math.random() * trailersResponse.results.length)];
//           basicLightbox.create(`
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerToPlay.key}" frameborder="0" allowfullscreen></iframe>
//           `).show();
//         } else {
//           console.log('No trailers available');
//         }
//       } catch (error) {
//         console.error('Error fetching movie trailers:', error);
//       }
//     });
//   });

//   const closeButton = document.querySelector('.close');
//   closeButton.addEventListener('click', () => {
//     modal.style.display = 'none';
//   });

//   document.addEventListener('keydown', event => {
//     if (event.key === 'Escape') {
//       modal.style.display = 'none';
//     }
//   });

//   window.addEventListener('click', event => {
//     if (event.target === modal) {
//       modal.style.display = 'none';
//     }
//   });
// };

// Funkcja zamykająca modal z odtwarzaczem filmów
const closeModal = () => {
  const trailerModal = document.querySelector('.trailer-modal');
  const overlay = document.querySelector('.overlay');

  if (trailerModal && overlay) {
    document.body.removeChild(trailerModal);
    document.body.removeChild(overlay);
    document.body.style.overflow = ''; // Włącz przewijanie strony
  }
};
