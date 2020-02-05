import randomNumber from './randomNumber.js'; 

test('test random number function', () => {
   
    const result = randomNumber();

    expect(result).toEqual(expect.any(Number));
 });
 
 


