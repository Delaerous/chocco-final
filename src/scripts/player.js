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
