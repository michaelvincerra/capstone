/**
 * Created by michaelevan on 6/19/17.
 */
"use strict";


var margin = {top: 20, right: 30, bottom: 40, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width*.85]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data.tsv", type, function(error, data) {

  x.domain(d3.extent(data, function(d) { return d.value; })).nice();   /* ? .value from where? */
  y.domain(data.map(function(d) { return d.value; }));

// d3.json("bars.json", function(json){
//     var data = json.items;
// });


      // .append("text")
      //
      // .attr("x", 0
      // //     function (d, i) {
      // //     return i * (w / data.length);
      // // }
      // )
      // .attr("y", 0
      //     // function (d) {
      //     // console.log(d);
      //     // return 0 - (d * 4);
      // )
      // // .append("text")
      // .text(function (d) {
      //     return 'Test';
      // })
      //
      //
      // .attr("font-family", "sans-serif")
      // .attr("font-size", "11px")
      // .attr("fill", "black")
      // .attr("text-anchor", "middle")
      // .attr("z-index", 900)

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis)


    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function (d) {
            return "bar bar--" + (d.value < 0 ? "negative" : "positive");
        })   /* "label" */
        .attr("x", function (d) {
            return x(Math.min(0, d.value));
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", function (d) {
            return Math.abs(x(d.value) - x(0));
        })
        .attr("height", y.rangeBand());

       svg.append("text")      // text label for the x axis
        .attr("x", 135 )
        .attr("y",  100 )
        .style("text-anchor", "middle")
        .text("IP");


    // bar.append("text")
    //         .attr("class", data)
    //         .attr("y", barHeight / 2)
    //         .attr("dy", ".35em") //vertical align middle
    //         .text(function(d){
    //             return d.data;
    //         }).each(function() {
    //     labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    // });

    // d3.select(".chart")
    //     .selectAll("div")
    //     .data(data)
    //     .enter().append("div")
    //     .style("width", function (d) {
    //         return x(d) + "px";
    //     })
    //     .text(function (d) {
    //         return d;
    //     });


      // bars.append("text")
      // .attr("x", function(d) { return x(d.x0); })
      // .attr("y", y.rangeBand()/2)
      // .attr("dy", "0.5em")
      // .attr("dx", "0.5em")
      // .style("font" ,"10px sans-serif")
      // .style("text-anchor", "begin")
      // .text(function(d) { return d.n !== 0 && (d.x1-d.x0)>3 ? d.n : "" });

  //
  // svg.selectAll("text")
  //   .data(data)
  //   .enter().append("text")
  //   .attr("x", x)
  //   .attr("y", function(d) { return y(d) + y.rangeBand()/2;})
  //   .attr("dx", -5)
  //   .attr("dy", "36em")
  //   .attr("text-anchor", "end")
  //   .text(String);
    //
    // var yTextPadding = 10;
    // svg.selectAll(".bartext")
    //     .data(data)
    //   .enter()
    //     .append("text")
    //     .attr("class", "bartext")
    //     .attr("text-anchor", "middle")
    //     .attr("fill", "black")
    //     .attr("x", function (d, i) {
    //         return x(i) + x.rangeBand();
    //     })
    //     .attr("y", function (d, i) {
    //         return height - y(d) + yTextPadding;
    //     })
    //     .text(function (d) {
    //         return d;
    //     });

function type(d) {
  d.value = +d.value;
  return d;
}