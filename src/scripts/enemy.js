class BasicEnemy{
  constructor(stats, level) {
    //type is an object with keys :weak and :strong that have arrays as values
    this.type = stats.type;
    this.weak = stats.weak;
    this.resist = stats.resist;
    //level will be used to set the health of the enemy and strength of attacks
    if (level === undefined) level = 1;
    this.level = level;
    this.hitpoints = 5 + Math.ceil(this.level/5)
  }

  response(player){
    player.lifePoints -= Math.ceil(this.level/10)
  }

  isAlive(){
    return this.hitpoints > 0;
  }



}

export default BasicEnemy