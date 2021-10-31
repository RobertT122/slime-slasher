import Game from './scripts/game.js'
import Example from './scripts/example.js'
import Enemy from './scripts/enemy.js'

// window.Attack = Attack;
// window.Player = Player;
window.Enemy = Enemy;
window.Game = Game;

window.addEventListener("DOMContentLoaded", () =>{
  let ele = document.getElementById("example")
  // ele.addEventListener("click", function(){
  //   console.log(this)
  // })
  console.log(ele)
  let ex = new Example(ele);

})