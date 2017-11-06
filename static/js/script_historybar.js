// "use strict";

// https://gist.github.com/mlunacek/8431eed93c26c3a30434dd5e02a1652c#file-d3-v3-min-js
/* http://api.jquery.com/jquery.each/ */

/*26.07.17: 'tmp' as a param, is not discoverable; that is a problem because it's the root of the error of data.length.*/

let svg, slider, rangeLabel, chart;


// TODO: In original code 'chart' is a function (not var). Not sure of intent in using chart as global variable.


                    /// MATTHEW'S RECOMMENDATIONS   ///

// References function that builds default chart on page load
window.onload = __init__;

function __init__() {
    // Purpose: Initialize slider and code with data
    // Call plot() with default values for start and stop

    function init() {
        // Create the slider
        slider = $('#slider').slider({       // NOTE: I used my HTML element ID here: <div id="slider-range"></div>
            range: true,
            min: start_year,
            max: end_year,
            step: 1,
            values: [start_year, end_year],

            // On slide, update the labels to reflect new year-range
            slide: function (event, ui) {
                // On slide, display selected values
                updateLabel(...ui.values)
            },

            // On stop, call plot() function in order to redraw the chart based on user selection.
            stop: function (event, ui) {
                plot(...ui.values);
                console.log('Slider dropped');
            }
        });
        // Call DOM to access ID 'range-label'
        rangeLabel = document.getElementById('range-label');
        // Call function updateLabel() to update labels based on user selection
        updateLabel(...slider.slider('option', 'values'));

        // Call function plot, then update data based on user selection of slider
        plot(...slider.slider('option', 'values'));

        // On window resize, call function plot and update chart based on user selection
        window.onresize = () => {
            plot(...slider.slider('option', 'values'));
        }
    }

// Update labels so user sees dates that are selected.
function updateLabel(start, end) {
    rangeLabel.innerHTML = `From: ${start} To: ${end} `;
}

// Plot chart TODO: REFACTOR plot() by integrating function plot_area()
function plot(start_year, end_year) {

    // Overall chart size
    const chartWidth = window.innerWidth / 2;
    const chartHeight = window.innerHeight / 2;

    let values = data
        .filter((elem) => {
        // Remove data that's not in selected range
        return elem.year >= start_year && elem.year <= end_year
    })
        .map((elem) => {
            return elem.year
        });

    let years = data
        .filter((elem) => {
        // Remove data that's not in selected range
        return elem.year >= start_year && elem.year <= end_year
    })
        .map((elem) => {
            return elem.year
        });

    // Initialize D3 SVG | HYBRID SOLUTION  05.11.2017
    if (!svg) {
        // svg = d3.select("#two_panini").datum(data).call(chart).append('svg')
        // svg = d3.select("#two_panini").datum(data).call(chart);
        // svg = d3.select("#chart").append('svg')               // TODO: Matthew's example
        svg = d3.select('#two_panini').append('svg')            // I added my own id:<div id="two_panini">
            .attr('height', chartHeight)                        // TODO: TEST 1414; REMOVE TEMPORARILY
            .attr('width', '100vw');

            var config = {};
            config.query = {};
            config.number_of_rows = 10;
            config.query.select = ['code'];

            chart = StackedBar()        //  StackedBar() must be called to prep chart data.
                .width(1230)            //  820  original
                .height(675)            //  450  original
                .columns(data.columns)
                .config(config)
                .margin({top: 30, right: 20, bottom: 20, left: 60})
                .x(d3.scale.ordinal())
                .y(d3.scale.linear());

        // svg = d3.select("#two_panini").datum(data).call(chart);

        }

        // Remove old data
        svg.selectAll('rect').remove();
        svg.selectAll('text').remove();

        // Draw chart with NEW DATA
        plot_area();
        svg.selectAll('rect')                                  // TODO: Check plot_area() for conflicts/overlap
            .data(values)
            .enter().append('rect')
        // Set data point height and width
            .attr('height', function (d) {
                return d / 2
            })
            .attr('width', chartWidth / values.length - 10)
            // Set data point x and y positions
            .attr('x', function (d, i) {
                return i * (chartWidth / values.length)
            })
            .attr('y', function (d) {
                return chartHeight - 15 - d / 2
            });

        svg.selectAll("text")
            .data(years)
            .enter().append("text")
            .text(function (d) {return d})
            .attr('x', function (d, i) {return i * (chartWidth / values.length)})
            .attr('y', chartHeight);

    }
init();
}


//////// 04.11.2017 ////////  EURO DATE       CHANGES ON HOLD
//////// 05.11.2017 ////////   EURO DATE       CHANGES ON HOLD

//
//
// function plot_area() {
//     if(chart) {             // TODO: REVISE IF CONFLICT
//     chart.remove()}         // TODO: REVISE IF CONFLICT
//     console.log(chart);     // TODO: REVISE IF CONFLICT
//
//     var config = {};
//     config.query = {};
//     config.number_of_rows = 10;
//     config.query.select = ['code'];
//
//     // Plots the data as an area chart
//     chart = StackedBar()
//         .width(1230)            /* 820  original*/
//         .height(675)            /* 450  original*/
//         .columns(data.columns)
//         .config(config)
//         .margin({top: 30, right: 20, bottom: 20, left: 60})
//         .x(d3.scale.ordinal())
//         .y(d3.scale.linear());
//
//
//     // console.log("Data:")
//     // console.log(data['data']);
//     d3.select("#two_panini").datum(data).call(chart);
// }
//
// plot_area();





//////// 04.11.2017 ////////   SLIDER BAR     EURO DATE       PREVIOUS CODE ON HOLD

// function filter_date(min, max) {
//
//     let newData = [];
//     $.each(data.data, function (index, bar) {     /* for each to find the date via the data key */
//
//         let newbar = Object();
//         $.each(bar, function (year, value) {      /* for loop within a for loop to extract */
//             if (year >= min && year <= max) {
//                 newbar[year] = year;
//                 newbar[value] = value;
//             }
//             newData.push(newbar)
//         });
//     });
//     data = newData;
//     // Redefining 'data' here may cause problems. 'data' variable does not enter, unless global
//     console.log(data);
// }
//
//
// $("#slider-range").slider({
//     range: true,
//     step: 1,
//     min: start_year,
//     max: end_year,
//     values: [start_year, end_year],
//
//     slide: function (event, ui) {
//         $("#year_range").val(ui.values[0] + ' - ' + ui.values[1]);
//         },
//
//     stop: function (event, ui, ) {               // Should replace with the onSliderStop function?
//         console.log('Slider dropped');
//
//         // $("svg").empty();                    // 24.08.17: Literally empties the chart; unused.
//         // master_refresh(ui.values[0], ui.values[1]);
//         plot_area();
//         // plot_area(data);
//         filter_date(ui.values[0], ui.values[1]);  //previous ver: 24.08.17
//         },
//
// });

//////// 04.11.2017 ////////  EURO DATE       PREVIOUS CODE ON HOLD


// ------------JQUERY ORIGINAL EXAMPLE FOLLOWED------------------//
// https://jqueryui.com/slider/#range
//
// function chart() {
//
//     $("#slider-range").slider({
//       range: true,
//       min: 1975,
//       max: 2015,
//       values: [1975, 2015],
//       slide: function(event, ui) {
//         $("#amount").val(ui.values[0] + " - " + ui.values[1]);
//         chart.xAxis[0].setExtremes(ui.values[0] - 1975, ui.values[1] - 1975)
//       },
//         stop: function (event, ui) {
//             console.log('Slider dropped');
//             // $("svg").empty();
//             // plot_area();
//
//             $("#amount").val($("#slider-range").slider("values", 0) +
//                 " - " + $("#slider-range").slider("values", 1));
//         }
// });



function StackedBar() {

    var margin = {top: 0, right: 5, bottom: 20, left: 50},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var duration = 1000;

    var color = d3.scale.ordinal();
        // .domain(d3.keys(data[0]).filter(function(key) { return key === "name"; }));

        // .domain("FDI", "GDP", "GNI", "IP");
        // .domain([d3.rgb("#45879B"), d3.rgb("#80D3ED"), d3.rgb("#F0AD4E"), d3.rgb("#678EC4")]);

    x = d3.scale.ordinal().range([0, width]);
    y = d3.scale.linear().range([height, 0]);


    var columns;
    var config;

    var x_voronoi = d3.scale.linear();
    var y_voronoi = d3.scale.linear();

    // var color = d3.scale.category20();
    var xAxis = d3.svg.axis();
    var yAxis = d3.svg.axis();


    var stack_area = d3.svg.area()
    //  .interpolate("basis")
        .x(function (d) {
            return x(d.x);
        })
        .y0(function (d) {
            return y(d.y0);
        })
        .y1(function (d) {
            return y(d.y0 + d.y);
        });

    var line = d3.svg.line()
        .interpolate("linear")
        .x(function (d) {
            return x(d.x) + x.rangeBand() / 2.0;
        })
        .y(function (d) {
            return y(d.y);
        });


    var stack = d3.layout.stack()
        .values(function (d) {
            return d.values;
        })
        .x(function (d) {
            return (d.x);
        })
        .y(function (d) {
            return (d.y);
        });

    var prepare_data = function (data) {

        var key_columns = _.filter(columns, function (c) {
            return c.type === 'object'
        });
        var key_values = _.intersection(_.map(columns, 'name'),
            config.query.select);
        var x_values = _.difference(_.map(columns, 'name'),
            config.query.select.concat(['total']));


        // Returns the key for each row
        var get_key = function (row) {
            var values = _.map(key_values, function (c) {
                return row[c];
            });
            // console.log(values);
            return _.join(values, "::");
        };

        var display_data = _.filter(data.data, function (item) {
            return item;
        });
        display_data = display_data.slice(0, config.number_of_rows);

        //console.log(display_data);

        var tmp = display_data.map(function (row) {
            // console.log(row);
            var name = get_key(row);
            //  var name =
            var values = x_values.map(function (key) {
                var y_val = +_.get(row, key, 0);
                if (isNaN(y_val) === true) {
                    y_val = 0;
                }
                return {
                    'y': y_val,
                    'x': key,
                    'name': name
                }
            });
            values = _.sortBy(values, function (o) {
                return o.x;
            });
            return { 'indicator_type': name, 'values': values};
        });

        return tmp;
    };

    var prepare_total = function (data) {

        var x_values = _.difference(_.map(columns, 'name'),
            config.query.select.concat(['total']));

        var totals = x_values.map(function (col) {
            return {'col': col, 'total': 0};
        });

        var totals_map = _.chain(totals)
            .keyBy('col')
            .mapValues('total')
            .value();

        //console.log("totals", JSON.stringify(totals_map));

        data.forEach(function (row) {
            row.values.forEach(function (item) {
                key = item['x'];
                totals_map[key] = totals_map[key] + item['y'];
            });
        });

        //console.log("totals", JSON.stringify(totals_map));

        var totals_list = x_values.map(function (key) {
            return {'x': key, 'y': totals_map[key]};
        });

        return {'name': 'total', 'values': totals_list};
    };

    var barStack = function (d) {
            // debugger
            // debugger
            var l = d[0].length;               /*07.31.17: TODO: Note prev.: var l = d[0].length*/
            while (l--) {
                var posBase = 0, negBase = 0;
                d.forEach(function (d) {
                    d = d[l];
                    d.size = Math.abs(d.y);
                    if (d.y < 0) {
                        d.y0 = negBase;
                        negBase -= d.size
                    } else
                    {
                        d.y0 = posBase = posBase + d.size
                    }
                })
            }
            return d
        };

    const simpleColors = ["#45879B", "#80D3ED", "#f0AD4E", "#678EC4"];

    // PREPARES chart for rendering with colors, labels, and all X, Y coordinates for SVG
    function chart(selection) {
        selection.each(function (tmp) {

            //begining of call()
            var data = prepare_data(tmp);
            //  pos_data = _.filter(tmp, function(item))
            var total = prepare_total(data);
            console.log(data);
            // 1. Flatten the data....   TODO: Rewrite as a for loop.
            var flatten = data.map(function (obj) {
                if(obj === data[0]){
                   return obj.values.map(function (item) {
                            // console.log(obj);
                            item.color = simpleColors[0];
                            return item;
                        });
                } else if(obj === data[1]){
                   return obj.values.map(function (item) {
                            // console.log(obj);
                            item.color = simpleColors[1];
                            return item;
                        });
                } else if(obj === data[2]){
                   return obj.values.map(function (item) {
                            // console.log(obj);
                            item.color = simpleColors[2];
                            return item;
                        });
                } else if(obj === data[3]) {
                    return obj.values.map(function (item) {
                        // console.log(obj);
                        item.color = simpleColors[3];
                        return item;
                    });
                };
            });




            barStack(flatten);
            flatten = _.flatten(flatten)
            var y_flat_values = _.map(flatten, function (item) {
                return item.y0 - item.size;
            });
            //console.log(y_flat_values);

            var y_values = _.map(total['values'], 'y');
            var x_values = _.map(total['values'], 'x');

            y.domain(d3.extent(y_flat_values.concat(y_values))).range([height, 0]);
            x.domain(x_values).rangeRoundBands([width, 0], .1);
            /* prev: ([0, width], .1); 07.06.17    */
            // var y = d3.scale.linear()
            //     .range([h, 0]);

            yAxis.scale(y)
                .orient("left")
                .tickFormat(d3.format("s"));

            xAxis.scale(x).orient("bottom");

            d3.select(this).selectAll("svg").remove();

            svg = d3.select(this).selectAll("svg").data([data])                 // TODO: Global variable for SVG
                  // .attr("data-legend",function(d) { return d.name});

            var gEnter = svg.enter().append("svg").append("g");

            svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            gEnter.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            // Add the groups for axis and main plot
            gEnter.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")");

            gEnter.append("g")
                .attr("class", "axis axis--y");

            // This is the
            gEnter.append("g")
                .attr("class", "bars");

            gEnter.append("g")
                .attr("class", "total");

            gEnter.append("g")
                .attr("class", "totalpoints");

            // add the tool tip
            gEnter.append("g")
                .attr("class", "focus")
                .style("display", "none")


            // Main group translate everything above...
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // add the axis..
            g.select(".axis--y").call(yAxis);
            g.select(".axis--x").call(xAxis);



            //----------- This is for the tool tip --------------------------

            var focus = g.select(".focus");
            focus.select("foreignObject").remove();
            focus.select("circle").remove();

            focus.append("foreignObject")
                .attr("width", 200)
                .attr("height", 100)
                .attr("x", 20)      // TODO: Change tooltip to appear directly above the object on  mouse-over
                .attr("y", 50)
                .append("xhtml:body")
                .html("");


            focus.append("circle")
                .style("fill", "none")
                .style("stroke", "#aaff32")
                .attr("r", 4);




            //==============================================================
            // Enter
            //==============================================================

            // Add bars...
            var bars_enter = g.select(".bars")
                .selectAll("rect")
                .data(flatten);


            //==============================================================
            // Legend
            // =============================================================

            let legend_indicators = ["FDI", "GDP", "GNI", "IP"];
            // let legend_indicators = ["FDI/ IDE", "GDP/PIL", "GNI/PNL", "IP"];    TODO: Fai la traduzione in Italiano.


            let colorize = d3.scale.ordinal()
                .domain(legend_indicators)
                .range(simpleColors)


            let legend = svg.selectAll(".legend")
                .data(legend_indicators)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i)
                { return "translate(-999," + i * 20 + ")"; });  //where -1000 is x value // TODO: Restart here 3/11/2017
                // // .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


                legend.append("rect")
                .attr("x", width - 20)
                .attr("width", 25)
                .attr("height", 15)
                .style("fill", colorize)
                .style("stroke", "#aaff32");

                legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                // .text(indicator_type, "FDI")         // TODO: Follow up/clean up references to 'indicator_type'
                .text(function (d) { return d; });


            bars_enter.enter()
                .append("rect")
                .attr("x", function (d) {
                    return x(d.x);
                })
                .attr("y", function (d) {
                    return y(d.y0)
                })
                .attr("height", function (d) {
                    return y(0) - y(d.size)
                })
                .attr("width", x.rangeBand())
                .style("fill-opacity", 0.7)
                .style("fill", function (d) {
                    return d.color;
                });

            // Add a total...
            var total_enter = g.select(".total")
                .selectAll("path")
                .data([total]);

            total_enter.enter()
                .append('path')
                .attr('d', function (d) {
                    return line(d.values);
                })
                .attr('fill', 'none')
                .attr('stroke', "grey");

            var total_pts_enter = g.select(".total")
                .selectAll("path")
                .data(total.values);

            total_pts_enter.enter()
                .append('circle')
                .attr("cx", function (d) {
                    return x(d.x) + x.rangeBand() / 2.0;
                    ;
                })
                .attr("cy", function (d) {
                    return y(d.y);
                })
                .attr("r", 6)
                .style("fill", "none");


            bars_enter.on("mouseover", function (d) {

                var info = d.name.split("::");

                var txt = "<strong>" + info + "</strong><br>"
                txt += Math.round(d.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");        // Review regex

                var fo = focus.select("foreignObject")                  // Tool tip / tooltip link to foreignObject
                fo.html(txt);

                if (x(d.x) > width - 150) {
                    fo.attr("x", -150);
                }
                else if (x(d.x) < 150) {
                    fo.attr("x", 20);
                }
                else {
                    fo.attr("x", 10);
                }

                if (y(d.y) > height - 50) {
                    fo.attr("y", -50);
                }
                else {
                    fo.attr("y", 0);
                }


                var x_val = x(d.x) + x.rangeBand() / 2.0;
                //console.log(x_val);
                focus.attr("transform", "translate(" + x_val + "," + y(d.y0) + ")");
                focus.attr("transform", "translate(" + 20 + "," + 20 + ")");
                focus.style("display", null);
            });


            bars_enter.on("mouseout", function (d) {
                focus.style("display", "none");
            });

        });
    }


    chart.duration = function (_) {
        if (!arguments.length) return duration;
        duration = _;
        return chart;
    };

    chart.x = function (_) {
        if (!arguments.length) return x;
        x = _;
        return chart;
    };

    chart.y = function (_) {
        if (!arguments.length) return y;
        y = _;
        return chart;
    };

    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.columns = function (_) {
        if (!arguments.length) return columns;
        columns = _;
        return chart;
    };

    chart.config = function (_) {
        if (!arguments.length) return config;
        config = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _ - margin.left - margin.right;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _ - margin.top - margin.bottom;
        return chart;
    };

    return chart;
}

// ===========================================

// function plot_area(){

// var data = {
//     "data": [{
//         "Jun-15": "121037.84",
//         "Feb-16": "128654.97",
//         "Sep-15": "327144.14",
//         "Dec-15": "70287.96",
//         "May-15": "330889.42",
//         "Apr-16": "-305371.47",
//         "Mar-16": "83448.15",
//         "Oct-15": "235907.99",
//         "Jul-15": "225017.75",
//         "Aug-15": "618267.31",
//         "Jan-16": "24202.15",
//         "Nov-15": "-38382.18",
//         "total": "1821104.03",
//         "store": "c50225b0-1bd7-11e6-b5ff-3c15c2ceba18"
//     }, {
//         "Jun-15": "71667.02",
//         "Feb-16": "-4521.41",
//         "Sep-15": "217698.23",
//         "Dec-15": "153158.91",
//         "May-15": "216405.16",
//         "Apr-16": "169519.15",
//         "Mar-16": "310741.99",
//         "Oct-15": "83193.77",
//         "Jul-15": "87451.82",
//         "Aug-15": "155406.29",
//         "Jan-16": "99839.93",
//         "Nov-15": "167235.81",
//         "total": "1727796.67",
//         "store": "c50227b8-1bd7-11e6-92b9-3c15c2ceba18"
//     }, {
//         "Jun-15": "12702.2",
//         "Feb-16": "55324.7",
//         "Sep-15": "18429.2",
//         "Dec-15": "34066.9",
//         "May-15": "26651.2",
//         "Apr-16": "51752.78",
//         "Mar-16": "22454.35",
//         "Oct-15": "52433.55",
//         "Jul-15": "18721.4",
//         "Aug-15": "34650.2",
//         "Jan-16": "-6776.4",
//         "Nov-15": "11745.6",
//         "total": "332155.68",
//         "store": "c50228ee-1bd7-11e6-9046-3c15c2ceba18"
//     }, {
//         "Jun-15": "51609.74",
//         "Feb-16": "243.0",
//         "Sep-15": "138224.38",
//         "Dec-15": "139201.6",
//         "May-15": "33116.53",
//         "Apr-16": "-47466.9",
//         "Mar-16": "13914.95",
//         "Oct-15": "-38011.5",
//         "Jul-15": "17790.34",
//         "Aug-15": "45911.78",
//         "Jan-16": "24940.8",
//         "Nov-15": "-159685.35",
//         "total": "219789.37",
//         "store": "c50229f3-1bd7-11e6-b01e-3c15c2ceba18"
//     }, {
//         "Jun-15": "12918.0",
//         "Feb-16": "24092.4",
//         "Sep-15": "36912.0",
//         "Dec-15": "6258.0",
//         "May-15": "21288.0",
//         "Apr-16": "25423.6",
//         "Mar-16": "-65140.2",
//         "Oct-15": "30888.0",
//         "Jul-15": "33694.0",
//         "Aug-15": "29106.0",
//         "Jan-16": "-7750.2",
//         "Nov-15": "-1644.0",
//         "total": "146045.6",
//         "store": "c5022b00-1bd7-11e6-8333-3c15c2ceba18"
//     }, {
//         "Jun-15": "973.7",
//         "Feb-16": "-6614.5",
//         "Sep-15": "31483.6",
//         "Dec-15": "366.0",
//         "May-15": "-19632.38",
//         "Apr-16": "-38351.7",
//         "Mar-16": "2917.6",
//         "Oct-15": "24090.2",
//         "Jul-15": "42682.4",
//         "Aug-15": "51494.3",
//         "Jan-16": "22185.3",
//         "Nov-15": "31163.0",
//         "total": "142757.52",
//         "store": "c5022bf0-1bd7-11e6-9700-3c15c2ceba18"
//     }, {
//         "Jun-15": "6887.63",
//         "Feb-16": "-23236.74",
//         "Sep-15": "-37711.16",
//         "Dec-15": "-9001.84",
//         "May-15": "-667.29",
//         "Apr-16": "-7124.76",
//         "Mar-16": "-3702.68",
//         "Oct-15": "-6291.57",
//         "Jul-15": "3193.22",
//         "Aug-15": "62605.48",
//         "Jan-16": "-12853.37",
//         "Nov-15": "9609.76",
//         "total": "-18293.32",
//         "store": "c5022cc2-1bd7-11e6-86f8-3c15c2ceba18"
//     }],
//     "columns": [
//      {"type": "object", "name": "store", "order": "0"},
//      {"type": "float64","name": "May-15","order": "1"},
//      {"type": "float64", "name": "Jun-15", "order": "2"},
//      {"type": "float64", "name": "Jul-15", "order": "3"},
//      {"type": "float64", "name": "Aug-15", "order": "4"},
//      {"type": "float64", "name": "Sep-15", "order": "5"},
//      {"type": "float64", "name": "Oct-15", "order": "6"},
//      {"type": "float64", "name": "Nov-15", "order": "7"},
//      {"type": "float64", "name": "Dec-15", "order": "8"},
//      {"type": "float64", "name": "Jan-16","order": "9"},
//      {"type": "float64", "name": "Feb-16", "order": "10"},
//      {"type": "float64", "name": "Mar-16", "order": "11"
//      {"type": "float64", "name": "Apr-16", "order": "12"},
//      {"type": "float64", "name": "total", "order": "13"}]
// };


/*----------> A LEGEND APPEARS HERE<----------*/

//     var legend = svg.selectAll(".legend")
//         .data(color.domain().slice().reverse())
//         .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function (d, i) {
//             return "translate(0," + i * 20 + ")";
//         });
//
//     legend.append("rect")
//         .attr("x", w - 18)
//         .attr("y", 4)
//         .attr("width", 10)
//         .attr("height", 10)
//         .style("fill", color);
//
//     legend.append("text")
//         .attr("x", w - 24)
//         .attr("y", 9)
//         .attr("dy", ".35em")
//         .style("text-anchor", "end")
//         .text(function (d) {
//             return d; });
//
//
// var labels = svg.append("g")
//        .attr("class","labels")
//
//   labels.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("x", 50)
//       .attr("y", -20)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Economic Indicator");
//
//   var title = svg.append("g")
//       .attr("class","title")
//
//   title.append("text")
//       .attr("x", (w / 2))
//       .attr("y", -30 )
//       .attr("text-anchor", "middle")
//       .style("font-size", "22px")
//       .text("A Stacked Bar Chart");
//



/////  ON HOLD 05.11.2017 /////

// function plot_area() {
//     // if(chart) {
//     // chart.remove()}
//     // console.log(chart);
//
//     var config = {};
//     config.query = {};
//     config.number_of_rows = 10;
//     config.query.select = ['code'];
//
//     // Plots the data as chart by calling function StackedBar()
//     chart = StackedBar()
//         .width(1230)            /* 820  original*/
//         .height(675)            /* 450  original*/
//         .columns(data.columns)
//         .config(config)
//         .margin({top: 30, right: 20, bottom: 20, left: 60})
//         .x(d3.scale.ordinal())
//         .y(d3.scale.linear());
//
//
//     // console.log("Data:")
//     // console.log(data['data']);
//     d3.select("#two_panini").datum(data).call(chart);
//
// }
//
// plot_area();

/////  ON HOLD 05.11.2017 /////




//
// function master_refresh(min, max) {
// // //     // Purpose: Culminate and capture the call to the chart building functions previous
// // //     // take in the start_date, end_year
// // //     // call plot_area() with an input of the subset of the data
// // //     // reference the global?
// // //     // as result of the ajax call
// // //     // how to call the range slider? TODO: Determine dates min and max as variables to be passed, not hardcoded as below
// // //
// // //
// //     filter_date(min, max);
// //     plot_area();
//
// }
//
// master_refresh(2000, 2001);




// // 08.01.2017: TODO: Redefine xAxis as a global variable.
//
//     xAxis.tickValues(ticks);    // TODO: How to include #year_range data here.
//
//     t.select(".x.axis").call(xAxis);
//     t.select('.path').attr("d", chart(data));
//   }
//
//   $(function() {
//         $("#slider-range").slider({
//             range: true,
//             min: 1975,
//             max: 2015,
//             values: [ 1975, 2015 ],
//
//
//             slide: function( event, ui ) {
//               var start_year = d3.min([ui.values[0], data.length]);
//               var end_year = d3.max([ui.values[1], 0]);
//
//               console.log("start_year:", start_year, "end_year:", end_year);
//               zoom(start_year, end_year);
//             }
//         });
//     });
