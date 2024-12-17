import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImage } from './js/pixabay-api';
import { makeImages } from './js/render-functions';
const litebox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'imageTitle',
});

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');
let page = 1;
let totalPage = 1;
const per_page = 15;
let value;

form.addEventListener('submit', handleImages);
loadBtn.addEventListener('click', handleLoadMore);

function handleImages(event) {
  event.preventDefault();
  page = 1;
  value = event.target.elements.search.value.trim();
  console.log(value);
  gallery.innerHTML = '';
  loader.innerHTML = '';
  loadBtn.classList.add('hidden');
  if (!value) {
    {
      iziToast.show({
        message: 'Please add request!',
        position: 'center',
        color: 'red',
      });
      gallery.innerHTML = ':(';
      return;
    }
  }

  loader.classList.remove('hidden');
  searchImage(value, page, per_page)
    .then(data => {
      console.log(data);
      const { hits, totalHits } = data;
      totalPage = Math.ceil(totalHits / per_page);
      if (!hits.length) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
          color: 'red',
        });
        loader.innerHTML = '<h1>Error..</h1>';
        loadBtn.classList.add('hidden');
      } else {
        console.log(hits);

        gallery.innerHTML = makeImages(hits);
        litebox.refresh();
        if (page === totalPage) {
          loadBtn.classList.replace('load-btn', 'hidden');
        } else {
          loadBtn.classList.replace('hidden', 'load-btn');
        }
      }
    })
    .catch(error => {
      console.log(error.message);
      iziToast.show({
        message: `${error.message}`,
        position: 'center',
        color: 'red',
      });
    })
    .finally(() => {
      event.target.elements.search.value = '';
      loader.classList.add('hidden');
    });
}
async function handleLoadMore() {
  page += 1;
  loadBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  try {
    const { hits, totalHits } = await searchImage(value, page, per_page);

    gallery.insertAdjacentHTML('beforeend', makeImages(hits));
    totalPage = Math.ceil(totalHits / per_page);
    if (page > totalPage) {
      loadBtn.classList.replace('load-btn', 'hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
        color: 'red',
      });
    } else {
      loadBtn.classList.remove('hidden');
    }
    setTimeout(() => {
      const item = document.querySelector('.list-item');
      const itemHeight = item.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: itemHeight * 2,
        behavior: 'smooth',
      });
    }, 0);
    litebox.refresh();
  } catch (error) {
    console.log(error.message);
    iziToast.show({
      message: `${error.message}`,
      position: 'center',
      color: 'red',
    });
  } finally {
    loadBtn.disabled = false;
    loader.classList.add('hidden');
  }
}
