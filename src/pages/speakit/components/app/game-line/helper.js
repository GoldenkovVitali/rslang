import makePage from '../../makePage';

if ((window.location.href.split('#'))[1] === 'speakit') {
  makePage();
}

export const MAX_WORDS_COUNT = 10;

export const LANGUAGE = 'en-US';

export const CLASS_NAMES = {
  STAR: 'star',
  TIME: 'time',
  LINK: 'link',
  ACTIVE: 'speakit_active',
  DISABLED: 'disabled',
  BUTTON_ROUNDED: 'button-rounded',
  CARD: 'cards__item',
  HIDDEN: 'hidden',
  MAIN_LIST: 'cards__list list',
  OVERFLOW_HIDDEN: 'overflow-hidden',
  RESULT: {
    PAGE: 'result',
    CORRECT_CONTAINER: 'results__correct',
    ERRORS_CONTAINER: 'results__errors',
    CORRECT__LIST: 'correct__list list',
    ERRORS__LIST: 'errors__list list',
    CORRECT__ITEM: 'correct__item',
    ERRORS__ITEM: 'errors__item',
    CORRECT: 'correct',
    ERRORS: 'errors',
  },
  SLIDER: {
    ITEM: 'slider__item',
    ACTIVE: 'slider__active',
  },
};

export const EVENTS = {
  CLICK: 'click',
  CHANGE: 'change',
  INPUT: 'input',
  BEFORE_UNLOAD: 'beforeunload',
};

export const DATA_PATH = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/data/';

export const ELEMENTS = {
  CENTRALIZER: document.querySelector('.speakit-wrapper'),
  INTRODUCTION: document.querySelector('.speakit-first-wrapper'),
  SPINNER: document.querySelector('.speakit-starter'),
  CARDS_CONTAINER: document.querySelector('.cards__container'),
  PICTURE: document.querySelector('.main-card__picture'),
  TRANSLATION: document.querySelector('.main-card__translation'),
  SPEECH_INPUT: document.querySelector('.main-card__speech-input'),
  STATUS_BAR: document.querySelector('.status-bar'),
  RESULT: {
    TEMPLATE: document.body.querySelector('.slider__item-template'),
    CONTAINER: document.body.querySelector('.gallery'),
  },
  BUTTONS: {
    INTRODUCTION: document.querySelector('.speakit-first-wrapper__button'),
    NEW: document.querySelector('.game__button-new'),
    GAME: document.querySelector('.game__button-start'),
    STOP: document.querySelector('.game__button-stop'),
    RESULTS: document.querySelector('.game__button-results'),
    DIFFICULTIES: document.querySelector('.speakit-levels'),
    LEVEL: document.querySelector('.speakit_level'),
    playLernedWordButton: document.querySelector('.game__button-start-lerned'),
    playRandomWordButton: document.querySelector('.game__button-start-random'),
    RESULTS_NEW_GAME: document.querySelector('.game__button-results_new'),
    RESULTS_RESUME_GAME: document.querySelector('.game__button-results_return'),
  },
};
