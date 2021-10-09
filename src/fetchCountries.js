import config from './config.json';
import Notiflix from 'notiflix';

// export function fetchCountries(name)
// export const fetchCountries = function(name) 
export const fetchCountries = (name) => {
    return fetch(`${config.searchAPI}${name}${config.filterAPI}`)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            return response.json();
        })
};

    

// console.log(`${config.searchAPI}uk${config.filterAPI}`);
// fetch(`https://restcountries.com/v3.1/all`)
//     .then(response => console.log(response.json()))
//     .then(data => console.log(data))