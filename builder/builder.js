import { 
    checkAuth, 
    logout, 
    getTown, 
    getDefaultTown, 
    updateName, 
    updateLand, 
    updateCastle, 
    updateCreature } from '../fetch-utils.js';

const nameForm = document.querySelector('.name-form');
const townNameElem = document.querySelector('.town-name');
const landImg = document.querySelector('#land-image');
const castleImg = document.querySelector('#castle-image');
const creatureImg = document.querySelector('#creature-image');
const messageListElem = document.querySelector('.message-list');
const landDropdown = document.querySelector('#land-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const creatureDropdown = document.querySelector('#creature-dropdown');

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
//land dropdown
    //pull DOM, async/change, const booger=awaitFetchFunc(DOM.value), call displayTown(booger)
landDropdown.addEventListener('change', async() => {
    const newLand = await updateLand(landDropdown.value);

    displayTown(newLand);
});
//castle dropdown
castleDropdown.addEventListener('change', async() => {
    const newCastle = await updateCastle(castleDropdown.value);

    displayTown(newCastle);
});
//creature dropdown
creatureDropdown.addEventListener('change', async() => {
    const newCreature = await updateCreature(creatureDropdown.value);

    displayTown(newCreature);
});
//name form & button
nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    const name = data.get('name');

    const updatedTown = await updateName(name);

    displayTown(updatedTown);

    nameForm.reset();
});
//displayCity (tCont, report, loop)
function displayTown(town) {
    //tCont name
    townNameElem.textContent = town.name;
    //change img src (land, castle, creature)
    landImg.src = `../assets/land-${town.land}.jpg`;

    castleImg.src = `../assets/castle-${town.castle}.jpg`;

    creatureImg.src = `../assets/creature-${town.creature}.png`;
    //loop messages/render/append
    for (let message of town.message) {
        const messageElem = document.createElement('p');

        messageElem.classList.add('message');
        messageElem.textContent = message;

        messageListElem.append(messageElem);
    }
}

//message form & button
//land dropdown
//castle dropdown
//creature dropdown
//fetchCity ()