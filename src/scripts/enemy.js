import Player from "./player"

class Enemy{
  constructor(prototype, ctx) {
    this.name = prototype.name;
    this.description = prototype.description;
    this.weakTo = prototype.weakTo;

    this.ctx = ctx
    this.positionX = 960;
    this.positionY = 400;

    this.sprite = this.loadSprite();
    this.square = this.sprite.height/3;
    //square is used because sprite height and width are equal;
    //their are three animations in the sprite sheet;
    this.localFrameCount = 0;

    //Logic for determinig which animation to run;
    this.wasAttacked = false;
    this.receivedDamage = false;
    this.wasDeadly = false;
  }

  retired(){
    //returns true if all animations are complete
    // checks booleans if animation is running
  }


  recieveAttack(color){
    this.wasAttacked = true;
    // this.receivedDamage = true;
    console.log("hit")
    if (this.weakTo === color){
      console.log("deadly")
      this.wasDeadly = true;
    }
  }
  
  attack(player){
    player.takeDamage();
  }

  loadSprite() {
    const image = new Image()
    image.src = "sprites/GreenSlimeIdle-Sheet.png"
    return image;
  }
  
  render(frame){
    if(this.wasAttacked){
      if(this.receivedDamage) {
        if(this.wasDeadly) {
          //will play after damageAnimation if attack was deadly
          this.deathAnimation();
        } else {
          //will play after damageAnimation if attack was not deadly
          this.attackAnimation();
        }
      } else {
        this.damageAnimation();
      }
    } else {
      this.idleAnimation(frame);
    }
  }

  idleAnimation(frame){
    this.updatePosition();
    let col = frame % 4;
    this.animate(0, col)

  }

  animate(sequence, frame){
    this.ctx.drawImage(this.sprite, frame*this.square, sequence*this.square, this.square, this.square, this.positionX, this.positionY, this.square, this.square)
  }

  attackAnimation(){
    //animation associated with attack
  }

  damageAnimation(){
    //animation associated with being damaged.
  }

  deathAnimation(){
    //renders a death animation and clears html elements.
  }

  updatePosition(){
    if (this.positionX > 360) {
      this.positionX -= 120;
      // console.log(this.positionX)
    } else if (this.positionX > 240){
      //slow down effect
      this.positionX -= 60;
    } else {
      this.positionX = 240
    }
  }
  
  
  static generateNewEnemy(ctx){
    let pIdx = Math.floor(Math.random() * Enemy.activePrototypes.length);
    let prototype = Enemy.activePrototypes[pIdx];
    return new Enemy(prototype, ctx);
  }
  //


//Add enemy Prototypes here
  static activePrototypes = [
    {
      name: "RedSlime",
      description: "A red slime",
      weakTo: "blue",
    },
    {
      name: "BlueSlime",
      description: "A blue slime",
      weakTo: "green",
    },
    {
      name: "GreenSlime",
      description: "A green slime",
      weakTo: "red",
    }
  ];

}

export default Enemy