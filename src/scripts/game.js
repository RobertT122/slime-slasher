import AttackButtons from './attack_button.js'
import Player from './player.js'
import Enemy from './enemy.js'
import Timer from './timer.js';
import MenuButtons from './menu_buttons.js';

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
    this.down = true;
    //0: MainMenu, 1: GameBoard, -1:GameOver
    this.gameState = 0;
    this.screenElements = this.getScreenElements(this.gameState);
    this.background = this.setBackground(this.gameState);
  }

  setBackground(state){
    let image = new Image()
    switch(state){
      case -1:
        image.src = "src/assets/sprites/GameOver.png"
        break;
      case 0:
        image.src = "src/assets/sprites/MainMenu.png"
        break;
      case 1:
        image.src = "src/assets/sprites/GameBoard.png"
      }
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
    this.renderBackground();
    switch(this.gameState){
      case 1:
        this.checkGameEnd();
        this.renderGameScreen(frameRate);
        break;
      case -1:
        this.renderGameOver();
        break;
      case 0:
        this.renderMainMenu();
    }
  }


  renderBackground(){
    this.ctx.drawImage(this.background, 0,0)
  }

  renderGameScreen(frameRate){
    this.resolveTimer();
    this.resolveAttack();
    this.currentEnemy.render();
    this.currentTimer.render(frameRate);
    this.player.render();
    this.attackButtons.render();
  }

  renderGameOver(){
    this.ctx.font = ("75px 'Press Start 2P'")
    this.ctx.fillText("Game Over", 60, 500)
    this.renderStartButton();
    this.player.renderGameOver();
  }
  
  renderMainMenu(){
    this.renderStartButton();
  }

  renderStartButton(){
    let posY = 600;
    if(this.down){
      posY = 605
      this.down = false;
    } else {
      this.down = true;
    }
    this.ctx.font = ("35px 'Press Start 2P'")
    this.ctx.fillText("START GAME", 225, posY)
  }


  resolveAttack(){
    if(this.currentEnemy.retired){
      if(this.currentEnemy.retired === 1){
        this.player.takeDamage();
      } else {
        this.player.updateLog(this.currentEnemy);
        this.player.addGold();
      }
      // increment level when the player is still alive
      if(this.player.hearts > 0){
        this.resolveLevel();

      }
    }
  }

  resolveLevel(){
    this.player.nexLevel();
    this.attackButtons.resetClicked();
    this.timeLimit = this.player.timeLimit
    this.resetTimer();
    this.resetEnemy();
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
      this.currentEnemy.timeOut();
    }
    this.resolveAnimationRate();
  }

  resolveAnimationRate(){
    //changes the speed of the idle animation depending on the time left
    if(this.player.timeLimit > 5){
      this.currentEnemy.animationSpeed = 3
    } else if(this.player.timeLimit > 1){
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


  getScreenElements(gameState){
    switch (gameState){
      case 1:
        return [
          ...MenuButtons.generateGameBoardButtons(this.ctx),
          ...this.attackButtons.buttons
        ]
      case 0:
        return [
          ...MenuButtons.generateMainMenuButtons(this.ctx),
        ]
      case -1:
        return [
          ...MenuButtons.generateGameOverButtons(this.ctx),
        ]
    }
  }

  checkGameEnd(){
    if(this.player.hearts <= 0){
      this.gameState = -1
      this.background = this.setBackground(-1)
      this.screenElements = this.getScreenElements(-1)
    }
  }

  softReset(){
    this.lifeTotal = 3
    this.player.softReset(this.lifeTotal);
    this.timeLimit = this.player.timeLimit;
    this.currentTimer = new Timer(this.timeLimit, this.ctx);
    this.currentEnemy = Enemy.generateNewEnemy(this.ctx);
    this.attackButtons.resetClicked();
  }

  redirect(state){
    if(state === 1){
      this.softReset();
    }
    this.gameState = state;
    this.background = this.setBackground(state);
    this.screenElements = this.getScreenElements(state);
  }


}

export default Game;