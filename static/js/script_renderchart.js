/**
 * Created by michaelevan on 7/10/17.
 */


function fetch_data(country, start_date, end_date) {
    /* Returns chart date from the API */

    const request_params = {'countries': 'france, italy',    /*  TODO: Replace with variable */
                            'start_date': start_date,
                            'end_date': end_date,
                           };

    $.ajax({
        url: '/api/v1/snapshots/',
        method: 'GET',
        data: request_params,
        success: function(rsp){
            let chart_data = rsp.results;
            data = chart_data;
            console.log(chart_data);
            // clearAll();
        },
        error: function(err){
            console.log(err);
        }
});
}

 $('.iso_btn').on('click', function(evt){
     "use strict";
     let country = 'france';
     let start_date = 1975;
     let end_date = 2015;

     console.log(country);
     console.log(start_date);
     console.log(end_date);

    fetch_data(country,start_date, end_date);

 });


