const minutes = document.querySelector('.time-minutes');
const seconds = document.querySelector('.time-seconds');
const playPauseBtn = document.querySelector('.buttons__play-pause');
const resetBtn = document.querySelector('.buttons__reset');
const sessionBtns = document.querySelectorAll('.time-container__button');
const soundBtn = document.querySelector('.top-block__sound-icon');
let title = document.querySelector('.top-block__title');
let sessionLengthTime = document.getElementById('length-time');
let sessionBreakTime = document.getElementById('break-time');
let interval;
let breakInterval;
let breakActive = false;
let soundActive = true;
let timerActive = false;
let bgSound;

const changeTime = (event) => {
  if (event.target.id === 'lengthBtn-up') {
    sessionLengthTime.textContent = +sessionLengthTime.textContent + 5;
  } else if (event.target.id === 'lengthBtn-down') {
    sessionLengthTime.textContent = +sessionLengthTime.textContent - 5;
  } else if (event.target.id === 'breakBtn-up') {
    sessionBreakTime.textContent = +sessionBreakTime.textContent + 5;
  } else if (event.target.id === 'breakBtn-down') {
    sessionBreakTime.textContent = +sessionBreakTime.textContent - 5;
  }

  if (sessionLengthTime.textContent < 5) sessionLengthTime.textContent = 5;
  if (sessionBreakTime.textContent < 5) sessionBreakTime.textContent = 5;

  minutes.textContent = sessionLengthTime.textContent;
};

const setTime = () => {
  if (seconds.textContent == '00') {
    seconds.textContent = 60;
    seconds.textContent--;
    minutes.textContent--;
  } else {
    seconds.textContent--;
  }

  if (seconds.textContent < 10) {
    seconds.textContent = '0' + seconds.textContent;
  }
  if (minutes.textContent === '0' && seconds.textContent === '00') {
    if (!breakActive) {
      breakActive = true;
    } else {
      breakActive = false;
    }
    resetTimer();
    // play finish sound
    let sound = new Audio('./assets/mp3/clock-alarm-8761.mp3');
    sound.play();

    bgSound.pause();

    sessionBtns.forEach((button) => {
      button.addEventListener('click', changeTime);
    });
  }
  // background sound
  if (bgSound.ended) {
    bgSound.play();
  }
};

const startTimer = () => {
  if (playPauseBtn.children[0].classList.contains('fa-pause')) {
    clearInterval(interval);

    playPauseBtn.innerHTML =
      '<i class="fa-solid fa-play top-block__icon"></i>Play';
    soundActive = false;
    timerActive = false;
  } else {
    soundActive = true;
    timerActive = true;
    interval = setInterval(setTime, 10);
    playPauseBtn.innerHTML =
      '<i class="fa-solid fa-pause top-block__icon"></i> Stop';

    // play start sound
    let sound = new Audio('./assets/mp3/clock-45347.mp3');
    sound.play();

    sessionBtns.forEach((button) => {
      button.removeEventListener('click', changeTime);
    });
  }
  // play background sound
  backgroundSound(soundActive);
};

const resetTimer = () => {
  minutes.textContent = sessionLengthTime.textContent;
  seconds.textContent = '00';
  playPauseBtn.innerHTML =
    '<i class="fa-solid fa-play top-block__icon"></i>Play';
  clearInterval(interval);
  if (breakActive) {
    title.textContent = 'Break';
    minutes.textContent = sessionBreakTime.textContent;
  } else {
    title.textContent = 'Session';
    minutes.textContent = sessionLengthTime.textContent;
  }
};

const reset = () => {
  breakActive = false;
  soundActive = false;
  timerActive = false;
  resetTimer();
  backgroundSound(soundActive);
};

const backgroundSound = (isActive) => {
  if (isActive && timerActive) {
    bgSound = new Audio('./assets/mp3/soft-rain-ambient-111154.mp3');
    bgSound.play();
  } else if (bgSound === undefined) {
    isActive = false;
  } else {
    bgSound.pause();
  }
};

const muteBgSound = () => {
  soundActive = !soundActive;
  if (!soundActive) {
    soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
  if (bgSound === undefined) {
    return;
  }
  backgroundSound(soundActive);
};

sessionBtns.forEach((button) => {
  button.addEventListener('click', changeTime);
});

playPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', reset);
soundBtn.addEventListener('click', muteBgSound);
