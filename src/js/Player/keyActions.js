import { player, onPlay, intervalId } from './player';
import { refs } from '../markup/refs';

// On Key Action
export function onKeyAction(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    // Play/Pause
    player.getPlayerState().then(resp => (resp === 1 ? player.pauseVideo() : player.playVideo()));
    // Set / Remove Interval
    player.getPlayerState().then(resp => (resp === 1 ? clearInterval(intervalId) : onPlay()));
    // Show/Hide translationEl
    player
      .getPlayerState()
      .then(resp =>
        resp === 1
          ? refs.translation.classList.remove('is-hidden')
          : refs.translation.classList.add('is-hidden'),
      );
  }
  // Rewind Back
  if (e.code === 'ArrowLeft') {
    e.preventDefault();
    player.getCurrentTime().then(resp => player.seekTo(resp - 10));
  }
  // Rewind Forward
  if (e.code === 'ArrowRight') {
    e.preventDefault();
    player.getCurrentTime().then(resp => player.seekTo(resp + 10));
  }
  // Scroll to the Beginning
  if (e.code === 'ArrowUp') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Scroll PageDown
  if (e.code === 'ArrowDown') {
    e.preventDefault();
    window.scrollTo({ top: window.pageYOffset + window.innerHeight, behavior: 'smooth' });
  }
}
