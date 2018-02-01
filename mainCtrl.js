angular.module("HangManApp").controller("mainCtrl", function ($scope) {
  let words = ["pretend", "mountain", "city", "house", "jump"];
  $scope.incorrectLetters = [],
    $scope.correctLetters = [],
    $scope.guesses = 6,
    $scope.displayWord = "",
    $scope.input = {
      letter: ""
    }
  $scope.demo = "Some Random String Goes Here";

  let selectRandomWord = function () {
    let index = Math.round(Math.random() * words.length)
    return words[index];
  };
  let newGame = function () {
    $scope.incorrectLetters = [],
      $scope.correctLetters = [],
      $scope.guesses = 6,
      $scope.displayWord = "";
    selectedWord = selectRandomWord();
    let tempDisplayWord = ''
    for (var i = 0; i < selectedWord.length; i++) {
      tempDisplayWord += "*"
    }
    $scope.displayWord = tempDisplayWord
    console.log('selected word: ', selectedWord)
  }


  $scope.letterChosen = function () {
    for (let i = 0; i < $scope.correctLetters.length; i++) {
      if ($scope.correctLetters[i].toLowerCase() === $scope.input.letter.toLowerCase()) {
        $scope.input.letter = ""
        return;
      }
    }
    for (let i = 0; i < $scope.incorrectLetters.length; i++) {
      if ($scope.incorrectLetters[i].toLowerCase() === $scope.input.letter.toLowerCase()) {
        $scope.input.letter = ""
        return;
      }
    }
    let correct = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
        $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1)
        correct = true
      }
    }
    if (correct) {
      $scope.correctLetters.push($scope.input.letter.toLowerCase())
    } else {
      $scope.guesses--
        $scope.incorrectLetters.push($scope.input.letter.toLowerCase())
    }
    $scope.input.letter = ""
    if ($scope.guesses == 0) {

      confirm('game over');
      // $timeout(function () {
      //   newGame();
      // }, 500);
    }
    if ($scope.displayWord.indexOf("*") == -1) {
      // Show score
      $timeout(function () {
        newGame();
      }, 500);
    }
  }


  newGame()
});