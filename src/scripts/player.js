// the Player class stores the information on the current game state. And is in charge of updating these states.
class Player {
  constructor() {
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = 5;
    // ememyKOs is an object with kv pairs of enemy names and number killed
    this.enemyKOs = {};
  }

  nexLevel(){
    this.currentLevel++;
    this.renderLevelCounter();
  }

  takeDamage(){
    this.hearts--;
    this.renderHearts();
  }

  addGold(){

  }

  renderHearts() {

  }

  renderGold() {

  }

  renderLevelCounter(){

  }

}

export default Player