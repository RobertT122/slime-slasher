class Timer {
  constructor(startTime) {
    this.time = startTime;
    this.paused = false;
  }
  
  render() {
    //renders the clock after each countdown interval.
    console.log(this.time)
  }

  countdown(){
    let that = this;
    const interval = setInterval(()=>{
      if (this.isDone() || that.paused) {
        clearInterval(interval);
      }
      that.render.call(that);
      that.time= that.time - 1;
    }, 1000)
  }

  finishEarly(){
    this.pause = true;
    return Math.ceil(this.time);
  }

  isDone(){
    if(this.time < 0) {
      return false;
    }
    return true;
  }
}

export default Timer;