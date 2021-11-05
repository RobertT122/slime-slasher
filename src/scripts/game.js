import Player from './player.js'
import Enemy from './enemy.js'
import Timer from './timer.js';
import AttackButtons from './attack_button.js'
import MenuButtons from './menu_buttons.js';
import ToolButtons from './tool_buttons.js';
import Coins from './coin.js';

//handle game logic and interactions between classes

class Game {
  constructor(ctx, frameRate) {
  this.frameRate = frameRate;
  this.toggleColor = false;
    this.ctx = ctx
    this.lifeTotal = 3
    this.player = new Player(this.lifeTotal,ctx);
    this.timeLimit = this.player.timeLimit;
    this.currentTimer = new Timer(this.timeLimit, ctx, frameRate);
    this.currentEnemy = Enemy.generateNewEnemy(ctx);

    this.coins = new Coins(ctx)
    this.attackButtons = new AttackButtons(ctx);
    this.toolButtons = new ToolButtons(ctx);
    //0: MainMenu, 1: GameBoard, -1:GameOver, 2:Tips
    this.gameState = 2;
    this.screenElements = this.getScreenElements(this.gameState);
    this.background = this.setBackground(this.gameState);
    this.globalFrame = 0;
  }

  incrementFrame(){
    this.globalFrame = (this.globalFrame+1)%16
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
        break;
      case 2:
        image.src = "src/assets/sprites/Tips.png"
    }
    return image
  }
  

  running(){
    return true;
  }

  resetTimer(){
    this.currentTimer.finishEarly();
    // this.timeLimit = this.player.timeLimit
    this.currentTimer = new Timer(this.timeLimit, this.ctx, this.frameRate);
  }

  resetEnemy(){
    this.currentEnemy = Enemy.generateNewEnemy(this.ctx);
  }
    
  render(){
    this.incrementFrame();
    this.renderBackground();
    switch(this.gameState){
      case 1:
        this.checkGameEnd();
        this.renderGameScreen();
        break;
      case -1:
        this.renderGameOver();
        break;
      case 0:
        this.renderMainMenu();
        break;
      case (2):
        this.renderTips();
    }
  }


  renderBackground(){
    if(this.gameState === -1) {
      if(this.player.score >= this.player.gold){
        this.coins.stop();
      } else{
        this.coins.go();
      }
      this.coins.render()
    }
    this.ctx.drawImage(this.background, 0,0)
  }

  renderGameScreen(){
    this.resolveTimer();
    this.resolveAttack();
    this.currentEnemy.render();
    this.currentTimer.render();
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
    this.toolButtons.render();
    this.renderStartButton();
    let title =  new Image ();
    title.src = 'src/assets/sprites/Title-Sheet.png'
    let currentFrame = this.globalFrame%8
    if(currentFrame === 0 || currentFrame === 7){
      this.ctx.drawImage(title, 140, 200)
    } else if(currentFrame === 1 || currentFrame === 6){
        this.ctx.drawImage(title, 140, 205)
    } else if(currentFrame === 2 || currentFrame === 5){
      this.ctx.drawImage(title, 140, 210)
    } else if(currentFrame === 3 || currentFrame === 4){
      this.ctx.drawImage(title, 140, 215)
    }
    
  }

  renderTips(){
    this.toolButtons.render();
    this.renderTipsText(Game.tips);
    this.renderTipsAnimations();
  }

  renderStartButton(){
    let posY = 605;
    if(this.globalFrame % 4 === 1){
      posY = 600
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
        this.player.addGold(this.player.currentLevel);
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
        this.player.addGold(bonus);
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
          ...this.toolButtons.buttons
        ]
      case -1:
        return [
          ...MenuButtons.generateGameOverButtons(this.ctx),
        ]
      case 2:
        return [
          ...MenuButtons.generateTipButtons(this.ctx),
          ...this.toolButtons.buttons
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
    this.currentTimer = new Timer(this.timeLimit, this.ctx, this.frameRate);
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

  renderTipsText(text){
    this.ctx.fillStyle = "black"
    this.ctx.font = ("35px 'Press Start 2P'")
    this.ctx.fillText(`Welcome to`, 225, 160)
    this.ctx.fillText(`Slime Slasher`, 170, 210)

    this.ctx.font = ("20px 'Press Start 2P'")
    let posY = 260
    let lines = text.split("\n")
    lines.forEach(line=>{
      this.ctx.fillText(line, 140, posY)
      posY += 25
    })

    this.ctx.font=("17px 'Press Start 2P'")
    this.ctx.fillText(`Toggle         GitHub        Toggle`, 100, 1210)
    this.ctx.fillText(`Alt Color        Link          Tips`, 80, 1230)
  }

  renderTipsAnimations(){
    let buttons = new Image();
    buttons.src = 'src/assets/sprites/AttackButtons-Sheet.png'
    let red = new Image();
    red.src = 'src/assets/sprites/RedSlime-Sheet.png'
    let green = new Image();
    green.src = 'src/assets/sprites/GreenSlime-Sheet.png'
    let blue = new Image();
    blue.src = 'src/assets/sprites/BlueSlime-Sheet.png'
    let localFrame = (Math.floor(this.globalFrame/4))
    this.ctx.drawImage(blue, localFrame*320, 640, 320, 320, 210, 360, 80, 80)
    this.ctx.drawImage(buttons, (localFrame === 1? 1: 0)*240, 0, 240, 380, 220, 440, 60, 90)
    
    this.ctx.drawImage(green, localFrame*320, 640, 320, 320, 370, 360, 80, 80)
    this.ctx.drawImage(buttons, (localFrame === 1? 1: 0)*240, 760, 240, 380, 380, 440, 60, 90)
    
    this.ctx.drawImage(red, localFrame*320, 640, 320, 320, 530, 360, 80, 80)
    this.ctx.drawImage(buttons, (localFrame === 1? 1: 0)*240, 380, 240, 380, 540, 440, 60, 90)
    
    //draw the attack animation on the bottom of the screen
    this.ctx.drawImage(green, ((localFrame+1)%4)*320, 320, 320, 320, 330, 690, 160, 160)
  }

  static tips = " Your goal is to defeat\nthe slimes before the time\n  runs out. You do this\nby attacking slimes with\nthe counter to their color: \n\n\n\n\n\n\n\nBe sure to watch the time,\nyou get less as your level \nincreases! Run out of time\nor choose the wrong counter\n and you will be damaged! \n   3 hits and you Lose!"


}

export default Game;