import SortableTable from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTableV2 extends SortableTable {

  sorted = null;
  currentArrow = null;

  constructor(
    headerConfig, {
      data = [],
      sorted = {}
    } = {}) {
    super(headerConfig, data);
    this.sorted = sorted;
    this.initialize();
  }

  initialize() {
    const header = this.element.querySelector('.sortable-table__header');
    header.querySelectorAll('.sortable-table__cell').forEach(cell => {
      cell.setAttribute('data-order', 'asc');
    });

    this.sort(this.sorted.id, this.sorted.order);
    this.createEventListeners();
  }

  createEventListeners() {
    const header = this.element.querySelector('.sortable-table__header');
    header.addEventListener('click', this.handleHeaderClick.bind(this));
  }

  destroyEventListeners() {
    const header = this.element.querySelector('.sortable-table__header');
    header.removeEventListener('click', this.handleHeaderClick.bind(this));
  }

  handleHeaderClick = (event) => {
    event.preventDefault();

    const target = event.target.closest('.sortable-table__cell');
    if (target?.classList.contains('sortable-table__cell')) {

      if ('false' === target.dataset?.sortable) {
        return;
      }

      if (this.currentArrow != null) {
        this.currentArrow.remove();
      }

      if (this.sorted.id === target.dataset.id) {
        this.sorted.order = this.sorted.order === 'asc' ? 'desc' : 'asc';
        target.dataset.order = this.sorted.order;
      } else {
        this.sorted.id = target.dataset.id;
        this.sorted.order = 'asc';
      }

      this.sort(this.sorted.id, this.sorted.order);

      const arrow = document.createElement('span');
      arrow.setAttribute('data-element', 'arrow');
      arrow.setAttribute('class', 'sortable-table__sort-arrow');
      const sortArrow = document.createElement('span');
      sortArrow.setAttribute('class', 'sort-arrow');

      arrow.appendChild(sortArrow);
      target.appendChild(arrow);

      this.currentArrow = arrow;
    }
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}
