'use strict';

//QUERY SELECTORS
const charactersList = document.querySelector('.js-characters-list');
const favList = document.querySelector('.js-fav-list');
const searchBtn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-input');
const charactersSection = document.querySelector('.js-characters-section');
const favSection = document.querySelector('.js-fav-section');

//VARIABLES GLOBALES
let allCharacters = [];
let favCharacters = [];

//Pintar todos los personajes al cargar la página


//¿Puedo dejar este fetch fuera de todo?
fetch ('https://breakingbadapi.com/api/characters')
.then ((response)=>response.json())
.then ((jsondata)=>{
    allCharacters = jsondata;
    getFavoritesFromStorage();
    renderFavCharacters();
    renderAllCharacters();
    hideShowFavSection();
})

function renderOneCharacter (character){
    
    //Creo el li con todo lo que lleva dentro con DOM avanzado
    const characterElement = document.createElement('li');
    characterElement.classList.add ('character');
    characterElement.classList.add ('js-character');
    characterElement.setAttribute('id',character.char_id);

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


function listenerForCharacters(){
    const allCharactersLi = document.querySelectorAll('.js-character');
    for (const eachCharacter of allCharactersLi){
        eachCharacter.addEventListener('click',handleClickCharacter)
    }
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

//Funcionalidad del botón de Search

function handleSearchBtn (event){
event.preventDefault();
const searchedNameList = allCharacters.filter((character)=>character.name.toLowerCase().includes(input.value.toLowerCase()));
charactersList.innerHTML = '';
for (let i = 0; i < searchedNameList.length; i++) {
    const cha = renderOneCharacter(searchedNameList[i]); 
    charactersList.appendChild(cha);   
}
listenerForCharacters();
}

searchBtn.addEventListener('click', handleSearchBtn);


//Marcar los personajes favoritos y pintarlos en la columna de favoritos sin repetirlos o sacarlos de favoritos.

function renderFavCharacters() {
    favList.innerHTML = '';
    for (let i = 0; i < favCharacters.length; i++) {
        const cha= renderOneCharacter(favCharacters[i]); 
        favList.appendChild(cha); 
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
        }
    }else{
        const selectedCharacterPosition = favCharacters.findIndex((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id')));
        favCharacters.splice(selectedCharacterPosition,1);
    }
}

function saveFavoritesToLocalStorage(){
    console.log(favCharacters);
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

// Almacenamiento local de favoritos





//   if (event.currentTarget.classList.contains('selected')){
        
    
    
    
    
//     const charactersToMark = allCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id')));
//         const characterInFav = favCharacters.find((eachCharacter)=> parseInt(eachCharacter.char_id) === parseInt(event.currentTarget.getAttribute('id'))) ;
//         if (!characterInFav){
//             favCharacters.push(selectedCharacter);
//         }




// for (const eachCharacter of allCharacters) {

// const positionInFav = favCharacters.findIndex((favCharacter)=> favCharacter.id === eachCharacter.id);
// if (positionInFav=== -1)
// .classList.add('selected');
// }


//# sourceMappingURL=main.js.map
