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

        displayTown(newTown);
    } else {
        //if city, display
        displayTown(town);
    }
});
//displayCity (tCont, report, loop)
function displayTown(town) {
    //tCont name
    townNameElem.textContent = town.name;
    //change img src (land, castle, creature)
    // landImg.src = `../assets/land-${town.land}.BLEH`;
    // castleImg.src = `../assets/castle-${town.castle}.BLEH`;
    // creatureImg.src = `../assetes/creature-${town.creature}.BLEH`;
    //loop messages/render/append
    for (let message of town.message) {
        const messageElem = document.createElement('p');

        messageElem.classList.add('message');
        messageElem.textContent = message;

        messageListElem.append(messageElem);
    }
}
//name form & button
//message form & button
//land dropdown
//castle dropdown
//creature dropdown
//fetchCity ()