import Game from './scripts/game.js'

window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let body = document.getElementById("body")
  let canvas = document.getElementById("canvas1")
  let ctx = canvas.getContext("2d")
  let frameRate = 55;
  // "Clean" frame rates:
  // 150, 130, 105, 55, 30
  let game = new Game(ctx, frameRate);
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
    game.manageClickEvent(x,y);
  })

  setInterval(function(){
    incrementFrame()
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.render(frameCount, frameRate);
    if (game.toggleColor){
      altColorMode(canvas, ctx);
      body.classList.add("grey-background")
    } else{
      body.classList.remove("grey-background")
    }
  }, frameRate)
  
})

function altColorMode(canvas, ctx){
  const scan = ctx.getImageData(0,0,canvas.width, canvas.height);
  const scannedData = scan.data;
  for(let i = 0; i < scannedData.length; i+= 4){
    let total = scannedData[i]+scannedData[i+1]+scannedData[i+2]
    let brightness = total/3;
    if(scannedData[i] > scannedData[i+1]){
      scannedData[i+1] += Math.floor((scannedData[i]-scannedData[i+1])*.9);
    }
    if(scannedData[i+2]/brightness > 1.15){
      scannedData[i+1] = Math.floor(scannedData[i+1]/1.5);
      scannedData[i] = Math.floor(scannedData[i]/2);
    }
  }
  let newScan = new ImageData(scannedData, canvas.width, canvas.height)
  ctx.putImageData(newScan, 0, 0);
}

