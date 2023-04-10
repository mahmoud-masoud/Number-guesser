const msgEl = document.getElementById('msg');

function getRandomNumber() {
  return Math.floor(Math.random() * 101);
}
const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', guessedNumber);

function guessedNumber(e) {
  const input = e.results[0][0].transcript;
  showMsg(input);
  checkInput(input);
}

function showMsg(input) {
  `<div>You said:</div>
<span class="box">${input}</span>`;
}

function checkInput(input) {
  const num = +input;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not a valid number!!</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

recognition.addEventListener('end', () => recognition.start());

document.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
