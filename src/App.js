import React, { Component } from 'react';
import Highcharts from 'highcharts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.apiKey = 'L8GJQGX34O6FJS';
    this.symbol = 'GOOG';
    this.function = 'TIME_SERIES_INTRADAY';
    this.interval = '1min';
  }

  componentDidMount() {
    fetch(
      `https://www.alphavantage.co/query?function=${
        this.function
      }&symbol=${this.symbol}&interval=${this.interval}&apikey=${
        this.apiKey
      }`
    )
      .then(res => res.json())
      .then(data => {
        const categories = [];
        const open = [];
        const high = [];
        const low = [];
        const close = [];

        Object.entries(data['Time Series (1min)']).forEach(
          ([key, value]) => {
            categories.push(key);
            open.push(Number(value['1. open']));
            high.push(Number(value['2. high']));
            low.push(Number(value['3. low']));
            close.push(Number(value['4. close']));
          }
        );

        Highcharts.chart('chartWrapper', {
          chart: { type: 'line' },
          title: { text: 'Google Stocks Intraday' },
          tooltip: {
            shared: true,
          },
          xAxis: {
            categories: categories,
          },
          series: [
            {
              name: 'Open',
              data: open,
            },
            {
              name: 'High',
              data: high,
            },
            {
              name: 'Low',
              data: low,
            },
            {
              name: 'Close',
              data: close,
            },
          ],
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div id="chartWrapper" />
      </div>
    );
  }
}

export default App;
