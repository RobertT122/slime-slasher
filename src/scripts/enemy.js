import Player from "./player"

class Enemy{
  constructor(prototype, ctx) {
    this.type = prototype.type;
    this.color = prototype.color;
    this.description = prototype.description;
    this.weakTo = prototype.weakTo;

    this.ctx = ctx
    this.positionX = 960;
    this.positionY = 400;

    this.sprite = this.loadSprite();
    this.square = 320;

    this.localFrameCount = 0;

    this.enemyState = 0;
    // idle:0, attacking:1, dying:-1
    this.retired = 0;
    // active:0, escaping:1, dead:-1

  }


  recieveAttack(color){
    console.log("hit");
    if (this.weakTo === color){
      console.log("deadly");
      this.enemyState = -1;
    } else {
      this.enemyState = 1;
    }
  }
  
  // attack(player){
  //   player.takeDamage();
  // }
  //this should be handled in the game class with the response from retired.

  loadSprite() {
    const image = new Image()
    console.log(this.type)
    this.ctx.fillStyle = "black"
    switch(this.type){
      case "RedSlime":
        console.log("red")
        image.src = "sprites/RedSlime-Sheet.png";
        break;
      case "BlueSlime":
        console.log("blue")
        image.src = "sprites/BlueSlime-Sheet.png";
        break;
      case "GreenSlime":
        console.log("green")
        image.src = "sprites/GreenSlime-Sheet.png";
        break;
    }
    return image;
  }
  
  render(frame){
    this.ctx.fillStyle = this.color;
    switch(this.enemyState){
      case 2:
        this.attackAnimationNoDamage()
        break;
      case 1:
        this.attackAnimation();
        break;
      case -1:
        this.deathAnimation();
        break;
      default:
        this.idleAnimation(frame);
    }
  }

  animate(sequence, frame){
    this.ctx.drawImage(this.sprite, frame*this.square, sequence*this.square, this.square, this.square, this.positionX, this.positionY, this.square, this.square)
  }

  idleAnimation(frame){
    this.updatePosition();
    let col = frame % 4;
    this.animate(0, col)
  }


  attackAnimation(){
    //animation associated with attack
    //12 frames total
    if (this.localFrameCount < 4){
      this.animate(1, this.localFrameCount)
      this.localFrameCount++;
    } else if(this.localFrameCount < 8){
      this.positionX -= 180
      this.animate(0, this.localFrameCount%4)
      this.localFrameCount++
    } else{
      this.localFrameCount = 0;
      this.retired = 1;
    }
  }

  attackAnimationNoDamage(){
    //animation associated with attack
    //8 frames total
    if (this.localFrameCount < 4){
      this.animate(1, this.localFrameCount)
      this.localFrameCount++;
    } else if(this.localFrameCount < 8){
      this.positionX -= 180
      this.animate(0, this.localFrameCount%4)
      this.localFrameCount++
    } else{
      this.localFrameCount = 0;
      this.retired = 1;
    }
  }

  // damageAnimation(){
  //   //animation associated with being damaged.
  //   console.log("damaged")
  // }
  // incorperate the damageAnimation and the escape frames into the attackAnimation

  deathAnimation(){
    //8 frames total
    console.log("dying")
    if (this.localFrameCount < 3){
      this.animate(2, this.localFrameCount)
      this.localFrameCount++;
    } else{
      this.localFrameCount = 0;
      this.retired = -1;
    }
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
    let enemy = new Enemy(prototype, ctx);
    return enemy;
  }
  //


//Add enemy Prototypes here
  static activePrototypes = [
    {
      type: "RedSlime",
      color: "red",
      description: "A red slime",
      weakTo: "blue",
    },
    {
      type: "BlueSlime",
      color: "blue",
      description: "A blue slime",
      weakTo: "green",
    },
    {
      type: "GreenSlime",
      color: "green",
      description: "A green slime",
      weakTo: "red",
    }
  ];

}

export default Enemy

//192
//128
//64