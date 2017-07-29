/**
 * Created by michaelevan on 7/10/17.
 */

/* rangeRoundBands([width, 0], .1); */

/* ============== Save Collection ====================== */

function save_collection(){
    // Saves user snapshots to a user collection. //
    "use strict";


    let request_params = Object({"snapshot_ids": snapshot_ids}); // snapshot_ids is const on country_panini
    console.log(snapshot_ids);


    $.ajax({
        url: '/api/v1/collection/save/',
        ContentType: 'application/json',
        type: 'POST',
        data: request_params,
        success: function(response_fields) {
            console.log(response_fields);
        },
        error: function(err) {
            console.log(err);
        }

    });
}

$('#save_collection').on('click', function(){
    "use strict";
    save_collection();
    console.log('success')
    });


/* ============== Autocomplete Country Code ====================== */

$( "#tags" ).autocomplete({
  source: function(request, response) {
      $.ajax({
          url: '/api/v1/codes',
          // dataType: 'json',
          data: {
              q: request.term
          },
          success: function (data) {
              "use strict";
              response(data);
          }
      });
  },
  minLength: 2,
  select: function( event, ui ) {
     let message = ui.item.value;
    console.log(message);
  }
});


/* ============== Get Country Snapshots ====================== */


function fetch_data(countries, start_date, end_date) {
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
            plot_area();
            // StackedBar();
        },
        error: function(err){
            console.log(err);
        }
});
}

/* ============== Button to Select 1 Country with Range of Years ====================== */


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
