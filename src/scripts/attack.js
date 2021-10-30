class Attack {
  constructor(color){
    this.color = color
  }

  render() {
    //renders the attack animation on the screen
  }

  sendAttack(enemy) {
    this.render();
    enemy.receiveAttack(this.color)
  }

}

export default Attack