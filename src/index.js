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
    let docWidth = document.documentElement.scrollWidth;
    let x = event.pageX;
    let y = event.pageY;
    if (docWidth > 800){
      let margin = (docWidth-800)/2
      x -= margin;
    }else{
      let scaler= 800/docWidth;
      x = Math.round(scaler * x);
      y = Math.round(scaler * y);
    }
    // window.location.href = "https://github.com/RobertT122"; 
    game.manageClickEvent(x,y);
  })

  setInterval(function(){
    incrementFrame()
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.render(frameCount, frameRate);
  }, frameRate)
  
})


