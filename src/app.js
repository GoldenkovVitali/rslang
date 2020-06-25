import main from './pages/main/main.app';
import audiocall from './pages/audiocall/audiocall.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';
import sprint from './pages/sprint/sprint.app';

import router from './router/Router';

window.onload = () => {
  main.init();
  audiocall.init();
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  sprint.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
