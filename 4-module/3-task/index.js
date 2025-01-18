function highlight(table) {
  // ваш код...
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    if (row.cells[2].textContent === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }
    if (Number(row.cells[1].textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
    if (row.cells[3].dataset.available === 'true') {
      row.classList.add('available');
    } else if (row.cells[3].dataset.available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }
  }
}
