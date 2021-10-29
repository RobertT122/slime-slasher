class Attack {
  constructor(type, player, baseMulitplier = 3){
    this.type = type;
    this.player = player;
    this.baseMulitplier = baseMulitplier;
  }

  useAttack(enemy) {
    enemy.hitpoints -= this.power(enemy)
  }

  power(enemy) {
    if (enemy.weak.includes(this.type)) {
      return this.player.level * this.baseMulitplier
    } else if (enemy.resist.includes(this.type)) {
      return Math.ceil(this.player.level/this.baseMulitplier)
    } else {
      return  this.player.level
    }
  }


}

export default Attack