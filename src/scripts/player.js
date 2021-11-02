// the Player class stores the information on the current game state. And is in charge of updating these states.
class Player {
  constructor(hearts, ctx) {
    this.ctx = ctx;
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = hearts;
    // ememyKOs is an object with kv pairs of enemy names and number killed
    this.log = {};
    this.timeLimit = 15;
    this.score = 0;
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
    } else if (this.timeLimit > 1){
      this.timeLimit -= 1;
    }
  }

  takeDamage(){
    this.hearts -= 1;
  }

  addGold(amount){
    this.gold += amount;
  }

  updateLog(enemy){
    console.log(enemy.type)
    if(this.log[enemy.type]){
      this.log[enemy.type].kos += 1;
    } else{
      this.log[enemy.type] = {kos: 1, color: enemy.color};
    }
  }

  renderHearts() {
    this.ctx.font = ("30px 'Press Start 2P'")
    this.ctx.fillText(`HP: ${this.hearts}`, 40, 770)
    
  }

  renderGold() {
    this.ctx.font = ("30px 'Press Start 2P'")
    this.ctx.fillText(`GP: ${this.gold}`, 600, 770)
  }

  renderLevelCounter(){
    this.ctx.font = ("30px 'Press Start 2P'")
    this.ctx.fillText(`LVL: ${this.currentLevel}`, 600, 50)
  }

  renderLog(){
    let positionY = 200;
    this.ctx.font = ("30px 'Press Start 2P'")
    Object.keys(this.log).forEach(entry => {
      this.ctx.fillStyle = this.log[entry].color;
      this.ctx.fillText(`${entry}: ${this.log[entry].kos}`, 250, positionY)
      positionY += 40
    })
    this.ctx.fillStyle = "black";
  }

  renderGameOver(){
    this.renderLevelCounter();
    this.renderLog();
    //game over title:
    //collapse into renderBackground()
    this.ctx.font = ("75px 'Press Start 2P'")
    this.ctx.fillText("Game Over", 40, 500)
    //render score:
    this.ctx.font = ("50px 'Press Start 2P'")
    this.ctx.fillText(`Score: ${this.score}`, 180, 600)
    let goldLeft = this.gold - this.score;
    if (this.score < this.gold){
      if(goldLeft > 50){
        this.score += 5
      } else if (goldLeft > 15) {
        this.score += 3
      } else{
        this.score++
      }
    }
  }

}

export default Player