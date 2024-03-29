import { elem } from './elements';
import 'simplelightbox/dist/simple-lightbox.min.css';


export function renderMarkup(img) {
  elem.galleryDiv.insertAdjacentHTML('beforeend', createMarkup(img));
};

export function createMarkup(img) {
  return img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
    <a href="${largeImageURL}">
    <img
    class="gallery-image img"
    src="${webformatURL}"
    alt="${tags}"
    loading="lazy"
  />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>
    `
    )
    .join('');
}


