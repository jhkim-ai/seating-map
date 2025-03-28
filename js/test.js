const MAX_COL = 3;

const generateChart = () => {
  const people = parseInt(document.getElementById('people').value);
  let rows = 0;
  let cols = MAX_COL;
  
  const seatCnt = Math.ceil(people / 2);
  if (seatCnt >= MAX_COL) {
    rows = seatCnt / cols;
    if (rows % cols > 0) ++rows;
  }
  else {
    rows = 1;
    cols = seatCnt;
  }

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
  const arr = [];
  // combination(arr, ) 
}

const permutation = (cnt, selected, visited) => {
  if (cnt === 0) {
    result.push(selected.join(' '));
    return;
  }

  for (let i = 0; i < src.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      selected[selected.length - cnt] = src[i];
      permutation(cnt - 1, selected, visited);
      visited[i] = false;
    }
  }
};