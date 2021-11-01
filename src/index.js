import Game from './scripts/game.js'
import Enemy from './scripts/enemy.js'

// window.Attack = Attack;
// window.Player = Player;
// window.Enemy = Enemy;
window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let canvas = document.getElementById("canvas1")
  let ctx = canvas.getContext("2d")
  const image = new Image()
  image.src = "GreenSlimeidle-sprite-sheet-export.png"
  let idx = 0;
  let square = image.height;
  let positionX = 100;
  let positionY = 100;
  image.addEventListener("load", function(){
    //example of a frame animation of the green slime.
    ctx.drawImage(image, idx*square, 0, square, square, positionX, positionY, square, square);
    setInterval(function(){
      idx = (idx+1)%4;
      ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
      ctx.drawImage(image, idx*square, 0, square, square, positionX, positionY, square, square);
  
    }, 150)
  })

})