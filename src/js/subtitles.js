import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './refs';

export function getSub(e) {
  const url = e.target.value.replace('https://', 'https://subtitle.to/');
  window.open(url);
  const labelEl = refs.urlInput.nextElementSibling;
  labelEl.textContent = e.target.value;
  e.target.blur();
}

export function uploadSub(e) {
  const fileObj = e.target.files[0];
  if (fileObj.size > 100000) {
    const message = 'Ooops... Seems to wrong SUB!';
    const options = { position: 'center-center', timeout: 3000 };
    Notify.failure(message, options);
    return;
  }

  const reader = new FileReader();
  reader.readAsText(fileObj, 'utf-8');

  reader.onload = () => {
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

export const cleanUrlLabel = e => (e.target.value = '');

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

// function normalizeText(text) {}
