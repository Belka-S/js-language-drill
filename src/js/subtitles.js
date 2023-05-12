import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './refs';

// Get Subtitles from Url
export function getSub(e) {
  localStorage.setItem('TIME', 0);
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
  refs.subOutput.innerHTML = '';

  const reader = new FileReader();
  const fileObj = e.target.files[0];
  fileObj.size > 100000 ? wrongSubtitles() : reader.readAsText(fileObj, 'utf-8');

  // Uploading sub.TXT
  if (fileObj.type === 'text/plain') {
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

  // Uploading sub.SRT
  if (fileObj.type !== 'text/plain') {
    reader.onload = () => {
      const srtArray = normalizeSub(reader.result);
      const srtString = srtArray.reduce(
        (acc, el) => acc + `<div class='time'>${el.time}</div><p class='srt'>${el.sub}</p>`,
        '',
      );

      localStorage.setItem('SUB', JSON.stringify([e.target.files[0].name, srtString]));
      let subEl = refs.subOutput.querySelector('div');

      if (subEl) {
        subEl.innerHTML = srtString;
      } else {
        subEl = `<div>${srtString}</div>`;
        refs.subOutput.insertAdjacentHTML('beforeend', subEl);
      }
    };
    reader.onerror = () => console.log(reader.error);

    refs.subInput.nextElementSibling.textContent = e.target.files[0].name;
  }
}

// Nitification Sub
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

// Normalize SUB
function normalizeSub(sub) {
  const splitReplace = sub.split('\n\n').map((el, i) => el.replace(`${i + 1}\n`, ''));
  const removeEndTime = splitReplace.map(el => el.replace(el.substring(8, 30), ' '));
  const objectArray = removeEndTime.map(el => ({ time: el.substring(0, 8), sub: el.substring(9) }));

  const joinSentences = [];
  let time = '';
  let sentence = '';

  for (let i = 0; i < objectArray.length; i += 1) {
    const elTime = objectArray[i].time;
    const elSub = objectArray[i].sub;
    time += elTime;
    sentence += ' ' + elSub;

    if (
      (elSub.endsWith('.') || elSub.endsWith('?') || elSub.endsWith('!')) &&
      sentence.length > 20
    ) {
      joinSentences.push({ time, sentence });
      time = '';
      sentence = '';
    }
  }

  const normSUB = joinSentences.map(el => ({ time: el.time.substring(0, 8), sub: el.sentence }));

  return normSUB;
}
