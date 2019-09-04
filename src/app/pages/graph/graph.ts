import { AccountProvider } from './../../providers/account/account';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { D } from '../../../D';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
  styleUrls: ['graph.scss'],
})
export class GraphPage {
//TODO---
  @ViewChild('weekChartCanvas',null) weekChartCanvas;
  @ViewChild('monthChartCanvas',null) monthChartCanvas;
  weekChart: any;
  monthChart: any;

  public weekData = {
    data: [],
    labels: []
  }

  public monthData = {
    data: [],
    labels: []
  }

  constructor(public tc: ToastController, public ac: AccountProvider, public ratingProvider: RatingProvider) {

    Chart.defaults.global.defaultFontColor = "white";
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log("WWW");
    var dateToGet = D.toKeyDate(new Date())

    this.createMonthChart(dateToGet);
    this.createWeekChart(dateToGet);
    this.ratingProvider.getWeekData(dateToGet, false).subscribe(data => { console.log("done") }, (err)=> {
      console.log(err);
    });
  }

  fillMonthCanvas() {
    this.monthChart = new Chart(this.monthChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.monthData.labels,
        datasets: [{
          data: this.monthData.data,
          pointHoverRadius: 5,
          pointRadius: 5,
          backgroundColor: [
            'rgba(253, 231, 76, 0.2)'
          ],
          borderColor: [
            'rgba(253, 231, 76, 0,1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
  }

  fillWeekCanvas() {
    this.weekChart = new Chart(this.weekChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.weekData.labels,
        datasets: [{
          data: this.weekData.data,
          pointHoverRadius: 10,
          pointRadius: 10,
          backgroundColor: [
            'rgba(253,231,76, 0.2)'
          ],
          borderColor: [
            'rgba(253, 231, 76, 0,1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
  }

  createMonthChart(dateToGet) {
    this.ratingProvider.getMonthData(dateToGet, true).subscribe((data) => {

      var orderedData = {};
      Object.keys(data).sort().forEach(function (key) {
        orderedData[key] = {
          rating: data[key].rating == -1 ? undefined : data[key].rating
        }
      });

      this.monthData.labels = Object.keys(orderedData);
      this.monthData.data = [];
      for (var key in orderedData) {
        this.monthData.data.push(orderedData[key].rating);
      }

      console.log(this.monthData.data);

      //this.monthData.data = Object.values(ord (a => a.rating);

      this.fillMonthCanvas();
    }, (err) => {
      this.showError(err);
    });
  }

  createWeekChart(dateToGet) {
    this.ratingProvider.getWeekData(dateToGet, true).subscribe((data) => {

      var orderedData = {};
      Object.keys(data).sort().forEach(function (key) {
        orderedData[key] = {
          rating: data[key].rating == -1 ? undefined : data[key].rating
        }
      });

      this.weekData.labels = Object.keys(orderedData);
      this.weekData.data = [];
      for (var key in orderedData) {
        this.weekData.data.push(orderedData[key].rating);
      }

      this.fillWeekCanvas();
    }, (err) => {
      this.showError(err);
    });
  }

  removeNegative(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < 0)
        arr[i] = undefined;
    }
  }

  showError(err) {
    this.showToast(err);
  }

  async showToast(message) {
    const alert = await this.tc.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    alert.present();
  }

}
