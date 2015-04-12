'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

function data(id, name, min, max, value) {
    return {
        id: id,
        name: name,
        min: min,
        max: max,
        value: value,
    };
}

var dataToTrack = [
    data("USLAB000035", "Velocity X"),
    data("USLAB000036", "Velocity Y"),
    data("USLAB000037", "Velocity Z"),
];

require(["LightstreamerClient", "Subscription"], function(LightstreamerClient, Subscription) {
    var client = new LightstreamerClient("https://push.lightstreamer.com", "ISSLIVE");
    client.connect();

    var idsToTrack = [];
    for (var i = 0; i < dataToTrack.length; i++) {
        idsToTrack.push(dataToTrack[i].id);
    }

    var sub = new Subscription("MERGE", idsToTrack, ["Value"]);
    client.subscribe(sub);
 
    sub.addListener({
        onItemUpdate: function(update) {
            var chart = $("#" + update.getItemName()).highcharts(),
                point,
                newVal,
                inc;

            if (chart) {
                point = chart.series[0].points[0];

                newVal =  parseFloat(update.getValue("Value"));

                if (newVal < -10000 || newVal > 10000) {
                    newVal = point.y;
                }

                point.update(Math.round(newVal * 100) / 100);
            }
        }
    });

});

angular.module('clientApp')
    .controller('GameCtrl', function($location) {
        var vm = this;
        vm.gotoMap = function() {
            console.log("goto map");
        }
        vm.speedDetails = dataToTrack;
        vm.isShowingLivingQuarters = false;
        vm.isShowingProfile = false;
        vm.showLivingQuarters = function() {
        	vm.isShowingLivingQuarters = true;
        }
        vm.hideLivingQuarters = function() {
        	vm.isShowingLivingQuarters = false;
        }

        var gaugeOptions = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            tooltip: {
                enabled: false
            },
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        for (var i = 0; i < dataToTrack.length; i++) {
            $('#' + dataToTrack[i].id).highcharts(Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: -10000,
                    max: 10000,
                    title: {
                        text: 'Velocity X'
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Speed',
                    data: [80],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                            '<span style="font-size:12px;color:silver">m/s</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' m/s'
                    }
                }]

            }));
        };
    });
