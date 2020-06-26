import { store } from '../../../../redux/store';
import helper from '../../common/audiocall.helper';
import statisticLine from '../statistic-line';

const statisticScreenComponent = (gameNumber) => {
  const state = store.getState();
  const { correct, mistake } = state.audioCallReducer.stat;

  const { cor, miss } = helper.filterStatistic(correct, mistake, gameNumber);

  const corMurkUp = cor.map((item) => statisticLine(item));
  const misMurkUp = miss.map((item) => statisticLine(item));

  const misUl = document.createElement('ul');
  const corUl = document.createElement('ul');
  misMurkUp.forEach((item) => misUl.append(item));
  corMurkUp.forEach((elem) => corUl.append(elem));

  const template = '<h3>Container Title</h3>';
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'statistic');
  startScreen.innerHTML = template;
  startScreen.className = 'container screen statistic';

  const containerInner = document.createElement('div');
  containerInner.className = 'container-inner';

  const containerInnerLeft = document.createElement('div');
  containerInnerLeft.className = 'inner-left';

  const innerBox = document.createElement('div');
  innerBox.innerHTML = '<h2>Correct</h2>';
  innerBox.className = 'box';

  if (cor.length) {
    innerBox.append(corUl);
  } else {
    const noCor = document.createElement('ul');
    noCor.innerHTML = '<li>Bad! No Correct answers</li>';
    innerBox.append(noCor);
  }

  containerInnerLeft.append(innerBox);
  containerInner.append(containerInnerLeft);

  const containerInnerRight = document.createElement('div');
  containerInnerRight.className = 'inner-right';

  const innerBoxRight = document.createElement('div');
  innerBoxRight.innerHTML = '<h2>Mistake</h2>';
  innerBoxRight.className = 'box';

  if (miss.length) {
    innerBoxRight.append(misUl);
  } else {
    const noMis = document.createElement('ul');
    noMis.innerHTML = '<li>Great! No Mistakes</li>';
    innerBoxRight.append(noMis);
  }

  containerInnerRight.append(innerBoxRight);
  containerInner.append(containerInnerRight);
  startScreen.append(containerInner);

  const button = document.createElement('button');
  button.innerText = 'OK';
  button.className = 'restart  btn btn-success';
  startScreen.append(button);

  return startScreen;
};

export default statisticScreenComponent;