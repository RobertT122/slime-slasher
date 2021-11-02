import Game from './scripts/game.js'
import Enemy from './scripts/enemy.js'

// window.Attack = Attack;
// window.Player = Player;
// window.Enemy = Enemy;
window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let canvas = document.getElementById("canvas1")
  let ctx = canvas.getContext("2d")
  let frameRate = 130;
  // "Clean" frame rates:
  // 150, 130, 105, 55, 30
  let game = new Game(ctx);
  let frameCount = 0;
  function incrementFrame(){
    frameCount = (frameCount+1)%20
  }


  let red = document.getElementById("red")
  red.addEventListener("click", function(){
    game.currentEnemy.recieveAttack("red")
    console.log("RED")
  })

  let green = document.getElementById("green")
  green.addEventListener("click", function(){
    game.currentEnemy.recieveAttack("green")
    console.log("GREEN")
  })

  let blue = document.getElementById("blue")
  blue.addEventListener("click", function(){
    game.currentEnemy.recieveAttack("blue")
    console.log("BLUE")
  })




  setInterval(function(){
    incrementFrame()
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    game.render(frameCount, frameRate);
  }, frameRate)

})


