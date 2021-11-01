import AttackButton from './attack_button.js'
import Player from './player.js'
import Enemy from './enemy.js'
import Timer from './timer.js';

//handle game logic and interactions between classes

class Game {
  constructor() {
    this.player = new Player();
    this.currentTimer = new Timer(30);
    this.gameView = new GameView();
    this.currentEnemy = Enemy.generateNewEnemy();
  }

  turn(){

  }

  renderMenu(){
    //clears screen
    //renders the main menu
  }

  renderGame(){
    //clears screen
    //renders the game
  }


}

export default Game;