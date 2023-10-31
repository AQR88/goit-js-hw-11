import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/styles.css';
import { service } from './js/fetch';
import { elem } from './js/elements';
import { renderMarkup } from './js/createmarkup';

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
const perPage = 40;

const hideloadMoreBtn = () => (elem.loadMoreBtn.style.display = 'none');
const showloadMoreBtn = () => (elem.loadMoreBtn.style.display = 'block');
hideloadMoreBtn();

async function submit(evt) {
  evt.preventDefault();

  let text = elem.form.elements.searchQuery.value.trim();
  page = 1;
  cleanGallery();

  if (text === '') {
    hideloadMoreBtn();
    return Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }

  try {
    const galleryItems = await service(text, page, perPage);

    let totalPages = galleryItems.data.totalHits;

    if (galleryItems.data.hits.length === 0) {
      cleanGallery();
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );

    } else if (totalPages >= 1 && totalPages < perPage) {
      hideloadMoreBtn();
      Notiflix.Notify.success(`Hooray! We found ${totalPages} image.`);
      
    } else if (totalPages > perPage) {
      showloadMoreBtn();
      Notiflix.Notify.success(`Hooray! We found ${totalPages} image.`);
    }
    renderMarkup(galleryItems.data.hits); 
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }

  lightbox.refresh();
};

async function onClickBtn() {
  page += 1;
  let text = elem.form.elements.searchQuery.value;

  try {
    const galleryItems = await service(text, page, perPage);

    let showPages = galleryItems.data.totalHits / perPage;

    if (showPages <= page) {
      hideloadMoreBtn();
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }

    renderMarkup(galleryItems.data.hits); 
  } catch (error) {
    Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }
  lightbox.refresh();
};


function cleanGallery() {
  elem.galleryDiv.innerHTML = '';
  page = 1;
  hideloadMoreBtn();
};

elem.form.addEventListener('submit', submit);
elem.loadMoreBtn.addEventListener('click', onClickBtn);






