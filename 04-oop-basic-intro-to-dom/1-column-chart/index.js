export default class ColumnChart {
  chartHeight = 0;
  data = [];
  label = '';
  link = '';
  value = 0;

  element;

  constructor(
    {
      chartHeight = 50,
      data = [],
      label = '',
      link = '',
      value = '',
      formatHeading = (value) => { return value; } //return the same value if no function provided
    } = {}
  ) {
    this.chartHeight = chartHeight;
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.element = this.createElement();
  }

  createElement() {
    const columnChart = document.createElement('div');
    if (!this.data || this.data.length === 0) {
      columnChart.setAttribute('class', 'column-chart column-chart_loading');
    } else {
      columnChart.setAttribute('class', 'column-chart');
    }

    const columnChartTitle = document.createElement('div');
    columnChartTitle.setAttribute('class', 'column-chart__title');
    const titleText = document.createTextNode(`Total ${this.label}`);

    const viewAllLink = document.createElement('a');
    viewAllLink.setAttribute('class', 'column-chart__link');
    viewAllLink.setAttribute('href', this.link);
    viewAllLink.textContent = 'View all';

    const columnChartContainer = document.createElement('div');
    columnChartContainer.setAttribute('class', 'column-chart__container');
    columnChartContainer.innerHTML = this.createChartColumns();

    columnChartTitle.appendChild(titleText);
    columnChartTitle.appendChild(viewAllLink);
    columnChart.appendChild(columnChartTitle);
    columnChart.appendChild(columnChartContainer);

    return columnChart;
  }

  createChartColumns() {
    let template = '';
    template += `<div data-element="header" class="column-chart__header"> ${this.value} </div>`;
    template += `<div data-element="body" class="column-chart__chart">`;

    if (this.data && this.data.length > 0) {
      for (const _ of this.getColumnProps(this.data)) {
        template += `<div style="--value: ${_.value}" data-tooltip="${_.percent}"></div>`;
      }
    }
    template += `</div>`;
    return template;
  }

  update(data) {
    this.data = data;
    const columnChart = this.element.querySelector('.column-chart__container');
    columnChart.innerHTML = this.createChartColumns();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}
