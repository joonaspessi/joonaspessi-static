'use strict';

(function ($) {
    $(function () {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();

        var ROOT = "http://localhost:3000";
        var ENDPOINTS = {
            athlete: ROOT + "/api/v1/athlete",
            workouts: ROOT + "/api/v1/workouts"
        };

        var tableItem = ["<tr>", "<td><%=date%></td>", "<td class=\"joonaspessi__workouts-table__name\"><%=name%></td>", "<td><%=distance%></td>", "<td><%=duration%></td>"].join("");

        function secondsToHHMM(seconds) {
            var sec_num = parseInt(seconds, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - hours * 3600) / 60);
            var seconds = sec_num - hours * 3600 - minutes * 60;

            var time = hours + "h " + minutes + "m";
            return time;
        }

        var tableItemTemplate = _.template(tableItem);

        function getRecentRideTotals() {
            return fetch(ENDPOINTS.athlete).then(function (res) {
                return res.text();
            }).then(function (resContent) {
                return JSON.parse(resContent);
            }).then(function (parsed) {
                return parsed.recent_ride_totals;
            });
        }

        function getLatestRides() {
            return fetch(ENDPOINTS.workouts).then(function (res) {
                return res.text();
            }).then(function (resContent) {
                return JSON.parse(resContent);
            });
        }

        getRecentRideTotals().then(function (totals) {
            var el = document.querySelector(".joonaspessi__athlete_distance");
            el.innerHTML = (totals.distance / 1000).toFixed(0) + "km";
            return totals;
        }).then(function (totals) {
            var el = document.querySelector(".joonaspessi__athlete_moving_time");
            el.innerHTML = (totals.moving_time / 3600).toFixed(0) + "h";
            return totals;
        }).then(function (totals) {
            var el = document.querySelector(".joonaspessi__athlete_elevation_gain");
            el.innerHTML = totals.elevation_gain.toFixed(0) + "m";
            return totals;
        });

        getLatestRides().then(function (rides) {
            return rides.map(function (ride) {
                return {
                    date: moment(ride.start_date_local).format("L"),
                    name: ride.name,
                    distance: Math.round(ride.distance / 1000) + "km",
                    duration: secondsToHHMM(ride.moving_time)
                };
            }).map(function (ride) {
                return tableItemTemplate(ride);
            });
        }).then(function (tableEls) {
            return tableEls.join("");
        }).then(function (tableContent) {
            document.querySelector(".joonaspessi__workouts-table-body").innerHTML = tableContent;
        });
    });
})(jQuery);
