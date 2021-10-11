import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import config from './config.json';

const DEBOUNCE_DELAY = 500; 

const refs = {
    inputName: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

const countries = (arrayCountries) => {
    console.log(arrayCountries);
    const markup = arrayCountries.map(({ name, flags}) =>
        `<li class='country-in-the-list'>
        <img src="${flags.svg}" alt="${name.common}" width='40px'>
        ${name.common}</li>`).join('')
    refs.countryList.innerHTML += markup;
}

const countryDescription = (arrayCountries) => {
    console.log(arrayCountries);
    const markup = arrayCountries.map(({ flags, name, capital, population, languages }) => {
        let arrLanguages = [];
        for (const i in languages)
            arrLanguages.push(languages[i]);
        let list = 
        `<ul class='current-country'>
            <li class='country-name'>
            <img src="${flags.png}" alt="${name.common}" width='40px'>
            ${name.common}</li>
            <li><span class='country-key'>Capital:</span> ${capital}</li>
            <li><span class='country-key'>Population:</span> ${population}</li>
            <li><span class='country-key'>Language:</span> ${arrLanguages.join(', ')}</li>
        </ul>`
    return list;
    })
    refs.countryInfo.innerHTML = markup;
}

const handler = () => {
    const inputValue = refs.inputName.value.trim();
    if (!inputValue) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    };
    fetchCountries(refs.inputName.value)
        .then(data => {
            if (data.length > 20){
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                Notiflix.Notify.success('MoorToo many matches found. Please enter a more specific name.e')
            };
            if (data.length <= 20 && data.length > 1){
                refs.countryInfo.innerHTML = '';
                countries(data)
            };
            if (data.length === 1){
                console.log(data)
                refs.countryList.innerHTML = '';
                countryDescription(data)
            };
            // if (data.length === 0) {
            //     refs.countryInfo.innerHTML = '';
            //     refs.countryList.innerHTML = '';
            //     console.log(data);
            // };
        });
};
refs.inputName.addEventListener('input', debounce(handler, DEBOUNCE_DELAY));

