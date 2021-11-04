class Coin{

  constructor(startPos, speed, ctx){
    this.ctx = ctx;
    this.pos = startPos; //[x,y]
    this.image = new Image();
    this.image.src = "src/assets/sprites/Coin-Sheet.png"
    this.size = [160,160];
    this.speed = speed; //[dx,dy]
    this.frameOffset = Math.floor(Math.random() * 4)
    this.localFrame = 0
  }

  render(){
    let frameId = ((Math.floor(this.localFrame/2) + this.frameOffset)%4)
    this.ctx.drawImage(this.image, frameId*this.size[0], 0, 
    this.size[0], this.size[1], this.pos[0], this.pos[1], this.size[0]/2, this.size[1]/2)
    this.updatePos()
    this.localFrame = (this.localFrame+1)%8;
  }

  

  updatePos(){
    this.pos[0] += this.speed[0]
    this.pos[1] += this.speed[1]
  }

  
}

class Coins{
  constructor(ctx){
    this.ctx = ctx
    this.generationSpeed = 3;
    this.coins = [];
    this.localFrame = 0;
  }
  updateFrame(){
    this.localFrame = (this.localFrame + 1)%this.generationSpeed;
  }

  render(){
    if(this.localFrame === 0){
      this.createCoin();
    }
    this.coins = this.coins.filter(coin => coin.pos[1] < 1420)
    this.coins.forEach(coin => coin.render())
    this.updateFrame();
    this.playing = true;
  }

  
  createCoin(){
    if(this.playing){
      this.coins.push(new Coin(Coins.randomPos(), Coins.randomSpeed(), this.ctx))
    }
  }

  stop(){
    this.playing = false;
  }
  go(){
    this.playing = true;
  }
  
  static randomSpeed(){
    return [0,20*Math.random()+10]
  }

  static randomPos(){
    return [Math.random()*800, 0]
  }


}

export default Coins

