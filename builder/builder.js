import { checkAuth, logout, getTown, getDefaultTown } from '../fetch-utils.js';

const townNameElem = document.querySelector('.town-name');
const landImg = document.querySelector('#land-image');
const castleImg = document.querySelector('#castle-image');
const creatureImg = document.querySelector('#creature-image');
const messageListElem = document.querySelector('.message-list');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//on load
window.addEventListener('load', async() => {
    //check if user has city/fetch from supabase
    const town = await getTown();
    //if no city, fecth/display default city
    if (!town) {
        const newTown = await getDefaultTown();
    } else {
        //if city, display

    }
});
//displayCity (tCont, report, loop)
function displayTown(town) {
    //tCont name

    //change img src (land, castle, creature)
    //loop messages/render/append
}
//name form & button
//message form & button
//land dropdown
//castle dropdown
//creature dropdown
//fetchCity ()