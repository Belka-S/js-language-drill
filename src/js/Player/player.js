import YouTubePlayer from 'youtube-player';
import urlParser from 'js-video-url-parser';
import TimeFormat from 'hh-mm-ss';

import { refs } from '../markup/refs';
import { onKeyAction } from './keyActions';

// Create YouTube Player
let player = null;

export function createPlayer(e) {
  e.preventDefault();

  addEventListener('keydown', onKeyAction);

  const prevPlayer = document.querySelector('iframe#video-player');
  if (prevPlayer) {
    prevPlayer.insertAdjacentHTML('afterend', '<div id="video-player"></div>');
    prevPlayer.remove();
    removeEventListener('keydown', onKeyAction);
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
    // Render Video Title
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
  // Find Time-Element
  onPlay();
}

// Play Video
async function onPlay() {
  const timeElArray = Array.from(document.querySelectorAll('.time'));

  const intervalId = setInterval(async () => {
    const currentTime = TimeFormat.fromS(Math.round(await player.getCurrentTime()), 'hh:mm:ss');
    // Find Time-Element
    const timeEl = timeElArray.filter(el => el.textContent === currentTime);
    if (timeEl[0]?.textContent === currentTime) {
      timeElArray.forEach(el => el.previousElementSibling.classList.remove('active'));
      timeElArray.forEach(el => el.previousElementSibling.classList.remove('current'));
      timeEl[0].previousElementSibling.classList.add('active');
      timeEl[0].nextElementSibling.classList.add('current');
      const timeElPositionY = window.pageYOffset + timeEl[0].getBoundingClientRect().y;
      window.scrollTo({ top: timeElPositionY - window.innerHeight * 0.4, behavior: 'smooth' });
    }
    // Add to LS Current Time
    player.getCurrentTime().then(resp => localStorage.setItem('TIME', JSON.stringify(resp)));
    // Stop in the End
    const resp = await player.getPlayerState();
    if (resp === 0) {
      clearInterval(intervalId);
      localStorage.setItem('TIME', 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 1000);
}

// const API_KEY = 'AIzaSyBdzGNN7qo1CLDjDUXKYiZZXWqJ21YcmxA';
