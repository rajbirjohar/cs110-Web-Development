// HTML Elements
const statusDiv = document.querySelector(".status");
const restartDiv = document.querySelector(".restart");
const scoreDiv = document.querySelector(".scoreboard");
const cellDivs = document.querySelectorAll(".box");
const modeDiv = document.querySelector(".mode")

// game constants
const xSymbol = "×";
const oSymbol = "o";

//score variables
var xScore = 0;
var oScore = 0;

// game variables
let gameIsLive = true;
let xIsNext = true;
let modeSwitchEnabled = true;
let pvp = true;

// functions
const letterToSymbol = (letter) => (letter === "x" ? xSymbol : oSymbol);

const handleWin = (letter) => {
  gameIsLive = false;
  modeSwitchEnabled = true;
  if (letter === "x") {
    xScore++;
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!<span>`;
    document.getElementById("xscore").innerHTML = `${xScore}`;
  } else {
    oScore++;
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    document.getElementById("oscore").innerHTML = `${oScore}`;
  }
};

const checkWin = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  modeSwitchEnabled = false;
  // check winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[1].classList.add("success");
    cellDivs[2].classList.add("success");
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);
    cellDivs[3].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[5].classList.add("success");
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);
    cellDivs[6].classList.add("success");
    cellDivs[7].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[3].classList.add("success");
    cellDivs[6].classList.add("success");
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);
    cellDivs[1].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[7].classList.add("success");
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cellDivs[2].classList.add("success");
    cellDivs[5].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cellDivs[2].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[6].classList.add("success");
  }
}

const checkTie = () => {
  if (
    cellDivs[0].classList[1] &&
    cellDivs[1].classList[1] &&
    cellDivs[2].classList[1] &&
    cellDivs[3].classList[1] &&
    cellDivs[4].classList[1] &&
    cellDivs[5].classList[1] &&
    cellDivs[6].classList[1] &&
    cellDivs[7].classList[1] &&
    cellDivs[8].classList[1]
  ) {
    gameIsLive = false;
    modeSwitchEnabled = false;
    statusDiv.innerHTML = "Game is tied!";
  }
}

const gameState = () => {
  // X move
  if(gameIsLive){
    statusDiv.innerHTML = `${xSymbol} is next.`;
    checkWin();
  }
  checkTie();

  // O move
  if(gameIsLive) {
    compChoice(cellDivs);
    checkWin();
  }
  checkTie();
};

// event Handlers
const handleRestart = () => {
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} is next.`;
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x");
    cellDiv.classList.remove("o");
    cellDiv.classList.remove("success");
  }
  gameIsLive = true;
};

function reset() {
  document.getElementById("xscore").innerHTML = `0`;
  document.getElementById("oscore").innerHTML = `0`;
  xScore = 0;
  oScore = 0;
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} is next.`;
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x");
    cellDiv.classList.remove("o");
    cellDiv.classList.remove("success");
  }
  gameIsLive = true;
}

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if(pvp){
    if (!gameIsLive || classList[1] === "x" || classList[1] === "o") {
      return;
    }

    if (xIsNext) {
      classList.add("x");
      pvpGameState();
    } else {
      classList.add("o");
      pvpGameState();
    }
  }
  else{
    if (!gameIsLive || classList[1] === "x" || classList[1] === "o") {
      return;
    }
    classList.add("x");
    gameState();
  }
  
};

const compChoice = (e) => {
  var comp = Math.floor(Math.random()*9);
  console.log("compchoosing");
  while(e[comp].classList[1] === "x" || e[comp].classList[1] === "o"){
    console.log("regen");
    comp = Math.floor(Math.random()*9);
  }
  e[comp].classList.add("o");

}

// pvp mode
const pvpHandleWin = (letter) => {
  gameIsLive = false;
  modeSwitchEnabled = true;
  if (letter === "x") {
    xScore++;
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    document.getElementById("xscore").innerHTML = `${xScore}`;
  } else {
    oScore++;
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    document.getElementById("oscore").innerHTML = `${oScore}`;
  }
};

const pvpGameState = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  modeSwitchEnabled = false;
  // check winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    pvpHandleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[1].classList.add("success");
    cellDivs[2].classList.add("success");
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    pvpHandleWin(middleLeft);
    cellDivs[3].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[5].classList.add("success");
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    pvpHandleWin(bottomLeft);
    cellDivs[6].classList.add("success");
    cellDivs[7].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    pvpHandleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[3].classList.add("success");
    cellDivs[6].classList.add("success");
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    pvpHandleWin(topMiddle);
    cellDivs[1].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[7].classList.add("success");
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    pvpHandleWin(topRight);
    cellDivs[2].classList.add("success");
    cellDivs[5].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    pvpHandleWin(topLeft);
    cellDivs[0].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[8].classList.add("success");
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    pvpHandleWin(topRight);
    cellDivs[2].classList.add("success");
    cellDivs[4].classList.add("success");
    cellDivs[6].classList.add("success");
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsLive = false;
    statusDiv.innerHTML = "Game is tied!";
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} is next.`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next.</span>`;
    }
  }
};

// switch mode
function switchmode (e) {
  if(modeSwitchEnabled){
    pvp = !pvp;
  }
  if(pvp){
    modeDiv.innerHTML = `PvP`;
  }
  else if (!pvp){
    modeDiv.innerHTML = `Ai`;
  }
}

// event listeners
restartDiv.addEventListener("click", handleRestart);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", handleCellClick);
}
