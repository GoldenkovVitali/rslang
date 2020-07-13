import {
  addToUserWords, updateUserWords, updateMixUserWords, changeProgressBar,
} from '../../common/main.utils';
import getNotation from '../getNotation/getNotation';

const deleteWordHandler = () => {
  const deleteButtonsArr = Array.from(document.querySelectorAll('.main-delete-icon'));
  const lastSlide = Number(document.querySelector('#slides-count').textContent);
  const nextBTN = document.querySelector('#main-button-next');

  if (deleteButtonsArr.length > 0) {
    deleteButtonsArr.forEach((button) => {
      button.addEventListener('click', () => {
        const currentIterator = Number(button.getAttribute('id'));
        const card = document.querySelector(`#main-card-${currentIterator}`);
        const typeOfGame = localStorage.getItem('typeOfGame');

        let input;

        if (localStorage.getItem('userSetExplanation') === 'true') {
          input = document.querySelector(`#to-write-${currentIterator}`);
        } else {
          input = document.querySelector(`#to-write-example-${currentIterator}`);
        }

        const dataWord = {
          wordId: input.getAttribute('data'),
          word: input.placeholder,
          wordDifficulty: 'false',
          wordAudio: input.getAttribute('data-audio'),
          wordTranslate: card.getAttribute('data-translate'),
          wordImage: card.getAttribute('data-img'),
        };

        input.classList.add('deleted');
        if (typeOfGame === 'new') {
          addToUserWords(dataWord, 'true');
        }
        if (typeOfGame === 'repeat') {
          updateUserWords(dataWord, 'true');
        }
        if (typeOfGame === 'mix') {
          updateMixUserWords(dataWord, 'true');
        }

        if (currentIterator + 1 === lastSlide) {
          setTimeout(() => {
            nextBTN.classList.add('main-btn-disable');
            getNotation();
          }, 1000);
        } else {
          setTimeout(() => {
            nextBTN.click();
            changeProgressBar(currentIterator, lastSlide);
          }, 1000);
        }
      });
    });
  }
};
export default deleteWordHandler;
