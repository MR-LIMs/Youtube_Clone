const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');

const volumeBar = document.querySelector('.volume-bar');

function handlePlayClick() {
  if (videoPlayer.played) {
    videoPlayer.pause();
    playBtn.innerHTML = "<i class='fas fa-play'></i>";
  } else {
    videoPlayer.play();
    playBtn.innerHTML = "<i class='fas fa-pause'></i>";
  }
}

function handleEnded() {
  playBtn.innerHTML = "<i class='fas fa-reply-all'></i>";
}

function handleVolumeClick() {
  if (videoPlayer.muted === true) {
    videoPlayer.muted = false;
    if (videoPlayer.volume < 0.5 && volumeBtn.firstElementChild.className !== 'fas fa-volume-down') {
      volumeBtn.firstElementChild.className = 'fas fa-volume-down';
    } else if (videoPlayer.volume >= 0.5 && volumeBtn.firstElementChild.className !== 'fas fa-volume-up') {
      volumeBtn.firstElementChild.className = 'fas fa-volume-up';
    }
    volumeBar.value = videoPlayer.volume;
    console.log('not mute');
  } else {
    videoPlayer.muted = true;
    volumeBtn.firstElementChild.className = 'fas fa-volume-mute';
    volumeBar.value = 0;
    console.log('mute');
  }
}

function exitFullScreen() {
  document.exitFullscreen();
  fullScrnBtn.innerHTML = "<i class='fas fa-expand'></i>";
  fullScrnBtn.removeEventListener('click', exitFullScreen);
  fullScrnBtn.addEventListener('click', goFullScreen);
}

function goFullScreen() {
  // prefix : moz, webkit, ie, ms ...
  videoContainer.requestFullscreen();
  fullScrnBtn.innerHTML = "<i class='fas fa-compress'></i>";
  fullScrnBtn.removeEventListener('click', goFullScreen);
  fullScrnBtn.addEventListener('click', exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = Math.floor(secondsNumber - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  const currentTimeString = formatDate(videoPlayer.currentTime);
  currentTime.innerHTML = currentTimeString;
}

function setCurrentTime() {
  let interval = setInterval(getCurrentTime, 1000);
  if (videoPlayer.currentTime === videoPlayer.duration) {
    clearInterval(interval);
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  videoPlayer.addEventListener('play', setCurrentTime);
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  // const value = event.target.value
  videoPlayer.volume = value;
  if (videoPlayer.volume < 0.5 && volumeBtn.firstElementChild.className !== 'fas fa-volume-down') {
    // const volumeIcon = document.createElement('i'); => 생성
    // volumeIcon.className = 'fas fa-volume-down'; => 속성 설정
    // volumeBtn.replaceChild(volumeIcon, volumeBtn.firstElementChild); => 노드 찾아 바꾸기
    // volumeBtn.firstElementChild.addEventListener('click', handleVolumeClick);
    volumeBtn.firstElementChild.className = 'fas fa-volume-down';
  } else if (videoPlayer.volume >= 0.5 && volumeBtn.firstElementChild.className !== 'fas fa-volume-up') {
    volumeBtn.firstElementChild.className = 'fas fa-volume-up';
  }
}

function init() {
  playBtn.addEventListener('click', handlePlayClick);
  videoPlayer.addEventListener('click', handlePlayClick);
  videoPlayer.addEventListener('ended', handleEnded);
  volumeBtn.firstElementChild.addEventListener('click', handleVolumeClick);
  fullScrnBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('loadedmetadata', setTotalTime);

  volumeBar.addEventListener('input', handleDrag);
}

if (videoContainer) {
  init();
}

// 공부를 할 때나 코드 변경을 할 때,
// 무엇을 할지에 대해 정확히 되새기고,
// 어떻게 하면 좋을지 먼저 계획을 세우고,
// 변경사항을 다시 한번 되새긴다.
