import Example from './scripts/Example.js'
import Attack from './scripts/attack.js'
import Player from './scripts/player.js'
import BasicEnemy from './scripts/enemy.js'

window.Attack = Attack;
window.Player = Player;
window.BasicEnemy = BasicEnemy;

window.addEventListener("DOMContentLoaded", () =>{
  let ele = document.getElementById("example")
  // ele.addEventListener("click", function(){
  //   console.log(this)
  // })
  console.log(ele)
  let ex = new Example(ele);

})