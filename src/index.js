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
