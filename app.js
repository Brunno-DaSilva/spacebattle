/**********************************
 *    Bruno DaSilva               *
 *    w05d1                       *
 *    Homework - Space Battle     *
 **********************************/

//Hide Elements
document.getElementById("winner").style.display = "none";

//to show an Element
document.getElementById("gameOver").style.display = "none";

// Hero has Three Lives
let hero = [
  {
    top: 85,
    left: 50
  },
  {
    top: 85,
    left: 50
  },
  {
    top: 85,
    left: 50
  }
];

//atomicBanana to hit the aliens
let atomicBanana = [];

//EnemyAttack
let enemyAttacks = [];

//enemies
let enemies = [
  { left: 20, top: 5 },
  { left: 26, top: 5 },
  { left: 32, top: 5 },
  { left: 38, top: 5 },
  { left: 44, top: 5 },
  { left: 50, top: 5 },
  { left: 56, top: 5 },
  { left: 62, top: 5 }
];

// Find the Key pressed by the Player and Use the keyCode to trigger an action
document.onkeydown = function(keyPress) {
  //console.log(keyPress.keyCode);

  // If the user press the keyCode related to the right Move Right
  //related to the left Move Left, if the user hit space FIRE

  for (let i = hero.length - 1; i >= 0; i--) {
    if (keyPress.keyCode === 39) {
      //
      hero[i].left = hero[i].left + 3;
      heroLeftRight();
      //
    } else if (keyPress.keyCode === 37) {
      //
      hero[i].left = hero[i].left - 3;
      heroLeftRight();
      //
    } else if (keyPress.keyCode === 32) {
      //
      atomicBanana.push({
        left: hero[i].left + 0.5,
        top: hero[i].top
      });
      //
      atomicBananaAttack();
      //
    }
  }
};

//Function to move the space Defender to the right and left
const heroLeftRight = () => {
  for (let i = hero.length - 1; i >= 0; i--) {
    document.getElementById("hero").style.left = hero[i].left + "%";
  }
};

//Function to attack the invaders/ generates atomic Bananas
const atomicBananaAttack = () => {
  document.getElementById("atomicBanana").innerHTML = "";

  for (let i = 0; i < atomicBanana.length; i++) {
    document.getElementById(
      "atomicBanana"
    ).innerHTML += `<div class='atomicBanana' style=' z-index: 1; left:${atomicBanana[i].left}%; top:${atomicBanana[i].top}%;'></div>`;
  }
};

//moveAtomicBanana
const moveAtomicBanana = () => {
  for (let m = 0; m < atomicBanana.length; m++) {
    atomicBanana[m].top = atomicBanana[m].top - 2;
  }
};

// Generate the enemies
const generatesEnemies = () => {
  document.getElementById("enemy").innerHTML = "";

  for (let i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemy"
    ).innerHTML += `<div class='enemy' style=' z-index: 1; left:${enemies[i].left}%; top:${enemies[i].top}%;'></div>`;
  }
};

//Moving enemies
const moveEnemies = () => {
  for (let m = 0; m < enemies.length; m++) {
    enemies[m].top = enemies[m].top + 0.1;
  }
};

/******************************************************** */

//Randomly Enemy starts to shoot;

//
const enemyAttack = () => {
  document.getElementById("enemyAttack").innerHTML = "";

  for (let i = 0; i < enemyAttacks.length; i++) {
    document.getElementById(
      "enemyAttack"
    ).innerHTML += `<div class='enemyAttack' style=' z-index: 1; left:${enemyAttacks[i].left}%; top:${enemyAttacks[i].top}%;'></div>`;
  }
};

//enemyBullet Direction
const enemyBulletDir = () => {
  for (let m = 0; m < enemyAttacks.length; m++) {
    enemyAttacks[m].top = enemyAttacks[m].top + 2;
  }
};

//enemyRandom

const RandomShot = () => {
  for (let i = 0; enemies.length; i++) {
    enemyAttacks.push({
      left: enemies[i].left + 0.5,
      top: enemies[i].top + 2
    });
  }
  //
  enemyAttack();
};

/******************************************************** */

// Collision Detection Enemy
const hitEnemy = () => {
  for (let i = enemies.length - 1; i >= 0; i--) {
    for (let j = atomicBanana.length - 1; j >= 0; j--) {
      if (
        atomicBanana[j].top <= enemies[i].top + 1 &&
        atomicBanana[j].top >= enemies[i].top &&
        atomicBanana[j].left >= enemies[i].left &&
        atomicBanana[j].left <= enemies[i].left + 1
      ) {
        enemies.splice(i, 1);
        atomicBanana.splice(j, 1);
      }
    }
  }
};

// Collision Detection Hero
const getHit = () => {
  for (let i = hero.length - 1; i >= 0; i--) {
    for (let j = enemyAttacks.length - 1; j >= 0; j--) {
      if (
        enemyAttacks[j].top <= hero[i].top + 1 &&
        enemyAttacks[j].top >= hero[i].top &&
        enemyAttacks[j].left >= hero[i].left &&
        enemyAttacks[j].left <= hero[i].left + 1
      ) {
        hero.splice(i, 1);
        enemyAttacks.splice(j, 1);
      }
    }
  }
};
/******************************************************** */

// Detect if the player wins or louses.

const trackWinner = () => {
  //check if the enemies position is equivalent to the heros position
  // if true display Game over msg
  for (let i = enemies.length - 1; i >= 0; i--) {
    for (let j = hero.length - 1; j >= 0; j--) {
      if (enemies[i].top >= hero[j].top) {
        document.getElementById("gameOver").style.display = "block";
      }
    }
  }

  // check if all enemies have been defeated
  if (enemies.length <= 0) {
    document.getElementById("winner").style.display = "block";
  }

  //check if the hero lives have been taken
  if (hero.length <= 0) {
    document.getElementById("gameOver").style.display = "block";
  }
};

/******************************************************** */

//Pushing Elements to HTML
const heroLives = () => {
  document.getElementById("heroLives").innerHTML = hero.length;
};
const enemiesDeath = () => {
  document.getElementById("enemyDeath").innerHTML = enemies.length;
};

/******************************************************** */
//Make objects Moves
const loopAttack = () => {
  setTimeout(loopAttack, 100);
  moveAtomicBanana();
  //
  enemyBulletDir();
  //
  moveEnemies();
  atomicBananaAttack();
  //
  enemyAttack();
  generatesEnemies();

  hitEnemy();
  getHit();
  heroLives();
  enemiesDeath();
  trackWinner();
};

//Set enemies  shot randomly
window.setInterval(function() {
  RandomShot();
}, 5000);

//PreventScreen from scroll down.
window.addEventListener(
  "keydown",
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

// Reload Windows to restart the game
const reloadWindow = () => {
  window.location.reload();
};

// window.onload = () => {
//   const themeSong = document.getElementById("theme-song");
//   let themePlays = 0;
//   document.addEventListener("click", function() {
//     if (themePlays <= 3) {
//       themeSong.play();
//     }
//     themePlays++;
//     console.log(`Theme Plays:${themePlays}`);
//   });
// };

const startGame = () => {
  const themeSong = document.getElementById("theme-song");
  themeSong.play();

  trackWinner();
  loopAttack();
};
