// the Player class stores the information on the current game state. And is in charge of updating these states.
class Player {
  constructor(hearts, ctx) {
    this.ctx = ctx;
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = hearts;
    // ememyKOs is an object with kv pairs of enemy names and number killed
    this.enemyKOs = {};
  }

  render(){
    this.ctx.fillStyle = "black"
    this.ctx.font = ("50px 'Press Start 2P'")
    //render goldCount
    //render levelCount
    //render Hearts
    this.renderHearts();
    this.renderGold();
  }

  nexLevel(){
    this.currentLevel++;
    this.renderLevelCounter();
  }

  takeDamage(){
    this.hearts -= 1;
  }

  addGold(amount){
    this.gold += amount;
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

  }

}

export default Player