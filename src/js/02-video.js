import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(STORAGE_KEY)
  ? localStorage.getItem(STORAGE_KEY)
  : 0;

// player.on('play', function () {
//   console.log('played the video!');
// });

const saveTimeVideo = event => {
  localStorage.setItem(STORAGE_KEY, event.seconds);
};

player.setCurrentTime(currentTime);

player.on('timeupdate', throttle(saveTimeVideo, 1000));
