//Youtube API

// let player;
// let playerContainer = document.querySelector('.player')

// let eventsInit = () =>{
//   let start = document.querySelector('.player__start');

//   start.addEventListener('click', e =>{
//     e.preventDefault();

//     if(playerContainer.classList.contains('player__paused')){
//       // playerContainer.classList.remove('player__paused');

//       player.pauseVideo()
//     } else{
//       // playerContainer.classList.add('player__paused');
//       player.playVideo()
//     }
//   })
// };

//   const playerPlayback = document.querySelector('.player__playback');
//   playerPlayback.addEventListener('click', e =>{
//   const bar = e.currentTarget
//   const clickedPosition = e.layerX;

//   const newButtonPositionPercent = (clickedPosition / bar.width) * 100;
//   const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//   const playerPlaybackButton = document.querySelector('.player__playback-button')
//   playerPlaybackButton.style.left = `${newButtonPositionPercent}%`;
//    player.seekTo(newPlaybackPositionSec)
// })

//   const formatTime = timeSec =>{
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//   return num < 10 ? `0${num}` : num;
//   }
//   return `${minutes} : ${seconds}`;
// }

// const onPlayerReady = () =>{
//   let interval;

//   const durationSec = player.getDuration();
//   const estimate = document.querySelector('.player__duration-estimate')
//   estimate.innerText = formatTime(durationSec);
//   if(typeof interval !== 'undefined'){
//     clearInterval(interval)
//   }
//   interval = setInterval(() =>{
//     const completedSec = player.getCurrentTime()
//     const completedPercent = (completedSec / durationSec) * 100;

//     const playbackBtn = document.querySelector('.player__playback-button');
//     playbackBtn.style.left = `${completedPercent}%`
//     const completed = document.querySelector('.player__duration-completed');
//     completed.innerText = formatTime(completedSec)
//   },1000)
// }

// const onPlayerStateChange = (event)=>{

//   switch (event.data) {
//     case 1:
//       playerContainer.classList.add('.active')
//       playerContainer.classList.add('player__paused');
//       break;

//     case 2:
//       playerContainer.classList.remove('.active')
//       playerContainer.classList.remove('player__paused');
//       break;
//   }
// }

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '660',
//     videoId: '8iWrEdFIkWs',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//       controls:0,
//       disablekb:0,
//       showinfo:0,
//       rel:0,
//       autoplay:0,
//       modestbranding:0
//     }
//   });
// };
// eventsInit()

///HTML5 API

const playerContainer = document.querySelector(".player");
const player = document.querySelector(".player__video");
const playerWrapperBtn = document.querySelector(".player__play-icon");
const playerWrapper = document.querySelector(".player__wrapper");
const playerStart = document.querySelector(".player__start");
const playerPlaybackBar = document.querySelector(".player__playback");
const progressBar = document.querySelector(".player__playback-line");
const playerPlaybackBtn = document.querySelector(".player__playback-button");
const playerVolumeIcon = document.querySelector(".player__volume-icon");
const playerVolumeBar = document.querySelector(".player__volume");
const playerVolumeBtn = document.querySelector(".player__volume-button");
let startVolume = 0;
let currentVolume;

//Function start
const handleStart = () => {
  if (player.paused) {
    player.play();
    playerWrapperBtn.style.display = "none";
  } else {
    player.pause();
  }
};

playerStart.addEventListener("click", handleStart);
playerWrapper.addEventListener("click", handleStart);

//Ghange play button

player.onplay = () => {
  togglePlayer();
};

player.onpause = () => {
  togglePlayer("pause");
};

const togglePlayer = (action = "start") => {
  action === "start"
    ? playerContainer.classList.add("player-active")
    : playerContainer.classList.remove("player-active");
};

//function ghange volume

const toggleVolume = () => {
  if (player.volume === 0) {
    player.volume = currentVolume;
    playerVolumeBtn.style.left = `${currentVolume * 100}%`;
  } else {
    currentVolume = player.volume;
    player.volume = startVolume;
    playerVolumeBtn.style.left = `${startVolume}%`;
  }
};

const changeVolume = (e) => {
  const currentTarget = e.currentTarget;
  const left = currentTarget.getBoundingClientRect().left;
  const soundBarWidth = parseInt(getComputedStyle(currentTarget).width);
  const newPosition = e.pageX - left;
  const percentValue = (newPosition / soundBarWidth) * 100;
  if (percentValue < 100) {
    playerVolumeBtn.style.left = `${percentValue}%`;
    player.volume = percentValue / 100;
  }
};

playerVolumeIcon.addEventListener("click", toggleVolume);
playerVolumeBar.addEventListener("click", changeVolume);

const handleDuration = (e) => {
  const barWidth = parseInt(getComputedStyle(playerPlaybackBar).width);
  const btnWidth = parseInt(getComputedStyle(playerPlaybackBtn).width);
  const offsetX = e.offsetX;
  const newSize = offsetX + btnWidth / 2;
  const newTime = (newSize * player.duration) / barWidth;
  player.currentTime = newTime;
};

const updateTime = () => {
  let bar = player.currentTime / player.duration;
  progressBar.style.width = `${bar * 100}%`;
  playerPlaybackBtn.style.left = progressBar.style.width = `${bar * 100}%`;

  if (player.ended) {
    player.currentTime = 0;
  }
};

playerPlaybackBar.addEventListener("click", handleDuration);
player.addEventListener("timeupdate", updateTime);
