const MAX_SEAT_LOC = 2;
const MAX_COL = 3;
const LIMIT_PEOPLE = 11;

let idx = 0;

let orgPeople = 0;
let people = 0;
let rows = 1;
let cols = MAX_COL;
let seatCnt = 0;

let pairSet = null;
let isValidSeat = null;

document.getElementById("people").addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    generateChart();
  }
});

const alertContainer = document.getElementById("alert");

const generateChart = () => {
  orgPeople = parseInt(document.getElementById('people').value);
  people = orgPeople % 2 == 0 ? orgPeople : orgPeople + 1;

  if (people >= LIMIT_PEOPLE) {
    makeWarnAlert(`${LIMIT_PEOPLE - 1}명까지 가능합니다`);
    return;
  }

  if (!people || people <= 0) {
    makeWarnAlert(`인원수를 입력해 주세요`);
    return;
  }

  alertContainer.style.display = 'none';
  const seatList = document.getElementById("seatList");
  seatList.innerHTML = "";

  pairSet = Array.from({ length: people + 1 }, () => new Set());
  isValidSeat = Array(people + 1).fill(0);
  
  const src = Array.from({ length: people }, (v, i) => i + 1);
  const selected = new Array(people);
  const visited = Array(people).fill(false);

  seatCnt = Math.ceil(people / 2);
  
  if (seatCnt >= MAX_COL) {
    cols = MAX_COL;
    rows = Math.ceil(seatCnt / cols);
  }
  else {
    rows = 1;
    cols = seatCnt;
  }

  idx = 0;

  console.log("people: " + people);
  console.log("seatCnt: " + seatCnt);
  console.log("rows: " + rows);
  console.log("cols: " + cols);

  permutation(src, people, selected, visited);
}

const makeChart = () => {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';
  chart.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  let count = 0;
  for (let i = 0; i < rows * cols; i++) {
      const seat = document.createElement('div');
      seat.className = 'seat';

      if (count < people) {
          const partner = (count + 1 < people) ? `${count + 1}, ${count + 2}` : `${count + 1}`;
          seat.textContent = partner;
          count += 2;
      } else {
          seat.classList.add('empty');
      }

      chart.appendChild(seat);
  }
}

const checkPairHistory = (selected) => {
  let person1;
  let person2;

  for (let i = 0; i < people; i+=2) {
    person1 = selected[i];
    if (i + 1 >= people) {
      break;
    }
    person2 = selected[i + 1];
    
    if (pairSet[person1].has(person2) || pairSet[person2].has(person1)) {
      return false;
    }
  }

  return true;
};

const setPairHistory = (selected) => {
  let person1;
  let person2;

  for (let i = 0; i < people; i+=2) {
    person1 = selected[i];
    if (i + 1 >= people) break;
    person2 = selected[i + 1];

    pairSet[person1].add(person2);
    pairSet[person2].add(person1);
  }
};

const permutation = (src, cnt, selected, visited) => {
  if (cnt === 0) {
    // console.log(++idx + ")org: " + selected);
    
    if (!checkPairHistory(selected)) return;
    setPairHistory(selected);
    
    if (idx == 0) {
      makeChart();
    }

    generateList(++idx, selected);
    return;
  }

  for (let i = 0; i < src.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      selected[selected.length - cnt] = src[i];
      permutation(src, cnt - 1, selected, visited);
      visited[i] = false;
    }
  }
};

const generateList = (index, selected) => {
  const seatList = document.getElementById("seatList");
  const container = document.createElement('div');
  const card = document.createElement('div');

  container.className = 'array-output';
  card.className = 'array-card';
  card.innerHTML = `
    <h3>#${index}</h3>
      <p>${selected}</p>
  `;
  container.appendChild(card);
  seatList.appendChild(container);
};

const makeWarnAlert = (message) => {
  const alertContainer = document.getElementById("alert");
  alertContainer.innerHTML = "";

  // Create the icon element
  const icon = document.createElement('span');
  icon.classList.add('alert-icon');
  icon.textContent = '⚠️'; // You can change this to another icon if you'd like

  // Create the message element
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.textContent = message;

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = () => {
    alertContainer.style.display = 'none';
  };

  // Append the icon, message, and button to the alert container
  alertContainer.appendChild(icon);
  alertContainer.appendChild(msg);
  alertContainer.appendChild(closeButton);
  alertContainer.style.display = 'flex';
}