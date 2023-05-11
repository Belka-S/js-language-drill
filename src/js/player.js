import YouTubePlayer from 'youtube-player';
import urlParser from 'js-video-url-parser';

import { refs } from './refs';

// YouTube Player

let player = null;

export function createPlayer(e) {
  e.preventDefault();

  addEventListener('keydown', playPause);

  const prevPlayer = document.querySelector('iframe#video-player');
  if (prevPlayer) {
    prevPlayer.insertAdjacentHTML('afterend', '<div id="video-player"></div>');
    prevPlayer.remove();
    removeEventListener('keydown', playPause);
  }

  const videoUrl = refs.urlInput.value;
  const params = urlParser.parse(videoUrl);

  player = YouTubePlayer('video-player', {
    playerVars: { modestbranding: 1, enablejsapi: 1 },
  });
  // player.setPlaybackRate(0.75);

  player.loadVideoById({
    videoId: params.id,
    startSeconds: JSON.parse(localStorage.getItem('TIME')),
  });

  // Event Listener
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

  // time
  // setInterval(() => player.getCurrentTime().then(resp => console.log(Math.round(resp))), 1000);
}

function playPause(e) {
  e.preventDefault();

  if (e.code === 'Space') {
    player.getPlayerState().then(resp => (resp === 1 ? player.pauseVideo() : player.playVideo()));
    player.getCurrentTime().then(resp => localStorage.setItem('TIME', JSON.stringify(resp)));
  }

  if (e.code === 'MetaLeft') {
    player.getCurrentTime().then(resp => player.seekTo(resp - 10));
  }
}
