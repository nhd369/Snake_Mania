const playBoard=document.querySelector(".play-board");
const scoreElement =document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");
let foodX ,foodY;
const foodSound=new Audio('Eating.mp3');
const gameOverSound=new Audio('Game Over.mp3');
const moveSound=new Audio('move.mp3'); 
let gameOver=false;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0,velocityY=0;
let setIntervalId;
let score=0;
let highScore=localStorage.getItem("high-score")||0;

const changeFoodPos= () => {
    foodX=Math.floor(Math.random()*20)+1;
    foodY=Math.floor(Math.random()*20)+1;
}

const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("GameOver");
   location.reload();
}

const changeDirection=(h)=>{
   if (h.key=="ArrowUp"){
    velocityX=0;
    velocityY=-1;
   }
   else if( h.key=="ArrowLeft"){
    velocityX=-1;
    velocityY=0;
   }
   else if(h.key=="ArrowRight"){
    velocityX=1;
    velocityY=0;
   }
   else if(h.key=="ArrowDown") {
    velocityX=0;
    velocityY=1;
   }
   
}
controls.forEach(key=>{
    key.addEventListener("click",()=>changeDirection({key:key.dataset.key}));
   

});
const initGame =() => {
    if(gameOver)return handleGameOver();
    let htmlMarkup=`<div class= "food" style="grid-area:${foodY} /${foodX} "></div>`;
    if (snakeX===foodX&&snakeY===foodY ){
        changeFoodPos();
        snakeBody.push([foodX,foodY]);
        score++;

        highScore=score>=highScore? score:highScore;
        localStorage.setItem("high-score",highScore);

        scoreElement.innerText=`Score:${score}`;
        highScoreElement.innerText=`High Score:${highScore}`;
       
    }
for (let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }

snakeBody[0]=[snakeX,snakeY];
    snakeX+=velocityX;
    snakeY+=velocityY;

 if (snakeX<=0||snakeY>20||snakeY<=0||snakeY>20){
    gameOver=true;
 }

for (let i=0;i<snakeBody.length;i++){
    htmlMarkup+=`<div class= "head" style="grid-area:${snakeBody[i][1]} /${snakeBody[i][0]} "></div>`; 
    if (i!==0&&snakeBody[0][1]===snakeBody[i][1]&&snakeBody[0][0]===snakeBody[i][0]){
        gameOver=true;
    }
}

    playBoard.innerHTML=htmlMarkup;
}
changeFoodPos();

setIntervalId=setInterval(initGame,125);  
document.addEventListener("keydown",changeDirection);