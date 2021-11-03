
class AttackButton {
  constructor(color, order, ctx){
    this.ctx = ctx;
    this.color = color;
    this.order = order;
    this.inactive = 0;
    this.wasClicked = false;
    //pos is always an array of [x pos, y pos]
    this.pos = this.generateCoordinates();
    //size is alway an array of [width, height]
    this.size = [240, 380]

    this.row = this.assignRow();
    this.sprite = this.loadSprite();
  }
  
  render() {
    this.ctx.drawImage(this.sprite, this.inactive*this.size[0], this.row*this.size[1], 
      this.size[0], this.size[1], this.pos[0], this.pos[1], this.size[0], this.size[1])
    if(this.inactive){
      this.activate();
    }
  }
    
  activate(){
    this.inactive = 0;
  }
  deactivate(){
    this.inactive = 1;
  }


  sendAttack(enemy) {
    enemy.receiveAttack(this.color)
  }

  click(game){
    this.deactivate();
    if(!this.wasClicked){
      this.sendAttack(game.currentEnemy)
    }
    game.attackButtons.setClicked();
  }

  generateCoordinates(){
    switch(this.order){
      case 0:
        return [30,830]
      case 1:
        return [280,830]
      case 2:
        return [530,830]
    }
  }
  
  loadSprite() {
    const image = new Image()
    image.src = "src/assets/sprites/AttackButtons-Sheet.png";
    return image;
  }

  assignRow(){
    switch(this.color){
      case "red":
        return  2;
      case "blue":
        return 1;
      case "green":
        return 0;
      default:
        return -1;
    }
  }

}

//------------------------------------------------------------//
//------------------------------------------------------------//

class AttackButtons {
  constructor(ctx) {
    this.ctx = ctx
    this.buttons = AttackButtons.generateButtonArray(ctx);
  }

  render(){
    this.buttons.forEach(button=>button.render())
  }

  // activateButtons(){
  //   this.buttons.forEach(button=>{button.activate()})
  // }
  // deactivateButtons(){
  //   this.buttons.forEach(button=>{button.deactivate()})
  // }
  setClicked(){
    this.buttons.forEach(button => button.wasClicked = true)
  }
  
  resetClicked(){
    this.buttons.forEach(button => button.wasClicked = false)
  }

  static generateButtonArray(ctx) {
    return [
      new AttackButton("green", 0, ctx),
      new AttackButton("red", 1, ctx),
      new AttackButton("blue", 2, ctx)
    ]
  }

  generateElements(){
    return this.buttons
  }


}

export default AttackButtons;