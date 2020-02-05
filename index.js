'use strict';
import { images } from './images.js';
import fetchFilms from './fetchFilms.js';
import randomNumber from './randomNumber.js';

const loaderDiv = document.createElement('div');
const input = document.querySelector('.input');

export const listOfMovies = [];

export const loader = () => {
    const wrapper = document.querySelector('.wrapper');
    loaderDiv.classList.add('loader')

    if(wrapper){
         wrapper.appendChild(loaderDiv)
    }
   
    setTimeout(printMovies, 2000)
}

export const showListOfMovies = (title = 'Title', list) => {

    list = document.querySelector('.list');
    if(list){
        const li = document.createElement('li')
        li.classList.add('list_item')
        const movie_title = document.createElement('h2')
        const liText = document.createTextNode(title)
        const img = document.createElement('img')
        img.setAttribute('src', getRandomImage());
        img.setAttribute('class', 'movie_img');
        li.appendChild(img);
        movie_title.appendChild(liText)
        li.appendChild(movie_title)
        list.appendChild(li)
    }
    

}


export const printMovies = async () => {
    const data = await fetchFilms();
    mappingDataFromFetch(data);
    removeLoader();
}

export const mappingDataFromFetch = (data) => {
    data.forEach(element => {
        showListOfMovies(element.title);
        listOfMovies.push(element.title)
    });

}
export const getRandomImage = () => {
 
    return images[randomNumber()];

}

export const removeLoader = () => {
    loaderDiv.remove()
}

export function filterByTitle (listOfMovies, value) {

    return listOfMovies.filter(item => item.toLocaleLowerCase().includes(value))
 
}

export const printFilteredItems = (input) => {
    
        clearList();
        mappingAfterFilter(input);
    
}

export const mappingAfterFilter = () => {
    if(input){
    const byTitle = filterByTitle(listOfMovies, input.value)
    byTitle.map(item => {showListOfMovies(item)})
}
}


export const clearList = () => {
    const allListItem = document.querySelectorAll('.list_item');
    allListItem.forEach(element => {
        element.remove();
    })
}

if(input){
    input.addEventListener('keyup', function (){
        printFilteredItems(input)
    });
}



loader();

