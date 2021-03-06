import App from './application';

const INIT_TIME = 30;
const INIT_LIVES = 3;

const resetGame = (gameState) => {
  if (gameState) {
    gameState.time = INIT_TIME;
    gameState.lives = INIT_LIVES;
    gameState.answers = Array(10).fill(`unknown`);
    gameState.questionNumber = 0;
    gameState.win = false;
  }
  App.showGreeting();
};

const getAnswerRate = (answerTime) => {
  let answerRate;
  if (answerTime > 20) {
    answerRate = `fast`;
  } else if (answerTime >= 10) {
    answerRate = `normal`;
  } else {
    answerRate = `slow`;
  }
  return answerRate;
};

const recordAnswer = (isCorrect, answerRate, gameState) => {
  gameState.answers[gameState.questionNumber++] = {isCorrect, answerRate};
  if (!isCorrect) {
    gameState.lives--;
  }
};

const checkContinue = (gameState) => {
  if (gameState.lives < 0) {
    gameState.win = false;
    App.showStats(gameState);
  } else if (gameState.questionNumber === 10) {
    gameState.win = true;
    App.showStats(gameState);
  } else {
    gameState.time = INIT_TIME;

    App.showGame(gameState);
  }
};

export {resetGame, getAnswerRate, recordAnswer, checkContinue};
