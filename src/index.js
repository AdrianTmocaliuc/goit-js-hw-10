import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300; 

const refs = {
    inputName: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

const countries = (arrayCountries) => {
    // console.log(arrayCountries);
    const markup = arrayCountries.map(({ name, flag }) =>
        `<li class='country-in-the-list'><img src="${flag}" alt="">${name.common}</li>`).join('')
    refs.countryList.innerHTML += markup;
}

const countryDescription = (arrayCountries) => {
    const markup = arrayCountries.map(({ flag, name, capital, population, languages }) => {
        let arrLanguages = [];
        for (const i in languages)
            // console.log(languages[i]);
            arrLanguages.push(languages[i]);
        let list = 
        `<ul class='current-country'>
            <li class='country-name'><img src="${flag}" alt="">${name.common}</li>
            <li><span class='country-key'>Capital:</span> ${capital}</li>
            <li><span class='country-key'>Population:</span> ${population}</li>
            <li><span class='country-key'>Language:</span> ${arrLanguages.join(', ')}</li>
        </ul>`
    return list;
    })
    refs.countryInfo.innerHTML = markup;
}

const handler = e => {
    const inputValue = refs.inputName.value.trim();
    if (!inputValue) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    };
    fetchCountries(refs.inputName.value)
        .then(data => {
            console.log(data.length);
            if (data.length > 20){
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                Notiflix.Notify.success('MoorToo many matches found. Please enter a more specific name.e')
            };
            if (data.length <= 20 && data.length > 1){
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                countries(data)
            };
            if (data.length === 1){
                console.log(data)
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                countryDescription(data)
                // data.map(({ name, flag }) => {
                //     refs.countryList.innerHTML = `<li><img src="${flag}" alt="">${name.common}</li>`;
                // }
            // refs.countryList.delete;
            // console.log(data);
            };
            if (data.length === undefined) {
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                // Notiflix.Notify.failure('Oops, there is no country with that name');
            };
        });
    
    // console.log(refs.inputName.value);

    // if(e.target.value )
};
refs.inputName.addEventListener('input', debounce(handler, DEBOUNCE_DELAY));

