(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();

    var ROOT = "http://localhost:3000";
    var ENDPOINTS = {
        athlete: ROOT + "/api/v1/athlete"
    };

    function getRecentRideRecent() {
        return fetch(ENDPOINTS.athlete)
            .then(res => res.text())
            .then(resContent => JSON.parse(resContent))
            .then(parsed => parsed.recent_ride_totals);
    }

    getRecentRideRecent()
        .then(totals => {
            var el = document.querySelector(".joonaspessi__athlete_distance");
            el.innerHTML = (totals.distance/1000).toFixed(0) + " km";
            return totals;
        })
        .then(totals => {
            var el = document.querySelector(".joonaspessi__athlete_moving_time");
            el.innerHTML = (totals.moving_time/3600).toFixed(0) + " h";
            return totals;
        })
        .then(totals => {
            var el = document.querySelector(".joonaspessi__athlete_elevation_gain");
            el.innerHTML = (totals.elevation_gain).toFixed(0) + " m";
            return totals;
        });
  });
})(jQuery);
