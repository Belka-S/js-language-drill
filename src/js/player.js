import YouTubePlayer from 'youtube-player';
import urlParser from 'js-video-url-parser';
import TimeFormat from 'hh-mm-ss';

import { refs } from './refs';

// YouTube Player

let player = null;
let intervalId = null;
let currentTime = null;

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

  //SetInterval  -->  // intervalId = setInterval(() => player.getCurrentTime().then(resp => console.log(TimeFormat.fromS(Math.round(resp), 'hh:mm:ss'))), 1000,);
  intervalId = setInterval(async () => {
    currentTime = TimeFormat.fromS(Math.round(await player.getCurrentTime()), 'hh:mm:ss');
    console.log(currentTime); // Set class on SUB
  }, 1000);
}

async function playPause(e) {
  e.preventDefault();

  if (e.code === 'Space') {
    // Play / Pause
    player.getPlayerState().then(resp => (resp === 1 ? player.pauseVideo() : player.playVideo()));
    // Add to LS Current Time
    player.getCurrentTime().then(resp => localStorage.setItem('TIME', JSON.stringify(resp)));
    // Set / Remove Interval
    const resp = await player.getPlayerState();
    if (resp === 1) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(async () => {
        currentTime = TimeFormat.fromS(Math.round(await player.getCurrentTime()), 'hh:mm:ss');
        console.log(currentTime); // set class on SUB
      }, 1000);
    }
  }

  if (e.code === 'MetaLeft') {
    player.getCurrentTime().then(resp => player.seekTo(resp - 10));
  }
}
