const headerNaviElements = document.getElementsByClassName('header-navi');
const headerBG = document.getElementById('headerBG');

const homeLink = headerNaviElements[0].getElementsByTagName('a')[0];
const libraryLink = headerNaviElements[0].getElementsByTagName('a')[1];

const myLibrary = document.querySelector('.header-library');
const headerSearch = document.querySelector('.header-search');

const toggleVisibility = (elementToShow, elementToHide) => {
  elementToShow.style.visibility = 'visible';
  elementToHide.style.visibility = 'hidden';
};

toggleVisibility(headerSearch, myLibrary);
homeLink.classList.add('active');
headerBG.style.backgroundImage =
  'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-image-home.png?raw=true")';

const homeButtonClick = event => {
  event.preventDefault();
  toggleVisibility(headerSearch, myLibrary);
  homeLink.classList.add('active');
  libraryLink.classList.remove('active');
  headerBG.style.backgroundImage =
    'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-image-home.png?raw=true")';
};
const myLibraryButtonClick = event => {
  event.preventDefault();
  toggleVisibility(myLibrary, headerSearch);
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  headerBG.style.backgroundImage =
    'url("https://github.com/Krzysztof-GoIT/goit-projekt-filmoteka/blob/main/src/img/bg-image-library.png?raw=true")';
};

homeLink.addEventListener('click', homeButtonClick);
libraryLink.addEventListener('click', myLibraryButtonClick);