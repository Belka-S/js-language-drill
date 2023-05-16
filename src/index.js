import { debounce } from 'debounce';

import './sass/index.scss';
import './img/play.svg';
import './img/youtube.svg';

import { refs } from './js/markup/refs';
import { getSub, uploadLocal, uploadSub } from './js/Subtitles/subtitles';
import { cleanUrlLabel, fillSubLabel } from './js/markup/markup';
import { createPlayer } from './js/Player/player';

// Get Sub
refs.urlInput.addEventListener('input', debounce(getSub, 300));
refs.urlInput.addEventListener('click', cleanUrlLabel);

// Upload Sub
uploadLocal();
refs.subInput.addEventListener('input', uploadSub);
refs.subInput.addEventListener('focus', fillSubLabel);

// Play Video
refs.uploadForm.addEventListener('submit', createPlayer);

// New
import translate from 'translate';

translate.engine = 'google'; // "google", "yandex", "libre", "deepl"

const qwe = async asd => {
  const text = await translate(`${asd}`, 'uk');
  console.log(text);
};

qwe(
  `We're coming up to that time of year again when there are lots of events and celebrations that means lots of mingling, lots of chatting to people that you don't know and making small talk.`,
);
