/**
 * Created by michaelevan on 6/19/17.
 */
"use strict";




function fetchCountry(country_name, countryIP) {
    // Fetches the charges for the use of IP for one country in one year

    let request_params = {
                            'format': 'json',
                            'page': '1',
                            'date': '2009',
                            'MRV':  '1',
                            'Gapfill': 'Y',
                            'Frequency': 'Y',
    };

    let ajax_options = {type: 'GET',
                        data: request_params,
                        url: 'http://api.worldbank.org/countries/fr/indicators/BX.GSR.ROYL.CD'};

        // makeInfoWindow(MRV);

// --------- AJAX call on Response------------//

    $.ajax(ajax_options).done(function(response) {
        console.log(response);

        let country_name = response.country.value;  // Should there be a Object name that follows response per API??
        let countryIP = response.value;    // Should there be a Object name that follows response per API??
        makeInfoWindow();

    }).fail(function(error){
        console.log(error);
});
}

// // function countryData(country_name, countryIP) {
// //     pass
// //     return
// // }
//
// function makeInfoWindow(country_name, countryIP){
//
//     let $description = $('<p>').text(`${ countryIP.desc}`);
//     let $heading = $('<h4>').text(`${country_name.dir}`);
//     let $body = $ ('<section>').append($heading, $description);
// }