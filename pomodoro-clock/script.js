const minutes = document.querySelector('.time-minutes');
const seconds = document.querySelector('.time-seconds');
const playPauseBtn = document.querySelector('.buttons__play-pause');
const resetBtn = document.querySelector('.buttons__reset');
const sessionBtns = document.querySelectorAll('.time-container__button');
let sessionLengthTime = document.getElementById('length-time');
let sessionBreakTime = document.getElementById('break-time');
let interval;

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
    resetTimer();
  }
};

const startTimer = () => {
  if (playPauseBtn.children[0].classList.contains('fa-pause')) {
    clearInterval(interval);
    playPauseBtn.innerHTML =
      '<i class="fa-solid fa-play top-block__icon"></i>Play';
  } else {
    interval = setInterval(setTime, 100);
    playPauseBtn.innerHTML =
      '<i class="fa-solid fa-pause top-block__icon"></i> Stop';
  }
};

const resetTimer = () => {
  minutes.textContent = sessionLengthTime.textContent;
  seconds.textContent = '00';
  playPauseBtn.innerHTML =
    '<i class="fa-solid fa-play top-block__icon"></i>Play';
  clearInterval(interval);
};

sessionBtns.forEach((button) => {
  button.addEventListener('click', changeTime);
});

playPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
