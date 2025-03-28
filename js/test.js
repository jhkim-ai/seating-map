const MAX_SEAT_LOC = 2;
const MAX_COL = 3;
const LIMIT_PEOPLE = 11;

let idx = 0;
let idx2 = 0;

let orgPeople = 0;
let people = 0;
let rows = 1;
let cols = MAX_COL;
let seatCnt = 0;
let blockIdx = -1;

let pairSet = null;
let isValidSeat = null;

const generateChart = () => {
  orgPeople = parseInt(document.getElementById('people').value);
  people = orgPeople % 2 == 0 ? orgPeople : orgPeople + 1;

  if (people >= LIMIT_PEOPLE) {
    alert(`${LIMIT_PEOPLE-1}명까지 가능합니다`);
    return;
  }

  if (!people || people <= 0) {
    alert(`인원수를 입력해 주세요`);
    return;
  }

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
  idx2 = 0;

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
    // makeChart();
    console.log(++idx2 + ":: " + selected);
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