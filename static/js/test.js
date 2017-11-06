


let chart;              // ADDED 04.11.2017


function plot_area() {
    if(chart) {             // TODO: REVISE IF CONFLICT
    chart.remove()}         // TODO: REVISE IF CONFLICT

    var config = {};
    config.query = {};
    config.number_of_rows = 10;
    config.query.select = ['code'];

    // Plots the data as an area chart
    chart = StackedBar()
        .width(1230)            /* 820  original*/
        .height(675)            /* 450  original*/
        .columns(data.columns)
        .config(config)
        .margin({top: 30, right: 20, bottom: 20, left: 60})
        .x(d3.scale.ordinal())
        .y(d3.scale.linear());

    // console.log(data['data']);
    d3.select("#two_panini").datum(data).call(chart);
}

plot_area();