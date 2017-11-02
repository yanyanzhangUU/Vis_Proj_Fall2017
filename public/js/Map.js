/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor(allData) {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);
	this.allData = allData;
    }
    /**
     * Function that clears the map
     */
    clearMap() {


    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap() {

 
	
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {


        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

	d3.json("data/world.json", function(error, json) {
	    if (error) throw error;
	    var countries = topojson.feature(json, json.objects.countries);

	    let map = d3.select("#map");
	    let path = d3.geoPath()
		    .projection( d3.geoConicConformal().scale(150).translate([400, 350]));
	    
	    map.selectAll(".countries")
		.data(countries.features)
		.enter().append("path")
		.attr("class", function(d){return "countries "+d.id;})
		.attr("d", path);

	    map.append("path")
		.datum(topojson.mesh(json, json.objects.countries, function(a, b) { return a !== b && a.id !== "IRL"; }))
		.attr("d", path)
		.attr("class", "path");
	    
	    let graticule = d3.geoGraticule();
             d3.select("#map").append('path',"#graticule")
		.datum(graticule)
		.attr('class', "grat")
		.attr('d', path)
		.attr('fill', 'none');
	});
    }


}
