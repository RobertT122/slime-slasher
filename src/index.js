import Game from './scripts/game.js'
import Enemy from './scripts/enemy.js'

// window.Attack = Attack;
// window.Player = Player;
// window.Enemy = Enemy;
window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let canvas = document.getElementById("canvas1")
  let ctx = canvas.getContext("2d")
  let frameRate = 150;
  // "Clean" frame rates:
  // 150, 130, 105, 55, 30
  let game = new Game(ctx);
  let frameCount = 0;



  let red = document.getElementById("red")
  red.addEventListener("click", function(){
    game.currentEnemy.recieveAttack("red")
    console.log("RED")
  })

  let green = document.getElementById("green")
  green.addEventListener("click", function(){
    console.log("GREEN")
  })

  let blue = document.getElementById("blue")
  blue.addEventListener("click", function(){
    console.log("BLUE")
  })




  setInterval(function(){
    frameCount++
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    game.render(frameCount, frameRate);
  }, frameRate)

})