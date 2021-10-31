class AttackButton {
  constructor(name, color, position){
    this.name = name;
    this.color = color;
    // position will either be 1, 2, or 3
    this.position = position;
    this.active = false;
  }
  activate(){
    this.renderActive();
    this.active = true;
  }







  renderActive() {
    //renders the button on the screen
  }

  deactivate(){
    this.renderInactive();
    this.active = false;
  }

  renderInactive() {
    //grey out the button
  }

  sendAttack(enemy) {
    enemy.receiveAttack(this.color)
  }

  animateAttack() {
    //renders the attack animation on the screen
  }


  animateClick() {
    //animates the button being pressed down
  }

  click(enemy){
    if (this.active){
      this.animateClick();
      this.animateAttack();
      this.sendAttack(enemy);
    }
  }

}

export default AttackButton;