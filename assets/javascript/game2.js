//RPG Game Homework #4
//Created 11/25/17
//Last updated 11/30/17
//Written by: Steve Harold

// Variables to store: if user seected character and enemy, object to hold each
var characterSelected = false;
var enemySelected = false;
var character= {};
var enemy = {};

// Variables to track enemies killed and if the game is over
var enemiesDefeated = 0;
var gameOver = false;

// Objects to store characters //

var mario = {
  name: "Mario",
  health: 120,
  baseAttack: 9,
  attack: 9
};

var fox = {
  name: "Fox",
  health: 140,
  baseAttack: 7,
  attack: 7
};

var samus = {
  name: "Samus",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var link = {
  name: "Link",
  health: 180,
  baseAttack: 15,
  attack: 15
};

// Audio //

  // Variable to hold attack audio utilized in attack() function //
var attackSound = new Audio();
  
  // Backgrouind music and loop //
var theme = new Audio();
theme.src = "./assets/audio/theme.mp3";
theme.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

  // Mario //
var mWin = new Audio();
mWin.src = "./assets/audio/mario-win.wav";
var mLose = new Audio();
mLose.src ="./assets/audio/mario-hurt.wav";
var mAttack = ["./assets/audio/mario-attack-1.wav", "./assets/audio/mario-attack-2.wav", "./assets/audio/mario-attack-3.wav", "./assets/audio/mario-attack-4.wav"];
var mCall = new Audio();
mCall.src ="./assets/audio/mario-call.wav";

  // Fox //
var fWin = new Audio();
fWin.src = "./assets/audio/fox-win.wav";
var fLose = new Audio();
fLose.src ="./assets/audio/fox-hurt.wav";
var fAttack = ["./assets/audio/fox-attack-1.wav", "./assets/audio/fox-attack-2.wav", "./assets/audio/fox-attack-3.wav", "./assets/audio/fox-attack-4.wav"];
var fCall = new Audio();
fCall.src ="./assets/audio/fox-call.wav";

  // Samus //
var sWin = new Audio();
sWin.src = "./assets/audio/samus-win.wav";
var sLose = new Audio();
sLose.src ="./assets/audio/samus-hurt.wav";
var sAttack = ["./assets/audio/samus-attack-1.wav", "./assets/audio/samus-attack-2.wav", "./assets/audio/samus-attack3.wav"]
var sCall = new Audio();
sCall.src ="./assets/audio/samus-call.wav";

  // Link //
var lWin = new Audio();
lWin.src = "./assets/audio/link-win.wav";
var lLose = new Audio();
lLose.src ="./assets/audio/link-hurt.wav";
var lAttack = ["./assets/audio/link-attack-1.wav", "./assets/audio/link-attack-2.wav", "./assets/audio/link-attack-3.wav"];
var lCall = new Audio();
lCall.src ="./assets/audio/link-call.wav";

  // Announcer //
var champion = new Audio();
champion.src = "./assets/audio/champion.wav";
var chooseChar = new Audio();
chooseChar.src ="./assets/audio/choose-char.wav";
var cont = new Audio();
cont.src = "./assets/audio/continue.wav";
var defeated = new Audio();
defeated.src ="./assets/audio/defeated.wav";
var finalBattle = new Audio();
finalBattle.src ="./assets/audio/final-battle.wav";
var go = new Audio();
go.src = "./assets/audio/go.wav";
var round1 = new Audio();
round1.src ="./assets/audio/round-1.wav";
var round2 = new Audio();
round2.src ="./assets/audio/round-2.wav";
var versus = new Audio();
versus.src = "./assets/audio/versus.wav";


// Functions //

  // Initialize character values from objects //
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

  // Initialize enemy values //
function initializeEnemy(chosenEnemy) {
  enemy.name = chosenEnemy.name;
  enemy.health = chosenEnemy.health;
  enemy.baseAttack = chosenEnemy.baseAttack;
  enemy.attack = chosenEnemy.attack;
}

  // Moves remaining characters to #enemies div //
function moveToEnemies() {
  $(".selectable-char").removeClass("selectable-char col-md-3").addClass("enemy-character col-md-4");
  $("#enemies").append($(".enemy-character"));
}

  // Play round audio //
function round() {
   if ((enemiesDefeated === 0) && (enemySelected === true)) {
    round1.play();
    setTimeout(function(){
        go.play()}, 1500);
  }
  else if (enemiesDefeated === 1) {
    round2.play();
    setTimeout(function(){
        go.play()}, 1500);
  }
  else if (enemiesDefeated === 2) {
    finalBattle.play();
    setTimeout(function(){
        go.play()}, 1500);
  };
}

  // Play attack audio //
function attack() {
  if (character.name === "Mario") {
      var i = Math.floor((Math.random())*mAttack.length);
      attackSound.src = mAttack[i];
      attackSound.play();
    }
    else if (character.name === "Link") {
      var i = Math.floor((Math.random())*lAttack.length);
      attackSound.src = lAttack[i];
      attackSound.play();
    }
    else if (character.name === "Samus") {
      var i = Math.floor((Math.random())*sAttack.length);
      attackSound.src = sAttack[i];
      attackSound.play();
    }
    else if (character.name === "Fox") {
      var i = Math.floor((Math.random())*fAttack.length);
      attackSound.src = fAttack[i];
      attackSound.play();
    };
}

  // Reset the game //
function resetGame() {
  
  $("#character-1").children(".hp").html("Health: " + mario.health);
  $("#character-2").children(".hp").html("Health: " + fox.health);
  $("#character-3").children(".hp").html("Health: " + samus.health);
  $("#character-4").children(".hp").html("Health: " + link.health);

  $(".character").removeClass("defender my-char enemy-character dead col-md-4").addClass("selectable-char col-md-3");
  var available = $(".selectable-char")
  $("#char-select").html(available);
  $("#char-select").prepend("<h2 class='text-center'>Select a Fighter</h2>");
  $("#game-message").html("<p>Select a character!</p>");
  $("#restart").hide();

  characterSelected = false;
  enemySelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  enemy = {};
  chooseChar.play();
}

// Game //

// Run Javascript when the HTML has finished loading
$(document).ready(function() {

  // Hide the "Restart" button on document load play theme and choose character
  $("#restart").hide();
  theme.play();
  chooseChar.play();

  // On click events for the character divs
  // When character is clicked, and user hasn't picked a character, make clicked char "my-char"
  // Otherwise, if user hasn't picked an enemy, make clicked char "defender" and append to appropriate div

    // *** Mario *** //
  $("#character-1").on("click", function () {
    console.log("Mario is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").html("<p>You chose Mario!</p>");

      // Set the user's character, play character name and versus
      initializeCharacter(mario);
      mCall.play();
      setTimeout(function(){
        versus.play()}, 1500);
      characterSelected = true;

      // Display the chosen character
      $("#character-1").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-1").hasClass("enemy-character")) {
        $("#game-message").html("<p>Your enemy is Mario!</p>");

        // Set the user's enemy, play enemy name and round # and "GO!"
        initializeEnemy(mario);
        mCall.play();
        enemySelected = true;
        setTimeout(function(){
        round()}, 1500);
        // Add the character to the defender section
        $("#character-1").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  // *** Fox *** //
  $("#character-2").on("click", function () {
    console.log("Fox is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").html("<p>You chose Fox!</p>");

      // Set the user's character, play character name and versus
      initializeCharacter(fox);
      fCall.play();
      setTimeout(function(){
        versus.play()}, 1500);
      characterSelected = true;

      // Display the chosen character
      $("#character-2").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-2").hasClass("enemy-character")) {
        $("#game-message").html("<p>Your enemy is Fox!</p>");

        // Set the user's enemy, play enemy name and round # and "GO!"
        initializeEnemy(fox);
        fCall.play();
        enemySelected = true;
        setTimeout(function(){
        round()}, 1500);
        // Add the character to the defender section 
        $("#character-2").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  // *** Samus *** //
  $("#character-3").on("click", function () {
    console.log("Samus is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").html("<p>You chose Samus!</p>");

      // Set the user's character, play character name and versus
      initializeCharacter(samus);
      sCall.play();
      setTimeout(function(){
        versus.play()}, 1500);
      characterSelected = true;

      // Display the chosen character
      $("#character-3").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-3").hasClass("enemy-character")) {
        $("#game-message").html("<p>Your enemy is Samus!</p>");

        // Set the user's enemy, play enemy name and round # and "GO!"
        initializeEnemy(samus);
        sCall.play();
        enemySelected = true;
        setTimeout(function(){
        round()}, 1500);
        // Add the character to the defender section 
        $("#character-3").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  // *** Link *** //
  $("#character-4").on("click", function () {
    console.log("Link is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").html("<p>You chose Link!</p>");

      // Set the user's character, play character name and versus
      initializeCharacter(link);
      lCall.play();
      setTimeout(function(){
        versus.play()}, 1500);
      characterSelected = true;

      // Display the chosen character
      $("#character-4").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-4").hasClass("enemy-character")) {
        $("#game-message").html("<p>Your enemy is Link!</p>");

        // Set the user's enemy, play enemy name and round # and "GO!"
        initializeEnemy(link);
        lCall.play();
        enemySelected = true;
        setTimeout(function(){
        round()}, 1500);
        // Add the character to the defender section 
        $("#character-4").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

 
// On click function targeting the attack button
  $("#attack").on("click", function() {
    console.log("Attack selected");    

    // User is ready to attack the enemy
    if (characterSelected && enemySelected && !gameOver) {
      // User attacks the enemy and decreases the enemy's health points and plays random attack audio for specific character
      enemy.health = enemy.health - character.attack;
      $(".defender").children(".hp").html("Health: " + enemy.health);
      $("#game-message").html("<p>You attacked " + enemy.name + " for " + character.attack + " damage.<p>");
      attack();
      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      // If enemy is still alive, they counter attack the user
      if (enemy.health > 0) {
        character.health = character.health - enemy.baseAttack;
        $(".my-char").children(".hp").html("Health: " + character.health);

        // Check if the user survives the attack

        // If they do, show attack in game-message
        if (character.health > 0) {
          $("#game-message").append("<p>" + enemy.name + " attacked you back for " + enemy.baseAttack + " damage.</p>");
        } 
        // Otherwise, you lose and your losing sound plays, followed by defeated
        else {
          if (character.name === "Mario") {
            setTimeout(function() {
              mLose.play();
              setTimeout(function(){
                defeated.play()
              }, 1500);
            }, 500);
          }
          else if (character.name === "Link") {
            setTimeout(function() {
              lLose.play();
              setTimeout(function(){
                defeated.play()
              }, 1500);
            }, 500);
          }
          else if (character.name === "Samus") {
            setTimeout(function() {
              sLose.play();
              setTimeout(function(){
                defeated.play()
              }, 1500);
            }, 500);
          }
          else if (character.name === "Fox") {
            setTimeout(function() {
              fLose.play();
              setTimeout(function(){
                defeated.play()
              }, 1500);
            }, 500);
          };

          // store the game is over, display game-message, show continue button, play "Continue?" 
          gameOver = true;
          $(".my-char").children(".hp").html("");
          $("#game-message").html("<p>You were defeated... womp womp...</p>");
          $("#restart").show();
          setTimeout(function() {
            cont.play();
          }, 3500);
        }
      } else {
        // Enemy is defeated
        enemiesDefeated++;
        $(".defender").removeClass("defender").addClass("dead col-md-4");
        $(".dead").children(".hp").html("");
        $("#graveyard").append($(".dead"));
        enemySelected = false;

        $("#game-message").html("<p>You have defeated " + enemy.name + ".</p><p>Choose another enemy.</p>");
        
        // Play winning sound for specific character followed by "champion is [charcater name]"
        if (character.name === "Mario") {
            mWin.play();
            if (enemiesDefeated === 3) {
              setTimeout(function() {
                champion.play();
                setTimeout(function() {
                  mCall.play();
                }, 1500);
              }, 500);
            }
            else {
              setTimeout(function() {
                mCall.play();
                setTimeout(function() {
                  versus.play();
                }, 1500);
              }, 500);
            }
          }
          else if (character.name === "Link") {
            lWin.play();
            if (enemiesDefeated === 3) {
              setTimeout(function() {
                champion.play();
                setTimeout(function() {
                  lCall.play();
                }, 1500);
              }, 500);
            }
            else {
              setTimeout(function() {
                lCall.play();
                setTimeout(function() {
                  versus.play();
                }, 1500);
              }, 500);
            }
          }
          else if (character.name === "Samus") {
            sWin.play();
            if (enemiesDefeated === 3) {
              setTimeout(function() {
                champion.play();
                setTimeout(function() {
                  sCall.play();
                }, 1500);
              }, 500);
            }
            else {
              setTimeout(function() {
                sCall.play();
                setTimeout(function() {
                  versus.play();
                }, 1500);
              }, 500);
            }
          }
          else if (character.name === "Fox") {
            fWin.play();
            if (enemiesDefeated === 3) {
              setTimeout(function() {
                champion.play();
                setTimeout(function() {
                  fCall.play();
                }, 1500);
              }, 500);
            }
            else {
              setTimeout(function() {
                fCall.play();
                setTimeout(function() {
                  versus.play();
                }, 1500);
              }, 500);
            }
          };
        // Check if the user has won the game
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!enemySelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }


  });

  $("#restart").on("click", function() {
    console.log("Restart selected");

    resetGame();
  });


});