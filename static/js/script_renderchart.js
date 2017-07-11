/**
 * Created by michaelevan on 7/10/17.
 */

/* rangeRoundBands([width, 0], .1); */

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
        success: function(response_fields){
            let chart_data = response_fields.results;
            data = chart_data;
            console.log(chart_data);
            console.log(response_fields.metadata);
            // clearAll();
            //  x.domain(x_values).rangeRoundBands([width, 0], .1);
            plot_area()
        },
        error: function(err){
            console.log(err);
        }
});
}



 $('.iso_btn').on('click', function(evt){
     "use strict";

     let country = $(this).attr('data-country');

     let years = $('#year_range').val().split('-');
     let start_date = years[0];
     let end_date = years[1];

     // console.log(country);
     // console.log(start_date);
     // console.log(end_date);

    fetch_data(country,start_date, end_date);

 });


/* Do I have to invoke  plot_area function? How to redraw the chart?*/
