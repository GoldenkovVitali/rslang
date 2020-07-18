import { getDOMElement } from '../../common/main.helper';
import getCard from './getCard';

const slide = (word, i) => {
  const swiperSlide = getDOMElement('div', 'main-swiper swiper-slide');
  const swiperContainer = getDOMElement('div', 'main-swiper container-fluid');
  const swiperRow = getDOMElement('div', 'main-swiper row justify-content-center');
  const swiperCol = getDOMElement('div', 'col-11 col-sm-10 col-md-10 col-lg-9 main-swiper-col');

  const card = getCard(word, i);

  swiperCol.append(card);

  swiperRow.append(swiperCol);
  swiperContainer.append(swiperRow);
  swiperSlide.append(swiperContainer);

  return swiperSlide;
};

export default slide;
