class Example {
  constructor(element) {
    this.element = element
    this.addClickEvent();
  }

  addClickEvent(){
    this.element.addEventListener("click", function(event) {
      console.log(this)
      setTimeout(()=>console.log("hello"), 1000)
    })
  }

}

export default Example;