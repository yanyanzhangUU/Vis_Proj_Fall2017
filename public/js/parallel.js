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
    }

    clearCoor() {
        this.svg.selectAll("g").remove();
    }
    // draw parallel coordinates for a country
    drawCoord(cntrydata) {
        this.clearCoor();
        // Extract the list of dimensions and create a scale for each.
        // let x = d3.scale.ordinal().rangePoints([0, this.width], 1);
        let that = this;
        let x = d3.scalePoint().range([0, this.width]);
        let y = {};
        let dragging = {};
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

        let selectthis = d3.select(this);
        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); });
        g.append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; })
            .classed("dimName", true);

        let oldposi = dimensions.map(d=>position(d));
        // console.log("old positions ", oldposi);

        g.call(d3.drag()
                .subject(function(d) { return {x: x(d)}; })
                .on("start", function(d) {
                    dragging[d] = x(d);
                    background.attr("visibility", "hidden");
                })
                .on("drag", function(d) {
                    dragging[d] = Math.min(that.width, Math.max(0, d3.event.x));
                    foreground.attr("d", path);
                    dimensions.sort(function(a, b) { return position(a) - position(b); });
                    x.domain(dimensions);
                    console.log("transform ", d, position(d));
                })
                .on("end", function(d) {
                    delete dragging[d];
                    transition(g).attr("transform", d => "translate("+ x(d) + ", 0)");
                    transition(foreground).attr("d", path);
                    background
                        .attr("d", path)
                        .transition()
                        .delay(500)
                        .duration(0)
                        .attr("visibility", null);
                }));


        // Add and store a brush for each axis.  d3.svg.brush().y(y[d])
        let brushWidth = 30;

        g.append("g")
            .attr("class", "brush")
            .each(function(d) {
                d3.select(this)
                    .call(y[d].brush = d3.brushY()
                        .extent([[-brushWidth/2, y[d].range()[1]], [brushWidth/2, y[d].range()[0]]]).on("end", brush)); })  //on('brush'
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);

        function position(d) {
            let v = dragging[d];
            return v === undefined ? x(d) : v; // || isNaN(v)
        }

        function transition(g) {
            return g.transition().duration(500);
        }

        // Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {

            let actives = [];
            that.svg.selectAll(".brush")
                .filter(function(d) {
                    return d3.brushSelection(this);
                })
                .each(function(d) {
                    actives.push({
                        dimension: d,
                        extent: d3.brushSelection(this)
                    })}); // (d => console.log(d3.brushSelection(this)))
            console.log("actives ", actives);

            foreground.style("display", function(d) {
                return actives.every(function(p, i) {
                    let axis_name = p.dimension;
                    let pic_interval = p.extent;
                    let value = parseFloat(d[axis_name]);
                    let interval = pic_interval.map(y[axis_name].invert);
                    return interval[1] <= value && value <= interval[0];
                }) ? null : "none";
            });


        }

        // to do:
        // generate one csv for each country in Python??? What attributes to select?
    }

}