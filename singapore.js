
//1. 2 Player Turn based
//2. 10 questions in random
//3. Each question will have a true and false button
//4. Each player to earn 1 point upon the selection of correct answers
//5. Game will end once 10 questions are answered.
//6. Reset of game will only be triggered upon the reset button.

//To start browser before running of JQ

console.log('start');

$(document).ready(function(){
});

//Step 1 : Contructor to create question objects consist of (questions, choices and anwsers)
  function Question (question, choices, correctAnswer) {
    this.question = question;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }

//Step 2 : Using the constructor above, i create a database of 15 questions with choices and answers stored in each object.
// Each question will come with 2 choices; true or false, and answers to each question will be defined as either 0 or 1 which will represent the  buttons and will be used to determine if players have answered the question correctly, how many points each player received and the display msg to be shown after game is over.
  var question0 = new Question('A domesticated dog can live between 10 to 20 years.', ['True', 'False'], 0);
  var question1 = new Question('Normal adult dogs have 50 teeths?', ['True', 'False'], 1);
  var question2 = new Question('A poodle is ideal for owners who are sensitive to fur.', ['True', 'False'], 0);
  var question3 = new Question('Poodle is one of the most intelligent dog breeds', ['True', 'False'], 0);
  var question4 = new Question('Singapore keep its stray dog population in SPCA.', ['True', 'False'], 0);
  var question5 = new Question('Chocolates are healthy for dogs.', ['True', 'False'], 1);
  var question6 = new Question('Dog gloomers in Singapore need a license.', ['True', 'False'], 1);
  var question7 = new Question('Pittbulls are banned in Singapore.', ['True', 'False'], 0);
  var question8 = new Question('Golden retriever is commonly breed for protection purpose.', ['True', 'False'], 1);
  var question9 = new Question('Rat terrier is originally a hunting breed', ['True', 'False'], 0);
  var question10 = new Question(' The jaws of pit bulls are anatomically different from those of other dogs so that they can lock shut when they fight.', ['True', 'False'], 0);
  var question11 = new Question('Purebred dogs are *always* less healthy than mutts.', ['True', 'False'], 0);
  var question12 = new Question(' The poodle originated in France.',['True', 'False'], 0);
  var question13 = new Question('If your dog makes a mess on the carpet, you should rub his nose in it to teach him not to go in the house.', ['True', 'False'], 1);
  var question14 = new Question('Dogs who are just household pets do not need obedience training.',['True', 'False'], 1);
  var question15 = new Question('A pet store is not the best place to buy a puppy.', ['True', 'False'], 0);


//Step 3 : The folowing quiz object is created to store variables of gameplay and to form a zero index array of questions, created above, to be called upon in order of gameplay i.e. player's turns, display msg and winner.
  var quiz = {
    currentQuestion: 0,
    questions: [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15],
    GameOver: false,
    player1Points: 0,
    player2Points: 0
  };


//Step 4 : Define the functions for the the game logic

// To return the total number questions (10 out of 15) that i want to broadcast to the players.
  function numberOfQuestions() {
      console.log(quiz.questions.length - 5);
      return quiz.questions.length - 5; //return 15 questions
    }

// Use to compare current question answered and number of questions in array to determine when to end game. And also to be used as index for array of quiz.questions[i] to be called for display.
  function currentQuestion() {
      console.log(quiz.currentQuestion);
      return quiz.currentQuestion; // return question index number
    }

//To pull out a specific answer to a question from the question array - quiz.questions[quiz.currentQuestion] to determine if the player has answered correctly.
  function correctAnswer () {
      console.log(quiz.questions[quiz.currentQuestion].correctAnswer);
      return quiz.questions[quiz.currentQuestion].correctAnswer; //return 1 or 0
  }

//To determine the number of choices the user has to select the correct answers.
//formula looks into the index of quiz.question Array and pull out the question#.choices.length from the object
//Not used****
  function numberOfChoices() {
      console.log(quiz.questions[quiz.currentQuestion].choices.length);
      return quiz.questions[quiz.currentQuestion].choices.length; //2 consisting of ["true", "false"]
  }

//To randomised the displayed of questions in each game play.
  function shuffle (a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

//To test if the game is over with true or false. Use to determine if playTurn will continue and also to trigger the boradcast of end game messages.

  function isGameOver() {
    console.log(quiz.gameOver);
    if (quiz.gameOver){
      return true;
    } else {return false;
    }
  }


  //1st: To determine if game is over or not before proceeding to the following conditions
  //2nd: if player select the correct answer
  // if player turn is even number, then points belong to player 1
  // points to +1 on the score board after every correct answer for player 1
  // if player turn is odd number, then points belong to player 2
  // points  +1 on the score board after every correct answer for player 2
  // this will keep changing +1 so as to move on to the next question.
  // to compare current question with totol question number to determine end game.

  function playTurn(input){
    if (isGameOver()){
      return false;
    }

    if (input === correctAnswer()){

      if (quiz.currentQuestion % 2 === 0){
        quiz.player1Points++;
      } else if ((quiz.currentQuestion % 2 !== 0)) {
        quiz.player2Points++;
      }
    }
    if (input !== correctAnswer()) {
      var x = true;
    }
    quiz.currentQuestion++;
    if (currentQuestion() === numberOfQuestions() - 1) {
      quiz.gameOver = true;
    }
  }

  // To assign a number for each stages of the game
  // return 0 if the game is not over
  // return 1 if player 1 won
  // return 2 if player 2 won
  // return 3 if its a draw
  //these return numbers will trigger the broadcast msg of the winners in UpdateDisplay.
  function whoWon () {
    if (!quiz.gameOver) return 0;
    if (quiz.player1Points > quiz.player2Points) return 1;
    if (quiz.player2Points > quiz.player1Points) return 2;
    if (quiz.player1Points === quiz.player2Points) return 3;
  }


  // to go back to the following assignment on restart of game
  //Not used*****
  function restart () {
    quiz.currentQuestion = 0;
    quiz.GameOver = false;
    quiz.player1Points = 0;
    quiz.player2Points = 0;
  }

//Step 5
//Defining JQuery variables for DOM
  var questionBoard = $('#question');
  var button = $('.button');
  var trueButton = $('#true');
  var falseButton = $('#false');
  var player1Score = $('#score1');
  var player2Score = $('#score2');
  var resetButton = $('#reset');
  var anounce = $('#live');


//Step 6
// linking the logic functions and DOMS to events

//function displayUpdate()
//On display, div '#question' will update the question based on currentQuestion function via random shuffle() and playTurn()
//player 1 score will be updated in div '# score1' while player 2 score  will be updated in '#score2'
//the function will then test if game over is true and return the messages to be shown on '#question' and '#live'

  function updateDisplay () {
    questionBoard.text(quiz.questions[currentQuestion()].question);
    player1Score.text(quiz.player1Points);
    player2Score.text(quiz.player2Points);
    console.log(quiz.player2Points);

      if (isGameOver()) {
          anounce.text('Game Over. Try Again!');
          if (whoWon() === 3) {
          questionBoard.text("Well done to both. It is a tie!");
        } else {
          questionBoard.text('Player ' + whoWon() + ' wins!');
        }
      }
    }

//PUTTING ALL TOGETHER BY CALLING THE FUNCTIONS AND SETTING THE EVENTS

//Click Event for the true and false button
//button is the class of both true and false displayed buttons
//this.id will call onto one of the ids of each buttons whenever the player clicks one of them
//with the answers of 0(true) or 1(false) assigned to the button, the number will then be passed into the playTurn function to assign points to correct players.
//The var ans will then be passed into the playTurn
button.click(function () {
  var click = this.id;
  var ans;
  if (click === 'true') ans = 0;
  if (click === 'false') ans = 1;
  playTurn(ans);
  updateDisplay();
});

//reset button - window reload
resetButton.click(function(){
  window.location.reload();
});

//call of functions
//To shuffle followed by the displayed of messages accoding to players clicks.
shuffle(quiz.questions);
updateDisplay();
