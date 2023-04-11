const msgEl = document.getElementById('msg');
const win = document.querySelector('.win');
function getRandomNumber() {
  return Math.floor(Math.random() * 101);
}
const randomNum = getRandomNumber();

let isRunning = true;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', guessedNumber);

function guessedNumber(e) {
  const input = e.results[0][0].transcript;
  showMsg(input);
  checkInput(input);
  if (isRunning) {
    recognition.addEventListener('end', () => recognition.start());
  }
}

function showMsg(input) {
  msgEl.innerHTML = `<div>You said:</div>
<span class="box">${input}</span>`;
}

function checkInput(input) {
  const num = +input;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not a valid number!!</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between <br> 1 and 100</div>';
    return;
  }

  if (num === randomNum) {
    isRunning = false;
    recognition.stop();
    const h2 = win.querySelector('h2');
    h2.innerHTML = ` Congrats! You have guessed the number! 🎉😎 <br/>
    It was ${num}`;
    win.style.display = 'flex';
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    win.style.display = 'none';
    isRunning = true;
    recognition.start();
  }
});
