class GitHubButton{
  constructor(ctx){
    this.ctx = ctx
    this.pos = [310, 930]
    this.size = [190, 190]
    this.image = new Image()
    this.image.src = "src/assets/sprites/GitIcon-Sheet.png"
    //used for rendering the button as pressed for 1 frame
    this.pressed = 1;
  }
  render(){
    this.ctx.drawImage(this.image, this.pressed*this.size[0], 0, this.size[0], this.size[1], this.pos[0], this.pos[1], this.size[0], this.size[1])
    if(this.pressed===0) this.pressed = 1
  }
  click(game){
    this.pressed = 0;
    //sends the user to my github page
    window.location.href = "https://github.com/RobertT122"
  }
}

class ToggleCB{
  constructor(ctx){
    this.ctx = ctx
    this.pos = [80,900]
    this.size = [140,260]
    this.image = new Image()
    this.image.src = "src/assets/sprites/Switch-Sheet.png"
    this.toggled = 0;
  }

  render(){
    this.ctx.drawImage(this.image, this.toggled*this.size[0], 0, this.size[0], this.size[1], this.pos[0], this.pos[1], this.size[0], this.size[1])
  }

  click(game){
    if(this.toggled){
      this.toggled = 0;
      game.toggleColor = true
    } else{
      this.toggled = 1
      game.toggleColor = false
    }
  }
}

class ToolButtons{
  constructor(ctx){
    this.buttons = [new ToggleCB(ctx), new GitHubButton(ctx)]
  }

  render(){
    this.buttons.forEach(button=>button.render())
  }
}

export default ToolButtons