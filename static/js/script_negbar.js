/**
 * Created by michaelevan on 6/19/17.
 * https://bl.ocks.org/mbostock/2368837
 */


"use strict";

var width = d3.max(data);
var height = data.length;
var svg = d3.select('.chart')
    .attr("width", width)
    .attr("height", height * data.length);


// var x = d3.scale.linear()
//     .domain(d3.extent(data))
//     .range([0, width]);


var x0 = Math.max(-d3.min(data), d3.max(data));

var x = d3.scale.linear()
    .domain([-x0, x0])
    .range([0, width])
    .nice();
//
// var x = d3.scale.linear()
//     .domain([-30, 30])
//     .range([0, width]);

var y = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundBands([0, height], .2);


svg.selectAll(".chart")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return x(Math.min(0, d)); })
    .attr("y", function(d, i) { return y(i); })
    .attr("width", function(d, i) { return Math.abs(x(d) - x(0)); })
    .attr("height", y.rangeBand());