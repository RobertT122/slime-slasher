// the Player class stores the information on the current game state. And is in charge of updating these states.
class Player {
  constructor(hearts, ctx) {
    this.ctx = ctx;
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = hearts;

    this.attacked = false;
    // log[enemy.type] = {kos: 1, color: "color"}
    let image = new Image()
    image.src = "src/assets/sprites/RedSlime-Sheet.png";
    this.log = {};
    this.timeLimit = 15;
    this.score = 0;
    this.localFrameCount = 0;
  }

  render(){
    this.ctx.fillStyle = "black"
    this.ctx.font = ("50px 'Press Start 2P'")
    this.renderHearts();
    this.renderGold();
    this.renderLevelCounter();
  }

  nexLevel(){
    this.currentLevel++;
    if(this.timeLimit >= 12){
      this.timeLimit -= 3;
    } else if (this.timeLimit > 2){
      this.timeLimit -= 1;
    } else if (this.currentLevel > 50 && this.timeLimit > 1){
      this.timeLimit -= 1;
    }
  }

  takeDamage(){
    this.hearts -= 1;
    this.attacked = true;
  }

  addGold(){
    this.gold += this.currentLevel;
  }

  updateLog(enemy){
    if(this.log[enemy.type]){
      this.log[enemy.type].kos += 1;
    } else{
      this.log[enemy.type] = {
        kos: 1, 
        color: enemy.color,
        image: this.generateImage(enemy.type)
      };
    }
  }

  renderHearts() {
    this.ctx.font = ("30px 'Press Start 2P'")
    if(this.attacked){
      this.ctx.fillStyle = "red";
      this.attacked = false;
    } else {
      this.fillStyle = "black"
    }
    this.ctx.fillText(`HP: ${this.hearts}`, 40, 770)
    
    
  }

  renderGold() {
    this.ctx.font = ("30px 'Press Start 2P'")
    this.ctx.fillText(`GP: ${this.gold}`, 600, 770)
  }

  renderLevelCounter(){
    this.ctx.font = ("30px 'Press Start 2P'")
    this.ctx.fillText(`LVL: ${this.currentLevel}`, 550, 70)
  }

  renderLog(){
    let frame = Math.floor(this.localFrameCount/4)
    // let positionY = 900;
    // Object.keys(this.log).forEach(entry => {
      //   this.ctx.fillStyle = this.log[entry].color;
      //   this.ctx.fillText(`${entry}: ${this.log[entry].kos}`, 200, positionY)
      //   positionY += 40
      // })
      Object.keys(this.log).forEach(entry => {
        let width = this.log[entry].kos.toString().length;
        let size  = 30 + Math.ceil(30/(width));
        this.ctx.font = (`${size}px 'Press Start 2P'`)
        switch (this.log[entry].color){
          case "red":
            this.ctx.fillStyle = "orangered"
            let newframe = (frame + 1)%4
            this.ctx.fillText(this.log[entry].kos, 310 + (60/width), 970)
            this.ctx.drawImage(this.log[entry].image, newframe*320, 0, 320, 320, 320, 1000, 160, 160)
            break;
            case "blue":
            this.ctx.fillStyle = "darkblue";
            this.ctx.fillText(this.log[entry].kos, 570 + (60/width), 970)
            this.ctx.drawImage(this.log[entry].image, frame*320, 0, 320, 320, 570, 1000, 160, 160)
            break;
            case "green":
            this.ctx.fillStyle = "lightgreen";
            this.ctx.fillText(this.log[entry].kos, 60 + (60/width), 970)
            this.ctx.drawImage(this.log[entry].image, frame*320, 0, 320, 320, 70, 1000, 160, 160)
              }
            })
            this.ctx.fillStyle = "black";
          }
          
          renderScore(){
    this.ctx.font = ("50px 'Press Start 2P'")
    this.ctx.fillText(`Score: ${this.score}`, 100, 800)
    let goldLeft = this.gold - this.score;
    if (this.score < this.gold){
      if (goldLeft > 2000){
        this.score = this.gold - 1999;
      } else if (goldLeft > 1200){
        this.score += 234
      }else if(goldLeft > 500){
        this.score += 43
      } else if(goldLeft > 150){
        this.score += 12
      } else if (goldLeft > 50) {
        this.score += 6
      } else if (goldLeft > 15) {
        this.score += 3
      } else{
        this.score++
      }
    }
  }

  renderGameOver(){
    this.incrementFrame();
    this.renderLevelCounter();
    this.renderLog();
    this.renderScore();
    //game over title:
    //collapse into renderBackground()
  }

  incrementFrame(){
    this.localFrameCount = (this.localFrameCount + 1)%16
  }

  generateImage(name){
    name = name.split(" ").join("");
    const image = new Image()
    image.src = `src/assets/sprites/${name}-Sheet.png`;
    return image;
  }

  softReset(lifeTotal){
    this.timeLimit = 15
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = lifeTotal;
  }

}

export default Player