'use strict';
//QUERY SELECTORS
const charactersList = document.querySelector('.js-characters-list');
const favList = document.querySelector('.js-fav-list');
const searchBtn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-input');


//VARIABLES GLOBALES
let allCharacters = [];
let favCharacters = [];

//Pintar todos los personajes al cargar la página


//¿Puedo dejar este fetch fuera de todo?
fetch ('https://breakingbadapi.com/api/characters')
.then ((response)=>response.json())
.then ((jsondata)=>{
    allCharacters = jsondata;
    renderAllCharacters();  
})

function renderOneCharacter (character){
    
    //Creo el li con todo lo que lleva dentro con DOM avanzado
    const characterElement = document.createElement('li');
    characterElement.classList.add ('character');
    characterElement.classList.add ('js-character');

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
        const cha= renderOneCharacter(allCharacters[i]);  
        charactersList.appendChild(cha); 
        cha.dataset.id = allCharacters[i].char_id;    
    }
    const allCharactersLi = document.querySelectorAll('.js-character');
    for (const eachCharacter of allCharactersLi){
        eachCharacter.addEventListener('click',handleClickCharacter)
    }
}

//Funcionalidad del botón de Search

function handleSearchBtn (event){
event.preventDefault();
const searchedNameList = allCharacters.filter((character)=>character.name.toLowerCase().includes(input.value.toLowerCase()));
charactersList.innerHTML = '';
for (let i = 0; i < searchedNameList.length; i++) {
    const cha = renderOneCharacter(searchedNameList[i]); 
    charactersList.appendChild(cha);   
}
}

searchBtn.addEventListener('click', handleSearchBtn);


//Marcar los personajes favoritos

function renderFavCharacters() {
    favList.innerHTML = '';
    console.log(favCharacters);
    
    for (let i = 0; i < favCharacters.length; i++) {
        const cha= renderOneCharacter(favCharacters[i]); 
        favList.appendChild(cha);   
    }
}

function handleClickCharacter(event){
event.currentTarget.classList.toggle('selected');
//console.log(event.currentTarget.getAttribute('data-id'));
const selectedCharacter = allCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('data-id')));
const characterInFav = favCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('data-id')));
if (!characterInFav){
    favCharacters.push(selectedCharacter);
}

renderFavCharacters();

}






//# sourceMappingURL=main.js.map
