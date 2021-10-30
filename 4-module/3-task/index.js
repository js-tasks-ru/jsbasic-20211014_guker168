function highlight(table) {
  let tableRows = table.querySelector('tbody').rows;
  for (let row of tableRows) {
    for (let cell of row.cells) {
      if (cell.getAttribute('data-available') === 'true') {
        row.classList.add('available');
      } else if (cell.getAttribute('data-available') === 'false') {
        row.classList.add('unavailable');
      } else if (cell.textContent === 'm') {
        row.classList.add('male');
      } else if (cell.textContent === 'f') {
        row.classList.add('female');
      } else if (+cell.textContent < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
    if (row.classList.contains('available') === false && row.classList.contains('unavailable') === false) {
      row.setAttribute('hidden', true);
    }
  }
}
