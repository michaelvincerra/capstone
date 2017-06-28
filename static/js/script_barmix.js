/**
 * Created by michaelevan on 6/19/17.
 */
"use strict";



// var x = d3.scale.linear()
//     .domain(d3.extent(data))
//     .range([0, width]);

// var width = d3.max(data);
// var height = data.length;
// var svg = d3.select('.chart')
//     .attr("width", width)
//     .attr("height", height * data.length);


// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, width])
//     .nice();

var x = d3.scale.linear()
    .domain([-30, 30])
    .range([0, width])
    .nice();

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, height], .2);

// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", height * data.length);

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "chart")
    .attr("x", function(d, i) { return x(Math.min(0, d)); })
    .attr("y", function(d, i) { return y(i); })
    .attr("width", function(d, i) { return Math.abs(x(d) - x(0)); })
    .attr("height", y.rangeBand());





// function buildCountry(country_name, countryIP, year) {
//     // Builds the table where it shows: a country name, country IP sales, and the year recorded.
//
//     let country = $('<td>').text(country.country.value);
//     let year = $('<td>').text(country.date);
//     let ipSales = $('<tr>').text(country.value);
//
//     let countryYearipSales = $('<tr>').append(country, year, ipSales);
//     jQuery('#country_stats').append(countryYearipSales);
// }
//
//
//
// // function makeInfoWindow(country_name, countryIP, year){
// //
// //     let $heading = $('<h4>').text(`${country_name.dir}`);
// //     let $description = $('<p>').text(`${countryIP.desc}`);
// //     let $year = $('')
// //     let $body = $ ('<section>').append($heading, $description);
// //     buildCountry(country)
// // }
//
// function fetchCountry(country_name, countryIP, year) {
//     // Fetches the charges for the use of IP for one country in one year
//
//     let request_params = {
//                             'format': 'json',
//                             'page': '1',
//                             'date': '2008:2009',
//                             'MRV':  '5',
//                             'Gapfill': 'Y',
//                             'Frequency': 'Y',
//     };
//
//     let ajax_options = {type: 'GET',
//                         data: request_params,
//                         url: 'http://api.worldbank.org/countries/fr/indicators/BX.GSR.ROYL.CD'};
//
//         buildCountry(country_name, countryIP, year)
//
// // --------- AJAX call on Response------------//
//
//     $.ajax(ajax_options).done(function(response) {
//         console.log(response);
//         let country_name = response.country.value;  // Should there be a Object name that follows response per API??
//         let countryIP = response.value;    // Should there be a Object name that follows response per API??
//         let year = response.date;
//         makeInfoWindow(country_name,countryIP, year);
//
//     }).fail(function(error){
//         console.log(error);
// });
// }



// // function countryData(country_name, countryIP) {
// //     pass
// //     return
// // }