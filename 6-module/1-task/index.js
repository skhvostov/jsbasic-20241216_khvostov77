/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = this.createTable();
  }

  get elem() {
    return this.table;
  }

  createTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');

    thead.insertAdjacentHTML(
      'afterbegin',
      `
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      `
    );
    table.append(thead);

    const tbody = document.createElement('tbody');

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      const tr = document.createElement('tr');
      tr.insertAdjacentHTML(
        'afterbegin',
        `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      `
      );

      const deleteButton = tr.querySelector('button');
      deleteButton.addEventListener('click', () => {
        tr.remove();
      });

      tbody.append(tr);
    }

    table.append(tbody);
    return table;
  }
}
