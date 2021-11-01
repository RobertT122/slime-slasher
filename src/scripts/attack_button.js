
class AttackButton {
  constructor(color){
    this.color = color;
    // position will either be 1, 2, or 3
    this.active = false;
    this.wasClicked = false;
  }
  activate(){
    this.renderActive();
    this.active = true;
  }

  render() {
    //renders the button on the screen
  }

  deactivate(){
    this.renderInactive();
    this.active = false;
  }


  sendAttack(enemy) {
    enemy.receiveAttack(this.color)
    this.wasClicked = true;
  }

  click(enemy){
    if (this.active){
      this.sendAttack(enemy);
    }
  }


  //will become depreciated (testing purposes only)
  renderHtmlEle(doc){
    if (this.active) {
      // let button = doc.
    }
  }

}

class AttackButtons {
  constructor() {
    this.buttons = AttackButtons.generateButtonArray();
  }

  activateButtons(){
    this.buttons.forEach(button=>{button.activate()})
  }
  deactivateButtons(){
    this.buttons.forEach(button=>{button.deactivate()})
  }
  anyClicked(){
    this.buttons.some(button => button.wasClicked)
  }

  resetClicked(){
    this.buttons.forEach(button => button.wasClicked = false)
  }

  static generateButtonArray() {
    return [
      new AttackButton("red"),
      new AttackButton("green"),
      new AttackButton("blue")
    ]
  }
}

export default AttackButtons;