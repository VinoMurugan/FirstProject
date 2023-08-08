const playBoard = document.querySelector(".play-board");
// const gridSize = 30;
let foodX , foodY ;
let snakeX = 5 , snakeY = 10;
let snakeBody = [];
let velocityX = 0 , velocityY = 0;


const changeFoodPosition = () =>{
    //passing a random value 0-30 as food position
foodX = Math.floor(Math.random() * 30) + 1;
foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) =>{
    //change velocity value based on key
    if(e.key === "ArrowUp") {
        velocityX = 0 ;
        velocityY = -1 ;
    } else if(e.key === "ArrowDown") {
        velocityX = 0 ;
        velocityY = 1 ;
    } else if(e.key === "ArrowLeft") {
        velocityX = -1 ;
        velocityY = 0 ;
    } else if(e.key === "ArrowRight") {
        velocityX = 1 ;
        velocityY = 0;
    }
    initalGame();
};

const initalGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    //checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX,foodY]); //pusing food position to snake body array
        console.log(snakeBody);
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
    
    for (let i=0; i < snakeBody.length; i++){
    //add a div for each part of the snake body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setInterval(initalGame, 125);
document.addEventListener("keydown",changeDirection);