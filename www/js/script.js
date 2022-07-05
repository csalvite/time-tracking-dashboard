'use strict';

// Seleccionamos los elementos que tenemos que pintar del dom
const titles = document.querySelectorAll('section h2');
const currentTime = document.querySelectorAll('section h3');
const previousTime = document.querySelectorAll('section p');

// Seleccionar los botones
const dailyBtn = document.querySelector('button#daily');
const weeklyBtn = document.querySelector('button#weekly');
const monthlyBtn = document.querySelector('button#monthly');

// Retornamos los datos del json
async function getData() {
  const response = await fetch('../data.json');

  const data = await response.json();

  return data;
}

// Creamos una funcion que recorra todos los h2 y asigne
// el titulo recuperado del json
async function printTitles(titles) {
  const data = await getData();

  for (let i = 0; i < data.length; i++) {
    titles[i].textContent = data[i].title;
  }
}

async function printTimes(currentTime, previousTime, option) {
  const data = await getData();

  for (let i = 0; i < data.length; i++) {
    if (option === 'week') {
      const { current, previous } = data[i].timeframes.weekly;

      currentTime[i].textContent = `${current}hrs`;
      previousTime[i].textContent = `Last Week - ${previous}hrs`;
    } else if (option === 'month') {
      const { current, previous } = data[i].timeframes.monthly;

      currentTime[i].textContent = `${current}hrs`;
      previousTime[i].textContent = `Last Month - ${previous}hrs`;
    } else {
      const { current, previous } = data[i].timeframes.daily;

      currentTime[i].textContent = `${current}hrs`;
      previousTime[i].textContent = `Last Day - ${previous}hrs`;
    }
  }
}

printTitles(titles);

// Por cada boton asignamos su evento de click
dailyBtn.addEventListener('click', () => {
  printTimes(currentTime, previousTime, 'daily');
  dailyBtn.style.color = 'white';
  weeklyBtn.style.color = 'hsl(235, 45%, 61%)';
  monthlyBtn.style.color = 'hsl(235, 45%, 61%)';
});

weeklyBtn.addEventListener('click', () => {
  printTimes(currentTime, previousTime, 'week');
  weeklyBtn.style.color = 'white';
  dailyBtn.style.color = 'hsl(235, 45%, 61%)';
  monthlyBtn.style.color = 'hsl(235, 45%, 61%)';
});

monthlyBtn.addEventListener('click', () => {
  printTimes(currentTime, previousTime, 'month');
  monthlyBtn.style.color = 'white';
  dailyBtn.style.color = 'hsl(235, 45%, 61%)';
  weeklyBtn.style.color = 'hsl(235, 45%, 61%)';
});
