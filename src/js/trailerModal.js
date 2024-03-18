// import * as basicLightbox from 'basiclightbox';

// // Funkcja otwierająca okno modalne z odtwarzaczem filmów
// export default function openTrailerModal(trailerKey) {
//   const srcTrailer = 'https://www.youtube.com/embed/';
//   const iframeSrc = srcTrailer + trailerKey;

//   const modal = basicLightbox.create(`
//     <iframe class="iframe-container" width="900" height="600" src="${iframeSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//     <button class="close-modal__trailer"></button>
//   `);

//   const closeModalHandler = event => {
//     if (event.code === 'Escape') {
//       modal.close();
//     }
//     window.removeEventListener('keydown', closeModalHandler);
//   };

//   modal.show();

//   const closeBtn = modal.element().querySelector('.close-modal__trailer');
//   closeBtn.addEventListener('click', () => {
//     modal.close();
//   });

//   window.addEventListener('keydown', closeModalHandler);
// }

import * as basicLightbox from 'basiclightbox';

// Funkcja otwierająca okno modalne z odtwarzaczem filmów
export default function openTrailerModal(trailerKey) {
  const srcTrailer = 'https://www.youtube.com/embed/';
  const iframeSrc = srcTrailer + trailerKey;

  const modal = basicLightbox.create(`
    <div class="trailer-modal-overlay">
        <div class="trailer-modal-content">
            <iframe class="iframe-container" src="${iframeSrc}" title="YouTube video player" width="1280px" height="720px" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <button class="close-modal__trailer">&times;</button>
        </div>
    </div>
  `);

  const closeModalHandler = e => {
    if (e.code === 'Escape') {
      modal.close();
    }
    window.removeEventListener('keydown', closeModalHandler);
  };

  modal.show();

  const closeBtn = modal.element().querySelector('.close-modal__trailer');
  closeBtn.addEventListener('click', () => {
    modal.close();
  });

  window.addEventListener('keydown', closeModalHandler);
}
