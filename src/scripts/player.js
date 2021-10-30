// the Player class stores the information on the current game state. And is in charge of updating these states.
class Player {
  constructor() {
    this.currentLevel = 1;
    this.gold = 0;
    this.hearts = 5;
  }

  nexLevel(){
    this.currentLevel++;
  }

  takeDamage(){
    this.hearts--;
  }

}

export default Player