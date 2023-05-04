import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './refs';

// Get Subtitles from Url
export function getSub(e) {
  localStorage.setItem('URL', JSON.stringify(e.target.value));
  const url = e.target.value.replace('https://', 'https://subtitle.to/');
  window.open(url);
  const labelEl = refs.urlInput.nextElementSibling;
  labelEl.textContent = e.target.value;
  e.target.blur();
}

// Upload from Local Storage
export function uploadLocal() {
  const URL = localStorage.getItem('URL');
  const SUB = localStorage.getItem('SUB');
  if (!URL || !SUB) return;

  refs.urlInput.value = JSON.parse(URL);
  refs.subInput.nextElementSibling.textContent = JSON.parse(SUB)[0];
  const subEl = `<p>${JSON.parse(SUB)[1]}</p>`;
  refs.subOutput.insertAdjacentHTML('beforeend', subEl);
}

// Upload Subtitles from File
export function uploadSub(e) {
  const reader = new FileReader();
  const fileObj = e.target.files[0];

  fileObj.size > 100000 ? wrongSubtitles() : reader.readAsText(fileObj, 'utf-8');

  reader.onload = () => {
    localStorage.setItem('SUB', JSON.stringify([e.target.files[0].name, reader.result]));
    let subEl = refs.subOutput.querySelector('p');

    if (subEl) {
      subEl.innerHTML = reader.result;
    } else {
      subEl = `<p>${reader.result}</p>`;
      refs.subOutput.insertAdjacentHTML('beforeend', subEl);
    }
  };
  reader.onerror = () => console.log(reader.error);

  refs.subInput.nextElementSibling.textContent = e.target.files[0].name;
}

// Nitifications
function wrongSubtitles() {
  const message = 'Ooops... Seems to wrong SUB!';
  const options = { position: 'center-center', timeout: 3000 };
  return Notify.failure(message, options);
}

// Subtitles Input Label
export function fillSubLabel(e) {
  const labelEl = e.target.nextElementSibling;
  labelEl.textContent = '.';
  for (let i = 0; i <= 10; i += 1) {
    const timer = setTimeout(() => {
      labelEl.insertAdjacentHTML('afterbegin', '.');
      i === 10 && clearInterval(timer);
    }, i * 150);
  }

  setTimeout(() => {
    labelEl.textContent = 'Upload SUB...';
    e.target.blur();
  }, 1550);
}

export const cleanUrlLabel = e => (e.target.value = '');

// function normalizeText(text) {}
