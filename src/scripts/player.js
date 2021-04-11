const btnPlay = document.querySelector(".btn-play");
const videoPlayer = document.querySelector(".video__player");
const btnPLayIcon = document.querySelector(".btn-play__icon");
const btnPauseIcon = document.querySelector(".btn-pause__icon");
const btnPlayBig = document.querySelector(".btn-play--big");
const playback = document.querySelector(".video__cursor");
const playerPlaybackBtn = document.querySelector(".video__cursor-btn");
const playerVolumeIcon = document.querySelector(".btn-volume__icon");
const playerVolumeBar = document.querySelector(".video__volume");
const playerVolumeBtn = document.querySelector(".video__volume-button");
const lineFirst = document.querySelector(".btn-volume__line-first");
const lineSecond = document.querySelector(".btn-volume__line-second");
const toggleVolume = document.querySelector(".btn-volume");

let startVolume = 0;
// Плей-Пауза

const togglePlay = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    btnPLayIcon.style.display = "none";
    btnPauseIcon.style.display = "block";
    btnPlayBig.style.display = "none";
  } else {
    videoPlayer.pause();
    btnPLayIcon.style.display = "block";
    btnPauseIcon.style.display = "none";
    btnPlayBig.style.display = "block";
  }
};
videoPlayer.addEventListener("click", togglePlay);
btnPlay.addEventListener("click", togglePlay);
btnPlayBig.addEventListener("click", togglePlay);

// Управление воспромзведением видео
const handleDuration = (e) => {
  const barWidth = parseInt(getComputedStyle(playback).width);
  const btnWidth = parseInt(getComputedStyle(playerPlaybackBtn).width);
  const offsetX = e.offsetX;
  const newSize = offsetX + btnWidth / 20;
  const newTime = (newSize * videoPlayer.duration) / barWidth;
  videoPlayer.currentTime = newTime;
};
playback.addEventListener("click", handleDuration);

videoPlayer.ontimeupdate = function () {
  const durationSec = videoPlayer.duration;
  const completedSec = videoPlayer.currentTime;
  const completedPercent = (completedSec / durationSec) * 100;
  playerPlaybackBtn.style.left = `${completedPercent}%`;
  if (videoPlayer.ended) {
    videoPlayer.currentTime = 0;
    btnPLayIcon.style.display = "block";
    btnPauseIcon.style.display = "none";
  }
};

toggleVolume.addEventListener("click", function () {
  if (videoPlayer.volume === 0) {
    videoPlayer.volume = currentVolume;
    playerVolumeBtn.style.left = `${currentVolume * 100}%`;

    lineFirst.style.display = "none";
    lineSecond.style.display = "none";
  } else {
    currentVolume = videoPlayer.volume;
    videoPlayer.volume = startVolume;
    playerVolumeBtn.style.left = `${startVolume}%`;
    lineFirst.style.display = "block";
    lineSecond.style.display = "block";
  }
});

const changeVolume = (e) => {
  const currentTarget = e.currentTarget;
  const left = currentTarget.getBoundingClientRect().left;
  const soundBarWidth = parseInt(getComputedStyle(currentTarget).width);
  const newPosition = e.pageX - left;
  const percentValue = (newPosition / soundBarWidth) * 100;
  if (percentValue < 100) {
    playerVolumeBtn.style.left = `${percentValue}%`;
    videoPlayer.volume = percentValue / 100;
  }
  $(".btn-volume__line").css("display", "none");
  lineFirst.style.display = "none";
  lineSecond.style.display = "none";
};

playerVolumeIcon.addEventListener("click", toggleVolume);
playerVolumeBar.addEventListener("click", changeVolume);
