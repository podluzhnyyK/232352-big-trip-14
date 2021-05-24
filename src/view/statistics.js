import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { countPointsByTripType, getCostsByTripType, getDurationByType, getItemsUniq, getSortedStatistic, humanizeTotalDuration } from '../utils/statistics.js';
import { STATS_SETTINGS, StatsTitleType } from '../utils/const.js';

const renderMoneyChart = (moneyCtx, points) => {
  const pointsTypes = points.map((point) => point.type);
  const uniqTypes = getItemsUniq(pointsTypes);
  const moneyByTypes = uniqTypes.map((type) => getCostsByTripType(points, type));

  const sortedMoneyStatistic = getSortedStatistic(uniqTypes, moneyByTypes);

  moneyCtx.height = uniqTypes.length * STATS_SETTINGS.barHeight;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: STATS_SETTINGS.chartType,
    data: {
      labels: sortedMoneyStatistic.types,
      datasets: [{
        data: sortedMoneyStatistic.characteristics,
        backgroundColor: STATS_SETTINGS.dataBackgroundColor,
        hoverBackgroundColor: STATS_SETTINGS.dataHoverBackgroundColor,
        anchor: STATS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATS_SETTINGS.fontSize,
          },
          color: STATS_SETTINGS.fontColor,
          anchor: STATS_SETTINGS.optionsAnchor,
          align: STATS_SETTINGS.optionsAlign,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: StatsTitleType.MONEY,
        fontColor: STATS_SETTINGS.fontColor,
        fontSize: STATS_SETTINGS.titleFontSize,
        position: STATS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATS_SETTINGS.fontColor,
            padding: STATS_SETTINGS.padding,
            fontSize: STATS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const pointsTypes = points.map((point) => point.type);
  const uniqTypes = getItemsUniq(pointsTypes);
  const eventsByTypeCounts = uniqTypes.map((type) => countPointsByTripType(points, type));

  const sortedEventsCountStatistic = getSortedStatistic(uniqTypes, eventsByTypeCounts);

  typeCtx.height = uniqTypes.length * STATS_SETTINGS.barHeight;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: STATS_SETTINGS.chartType,
    data: {
      labels: sortedEventsCountStatistic.types,
      datasets: [{
        data: sortedEventsCountStatistic.characteristics,
        backgroundColor: STATS_SETTINGS.dataBackgroundColor,
        hoverBackgroundColor: STATS_SETTINGS.dataHoverBackgroundColor,
        anchor: STATS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATS_SETTINGS.fontSize,
          },
          color: STATS_SETTINGS.fontColor,
          anchor: STATS_SETTINGS.optionsAnchor,
          align: STATS_SETTINGS.optionsAlign,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: StatsTitleType.TYPE,
        fontColor: STATS_SETTINGS.fontColor,
        fontSize: STATS_SETTINGS.titleFontSize,
        position: STATS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATS_SETTINGS.fontColor,
            padding: STATS_SETTINGS.padding,
            fontSize: STATS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: STATS_SETTINGS.minBarLength,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx,points) => {
  const eventTypes = points.map((point) => point.type);
  const uniqTypes = getItemsUniq(eventTypes);
  const durationsByTripTypes = uniqTypes.map((type) => getDurationByType(points, type));

  const sortedTimeStatistic = getSortedStatistic(uniqTypes, durationsByTripTypes);

  timeCtx.height = uniqTypes.length * STATS_SETTINGS.barHeight;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: STATS_SETTINGS.chartType,
    data: {
      labels: sortedTimeStatistic.types,
      datasets: [{
        data: sortedTimeStatistic.characteristics,
        backgroundColor: STATS_SETTINGS.dataBackgroundColor,
        hoverBackgroundColor: STATS_SETTINGS.dataHoverBackgroundColor,
        anchor: STATS_SETTINGS.dataAnchor,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: STATS_SETTINGS.fontSize,
          },
          color: STATS_SETTINGS.fontColor,
          anchor: STATS_SETTINGS.optionsAnchor,
          align: STATS_SETTINGS.optionsAlign,
          formatter: (val) => `${humanizeTotalDuration(val)}`,
        },
      },
      title: {
        display: true,
        text: StatsTitleType.TIME_SPENT,
        fontColor: STATS_SETTINGS.fontColor,
        fontSize: STATS_SETTINGS.titleFontSize,
        position: STATS_SETTINGS.titlePosition,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: STATS_SETTINGS.fontColor,
            padding: STATS_SETTINGS.padding,
            fontSize: STATS_SETTINGS.fontSize,
            callback: (val) => `${val.toUpperCase()}`,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: STATS_SETTINGS.barThickness,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: STATS_SETTINGS.minBarLength,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._points = points;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._points);
  }
}
