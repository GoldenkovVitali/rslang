import Toastify from 'toastify-js';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import { GAME_BREAKPOINT } from '../../ourgame/common/ourgame.constants';
import mockData from './mock-data';

const helper = {
  render: (elementDOM, renderElement, renderPlace, removeItem) => {
    if (removeItem && document.querySelector(removeItem)) {
      document.querySelector(removeItem).remove();
    }
    switch (renderPlace) {
      case 'prepend':
        document.querySelector(elementDOM).prepend(renderElement);
        break;
      case 'before':
        document.querySelector(elementDOM).before(renderElement);
        break;
      case 'after':
        document.querySelector(elementDOM).after(renderElement);
        break;
      case 'append':
        document.querySelector(elementDOM).append(renderElement);
        break;
      default:
        document.querySelector(elementDOM).append(renderElement);
        break;
    }
  },

  getAnswers: (data) => {
    const newData = data.map((item, index, array) => {
      const newArr = array.length < 5
        ? [...array, ...mockData].filter((elem) => elem.id !== item.id)
        : array.filter((elem) => elem.id !== item.id);
      const answers = [];
      answers.push(item);
      for (let i = 4; i !== 0; i--) {
        answers.push(helper.shuffle(newArr).pop());
      }
      const shuffleAnswers = helper.shuffle(answers);
      return {
        ...item,
        answer: shuffleAnswers,
      };
    });
    return newData;
  },

  randomInteger: (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },

  shuffle: (array) => array.sort(() => Math.random() - 0.5),

  isLastQuestion: (num, points) => points.some((elem) => elem === num),

  filterStatistic: (correct, mistake, gameNumber, kind) => {
    const correctAnswers = correct.filter((elem) => elem.kind === kind)
      .filter((item) => item.gameNum === gameNumber);

    const mistakeAnswers = mistake.filter((elem) => elem.kind === kind)
      .filter((item) => item.gameNum === gameNumber);

    const sortCorrect = correctAnswers.filter((item) => mistakeAnswers
      .every((elem) => item.id !== elem.id));

    const uniqueMistake = Array.from(new Set(mistakeAnswers.map((a) => a.id)))
      .map((id) => mistakeAnswers.find((a) => a.id === id));

    const uniqueCorrect = Array.from(new Set(sortCorrect.map((a) => a.id)))
      .map((id) => sortCorrect.find((a) => a.id === id));

    return {
      cor: uniqueCorrect,
      miss: uniqueMistake,
    };
  },

  setOpacity: (value) => {
    const body = document.querySelector('body');
    switch (value) {
      case 0:
      case 10:
        body.className = 'audio-call-body op-1';
        break;
      case 1:
      case 11:
        body.className = 'audio-call-body op-2';
        break;
      case 2:
      case 12:
        body.className = 'audio-call-body op-3';
        break;
      case 3:
      case 13:
        body.className = 'audio-call-body op-4';
        break;
      case 4:
      case 14:
        body.className = 'audio-call-body op-5';
        break;
      case 5:
      case 15:
        body.className = 'audio-call-body op-6';
        break;
      case 6:
      case 16:
        body.className = 'audio-call-body op-7';
        break;
      case 7:
      case 17:
        body.className = 'audio-call-body op-8';
        break;
      case 8:
      case 18:
        body.className = 'audio-call-body op-9';
        break;
      case 9:
      case 19:
        body.className = 'audio-call-body op-9';
        break;
      default:
        body.className = 'audio-call-body';
        break;
    }
  },
  rangeSlider: () => {
    const sliderInput = document.querySelectorAll('.slider__input');
    for (let i = 0; sliderInput.length > i; i++) {
      sliderInput[i].addEventListener('input', function () {
        const valueContainer = this.parentNode.parentNode.querySelector('.slider__value');
        const sliderValue = this.value;
        this.setAttribute('value', sliderValue);
        const maxVal = this.getAttribute('max');
        const posWidth = this.value / maxVal;
        this.parentNode.querySelector('.slider__positive').style.width = `${posWidth * 100}%`;
        valueContainer.innerHTML = +sliderValue + 1;
      });
    }
  },

  message: (msg, type) => {
    Toastify({
      text: msg,
      backgroundColor: type === 'error'
        ? 'linear-gradient(to right, #CD5C5C, #F08080)'
        : 'linear-gradient(to right, #21BF73, #5DBF2D)',
      className: 'info',
      position: 'right',
      gravity: 'top',
    }).showToast();
  },

  getUserData: () => ({
    id: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
  }),

  removeWords: (arr, userId, token) => {
    arr.forEach(async (item) => {
      await learnWordsAPIService.deleteUserWord(userId, item.id, token);
    });
  },

  showStartButton: async (value) => {
    const remove = (num) => {
      if (num !== 0) {
        const startButton = document.getElementById('start-play');
        if (startButton && startButton.classList.contains('hide')) {
          startButton.classList.remove('hide');
        }
      } else {
        const emptyWords = document.getElementById('empty-words');
        if (emptyWords && emptyWords.classList.contains('hide')) {
          emptyWords.classList.remove('hide');
        }
      }
    };

    if (value && value.length) {
      remove(value.length);
    } else {
      const { id, token } = helper.getUserData();
      const userWords = await learnWordsAPIService.getAllUserWords(id, token);
      remove(userWords.length);
    }
  },

  isBreakpoint: (num) => GAME_BREAKPOINT.includes(num),

  setRangeSlider: (roundAndLevel) => {
    const { flag, roundGame, level } = roundAndLevel;
    const group = document.getElementById('group');
    const levelGame = document.getElementById('level');
    const lableGroup = document.querySelector('.round');
    const lableLevel = document.querySelector('.level');
    if (+roundGame === 29 && flag === true) {
      group.setAttribute('value', '0');
      const maxVal = group.getAttribute('max');
      const posWidth = group.value / maxVal;
      group.parentNode.querySelector('.slider__positive').style.width = `${posWidth * 100}%`;
      lableGroup.innerHTML = '1';

      levelGame.setAttribute('value', +level + 1);
      const maxValue = levelGame.getAttribute('max');
      const posWidthValue = levelGame.value / maxValue;
      levelGame.parentNode.querySelector('.slider__positive').style.width = `${posWidthValue * 100}%`;
      lableLevel.innerHTML = `${+level === 0 ? 2 : +level + 1}`;
      helper.message('Уровень изменен');
    } else if (flag === true && +roundGame !== 29) {
      group.setAttribute('value', `${+roundGame + 1}`);
      const maxVal = group.getAttribute('max');
      const posWidth = group.value / maxVal;
      group.parentNode.querySelector('.slider__positive').style.width = `${posWidth * 100}%`;
      lableGroup.innerHTML = `${+group.getAttribute('value') + 1}`;

      levelGame.setAttribute('value', level);
      const maxValue = levelGame.getAttribute('max');
      const posWidthValue = levelGame.value / maxValue;
      levelGame.parentNode.querySelector('.slider__positive').style.width = `${posWidthValue * 100}%`;
      lableLevel.innerHTML = `${+level + 1}`;
      helper.message('Раунд изменен');
    } else {
      group.setAttribute('value', `${+roundGame}`);
      const maxVal = group.getAttribute('max');
      const posWidth = group.value / maxVal;
      group.parentNode.querySelector('.slider__positive').style.width = `${posWidth * 100}%`;
      lableGroup.innerHTML = `${+roundGame === 0 ? 1 : +roundGame + 1}`;

      levelGame.setAttribute('value', `${+level}`);
      const maxValue = levelGame.getAttribute('max');
      const posWidthValue = levelGame.value / maxValue;
      levelGame.parentNode.querySelector('.slider__positive').style.width = `${posWidthValue * 100}%`;
      lableLevel.innerHTML = `${+level + 1}`;
    }
  },
};

export default helper;
