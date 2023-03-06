// Base//
// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Game Mode - two states for the first version
//ver 1. rolls 2 dice and returns output for 1 player. The player choose the dice order and gets the correct output value.
//ver 2. refactored code to include player 2
// - global variable for currentPlayer; all playersScorew
// - refactor outputMessages to interact with each Player, 1 and 2
// - write logic for player 1 to go first, then palyer 2, and finally point towards comparing score

//ver 3. implement comparing dice scores and declare winner
//ver 4. reset game so player can play continually without refreshing page

//declare global varieables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER"; //caps means game state don't change
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL; //set the first state of the game

//create array to store the roll dice values
var currentPlayerRolls = []; //create array first submit button has to roll two dice

var currentPlayer = 1;
var allPlayersScore = [];

// Roll Dice Function
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

// Helper function to roll Two Dice
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice()); //store it in currentPlayerRolls array
    counter++;
  }
  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return (
    "Welcome, Player " +
    currentPlayer +
    "! <br><br> You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ". <br><br> Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScores = function (playerInput) {
  var playerScore;
  //playerInput validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: playerInput validation, playerInput is NOT 1 AND NOT 2"
    );
    return `Error! Please only input '1' or '2' to choose which dice to use as the first digit <br><br> Your dice rolls are <br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}. `;
  }
  if (playerInput == 1) {
    console.log("Control flow: playerInput == 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (playerInput == 2) {
    console.log("Control flow: playerInput == 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  // Store playerScore in array
  allPlayersScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRolls = [];
  return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayersScores = function () {
  //dealing with global varbiales, allPlayersScores so no need input variable
  var compareMessage =
    "Player 1 score: " +
    allPlayersScore[0] +
    "<br>Player 2 score: " +
    allPlayersScore[1];
  // p1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  }
  //p2 wins
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  }
  //tie
  else if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br> It's a tie!";
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var main = function (input) {
  console.log("Checking for game mode on submit: ", gameState);
  console.log("Checking for currentPlayer on submit: ", currentPlayer);
  var outputMessage = ""; //empty string to set it later

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");

    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log("Checking for number rolled mode on submit: ", gameState);
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    // Call playerScore function
    outputMessage = getPlayerScores(input);

    if (currentPlayer == 1) {
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, next submit click will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + "<br><br> Press submit to calculate scores!";
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState = GAME_STATE_COMPARE_SCORES");
    outputMessage = comparePlayersScores();
    resetGame();
    console.log("Current player after reset:", currentPlayer);
    console.log("Game state after reset:", gameState);
    console.log("allPlayersScore array after reset:", allPlayersScore);
    return outputMessage;
  }
};
