import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

// DOM and axios

axios.defaults.headers.common['x-api-key'] =
  'live_rZzH8aTSb8EgvoUpMxGnwE4BaOpFs1yxswJogZfxRC4o5Mo0oZR6Pv4xvrcRihcn';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

// Functions

const fillBreedSelect = array => {
  const markup = array
    .map(array => `<option value="${array.id}">${array.name}</option>`)
    .join('');
  breedSelect.innerHTML = markup;
};

const fillCatInfo = array => {
  const markup = `
    <img src=${array[0].url} alt${array[0].breeds[0].name} width="800" height="450" />
    <article>
        <h1>${array[0].breeds[0].name}</h1>
        <p>${array[0].breeds[0].description}</p>
        <p>${array[0].breeds[0].temperament}</p>
    </article>
    `;
  catInfo.innerHTML = markup;
};

const toggleLoader = () => loader.classList.toggle('loader-visibility');

const toggleBreedSelectVisibility = () =>
  breedSelect.classList.toggle('breed-select-visibility');

const errorNotiflix = error => Notiflix.Notify.failure(error);

// View

toggleBreedSelectVisibility();

fetchBreeds()
  .then(data => {
    fillBreedSelect(data);
    toggleLoader();
    toggleBreedSelectVisibility();
  })
  .catch(error => errorNotiflix(error));

const handleChange = e => {
  const breedId = e.target.value;
  catInfo.innerHTML = '';
  toggleLoader();
  fetchCatByBreed(breedId)
    .then(data => {
      fillCatInfo(data);
      toggleLoader();
    })
    .catch(error => errorNotiflix(error));
};

breedSelect.addEventListener('change', handleChange);
