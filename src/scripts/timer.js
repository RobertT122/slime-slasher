class Timer {
  constructor(startTime, ctx) {
    this.time = startTime;
    this.paused = false;
    this.ctx = ctx;
    this.frameConversion = undefined;
    this.secondFraction = 0;
    this.renderPos = [340, 350]
  }
  
  render(frameRate){
    this.frameConversion = this.frameConversion || frameRate/1000
    this.isDone();
    this.ctx.font=("50px 'Press Start 2P'")
    this.ctx.fillText(this.timeString(), this.renderPos[0], this.renderPos[1])
  }

  isDone(){
    if (this.time <= 0 || this.paused) {
      //returns true when timer is over;
      return true;
    } else{
      this.decrementTime();
    }
  }

  decrementTime(){
    this.secondFraction -= this.frameConversion;
    if(this.secondFraction <= -1){
      this.secondFraction = 0
      this.time -=1
    }
  }

  

  timeString(){
    if (this.time > 10 ||(this.time === 10 && this.secondFraction === 0)){
      return this.time
    }else if(this.time > 0){
      this.ctx.font=("45px 'Press Start 2P'")
      this.renderPos[0] = 330;
      return (this.time + this.secondFraction).toFixed(1)
    } else{
      this.renderPos[0] = 180;
      return "Times Up!"
    }
  }

  finishEarly(){
    if (!this.paused){
      this.paused = true;
      return Math.floor(this.time);
    }
  }

}

export default Timer;