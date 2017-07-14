/**
 * Created by michaelevan on 7/3/17.
 */

"use strict";

// var data;


function barStack(d) {
var l = d[0].length
while (l--) {
	var posBase = 0, negBase = 0;
	d.forEach(function(d) {
		d=d[l]
		d.size = Math.abs(d.y)
		if (d.y<0)  {
			d.y0 = negBase
			negBase-=d.size
		} else
		{
			d.y0 = posBase = posBase + d.size
		}
	})
}
d.extent= d3.extent(d3.merge(d3.merge(d.map(function(e) { return e.map(function(f)
{ return [f.y0,f.y0-f.size]})}))))
return d
}

/* Here is an example */

var data = [[{y:3},{y:6},{y:-3}],
		[{y:4},{y:-2},{y:-9}],
		[{y:10},{y:-3},{y:4}]]


var  h=500
,w=500
,margin=10
,color = d3.scale.category10()

,x = d3.scale.ordinal()
	.domain(['abc','abc2','abc3'])
	.rangeRoundBands([margin,w-margin], .1)

,y = d3.scale.linear()
	.range([h-margin,0+margin])

,xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(6, 0)
,yAxis = d3.svg.axis().scale(y).orient("left")

barStack(data)
y.domain(data.extent)

svg = d3.select("body")
.append("svg")
.attr("height",h)
.attr("width",w)

svg.selectAll(".series").data(data)
.enter().append("g").classed("series",true).style("fill", function(d,i) { return color(i)})
	.selectAll("rect").data(Object)
	.enter().append("rect")
		.attr("x",function(d,i) { return x(x.domain()[i])})
		.attr("y",function(d) { return y(d.y0)})
		.attr("height",function(d) { return y(0)-y(d.size)})
		.attr("width",x.rangeBand())

svg.append("g").attr("class","axis x").attr("transform","translate (0 "+y(0)+")").call(xAxis)
svg.append("g").attr("class","axis y").attr("transform","translate ("+x(margin)+" 0)").call(yAxis)
