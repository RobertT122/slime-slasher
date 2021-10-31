import Player from "./player"

class Enemy{
  constructor(prototype) {
    this.name = prototype.name;
    this.description = prototype.description;
    this.weakTo = prototype.weakTo;
    this.resists = prototype.resists;
    this.life = prototype.life || 6;
    //responses must take the player as an argument
    this.response = prototype.response || this.attack;
    this.render();
  }

  
  
  receiveAttack(color){
    this.animateDamaged();
    if (this.weakTo === color){
      this.life -= 6;
      return 1;
    } else if (this.resists === color){
      this.life -= 1;
      return -1;
    } else {
      this.life -= 3;
      return 0;
    }
  }

  isAlive(){
    return this.life > 0
  }
  
  attack(player){
    this.animateAttck();
    player.takeDamage();
  }
  
  render(){
    // grabs the sprite matching the name of the enemy
    // creates the enemy element offscreen
    // animates into correct position
  }

  animateAttck(){
    //animation associated with attack
  }

  animateDamaged(){
    //animation associated with being damaged.
  }

  animateDeath(){
    //renders a death animation and clears html elements.
  }
  
  
  static generateNewEnemy(){
    let pIdx = Math.floor(Math.random() * Enemy.activePrototypes.length);
    let prototype = Enemy.activePrototypes[pIdx];
    return new Enemy(prototype);
  }
  //


//Add enemy Prototypes here
  static activePrototypes = [
    {
      name: "RedSlime",
      description: "A red slime",
      weakTo: "blue",
      resists: "green"
    },
    {
      name: "BlueSlime",
      description: "A blue slime",
      weakTo: "green",
      resists: "red"
    },
    {
      name: "GreenSlime",
      description: "A green slime",
      weakTo: "red",
      resists: "blue"
    }
  ];

}

export default Enemy