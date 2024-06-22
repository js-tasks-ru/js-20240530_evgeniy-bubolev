export default class SortableTable {
  headerConfig = null;
  data = null;
  subElements = {
    header: null,
    body: null
  };

  element = null;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement();
  }
  createElement() {
    //productsContainer
    const productsContainer = document.createElement('div');
    productsContainer.setAttribute('data-element', 'productsContainer');
    productsContainer.setAttribute('class', 'products-list__container');

    //sortable-table
    const sortableTable = document.createElement('div');
    sortableTable.setAttribute('class', 'sortable-table');


    productsContainer.appendChild(sortableTable);
    sortableTable.appendChild(this.createTableHeaderElement());
    sortableTable.appendChild(this.createTableBodyElement());
    return productsContainer;
  }

  createTableHeaderElement() {
    const header = document.createElement('div');
    header.setAttribute('data-element', 'header');
    header.setAttribute('class', 'sortable-table__header sortable-table__row');

    this.headerConfig.forEach(headerCell => {
      const headerNode = document.createElement('div');
      headerNode.setAttribute('class', 'sortable-table__cell');
      headerNode.setAttribute('data-id', headerCell.id);
      headerNode.setAttribute('data-sortable', headerCell.sortable);

      const content = document.createElement('span');
      content.textContent = headerCell.title;

      headerNode.appendChild(content);
      header.appendChild(headerNode);
    });

    this.subElements.header = header;
    return header;
  }

  createTableBodyElement() {
    const tableBody = document.createElement('div');
    tableBody.setAttribute('data-element', 'body');
    tableBody.setAttribute('class', 'sortable-table__body');


    this.data.forEach(rowData => {
      const row = document.createElement('a');
      row.setAttribute('href', '/products/' + rowData.id);
      row.setAttribute('class', 'sortable-table__row');

      this.headerConfig.forEach(header => {
        const cell = document.createElement('div');

        if (header.template instanceof Function) {
          cell.innerHTML = header.template(rowData[header.id]);
        } else {
          cell.setAttribute('class', 'sortable-table__cell');
          cell.textContent = rowData[header.id];
        }

        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    this.subElements.body = tableBody;
    return tableBody;
  }

  remove () {
    return this.element.remove();
  }

  destroy() {
    this.remove();
  }

  sort(sortBy = null, order = 'asc') {

    if (sortBy !== null && this.headerConfig.some(columnHeader => columnHeader.id === sortBy && columnHeader.sortable)) {

      const sortingOrder = order === 'asc' ? 1 : -1;

      this.data.sort((rowA, rowB) => {
        const a = rowA[sortBy];
        const b = rowB[sortBy];

        if (typeof a === 'number' && typeof b === 'number') {
          return sortingOrder * (a - b);
        } else {
          const locales = ['ru', 'en'];
          const collatorOptions = {sensitivity: 'case', caseFirst: 'upper'};
          return sortingOrder * a.toString().localeCompare(b.toString(), locales, collatorOptions);
        }
      });
    }
    const newTableBody = this.createTableBodyElement();
    this.element.querySelector('[data-element="body"]').replaceWith(newTableBody);
  }
}

