import * as tslib_1 from "tslib";
import { AccountProvider } from './../../providers/account/account';
import { RatingProvider } from './../../providers/rating/rating';
import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { D } from '../../../D';
let GraphPage = class GraphPage {
    constructor(tc, ac, ratingProvider) {
        this.tc = tc;
        this.ac = ac;
        this.ratingProvider = ratingProvider;
        this.weekData = {
            data: [],
            labels: []
        };
        this.monthData = {
            data: [],
            labels: []
        };
        Chart.defaults.global.defaultFontColor = "white";
        this.ionViewDidLoad();
    }
    ionViewDidLoad() {
        console.log("WWW");
        var dateToGet = D.toKeyDate(new Date());
        this.createMonthChart(dateToGet);
        this.createWeekChart(dateToGet);
        this.ratingProvider.getWeekData(dateToGet, false).subscribe(data => { console.log("done"); }, (err) => {
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
                };
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
                };
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
    showToast(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.tc.create({
                message: message,
                duration: 3000,
                position: "bottom"
            });
            alert.present();
        });
    }
};
tslib_1.__decorate([
    ViewChild('weekChartCanvas', null),
    tslib_1.__metadata("design:type", Object)
], GraphPage.prototype, "weekChartCanvas", void 0);
tslib_1.__decorate([
    ViewChild('monthChartCanvas', null),
    tslib_1.__metadata("design:type", Object)
], GraphPage.prototype, "monthChartCanvas", void 0);
GraphPage = tslib_1.__decorate([
    Component({
        selector: 'page-graph',
        templateUrl: 'graph.html',
        styleUrls: ['graph.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ToastController, AccountProvider, RatingProvider])
], GraphPage);
export { GraphPage };
//# sourceMappingURL=graph.js.map