//Dom Element Selection
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");
// const gridSize = 30;

//Audio Setup
const eatSound = new Audio('sound/Metal Gear Menu.mp3');
eatSound.volume=0.4;

const hitSound = new Audio('sound/Pan Hit Sound In Game - Pubg Game.mp3');
hitSound.volume = 1.0;

//Snake Body Color
const snakeColors = ['blue', 'green', 'red', 'orange', 'purple'];

//Game Variables
let gameover = false;
let foodX , foodY ;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let velocityX = 0 ; 
let velocityY = 0;
let setIntervalId;
let score = 0;

//Sound Function
function playEatSound() {
    eatSound.currentTime = 0;
    eatSound.play();
  }
  
  function playHitSound() {
    hitSound.currentTime = 0;
    hitSound.play();
  }
  
//getting high score from the local storage 
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//Changing Food Position
const changeFoodPosition = () =>{

//passing a random value 0-30 as food position
foodX = Math.floor(Math.random() * 30) + 1;
foodY = Math.floor(Math.random() * 30) + 1;

};

//Game Over Handling
const handleGameOver = () => {
 //clearing the timer and reloading the page on game over
clearInterval(setIntervalId);
alert("GAME OVER ! press ok to replay....") ;
location.reload();
}

//Changing Direction
const changeDirection = (e) =>{
    //change velocity value based on key
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0 ;
        velocityY = -1 ;
    } else if(e.key === "ArrowDown"&& velocityY != -1) {
        velocityX = 0 ;
        velocityY = 1 ;
    } else if(e.key === "ArrowLeft"&& velocityX != 1) {
        velocityX = -1 ;
        velocityY = 0 ;
    } else if(e.key === "ArrowRight"&& velocityX != -1) {
        velocityX = 1 ;
        velocityY = 0;
    }
    initalGame();
};

//Initializing Game
const initalGame = () => {
    if(gameover)return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    //checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX,foodY]); //pusing food position to snake body array
        // console.log(snakeBody);
        score++;  //increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        playEatSound();
        
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--){
        //shifting forward the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i-1];
    }

    //setting first element of snake body to current snake position
    snakeBody[0] = [snakeX,snakeY];

    //updating snake head position based on current velocity
    snakeX +=velocityX;
    snakeY +=velocityY;
    
    //checking if the snake head is out of wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <=0 || snakeY > 30) {
    gameover = true;
    playHitSound();
   }

    for (let i = 0; i < snakeBody.length; i++) {
    const segmentColor = snakeColors[i % snakeColors.length];
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}; background-color: ${segmentColor};"></div>`;

   
    //checking if the snake head hit the body 
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ) {
    gameover = true;
   }
}
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();

document.addEventListener("keydown",changeDirection);


// Select the start button element
const startBtn = document.getElementById("startBtn");

//Starting the Game 
// Add event listener for the start button
startBtn.addEventListener("click", startGame);

// Function to start the game
function startGame() {
   setIntervalId = setInterval(initalGame, 250);
}
