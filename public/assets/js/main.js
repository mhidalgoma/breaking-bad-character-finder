'use strict';
//QUERY SELECTORS
const charactersList = document.querySelector('.js-characters-list');
const searchBtn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-input');


//VARIABLES GLOBALES
let allCharacters = [];
let favCharacters = [];

//Pintar todos los personajes al cargar la página

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

    charactersList.appendChild(characterElement);
}

function renderAllCharacters(){
    charactersList.innerHTML = '';

    for (let i = 0; i < allCharacters.length; i++) {
        renderOneCharacter(allCharacters[i]);        
    }
}

//Funcionalidad del botón de Search

function handleSearchBtn (event){
event.preventDefault();
const searchedNameList = allCharacters.filter((character)=>character.name.toLowerCase().includes(input.value.toLowerCase()));
charactersList.innerHTML = '';
for (let i = 0; i < searchedNameList.length; i++) {
    renderOneCharacter(searchedNameList[i]);        
}
}


searchBtn.addEventListener('click', handleSearchBtn);
//# sourceMappingURL=main.js.map
