import { store } from '../../../../redux/store';
import helper from '../../common/ourgame.helper';
import gameLine from '../geme-line/game-line';

const gameScreenComponent = () => {
  const state = store.getState();
  const { setQuestionsGame } = state.ourGameReducer;
  const answersMurkUp = setQuestionsGame.map((item) => gameLine(item));
  const questionMurkUp = setQuestionsGame.map((item) => gameLine(item, 'question'));
  const questionUl = document.createElement('ul');
  const answersUl = document.createElement('ul');

  helper.shuffle(answersMurkUp).forEach((item) => answersUl.append(item));
  questionMurkUp.forEach((elem) => questionUl.append(elem));

  const title = '<h3 id="info-word">Соотнесите слова с переводом</h3>';
  const gameScreen = document.createElement('div');
  gameScreen.setAttribute('id', 'our-game-play-screen');
  gameScreen.innerHTML = title;
  gameScreen.className = 'container screen our-game';

  const containerInner = document.createElement('div');
  containerInner.className = 'container-inner';

  const containerInnerLeft = document.createElement('div');
  containerInnerLeft.className = 'inner-left';

  const innerBox = document.createElement('div');
  innerBox.innerHTML = '<h2>Слова</h2>';
  innerBox.className = 'box';

  if (setQuestionsGame.length) {
    innerBox.append(questionUl);
  } else {
    const noCor = document.createElement('ul');
    noCor.innerHTML = '<li>Нет слов</li>';
    innerBox.append(noCor);
  }

  containerInnerLeft.append(innerBox);
  containerInner.append(containerInnerLeft);

  const containerInnerRight = document.createElement('div');
  containerInnerRight.className = 'inner-right';

  const innerBoxRight = document.createElement('div');
  innerBoxRight.innerHTML = '<h2>Перевод</h2>';
  innerBoxRight.className = 'box';

  if (setQuestionsGame.length) {
    innerBoxRight.append(answersUl);
  } else {
    const noMis = document.createElement('ul');
    noMis.innerHTML = '<li>Нет слов</li>';
    innerBoxRight.append(noMis);
  }

  const button = document.createElement('button');
  button.innerText = 'Остановить игру';
  button.className = 'restart  btn btn-success';

  containerInnerRight.append(innerBoxRight);
  containerInner.append(containerInnerRight);

  gameScreen.append(containerInner);
  containerInner.after(button);

  return gameScreen;
};

export default gameScreenComponent;
