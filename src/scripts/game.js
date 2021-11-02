import AttackButtons from './attack_button.js'
import Player from './player.js'
import Enemy from './enemy.js'
import Timer from './timer.js';

//handle game logic and interactions between classes

class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.lifeTotal = 3
    this.player = new Player(this.lifeTotal,ctx);
    this.timeLimit = 3;
    this.currentTimer = new Timer(this.timeLimit, ctx);
    this.currentEnemy = Enemy.generateNewEnemy(ctx);
    this.attackButtons = new AttackButtons();
    this.background = this.setBackground();
  }

  setBackground(){
    let image = new Image()
    image.src = "sprites/GameScreenLayout.png"
    return image
  }
  

  running(){
    return true;
  }

  resetTimer(){
    this.currentTimer.finishEarly();
    this.currentTimer = new Timer(this.timeLimit, this.ctx);
  }

  resetEnemy(){
    this.currentEnemy = Enemy.generateNewEnemy(this.ctx);
  }
    
  render(frame, frameRate){
    if(this.playing()){
      this.resolveTimer();
      this.resolveAttack();
      this.renderBackground();
      this.currentEnemy.render(frame);
      this.currentTimer.render(frameRate);
      this.player.render();
    } else{
      this.renderGameOver();
    }
  }

  renderBackground(){
    this.ctx.drawImage(this.background, 0,0)
  }

  renderGameOver(){
    this.ctx.font = ("75px 'Press Start 2P'")
    this.ctx.fillText("Game Over", 40, 500)
    this.ctx.font = ("50px 'Press Start 2P'")
    this.ctx.fillText(`Score: ${this.player.gold}`, 180, 600)
  }


  resolveAttack(){
    if(this.currentEnemy.retired){
      if(this.currentEnemy.retired === 1){
        this.player.takeDamage();
      } else {
        this.player.addGold(1);
      }
      this.resetEnemy();
      this.resetTimer();
    }
  }

  resolveTimer(){
    if(this.currentEnemy.enemyState === -1){
      let bonus = this.currentTimer.finishEarly();
      if (bonus){
        this.player.gold += bonus;
      }
    } else if(this.currentEnemy.enemyState){
      this.currentTimer.paused = true;
    }
    if(this.currentTimer.time <= 0){
      this.currentEnemy.enemyState = 2;
    }
  }

  playing(){
    return this.player.hearts > 0;
  }


}

export default Game;