import debounce from 'lodash.debounce';
import API from './fetchCountries.js'
import сountryData from '../src/css/events.hbs';
import Notiflix from "notiflix";

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const MIN_COUNT = 2;
const MAX_COUNT = 10;

const fieldInput = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

const manyMessage = 'Too many matches found. Please enter a more specific name.';
const oopsMmessage = 'Oops, there is no country with that name, buy the globe';

const fetchErrors = (() => {
  return Notiflix.Notify.failure(oopsMmessage);
});

const creatingMarkup = ((country) => {
  infoCountry.innerHTML = '';
  listCountry.innerHTML = '';
  if (!country.length) {
    fetchErrors();
  }else if (country.length === 1) {
    const marcup = сountryData({value: country});
    infoCountry.innerHTML = marcup;
  } else if (country.length >= MIN_COUNT && country.length <= MAX_COUNT) {
    const marcupList = сountryData({ev: country});
    listCountry.innerHTML = marcupList;
  } else if (country.length > MAX_COUNT) {
    Notiflix.Notify.info(manyMessage);
  }
    return;
  });
  
const inputValue = ((event) => {
  event.preventDefault();

  const nameCountry = event.target.value;

  if (nameCountry.trim('') === '') {
    infoCountry.innerHTML = '';
    listCountry.innerHTML = '';
    return;
  };
  API.fetchCountries(nameCountry).then(creatingMarkup).catch(error => console.log(error));
});

fieldInput.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));
