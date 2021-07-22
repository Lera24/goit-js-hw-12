const BASE_URL = 'https://restcountries.eu/rest/v2/name';
const PARAMS_URL = '?fields=name;capital;population;flag;languages;'

const fetchCountries = ((name) => {
    return fetch(`${BASE_URL}/${name}${PARAMS_URL}`).then((response) => {
        return response.json();
    })
});

export default {fetchCountries};

