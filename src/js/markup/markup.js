// Video URL Input Label
export const cleanUrlLabel = e => (e.target.value = '');

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
