import fetchFilms from './fetchFilms.js';

export function getFilms(error) {
    return fetchFilms(error)
    .then(res => res)
    .catch(error => error);
}

