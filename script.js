let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 1;

function startStopwatch() {
  if (!timer) {
    timer = setInterval(updateStopwatch, 10); // Update every 10 milliseconds
    document.getElementById('startBtn').disabled = true;
  }
}

function stopStopwatch() {
  clearInterval(timer);
  timer = null;
  document.getElementById('startBtn').disabled = false;
}

function resetStopwatch() {
  stopStopwatch();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCount = 1;
  updateDisplay();
  clearLapList();
}

function recordLap() {
  const lapTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatMilliseconds(milliseconds);
  const lapList = document.getElementById('lapList');
  const lapItem = document.createElement('li');
  lapItem.textContent = 'Lap ' + lapCount + ': ' + lapTime;
  lapList.appendChild(lapItem);
  lapCount++;
}

function updateStopwatch() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
}

function formatTime(value) {
  return value < 10 ? '0' + value : value;
}

function formatMilliseconds(value) {
  if (value < 10) {
    return '00' + value;
  } else if (value < 100) {
    return '0' + value;
  } else {
    return value;
  }
}

function clearLapList() {
  const lapList = document.getElementById('lapList');
  lapList.innerHTML = '';
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  const themeToggle = document.getElementById('themeToggle');
  const isDarkMode = body.classList.contains('dark-theme');
  themeToggle.textContent = isDarkMode ? '🌝' : '🌞';
}
function updateDigitalClock() {
  const digitalClock = document.getElementById('digitalClock');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the digital clock every second
setInterval(updateDigitalClock, 1000);

// Initial update
updateDigitalClock();
