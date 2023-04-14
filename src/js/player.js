import YouTubePlayer from 'youtube-player';
import urlParser from 'js-video-url-parser';

import { refs } from './refs';

export function createPlayer(e) {
  e.preventDefault();

  const prevPlayer = document.querySelector('iframe#video-player');
  if (prevPlayer) {
    prevPlayer.insertAdjacentHTML('afterend', '<div id="video-player"></div>');
    prevPlayer.remove();
  }

  const videoUrl = refs.urlInput.value;
  const params = urlParser.parse(videoUrl);

  const player = YouTubePlayer('video-player', {
    playerVars: { modestbranding: 1, enablejsapi: 1 },
  });
  player.setPlaybackRate(0.75);
  player.loadVideoById(params.id);
  // EventListener
  const listener = player.on('stateChange', e => {
    if (e.target.videoTitle && e.data === 1) {
      let titleEl = refs.subOutput.querySelector('h2');

      if (titleEl) {
        titleEl.innerHTML = e.target.videoTitle;
      } else {
        titleEl = `<h2>${e.target.videoTitle}</h2>`;
        refs.subOutput.insertAdjacentHTML('afterbegin', titleEl);
      }

      player.off(listener);
    }
  });
}
