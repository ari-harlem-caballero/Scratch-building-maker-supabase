import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

//on load
//name form & button
//message form & button
//land dropdown
//castle dropdown
//creature dropdown
//fetchCity ()
//displayCity (tCont, report, loop)