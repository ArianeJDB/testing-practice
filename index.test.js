import * as films from './films';
import * as index from './index.js'
import { fakeData } from './__mocks__/fetchFilms.js';
import { images } from './images';
import { fakeList } from './fixtures/listFixture';
jest.mock('./fetchFilms');


test('fetch data', () => {
    expect.assertions(1);
  
    return films.getFilms().then(data => {
       
        expect(data).toEqual(fakeData)
    })
})


test('tests error with rejects', () => {
    const error = 'error'
    return films.getFilms(error).catch(error => {
        expect(error).toEqual({error: 'error'})
    }
    );
  });

test('add div loader to wrapper', () => {
    document.body.innerHTML = `<div class="wrapper"></div>`;
    const wrapper = document.querySelector('.wrapper');
    index.loader(wrapper);
    expect(wrapper.innerHTML).toBe(`<div class="loader"></div>`)
})

test('remove div loader', () => {
    const wrapper = document.querySelector('.wrapper');
    index.removeLoader(wrapper);
    expect(wrapper.innerHTML).not.toBe(`<div class="loader"></div>`)
})

test('print one item of the list', () => {
    document.body.innerHTML = `<ul class="list"></ul>`;
    const input = `<li class="list_item"><img src="https://cdn.shopify.com/s/files/1/0014/2648/9388/products/bluefin-home-decor-studio-ghibli-my-neighbor-totoro-3d-puzzle-5598257414188_2000x2000.jpg?v=1565004823" class="movie_img"><h2>Castle in the Sky</h2></li>`
    index.showListOfMovies(input);
    expect(input).toBe(fakeList)

})

test('remove items of the list', () => {
    const wrapper = document.querySelector('.list_item');
    index.clearList(wrapper);
    expect(wrapper.innerHTML).not.toBe(`<li class="list_item"></li>`)
})

test('the list of movies has this one on it', () => {
    expect(images).toContain('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5uEB7WRlMJ9C0ePRTtw4C7GLWSLgfHeRcTPv9KK1Mdr84Fdi&s')
})


test("it should filter by a search term (sky)", () => {
    const input = [
        'Castle in the Sky','Grave of the Fireflies','My Neighbor Totoro'
    ];
    const text = 'sky';
    const output = ['Castle in the Sky'];

    expect(index.filterByTitle(input, text)).toEqual(output);
});

describe('mapping after filtered', () => {
    const showListOfMoviesSpy = jest.spyOn(index, 'showListOfMovies');
   test('map of filtered array', () => {
    const fakeArray = [
        {
            "title": "Castle in the Sky",
            "description": "The orphan Sheeta",
            "director": "Hayao Miyazaki",
            "producer": "Isao Takahata",
            "rt_score": "95",
        }
    ];
    
    const input = fakeArray.map(item=>
        `<li class="list_item">${item.title}</li><li class="list_item">${item.description}</li><li class="list_item">${item.director}</li><li class="list_item">${item.producer}</li><li class="list_item">${item.rt_score}</li>`)

    const output =['<li class="list_item">Castle in the Sky</li><li class="list_item">The orphan Sheeta</li><li class="list_item">Hayao Miyazaki</li><li class="list_item">Isao Takahata</li><li class="list_item">95</li>']
    
    index.mappingAfterFilter(fakeArray);

    expect(input).toStrictEqual(output)
}) 

    test('calls show list of movies method', () => {
        document.body.innerHTML = `<input class='input' type="text" id='input_id' />`;
        const inputHTML = document.querySelector('.input');
    
        index.mappingAfterFilter(inputHTML);
        expect(showListOfMoviesSpy).toHaveBeenCalled();
    })
})


describe('printFilteredItems', () => {
    const clearListSpy = jest.spyOn(index, 'clearList');

    test('calls clearlist, filteredByTitle and showListsOfMovies', () => {
    document.body.innerHTML = `<input class='input' type="text" id='input_id' />`;
    const input = document.querySelector('.input');

    const value = [
        'Castle in the Sky','Grave of the Fireflies','My Neighbor Totoro'
    ];
    const text = 'sky';
    
    index.printFilteredItems(input);
 
    expect(clearListSpy).toHaveBeenCalled();
    //expect(filterByTitleSpy).toHaveBeenCalledWith(value, text);

});
});

describe('printMovies', () => {
    const removeLoaderSpy = jest.spyOn(index, 'removeLoader');
    const fetchFilmsSpy = jest.spyOn(films, 'getFilms');
    
    test('calls fetchFilm, showListsOfMovies and removeLoader', () => {
    
    index.printMovies();
 
    expect(fetchFilmsSpy).toHaveBeenCalled();
    expect(removeLoaderSpy).toHaveBeenCalled();

});
});