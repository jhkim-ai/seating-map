function generateChart() {
  const people = parseInt(document.getElementById('people').value);
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  
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

const combination = (arr, cnt, selected, startIdx) => {
  if (cnt === 0) {
    arr.push(selected.join(' '));
    console.log(arr);
    return;
  }

  for (let i = startIdx; i < src.length; i++) {
      selected[selected.length - cnt] = src[i];
      combination(arr, cnt - 1, selected, i + 1);
  }
};