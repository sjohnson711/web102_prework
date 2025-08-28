import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    let gameCard = document.createElement("div");
    gameCard.classList.add("games-card");
    gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}"/>
            <h2>${game.name}</h2>
            <p>${game.description}</p>
        `;
    gamesContainer.appendChild(gameCard);
  }
}
addGamesToPage(GAMES_JSON);

const contributionsCard = document.getElementById("num-contributions");

const total = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

const commas = total.toLocaleString();
contributionsCard.innerHTML = `${commas}`;

const raisedCard = document.getElementById("total-raised");

const raised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `$${raised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

function filterUnfundedOnly(game) {
  deleteChildElements(gamesContainer);
  const results = GAMES_JSON.filter((game) => game.pledged < game.goal);
  console.log(results);

  addGamesToPage(results);
}

filterUnfundedOnly();

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const met = GAMES_JSON.filter((result) => result.goal <= result.pledged);
  console.log(met);
  addGamesToPage(met);
}
filterFundedOnly();

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}
showAllGames();

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");
let unfunded = GAMES_JSON.reduce((acc, game) => {
  if (game.pledged < game.goal) {
    return acc + 1;
  }
  return acc;
}, 0);

let totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
let totalGames = GAMES_JSON.length;

let description = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} Currently, ${unfunded} game${
  unfunded === 1 ? "" : "s"
}  remain${
  unfunded === 1 ? "" : "s"
} unfunded. We need your help to fund these amazing games!
`;

let para = document.createElement("p");
para.innerHTML = description;
descriptionContainer.appendChild(para);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;

const topGame = document.createElement("p");
topGame.innerHTML = `${firstGame.name} <br/> <img src="${firstGame.img}" style="width: 200px"/>`;
firstGameContainer.appendChild(topGame);

const runnerUp = document.createElement("p");
runnerUp.innerHTML = `${secondGame.name} <br/> <img src="${secondGame.img}" style="width: 200px"/>`;
secondGameContainer.appendChild(runnerUp);
