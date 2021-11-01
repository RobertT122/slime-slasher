class Timer {
  constructor(startTime, ctx) {
    this.time = startTime;
    this.paused = false;
    this.ctx = ctx;
    this.frameConversion = undefined;
    this.secondFraction = 0;
  }
  
  render(frameRate){
    this.frameConversion = this.frameConversion || frameRate/1000
    this.isDone();
    this.ctx.font=("100px PressStart2P")
    this.ctx.fillText(this.timeString(), 340, 200)
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
    }
    return (this.time + this.secondFraction).toFixed(1)
  }

  finishEarly(){
    this.pause = true;
    return Math.ceil(this.time);
  }

}

export default Timer;