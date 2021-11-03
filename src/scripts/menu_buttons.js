class NaviagationButton{
  // 0 for main menu, 1 for game board
  constructor(gameState, ctx){
    this.gameState = gameState;
    this.ctx = ctx
    this.pos = []
    this.size = []
  }

  click(game){
    game.redirect(this.gameState);
  }

}



class MenuButtons{
  constructor(){
  }

  static generateMainMenuButtons(){
    // creates a list of buttons for the main menu
  }
  static generateGameOverButtons(){
    //creates a list of buttons for the game over scree
  }
  static generateGameBoardButtons(){
    // creates a list of buttons for the play screen
  }
}

export default MenuButtons