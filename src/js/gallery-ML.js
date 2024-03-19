// gallery.js

// import {
//   fetchMovieDetails,
//   fetchMovieTrailers,
//   fetchSearchMovies,
//   fetchTrendingMovies,
//   genresName,
// } from './api';
// import { addToQueue, addToWatchedMovies } from './localstorage';
// import { createPagination, setCurrentPage } from './pagination';

// export let homePageNo = 0;
// export let searPageNo = 1;
// let isInfinityScrollActive = 0;
// let isInfinityScrollEnable = 0;
// let searchQuery;
// let totalPages;

import { fetchSearchMovies, fetchTrendingMovies, genresName } from './api';
// import { createPagination, setCurrentPage } from './pagination';
// import { createPagination, currentPage, setCurrentPage } from './pagination';
import { createPagination, setCurrentPage } from './pagination';
import { clearGallery, renderGallery } from './renderGallery'; // Dodano import funkcji związanych z galerią

export let homePageNo = 0;
let totalPages;

// Funkcja pomocnicza do pobrania nazw gatunków na podstawie ich identyfikatorów
export const getGenres = genreIds => {
  // Pobranie nazw gatunków z listy genresName zdefiniowanej w api.js
  const genres = genreIds.map(genreId => {
    const foundGenre = genresName.find(genre => genre.id === genreId);
    return foundGenre ? foundGenre.name : '';
  });
  // Zwrócenie połączonej listy gatunków
  return genres.join(', ');
};

const displayWatchedMovies = () => {
  try {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const moviesWithGenres = watchedMovies.map(movie => {
      let categories = 'Without category';
      if (movie.genres && movie.genres.length > 0) {
        categories = movie.genres.map(genres => genres.name).join(', ');
      }
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    // isInfinityScrollActive = 0;
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying watched movies:', error);
  }
};

const displayQueuedMovies = () => {
  try {
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    const moviesWithGenres = queuedMovies.map(movie => {
      let categories = 'Without category';
      if (movie.genres && movie.genres.length > 0) {
        categories = movie.genres.map(genres => genres.name).join(', ');
      }
      return { ...movie, categories };
    });
    homePageNo = 0;
    clearGallery();
    // isInfinityScrollActive = 0;
    renderGallery(moviesWithGenres, 1);
  } catch (error) {
    console.error('Error displaying queued movies:', error);
  }
};

//Obsługa HomePage i Buttonów
window.addEventListener('DOMContentLoaded', () => {
  getHomepage(1); // Wywołujemy funkcję wyświetlającą HomePage

  const libraryWatched = document.getElementById('watchedHeader');
  libraryWatched.addEventListener('click', displayWatchedMovies);

  const libraryQueued = document.getElementById('queueHeader');
  libraryQueued.addEventListener('click', displayQueuedMovies);

  // const libraryWatchedButton = document.getElementById('watchedModal');
  // libraryWatchedButton.addEventListener('click', displayWatchedMovies);

  // const libraryQueuedButton = document.getElementById('queueModal');
  // libraryQueuedButton.addEventListener('click', displayQueuedMovies);
});

//Generujemy trendings movie
export const getHomepage = async pageNo => {
  try {
    const response = await fetchTrendingMovies(pageNo);
    clearGallery();
    renderGallery(response.results, 0);
    homePageNo = pageNo;
    createPagination(response.total_pages);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

//Obsługa szukajki
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');

  searchForm.addEventListener('submit', async event => {
    setCurrentPage(1);
    getSearchResult(event, 1);
  });
});

export const getSearchResult = async (event, pageNo) => {
  event.preventDefault();
  homePageNo = pageNo;
  const searchInput = document.querySelector('.search-form input');
  const notResult = document.getElementById('not-result');
  const searchQuery = searchInput.value.trim().toLowerCase().split(' ').join('+');
  if (searchQuery) {
    try {
      const response = await fetchSearchMovies(searchQuery, homePageNo);
      totalPages = response.total_pages;
      movies = response.results;
      createPagination(totalPages); //Wywołanie paginacji
      searchInput.value = ''; // Wyczyszczenie pola wyszukiwania
      if (response.results.length > 0) {
        notResult.style.display = 'none'; // Ukrycie komunikatu o braku wyników
        clearGallery();
        renderGallery(movies);
      } else {
        notResult.style.display = 'block'; // Wyświetlenie komunikatu o braku wyników
        clearGallery(); // Wyczyszczenie galerii
      }
    } catch (error) {
      console.error('Error fetching search movies:', error);
    }
  }
};

// Ukrycie komunikatu o braku wyników na start
document.addEventListener('DOMContentLoaded', () => {
  const notResult = document.getElementById('not-result');
  notResult.style.display = 'none';
});

// Czyszczenie galerii
export const clearGallery = () => {
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.innerHTML = ''; // Wyczyszczenie zawartości galerii
};

//scrollToTop by Marek
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Pokaż przycisk, gdy użytkownik przewinie stronę w dół
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    // Możesz dostosować wartość, aby przycisk pojawił się po przewinięciu o określoną liczbę pikseli
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Obsługa zdarzenia kliknięcia przycisku
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Działa w większości nowoczesnych przeglądarek, aby przewijać płynnie
  });
});

// Funkcja do sprawdzania, czy element jest blisko dolnej krawędzi okna przeglądarki
function isNearBottom(element, threshold) {
  const rect = element.getBoundingClientRect();
  return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold;
}

// Event scroll na oknie przeglądarki
const loadMoreContent = () => {
  // Element, który monitorujemy, np. kontener na treści
  const contentContainer = document.querySelector('.movie-card:last-child');
  // Threshold - odległość od dolnej krawędzi, przy której chcemy zacząć ładować więcej treści
  const threshold = 800; // w pikselach

  // Sprawdzamy, czy element jest blisko dolnej krawędzi okna przeglądarki
  if (isNearBottom(contentContainer, threshold)) {
    // Jeśli tak, ładujemy więcej treści
    if (homePageNo > 0) homePageNo++;
    getHomepage(homePageNo);
  }
};
const infinityScroll = document.getElementById('infinityScroll');

let isInfinityScrollActive = false;

// Obsługa zdarzenia kliknięcia przycisku
infinityScroll.addEventListener('click', () => {
  if (isInfinityScrollActive) {
    // Jeżeli infinity scroll jest aktywny, usuwamy nasłuchiwanie zdarzenia scroll
    window.removeEventListener('scroll', loadMoreContent);
  } else {
    // Jeżeli infinity scroll nie jest aktywny, dodajemy nasłuchiwanie zdarzenia scroll
    window.addEventListener('scroll', loadMoreContent);
  }
  // Zmiana stanu - włącz/wyłącz
  isInfinityScrollActive = !isInfinityScrollActive;

  // Początkowe ładowanie treści
  getHomepage(homePageNo);

  // Event scroll na oknie przeglądarki po kliknięciu przycisku
  window.addEventListener('scroll', loadMoreContent);

  // Usuń obsługę zdarzenia kliknięcia przycisku, aby nie powtarzać ładowania po kliknięciu
  infinityScroll.removeEventListener('click', loadMoreContent);
});
