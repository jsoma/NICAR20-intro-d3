var margin = { top: 20, right: 50, bottom: 50, left: 50 }

var width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>" + d.country + ":</strong> <span style='color:red'>" + d.life_expectancy + "</span>";
  })

// You'll probably need to edit this one
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.call(tip)

var colorScale = d3.scaleOrdinal()
  .range(['red', 'orange', 
    'blue', 'green', 'purple', 
    'yellow'])

var xPositionScale = d3.scaleLinear().domain([0, 80000]).range([0,width])

var yPositionScale = d3.scaleLinear()
  .domain([0, 90])
  .range([height,0])

// Read in some external data. When we're done, run the function 'ready'
d3.csv("countries.csv").then(ready)
.catch(function(error) {
  console.log("Failed with", error)
})

function ready (datapoints) {
  console.log("Data is", datapoints)

  svg.selectAll("circle")
    .data(datapoints)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function (d) { return xPositionScale(d.gdp_per_capita) })
    .attr("cy", function (d) { return yPositionScale(d.life_expectancy) })
    .attr("fill", function(d) { return colorScale(d.continent) })
    .attr("opacity", 0.5)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  var yAxis = d3.axisLeft(yPositionScale);
  svg.append("g").attr("class", "axis y-axis").call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale)
  svg.append("g").attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
}