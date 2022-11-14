'use strict';

//QUERY SELECTORS
const charactersList = document.querySelector('.js-characters-list');
const favList = document.querySelector('.js-fav-list');
const searchBtn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-input');
const charactersSection = document.querySelector('.js-characters-section');
const favSection = document.querySelector('.js-fav-section');
const resetBtn = document.querySelector('.js-reset-btn');

//VARIABLES GLOBALES
let allCharacters = [];
let favCharacters = [];

// FUNCIONES
function renderOneCharacter (character){
    
    //Creo el li con todo lo que lleva dentro con DOM avanzado
    const characterElement = document.createElement('li');
    characterElement.classList.add ('character');
    characterElement.classList.add ('js-character');
    characterElement.setAttribute('id',character.char_id);

    // const divHeart = document.createElement('div');
    // const characterHeart = document.createElement('i');
    // characterHeart.classList.add ('fa-solid');
    // characterHeart.classList.add ('fa-heart');
    // characterHeart.classList.add ('fa-xl');
    // divHeart.appendChild(characterHeart);       
    // divHeart.classList.add('character__heart');
    // divHeart.classList.add('hidden');
    // characterElement.appendChild(divHeart);


    const characterImg = document.createElement('img');
    characterImg.classList.add ('character__img');
    characterImg.src = character.img;
    characterImg.setAttribute('alt',`image of ${character.name}`);
    characterElement.appendChild(characterImg);
    

    const characterName = document.createElement('h3');
    characterName.classList.add ('character__name');
    const textName = document.createTextNode(character.name);
    characterName.appendChild(textName);
    characterElement.appendChild(characterName);

    const characterStatus = document.createElement('p');
    characterStatus.classList.add ('character__status');
    const textStatus = document.createTextNode(character.status);
    characterStatus.appendChild(textStatus);
    characterElement.appendChild(characterStatus);

    return characterElement;
}
function renderOneFavCharacter(character){
    
    //Creo el li con todo lo que lleva dentro con DOM avanzado
    const characterElement = document.createElement('li');
    characterElement.classList.add ('character');
    characterElement.classList.add ('js-fav-character');
    characterElement.setAttribute('id',character.char_id);

    const divHeartCross = document.createElement('div');
    const iconHeartCross = document.createElement('i');
    iconHeartCross.classList.add ('fa-solid');
    iconHeartCross.classList.add ('fa-heart-circle-xmark');
    iconHeartCross.classList.add ('fa-xl');
    divHeartCross.appendChild(iconHeartCross);       
    divHeartCross.classList.add('character__heart--cross');
    //divHeartCross.classList.add('hidden');
    characterElement.appendChild(divHeartCross);

    const characterImg = document.createElement('img');
    characterImg.classList.add ('character__img');
    characterImg.src = character.img;
    characterImg.setAttribute('alt',`image of ${character.name}`);
    characterElement.appendChild(characterImg);

    const characterName = document.createElement('h3');
    characterName.classList.add ('character__name');
    const textName = document.createTextNode(character.name);
    characterName.appendChild(textName);
    characterElement.appendChild(characterName);

    const characterStatus = document.createElement('p');
    characterStatus.classList.add ('character__status');
    const textStatus = document.createTextNode(character.status);
    characterStatus.appendChild(textStatus);
    characterElement.appendChild(characterStatus);

    return characterElement; 
}
function renderAllCharacters(){
    charactersList.innerHTML = '';
    for (let i = 0; i < allCharacters.length; i++) {
        const liCharacter= renderOneCharacter(allCharacters[i]);  
        charactersList.appendChild(liCharacter);
        const positionInFav = favCharacters.findIndex((favCharacter)=> favCharacter.char_id === parseInt(liCharacter.getAttribute('id')));
        if (positionInFav !== -1){
            liCharacter.classList.add('selected');
        }
     }
    listenerForCharacters();
}
function renderFavCharacters(){
    favList.innerHTML = '';
    console.log('hola',favCharacters);
    for (let i = 0; i < favCharacters.length; i++) {
        const favCharacterToRender= renderOneFavCharacter(favCharacters[i]); 
        favList.appendChild(favCharacterToRender); 
    }
    listenerForCharactersWithHeartCross();
}
function listenerForCharacters(){
    const allCharactersLi = document.querySelectorAll('.js-character');
    for (const eachCharacter of allCharactersLi){
        eachCharacter.addEventListener('click',handleClickCharacter)
    }
}
function listenerForCharactersWithHeartCross(){
    const allHeartsCross = document.querySelectorAll('.fa-heart-circle-xmark');
    for (const eachHeart of allHeartsCross){
        eachHeart.addEventListener('click',handleClickHeart);
    }
}
function hideShowFavSection() {
    if (favList.innerHTML === ''){
        favSection.classList.add('hidden');
        charactersSection.classList.add('when-hidden');
    }else{
        favSection.classList.remove('hidden');
        charactersSection.classList.remove('when-hidden');
    }
}
function addCharacterToFav(){
    if (event.currentTarget.classList.contains('selected')){
        const selectedCharacter = allCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id')));
        const characterInFav = favCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id'))) ;
        if (!characterInFav){
            favCharacters.push(selectedCharacter);
            //debugger;
        }
    }else{
        const selectedCharacterPosition = favCharacters.findIndex((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id')));
        favCharacters.splice(selectedCharacterPosition,1);
    }
}
function saveFavoritesToLocalStorage(){
    localStorage.setItem("Favorites", JSON.stringify(favCharacters));
}
function getFavoritesFromStorage(){
    const savedFavorites = JSON.parse(localStorage.getItem("Favorites"));
    favCharacters = savedFavorites;
}
function handleClickCharacter(event){
event.currentTarget.classList.toggle('selected');
addCharacterToFav();
renderFavCharacters();
hideShowFavSection();
saveFavoritesToLocalStorage();
}
function handleResetBtn(event){
    event.preventDefault();
    favCharacters = [];
    renderFavCharacters();
    renderAllCharacters();
    hideShowFavSection();
    saveFavoritesToLocalStorage();
}
function handleSearchBtn (event){
    event.preventDefault();
    const searchedNameList = allCharacters.filter((character)=>character.name.toLowerCase().includes(input.value.toLowerCase()));
    charactersList.innerHTML = '';
    for (let i = 0; i < searchedNameList.length; i++) {
        const charSearchedLi = renderOneCharacter(searchedNameList[i]); 
        charactersList.appendChild(charSearchedLi);   
    }
    listenerForCharacters();
    }
function handleClickHeart (event){
    const selectedCharacterPosition = favCharacters.findIndex((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.closest('.js-fav-character').getAttribute('id')));
    console.log(selectedCharacterPosition);
    favCharacters.splice(selectedCharacterPosition,1);
    console.log(favCharacters);
    renderFavCharacters();
    saveFavoritesToLocalStorage();
    renderAllCharacters();
    hideShowFavSection();
}

// EVENTOS 
searchBtn.addEventListener('click', handleSearchBtn);
resetBtn.addEventListener('click',handleResetBtn);

// CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
fetch ('https://breakingbadapi.com/api/characters')
.then ((response)=>response.json())
.then ((jsondata)=>{
    allCharacters = jsondata;
    getFavoritesFromStorage();
    renderFavCharacters();
    renderAllCharacters();
    hideShowFavSection();
})
//# sourceMappingURL=main.js.map
