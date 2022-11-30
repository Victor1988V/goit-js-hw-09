import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const text = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");
const days = document.querySelector(".value[data-days]");
const hours = document.querySelector(".value[data-hours]");
const minutes = document.querySelector(".value[data-minutes]");
const seconds = document.querySelector(".value[data-seconds]");
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  // Количество миллисекунд в единицу времени
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Оставшиеся дни
  const days = addLeadingZero(Math.floor(ms / day));
  // Оставшиеся часы
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Оставшиеся минуты
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Оставшиеся секунды
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

btnStart.addEventListener("click", () => {
  let timer = setInterval(() => {
    let deltaTime = new Date(text.value) - new Date();
    btnStart.disabled = true;
    if (deltaTime >= 0) {
      let timeObject = convertMs(deltaTime);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      Notiflix.Notify.success("countdown finished");
      clearInterval(timer);
    }
  }, 1000);
});

// const timer = {
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = convertMs(deltaTime);

//       updateClockFace(time);

//       // console.log(`${days}:${hours}:${minutes}:${seconds}`);
//     }, 1000);
//   },
// };

// function updateClockFace({ days, hours, minutes, seconds }) {
//   daysT.textContent = `${days}`;
//   hoursT.textContent = `${hours}`;
//   minutesT.textContent = `${minutes}`;
//   secondsT.textContent = `${seconds}`;
// }
