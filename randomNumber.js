import { images } from './images.js';

export default function randomNumber() {

    return Math.floor(Math.random() * images.length);

}