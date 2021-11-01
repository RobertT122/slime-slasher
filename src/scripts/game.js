import AttackButtons from './attack_button.js'
import Player from './player.js'
import Enemy from './enemy.js'
import Timer from './timer.js';

//handle game logic and interactions between classes

class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.player = new Player();
    this.currentTimer = new Timer(15, ctx);
    this.currentEnemy = Enemy.generateNewEnemy(ctx);
    this.attackButtons = new AttackButtons();
  }
  

  running(){
    return true;
  }

  resetTimer(){
    this.currentTimer.finishEarly();
    this.currnetTimer = new Timer(15, ctx);
  }

  resetEnemy(){
    this.currentEnemy = Enemy.generateNewEnemy(ctx);
  }
  
  turn(){
    // this.currentTimer.startCountdown();
    // //start countdown and wait for input;
    // //if no input is given deactivate buttons and attack player
    // if (this.currentTimer.time === 0) {
      //   this.attackButtons.deactivateButtons();
      //   this.currentEnemy.response(this.player);
      // }
      
  }
    
  render(frame, frameRate){
    this.renderBackground();
    this.currentEnemy.render(frame);
    this.currentTimer.render(frameRate);
  }

  renderBackground(){
    const background = new Image()
    background.src = "sprites/GameScreenLayout.png"
    this.ctx.drawImage(background, 0,0)
  }


}

export default Game;