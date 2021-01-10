// DOM Elements
const charactersContainer_ = document.querySelector("#characters-container");
const noSearchedCharacter_ = document.querySelector(".no-searched-character");

// Characters
var HPCharacters = [];

async function getHPCharacters() {
  await fetch("http://hp-api.herokuapp.com/api/characters")
    .then((response) => response.json())
    .then((characters) => {
      return characters.map(({ name, image, actor }) => ({
        name,
        image,
        actor,
      }));
    })
    .then((characters) => {
      HPCharacters = characters;
      displayCharacters(characters);
    });
}

function displayCharacters(characters) {
  charactersContainer_.innerHTML = characters.map(({ name, image, actor }) =>
    `
      <div class="character-card">
          <div class="image"><img src=${image} /></div>
          <h2>${actor}</h2> 
          <h4>as ${name}</h4>   
      </div>
    `.trim()
  );
}

function displaySearchedCharacters(e) {
  noSearchedCharacter_.style.display = "none";

  const inpText = e.target.value.trim().toLowerCase();

  const filteredCharacters = HPCharacters.filter(
    ({ name, actor }) =>
      name.toLowerCase().includes(inpText) ||
      actor.toLowerCase().includes(inpText)
  );

  displayCharacters(filteredCharacters);

  if (filteredCharacters.length === 0) {
    noSearchedCharacter_.style.display = "flex";
  }
}

function skeletonLoading() {
  const skeletonStr = `
    <div class="skeleton-loading character-card">
        <div class="image"></div>
        <span></span>
        <span></span>
    </div>
  `.trim();

  for (let i = 0; i < 25; i++) charactersContainer_.innerHTML += skeletonStr;
}

skeletonLoading();
getHPCharacters();
