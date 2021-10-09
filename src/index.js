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
    console.log(arrayCountries);
    const markup = arrayCountries.map(({ name, flag }) =>
        `<li><img src="${flag}" alt="">${name.common}</li>`).join('')
    refs.countryList.innerHTML += markup;
}

const handler = e => {
    fetchCountries(refs.inputName.value)
        .then(
            data => {
                if (data.length > 10)
                    Notiflix.Notify.success('MoorToo many matches found. Please enter a more specific name.e');
                if (data.length <= 10 && data.length > 1)
                    data.map(({ name, flag }) => {
                        refs.countryList.innerHTML += `<li><img src="${flag}" alt="">${name.common}</li>`;
                    })
                if (data.length = 1) console.log(data)
                    // data.map(({ name, flag }) => {
                    //     refs.countryList.innerHTML = `<li><img src="${flag}" alt="">${name.common}</li>`;
                    // }
                // refs.countryList.delete;
                // console.log(data);
                
            });
    
    // console.log(refs.inputName.value);

    // if(e.target.value )
};
refs.inputName.addEventListener('input', debounce(handler, DEBOUNCE_DELAY));

