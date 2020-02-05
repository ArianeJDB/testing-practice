import fakeData from '../fixtures/dataFixture.js'

export default function fetchFilms(error) {
    return new Promise((resolve, reject) =>{
        error 
        ? reject(error)
        : resolve(fakeData)
        
    })
}

