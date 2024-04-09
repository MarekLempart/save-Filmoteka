// swiper.js

import * as basicLightbox from 'basiclightbox';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Importowanie stylów Swipera
import { fetchSearchMovies, fetchTrendingMovies } from './api';
// import { renderGallery } from './renderGallery';

// Inicjalizacja Swipera
export const swiper = new Swiper('.swiper', {
  //   modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 8,
  spaceBetween: 8,
  //   autoplay: {
  //     enabled: true,
  //     delay: 1500,
  //   },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 2,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 4,
    },
    1280: {
      slidesPerView: 8,
      spaceBetween: 8,
    },
  },
});

// Funkcja renderująca markup slidera z plakatami filmów
const renderMarkupSlider = movies => {
  const slides = movies
    .map(({ id, title, poster_path }) => {
      return `<div class="swiper-slide">
        <a class="movie-poster-link" href="#" data-id="${id}">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
        </a>
      </div>`;
    })
    .join('');
  swiper.appendSlide(slides); // Dodanie slajdów do Swipera
};

// // Funkcja renderująca markup slidera z plakatami filmów
// const renderMarkupSlider = movies => {
//   const slides = movies.map(({ id, title, poster_path }) => {
//     return `<div class="swiper-slide">
//       <a class="movie-poster-link" href="#" data-id="${id}">
//         <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
//       </a>
//     </div>`;
//   });
//   swiper.appendSlide(slides); // Dodanie slajdów do Swipera
// };

// Funkcja do ładowania plakatów filmów
export const loadMoviePosters = async () => {
  try {
    const { results } = await fetchTrendingMovies();
    console.log('Pobrane filmy:', results);
    renderMarkupSlider(results); // Renderowanie slidera z plakatami
  } catch (error) {
    console.error('Błąd podczas ładowania plakatów filmów:', error.message);
  }
};

// Obsługa kliknięcia na plakat filmu
export const onMoviePosterClick = async event => {
  event.preventDefault();
  const movieId = event.target.dataset.id;
  try {
    const { results } = await fetchSearchMovies(movieId);
    const { key } = results[results.length - 1];
    const iframeMarkup = `<iframe class="youtube-frame" width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    // Otwarcie modala z zwiastunem filmu
    const instance = basicLightbox.create(iframeMarkup);
    instance.show();
  } catch (error) {
    console.error('Błąd podczas ładowania zwiastuna filmu:', error.message);
  }
};

// // core version + navigation, pagination modules:
// import Swiper from 'swiper';
// import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // init Swiper:
// export const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   modules: [Navigation, Pagination, Autoplay],
//   slidesPerView: 8,
//   spaceBetween: 8,
//   autoplay: {
//     enabled: true,
//     delay: 1500,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     320: {
//       slidesPerView: 3,
//       spaceBetween: 2,
//     },
//     768: {
//       slidesPerView: 6,
//       spaceBetween: 4,
//     },
//     1278: {
//       slidesPerView: 8,
//       spaceBetween: 8,
//     },
//   },
// });
// const renderMarkupSlider = movies => {
//   const markup = movies
//     .map(({ id, title, poster_path }) => {
//       return `<li class="swiper-slide">
//         <a class="swiper-link" href="#" data-id="${id}"><img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
//             <div class="swiper-backdrop">
//                 <svg class="icon-play">
//                     <use href="${state.sprite}#icon-play"></use>
//                 </svg>
//             </div>
//         </a>
//       </li>`;
//     })
//     .join('');
//   refs.slider.insertAdjacentHTML('beforeend', markup);
// };

// export const loadMoviePosters = async () => {
//   try {
//     const { results } = await fetchTrendingMovies();
//     renderMarkupSlider(results);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// export const onMoviePosterClick = async event => {
//   event.preventDefault();
//   if (evt.target.nodeName !== 'A') return;
//   try {
//     const { results } = await fetchSearchMovies(evt.target.dataset.id);
//     const { key } = results[results.length - 1];
//     const closeModal = e => {
//       if (e.code === 'Escape') {
//         instance.close();
//       }
//     };
//     const instance = basicLightbox.create(
//       `<iframe class="youtube-frame" width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
//       {
//         onShow: () => {
//           document.addEventListener('keydown', closeModal);
//         },
//         onClose: () => {
//           document.removeEventListener('keydown', closeModal);
//         },
//       },
//     );

//     instance.show();
//   } catch (error) {
//     console.error(error.message);
//   }
// };
