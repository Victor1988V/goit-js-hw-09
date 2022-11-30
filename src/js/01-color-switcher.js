const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let timerId = null;

btnStart.addEventListener("click", onBtnStart);
btnStop.addEventListener("click", onBtnStop);

function onBtnStart(event) {
  timerId = setInterval(() => {
    body.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
  }, 1000);
  btnStart.disabled = timerId;
}

function onBtnStop(event) {
  clearInterval(timerId);
  btnStart.disabled = !timerId;
}
