// create parallel coordinates
class ParaCoordinates {
    constructor() {
        // this.data = data;

        // Initializes the svg elements required for this chart
        this.margin = {top: 30, right: 10, bottom: 10, left: 10};

        let parallelChart = d3.select("#parallelcoord").classed("fullView", true);

        //fetch the svg bounds
        this.svgBounds = parallelChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 600;

        //add the svg to the div
        this.svg = parallelChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .append("g")
            .attr("transform", "translate(" + 6*this.margin.left + "," + this.margin.top + ")");

        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        // let svg = d3.select("body").append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    // draw parallel coordinates for a country
    drawCoord(cntrydata) {
        // Extract the list of dimensions and create a scale for each.
        // let x = d3.scale.ordinal().rangePoints([0, this.width], 1);
        let that = this;
        let x = d3.scalePoint().range([0, this.width]);
        let y = {};
        // let line = d3.svg.line(),
        //     axis = d3.svg.axis().orient("left"),
        let line = d3.line(),
            axis = d3.axisLeft(),
            background,
            foreground;

        let dimensions;
        x.domain(dimensions = d3.keys(cntrydata[0]).filter(function(d) {
            return (y[d] = d3.scaleLinear()  //d3.scale.linear()
                .domain(d3.extent(cntrydata, function(p) { return +p[d]; }))
                .range([that.height, 0]));
        }));

        // Add grey background lines for context.
        background = this.svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(cntrydata)
            .enter().append("path")
            .attr("d", path);

        // Add blue foreground lines for focus.
        foreground = this.svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(cntrydata)
            .enter().append("path")
            .attr("d", path);

        // Add a group element for each dimension.
        let g = this.svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; });

        // Add and store a brush for each axis.  d3.svg.brush().y(y[d])
        let brushWidth = 30;
        g.append("g")
            .attr("class", "brush")
            .each(function(d) {
                // console.log("check ", y[d].range());
                d3.select(this)
                    .call(y[d].brush = d3.brushY()
                        .extent([[-brushWidth/2, y[d].range()[1]], [brushWidth/2, y[d].range()[0]]]).on("brush", brush)); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);


        // Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {
            let actives = dimensions.filter(function(p) {
                // return !y[p].brush.empty();
                return !d3.event.selection;
            }),
                extents = actives.map(function(p) { return y[p].brush.extent(); });
            foreground.style("display", function(d) {
                return actives.every(function(p, i) {
                    return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                }) ? null : "none";
            });
        }

        // to do:
        // display axis names
        // make brush work
        // generate one csv for each country in Python??? What attributes to select?


    }

}