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
    this.timeLimit = this.player.timeLimit;
    this.currentTimer = new Timer(this.timeLimit, ctx);
    this.currentEnemy = Enemy.generateNewEnemy(ctx);
    this.attackButtons = new AttackButtons(ctx);
    this.background = this.setBackground();
    this.screenElements = this.gameBoardElements();

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
    // this.timeLimit = this.player.timeLimit
    this.currentTimer = new Timer(this.timeLimit, this.ctx);
  }

  resetEnemy(){
    this.currentEnemy = Enemy.generateNewEnemy(this.ctx);
  }
    
  render(frame, frameRate){
    if(this.playing()){
      this.screenElements = this.gameBoardElements();
      this.resolveTimer();
      this.resolveAttack();
      this.renderBackground();
      this.currentEnemy.render(frame);
      this.currentTimer.render(frameRate);
      this.player.render();
      this.attackButtons.render();
    } else{
      this.screenElements = [];
      this.renderGameOver();
    }
  }

  renderBackground(){
    this.ctx.drawImage(this.background, 0,0)
  }

  renderGameOver(){
    this.player.renderGameOver();
  }


  resolveAttack(){
    // let attacking = (this.currentEnemy.state === 1 || this.currentEnemy.state === 2)
    // if(attacking && !this.currentEnemy.landAttack){
    //   this.currentEnemy.landAttack = true
    //   this.player.takeDamage();
    // }
    // Add the ability to update attack on attack frame
    if(this.currentEnemy.retired){
      if(this.currentEnemy.retired === 1){
        this.player.takeDamage();
      } else {
        this.player.updateLog(this.currentEnemy);
        this.player.addGold(1);
      }
      // increment level when the player is still alive
      if(this.player.hearts > 0){
        this.resolveLevel();
      }

      this.resetEnemy();
      this.resetTimer();

    }
  }

  resolveLevel(){
    this.player.nexLevel();
    this.timeLimit = this.player.timeLimit
    this.attackButtons.resetClicked();
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
    this.resolveAnimationRate();
  }

  resolveAnimationRate(){
    //changes the speed of the idle animation depending on the time left
    if(this.currentTimer.time >=12){
      this.currentEnemy.animationSpeed = 4
    } else if(this.currentTimer.time > 5){
      this.currentEnemy.animationSpeed = 2
    } else {
      this.currentEnemy.animationSpeed = 1;
    }
  }

  manageClickEvent(x,y){
    // console.log(`${x}, ${y}`)
    this.screenElements.forEach(ele=>{
      let widthSpan = [ele.pos[0], ele.pos[0]+ele.size[0]]
      let heightSpan = [ele.pos[1], ele.pos[1]+ele.size[1]]
      let inX = (x >= widthSpan[0] && x <= widthSpan[1])
      let inY = (y >= heightSpan[0] && y <= heightSpan[1])
      if(inX && inY){
        ele.click(this);
      }
    })
  }


  gameBoardElements(){
    return [
      // ...this.player.generateElements(),
      // ...this.currentTimer.generateElements(),
      // ...this.currentTimer.generateElements(),
      ...this.attackButtons.buttons
    ]
  }

  playing(){
    return this.player.hearts > 0;
  }


}

export default Game;