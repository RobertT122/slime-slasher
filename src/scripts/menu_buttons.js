class NaviagationButton{
  // 0 for main menu, 1 for game board
  constructor(prototype, ctx){
    this.gameState = prototype.gameState;
    this.ctx = ctx
    this.pos = prototype.pos
    this.size = prototype.size
  }

  click(game){
    // this.ctx.beginPath();
    // this.ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    // this.ctx.stroke();
    game.redirect(this.gameState);
  }
  
}




class MenuButtons{


  static backButton = {gameState: 0, pos:[10,30], size:[270,140]}
  static playButton = {gameState: 1, pos:[180,540], size:[440,160]}
  static turnOnTips = {gameState: 2, pos:[580,910], size:[150,210]}
  static turnOffTips = {gameState: 0, pos:[580,910], size:[150,210]}

  static generateMainMenuButtons(ctx){
    return [
      new NaviagationButton(MenuButtons.playButton, ctx),
      new NaviagationButton(MenuButtons.turnOnTips, ctx)
    ]
    // creates a list of buttons for the main menu
  }
  static generateGameOverButtons(ctx){
    return [
      new NaviagationButton(MenuButtons.backButton, ctx),
      new NaviagationButton(MenuButtons.playButton, ctx)
    ]
    //creates a list of buttons for the game over scree
  }
  static generateGameBoardButtons(ctx){
    // creates a list of buttons for the play screen
    return [
      new NaviagationButton(MenuButtons.backButton, ctx)
    ]
  }

  static generateTipButtons(ctx){
    return [
      new NaviagationButton(MenuButtons.turnOffTips, ctx)
    ]
  }

}


export default MenuButtons