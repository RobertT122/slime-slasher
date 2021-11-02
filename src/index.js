import Game from './scripts/game.js'
import Enemy from './scripts/enemy.js'

window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let canvas = document.getElementById("canvas1")
  let ctx = canvas.getContext("2d")
  let frameRate = 55;
  // "Clean" frame rates:
  // 150, 130, 105, 55, 30
  let game = new Game(ctx);
  let frameCount = 0;
  function incrementFrame(){
    frameCount = (frameCount+1)%64
  }

  //event lisitener for canvas
  canvas.addEventListener("click", function(event){
    let scaler= 800/document.documentElement.scrollWidth;
    let x = Math.round(scaler *event.pageX);
    let y = Math.round(scaler *event.pageY);
    game.manageClickEvent(x,y);
  })

  setInterval(function(){
    incrementFrame()
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.render(frameCount, frameRate);
  }, frameRate)

})


