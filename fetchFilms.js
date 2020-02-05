const ENDPOINT = 'https://ghibliapi.herokuapp.com/films';

export default function fetchFilms() {
   
   return fetch(ENDPOINT)
      .then(res=>res.json())
      .catch(() => {
         console.log('errooooooooooooooor')
      });
   
}

