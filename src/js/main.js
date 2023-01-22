'use strict';

//QUERY SELECTORS
const charactersList = document.querySelector('.js-characters-list');
const favList = document.querySelector('.js-fav-list');
const searchBtn = document.querySelector('.js-search-btn');
const input = document.querySelector('.js-input');
const charactersSection = document.querySelector('.js-characters-section');
const favSection = document.querySelector('.js-fav-section');
const resetBtn = document.querySelector('.js-reset-btn');
const goFavBtn = document.querySelector('.js-btn-go-fav');

//VARIABLES GLOBALES
let allCharacters = [];
let favCharacters = [];
let currentSearchCharacters = [];

// FUNCIONES
function renderOneCharacter(character) {
  const characterElement = document.createElement('li');
  characterElement.classList.add('character');
  characterElement.classList.add('js-character');
  characterElement.setAttribute('id', character.char_id);

  const divHeart = document.createElement('div');
  const characterHeart = document.createElement('i');
  characterHeart.classList.add('fa-solid');
  characterHeart.classList.add('fa-heart');
  characterHeart.classList.add('fa-xl');
  divHeart.appendChild(characterHeart);
  divHeart.classList.add('character__heart');
  characterElement.appendChild(divHeart);

  const characterImg = document.createElement('img');
  characterImg.classList.add('character__img');
  characterImg.src = character.img;
  characterImg.setAttribute('alt', `image of ${character.name}`);
  characterElement.appendChild(characterImg);

  const characterName = document.createElement('h3');
  characterName.classList.add('character__name');
  const textName = document.createTextNode(character.name);
  characterName.appendChild(textName);
  characterElement.appendChild(characterName);

  //   const listOccupations = document.createElement('ul');
  //   listOccupations.classList.add('js-list-ocupations');

  //   for (const occupation of character.occupation) {
  //     const li = document.createElement('li');
  //     const text = document.createTextNode(occupation);
  //     li.appendChild(text);
  //     listOccupations.appendChild(li);
  //   }
  //   characterElement.appendChild(listOccupations);

  const characterStatus = document.createElement('p');
  characterStatus.classList.add('character__status');
  const textStatus = document.createTextNode(character.status);
  characterStatus.appendChild(textStatus);
  characterElement.appendChild(characterStatus);

  return characterElement;
}
function renderOneFavCharacter(character) {
  const characterElement = document.createElement('li');
  characterElement.classList.add('character--fav');
  characterElement.classList.add('js-fav-character');
  characterElement.setAttribute('id', character.char_id);

  const divHeartCross = document.createElement('div');
  const iconHeartCross = document.createElement('i');
  iconHeartCross.classList.add('fa-solid');
  iconHeartCross.classList.add('fa-heart-circle-xmark');
  iconHeartCross.classList.add('fa-xl');
  divHeartCross.appendChild(iconHeartCross);
  divHeartCross.classList.add('character__heart--cross');
  characterElement.appendChild(divHeartCross);

  const characterImg = document.createElement('img');
  characterImg.classList.add('character__img');
  characterImg.src = character.img;
  characterImg.setAttribute('alt', `image of ${character.name}`);
  characterElement.appendChild(characterImg);

  const characterName = document.createElement('h3');
  characterName.classList.add('character__name--fav');
  const textName = document.createTextNode(character.name);
  characterName.appendChild(textName);
  characterElement.appendChild(characterName);

  const characterStatus = document.createElement('p');
  characterStatus.classList.add('character__status--fav');
  const textStatus = document.createTextNode(character.status);
  characterStatus.appendChild(textStatus);
  characterElement.appendChild(characterStatus);

  return characterElement;
}
function renderAllCharacters() {
  charactersList.innerHTML = '';
  const characters =
    currentSearchCharacters.length === 0
      ? allCharacters
      : currentSearchCharacters;
  for (let i = 0; i < characters.length; i++) {
    const liCharacter = renderOneCharacter(characters[i]);
    charactersList.appendChild(liCharacter);
    const positionInFav = favCharacters.findIndex(
      (favCharacter) =>
        favCharacter.char_id === parseInt(liCharacter.getAttribute('id'))
    );
    if (positionInFav !== -1) {
      liCharacter.classList.add('selected');
    }
  }
  listenerForCharacters();
}
function renderFavCharacters() {
  favList.innerHTML = '';
  for (let i = 0; i < favCharacters.length; i++) {
    const favCharacterToRender = renderOneFavCharacter(favCharacters[i]);
    favList.appendChild(favCharacterToRender);
  }
  listenerForCharactersWithHeartCross();
}
function listenerForCharacters() {
  const allCharactersLi = document.querySelectorAll('.js-character');
  for (const eachCharacter of allCharactersLi) {
    eachCharacter.addEventListener('click', handleClickCharacter);
  }
}
function listenerForCharactersWithHeartCross() {
  const allHeartsCross = document.querySelectorAll('.fa-heart-circle-xmark');
  for (const eachHeart of allHeartsCross) {
    eachHeart.addEventListener('click', handleClickHeart);
  }
}
function hideShowFavSection() {
  if (favList.innerHTML === '') {
    favSection.classList.add('hidden');
    charactersSection.classList.add('when-hidden');
  } else {
    favSection.classList.remove('hidden');
    charactersSection.classList.remove('when-hidden');
  }
}
function addCharacterToFav(event) {
  if (event.currentTarget.classList.contains('selected')) {
    const selectedCharacter = allCharacters.find(
      (eachCharacter) =>
        eachCharacter.char_id ===
        parseInt(event.currentTarget.getAttribute('id'))
    );
    const characterInFav = favCharacters.find(
      (eachCharacter) =>
        eachCharacter.char_id ===
        parseInt(event.currentTarget.getAttribute('id'))
    );
    if (!characterInFav) {
      favCharacters.push(selectedCharacter);
    }
  } else {
    const selectedCharacterPosition = favCharacters.findIndex(
      (eachCharacter) =>
        parseInt(eachCharacter.char_id) ===
        parseInt(event.currentTarget.getAttribute('id'))
    );
    favCharacters.splice(selectedCharacterPosition, 1);
  }
}
function saveFavoritesToLocalStorage() {
  localStorage.setItem('Favorites', JSON.stringify(favCharacters));
}
function getFavoritesFromStorage() {
  const savedFavorites = JSON.parse(localStorage.getItem('Favorites'));
  if (savedFavorites !== null) {
    favCharacters = savedFavorites;
  }
}
function handleClickCharacter(event) {
  const selectedCharacter = allCharacters.find(
    (eachCharacter) =>
      eachCharacter.char_id === parseInt(event.currentTarget.getAttribute('id'))
  );
  console.log(selectedCharacter.name);
  event.currentTarget.classList.toggle('selected');
  addCharacterToFav(event);
  renderFavCharacters();
  hideShowFavSection();
  saveFavoritesToLocalStorage();
}
function handleResetBtn(event) {
  event.preventDefault();
  favCharacters = [];
  renderFavCharacters();
  renderAllCharacters();
  hideShowFavSection();
  saveFavoritesToLocalStorage();
}
function handleSearchBtn(event) {
  event.preventDefault();
  currentSearchCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(input.value.toLowerCase())
  );
  renderAllCharacters();
  listenerForCharacters();
}
function handleClickHeart(event) {
  const selectedCharacterPosition = favCharacters.findIndex(
    (eachCharacter) =>
      parseInt(eachCharacter.char_id) ===
      parseInt(
        event.currentTarget.closest('.js-fav-character').getAttribute('id')
      )
  );
  console.log(selectedCharacterPosition);
  console.log('hola');
  favCharacters.splice(selectedCharacterPosition, 1);
  renderFavCharacters();
  saveFavoritesToLocalStorage();
  renderAllCharacters();
  hideShowFavSection();
}

// EVENTOS
searchBtn.addEventListener('click', handleSearchBtn);
resetBtn.addEventListener('click', handleResetBtn);

// CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
fetch('./assets/data/characters.json')
  .then((response) => response.json())
  .then((json) => {
    allCharacters = json;
    getFavoritesFromStorage();
    renderFavCharacters();
    renderAllCharacters();
    hideShowFavSection();
  });
