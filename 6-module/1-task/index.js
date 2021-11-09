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
    this.render();
    let buttons = this.elem.querySelectorAll("button");
    [...buttons].map((button) =>
      button.addEventListener("click", this.onCLick)
    );
  }
  render() {
    this.elem = document.createElement("div");

    this.strings = this.rows.map(
      (el) => `<tr><td>${el.name}</td>
    <td>${el.age}</td>
    <td>${el.salary}</td>
    <td>${el.city}</td>
    <td><button>X</button></td>
    </tr>`
    );
    this.elem.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    <tbody>
    ${this.strings}
    </tbody>
    </table>`;
  }

  onCLick = (event) => {
    let line = event.currentTarget.closest("tr");
    line.remove();
  };
}
