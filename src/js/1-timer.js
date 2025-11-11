import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import icon from '../img/bi_x-octagon.svg';
import '../css/styles.css';


const input = document.querySelector("#datetime-picker");
    const startBtn = document.querySelector("[data-start]");
    const daysEl = document.querySelector("[data-days]");
    const hoursEl = document.querySelector("[data-hours]");
    const minutesEl = document.querySelector("[data-minutes]");
    const secondsEl = document.querySelector("[data-seconds]");

    let userSelectedDate = null;
    let timerId = null;

    startBtn.disabled = true;

    flatpickr(input, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selected = selectedDates[0];
        if (selected <= new Date()) {
          iziToast.error({
            title: "Error",
            message: "Please choose a date in the future",                                                                                                                                                                                                                                                                                                                                                                                                                      position: "topRight",
            backgroundColor: "#EF4040",
            titleColor: '#fff',          
            messageColor: '#fff',                  
            progressBarColor: '#B51B1B',
            iconUrl: icon,
            theme: '#FFBEBE',
            iconColor: '#fff',
           

          });
          startBtn.disabled = true;
          return;
        }
        userSelectedDate = selected;
        startBtn.disabled = false;
      },
    });

    startBtn.addEventListener("click", () => {
      if (!userSelectedDate) return;
      startBtn.disabled = true;
      input.disabled = true;

      timerId = setInterval(() => {
        const diff = userSelectedDate - new Date();
        if (diff <= 0) {
          clearInterval(timerId);
          updateTimer(0, 0, 0, 0);
          input.disabled = false;
          return;
        }
        const { days, hours, minutes, seconds } = convertMs(diff);
        updateTimer(days, hours, minutes, seconds);
      }, 1000);
    });

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
      return String(value).padStart(2, "0");
    }

    function updateTimer(days, hours, minutes, seconds) {
      daysEl.textContent = days;
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
};