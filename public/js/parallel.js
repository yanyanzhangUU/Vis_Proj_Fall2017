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

        let selectedAxis = [];
        let selectedInterval = [];

        g.append("g")
            .attr("class", "brush")
            .each(function(d) {
                // console.log("check ", y[d].range());
                d3.select(this)
                    .call(y[d].brush = d3.brushY()
                        .extent([[-brushWidth/2, y[d].range()[1]], [brushWidth/2, y[d].range()[0]]]).on("end", brush)); })  //on('brush'
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);


        // Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Handles a brush event, toggling the display of foreground lines.
        function brush() {

            // // one way
            // let actives = [];
            // console.log("select ", that.svg);
            // console.log('svg axis ', that.svg.selectAll(".axis"));   //(".axis .brush"));
            // that.svg.selectAll(".axis")
            //     .filter(d => console.log(d3.brushSelection(this)))
            //     // (function(d) {
            //     //     console.log("d?1? ", d);
            //     //     console.log("selected??? ", d3.brushSelection(this));
            //     //     return d3.brushSelection(this);
            //     // })
            //     .each(function(d) {
            //         console.log("d2?? ", d);
            //         actives.push({
            //             dimension: d,
            //             extent: d3.brushSelection(this)
            //         });
            //     });
            // // console.log("qc actives ", actives);
            //
            // let selected = cntrydata.filter(function(d) {
            //     if (actives.every(function(active) {
            //             let dim = active.dimension;
            //             // test if point is within extents for each active brush
            //             console.log("active?? ", active);
            //             return dim.type.within(d[dim.key], active.extent, dim);
            //         })) {
            //         return true;
            //     }
            // });
            //
            // that.svg.selectAll(".axis")
            //     .filter(function(d) {
            //         return (actives.indexOf(d) > -1); // ? true : false;
            //     })
            //     .classed("active", true)
            //     .each(function(dimension, i) {
            //         let extent = extents[i];
            //         d3.select(this)
            //             .selectAll(".tick text")
            //             .style("display", function(d) {
            //                 let value = dimension.type.coerce(d);
            //                 return dimension.type.within(value, extent, dimension) ? null : "none";
            //             });
            //     });

            let actives = [];
            that.svg.selectAll(".brush")
                .filter(function(d) {
                    // console.log("d?1? ", d);
                    // console.log("selected??? ", d3.brushSelection(this));
                    return d3.brushSelection(this);
                })
                .each(function(d) {
                    // console.log("d2?? ", d);
                    actives.push({
                        dimension: d,
                        extent: d3.brushSelection(this)
                    })}); // (d => console.log(d3.brushSelection(this)))
            console.log("actives ", actives);

            // the other version -- simple , from v3

            //test
            // let s1 = d3.event.selection;
            // let interval = s1.map(y['Age dependency ratio, old'].invert);
            // console.log("select ", d3.brushSelection(this));
            // console.log("dim ", dimensions);

            // let actives = dimensions.filter(function(p) {
            //     // return !y[p].brush.empty();
            //     return d3.event.selection;
            //     // return d3.brushSelection(this);
            // // }),
            //     extents = actives.map(function(p) {
            //         console.log("extent  ", p, y[p].brush.extent());
            //         return y[p].brush.extent();
            //     });
            // console.log("actives?? ", actives);

            // actives = ['Age dependency ratio, old'];
            // console.log("foreground ", foreground);
            foreground.style("display", function(d) {
                // console.log("data ", d);
                return actives.every(function(p, i) {   //actives.every(function
                    // console.log("qc extents ", extents, extents[i][0], d[p]);
                    // console.log("d, p, i ", d, p, i);

                    // console.log('highlight -- ', interval[0], d[p], value, interval[1]);
                    // console.log('yes or no ', interval[0] <= d[p] && d[p] <= interval[1]);
                    // console.log("tpe ", typeof d[p], typeof value, typeof interval[0]);
                    // console.log('yes or no ', interval[1] <= value && value <= interval[0]);
                    // return extents[i][0] <= d[p] && d[p] <= extents[i][1];

                    // console.log("p i ", p, i, p.dimension, p.extent);
                    // console.log("p i ", p, i, p['dimension'], p['extent']); // the same

                    let axis_name = p.dimension;
                    let pic_interval = p.extent;
                    let value = parseFloat(d[axis_name]);
                    let interval = pic_interval.map(y[axis_name].invert);
                    // console.log(interval, value);
                    return interval[1] <= value && value <= interval[0];
                }) ? null : "none";
            });


        }

        // to do:
        // display axis names
        // make brush work
        // generate one csv for each country in Python??? What attributes to select?


    }

}