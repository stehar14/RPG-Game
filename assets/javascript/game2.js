// ----- Global Variables ----- //

// Has the user selected their character
var characterSelected = false;

// Has the user selected the enemy
var enemySelected = false;

// Variable to store the user's chosen character
var character= {};

// Variable to store the chosen enemy
var enemy = {};

// Number of enemies defeated
var enemiesDefeated = 0;

// Boolean to indicate whether or not the game is over
var gameOver = false;

// ----- Character Objects ----- //

var link = {
  name: "Link",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var mario = {
  name: "Mario",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var donkeyKong = {
  name: "Donkey Kong",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var kirby = {
  name: "Kirby",
  health: 180,
  baseAttack: 25,
  attack: 25
};

// ----- Helper Functions ----- //

// This function will initialize the character value from the global object variables defined above
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

// This function will initialize the enemy's value from the global object variables defined above
function initializeEnemy(chosenEnemy) {
  enemy.name = chosenEnemy.name;
  enemy.health = chosenEnemy.health;
  enemy.baseAttack = chosenEnemy.baseAttack;
  enemy.attack = chosenEnemy.attack;
}

// This function will move the remaining characters to the enemies section
function moveToEnemies() {
  $(".selectable-char").removeClass("selectable-char col-md-3").addClass("enemy-character col-md-4");
  $("#enemies").append($(".enemy-character"));
}

// This function will reset the state of the game
function resetGame() {
  // Reset all the health values to the original
  $("#character-1").children(".hp").html(link.health);
  $("#character-2").children(".hp").html(mario.health);
  $("#character-3").children(".hp").html(donkeyKong.health);
  $("#character-4").children(".hp").html(kirby.health);

  $(".character").removeClass("my-char enemy-character defender").addClass("selectable-char col-md-3");
  var available = $(".selectable-char").show();
  $("#char-select").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  enemySelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  enemy = {};
}

// ----- Main Routine ----- //

// Run Javascript when the HTML has finished loading
$(document).ready(function() {

  // Hide the "Restart" button on document load
  $("#restart").hide();

  // Determine which character the user has clicked
  $("#character-1").on("click", function () {
    console.log("Link is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").empty();

      // Set the user's character
      initializeCharacter(link);
      characterSelected = true;

      // Display the chosen character
      $("#character-1").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-1").hasClass("enemy-character")) {
        $("#game-message").empty();

        // Set the user's enemy
        initializeEnemy(link);
        enemySelected = true;

        // Add the character to the enemy section
        $("#character-1").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  $("#character-2").on("click", function () {
    console.log("Mario is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").empty();

      // Set the user's character
      initializeCharacter(mario);
      characterSelected = true;

      // Display the chosen character
      $("#character-2").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-2").hasClass("enemy-character")) {
        $("#game-message").empty();

        // Set the user's enemy
        initializeEnemy(mario);
        enemySelected = true;

        // Add the character to the enemy section 
        $("#character-2").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  $("#character-3").on("click", function () {
    console.log("DK is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").empty();

      // Set the user's character
      initializeCharacter(donkeyKong);
      characterSelected = true;

      // Display the chosen character
      $("#character-3").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-3").hasClass("enemy-character")) {
        $("#game-message").empty();

        // Set the user's enemy
        initializeEnemy(donkeyKong);
        enemySelected = true;

        // Add the character to the enemy section 
        $("#character-3").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  $("#character-4").on("click", function () {
    console.log("Kirby is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").empty();

      // Set the user's character
      initializeCharacter(kirby);
      characterSelected = true;

      // Display the chosen character
      $("#character-4").removeClass("selectable-char col-md-3").addClass("my-char");
      $("#my-char").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (enemySelected == false)) {
      // User is choosing the enemy
      if($("#character-4").hasClass("enemy-character")) {
        $("#game-message").empty();

        // Set the user's enemy
        initializeEnemy(kirby);
        enemySelected = true;

        // Add the character to the enemy section 
        $("#character-4").removeClass("enemy-character col-md-4").addClass("defender");
        $("#active-enemy").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    console.log("Attack selected");

    

    // User is ready to attack the enemy
    if (characterSelected && enemySelected && !gameOver) {
      // User attacks the enemy and decreases the enemy's health points
      enemy.health = enemy.health - character.attack;
      $(".defender").children(".hp").html(enemy.health);
      $("#game-message").html("<p>You attacked " + enemy.name + " for " + character.attack + " damage.<p>");

      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      // If enemy is still alive, they counter attack the user
      if (enemy.health > 0) {
        character.health = character.health - enemy.baseAttack;
        $(".my-char").children(".hp").html(character.health);

        // Check if the user survives the attack
        if (character.health > 0) {
          $("#game-message").append("<p>" + enemy.name + " attacked you back for " + enemy.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        // Enemy is defeated
        enemiesDefeated++;
        enemySelected = false;
        $("#game-message").html("<p>You have defeated " + enemy.name + ". Choose another enemy.</p>");
        $(".defender").hide();

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

}); // Main routine