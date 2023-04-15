import { debounce } from 'debounce';
import './sass/index.scss';
import './img/play.svg';
import './img/youtube.svg';
import { refs } from './js/refs';
import { getSub, uploadSub, cleanUrlLabel, fillSubLabel } from './js/subtitles';
import { createPlayer } from './js/player';

// Get Sub
refs.urlInput.addEventListener('input', debounce(getSub, 300));
refs.urlInput.addEventListener('click', cleanUrlLabel);

// Upload Sub
refs.subInput.addEventListener('input', uploadSub);
refs.subInput.addEventListener('focus', fillSubLabel);

// Play Video
refs.uploadForm.addEventListener('submit', createPlayer);

// new