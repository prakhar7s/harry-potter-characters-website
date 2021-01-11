// DOM Elements
const charactersContainer_ = document.querySelector("#characters-container");
const noSearchedCharacter_ = document.querySelector(".no-searched-character");
const document_ = document.documentElement.style;

// Characters
var HPCharacters = [];

// Funtion Definitions
async function getHPCharacters() {
  await fetch("http://hp-api.herokuapp.com/api/charactesrs")
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
    })
    .catch((err) => window.alert("Failed to fetch the data from the API."));
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

function openHamburgerMenu(event) {
  const { tagName } = event.target;

  const clickedBtn = tagName === "DIV" ? event.target : event.target.parentNode;

  clickedBtn.classList.toggle("maximize");
}

function enableDarkMode(event) {
  const { tagName } = event.target;
  const btn = tagName === "BUTTON" ? event.target : event.target.parentNode;

  const isDarkEnabled = btn.classList.contains("off");

  btn.children[1].innerText = isDarkEnabled ? "Light Mode" : "Dark Mode";

  btn.children[0].style.left = isDarkEnabled ? "75%" : "0%";

  // Enable Dark Mode
  if (isDarkEnabled) {
    btn.classList.remove("off");
    setDarkModeColor();
  } else {
    btn.classList.add("off");
    setLightModeColor();
  }
}

function setDarkModeColor() {
  document_.setProperty("--background", "#09092e");
  document_.setProperty("--text-color", "#ffffff");
  document_.setProperty(
    "--text-bg-img",
    "url(https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)"
  );
  document_.setProperty("--image-bg", "rgb(37, 36, 36)");
  document_.setProperty("--card-shadow-color", "rgba(0,0,0,0.15");
  document_.setProperty("--card-background", "#000000e5");
  document_.setProperty("--card-border-color", "rgba(255,255,255,.2)");
}

function setLightModeColor() {
  document_.setProperty("--background", "#ffffff96");
  document_.setProperty("--text-color", "#000000");
  document_.setProperty(
    "--text-bg-img",
    "url(https://images.unsplash.com/photo-1550757750-4ce187a65014?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80)"
  );
  document_.setProperty("--image-bg", "rgb(229, 228, 231)");
  document_.setProperty("--card-shadow-color", "rgba(143, 141, 141, 0.15)");
  document_.setProperty("--card-background", "#ffffff");
  document_.setProperty("--card-border-color", "rgba(0, 0, 0, 0.2)");
}

// Funtion Calls
skeletonLoading();
getHPCharacters();
