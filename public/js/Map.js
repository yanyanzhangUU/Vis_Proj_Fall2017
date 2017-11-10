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
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(info, type, year) {
	let selected_year = 2006;
	console.log(year)
	let domain = [];
	let range =[];
	switch(type){
	case 'PT':
	    domain = [0, 5000000, 10000000, 20000000, 40000000, 100000000, 1000000000];
            range = ["#D2D8DE", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];
	    break;
	case 'BR':
	    domain = [0, 10, 20, 30, 40, 50];
	    
            range = ["#c6dbef", "#9ecae1","#6baed6", "#3182bd", "#08519c", "#063e78"];
	    break;
	case 'DR':
	    domain = [0, 5, 10, 15, 20, 25, 30];
            range = ["#f7f7f7", "#d9d9d9", "#bdbdbd", "#969696", "#636363", "#252525"];
	    break;
	case 'LE':
	    domain = [20, 30, 40, 50, 60, 70, 80];
            range = ["#edf8fb", "#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"];
	    break;
	default:
	    break;
	}
	this.colorScale = d3.scaleThreshold()
	    .domain(domain)
	    .range(range);
	
	let worldmap=this;
	let map = d3.select("#map");
	let c=map.selectAll(".countries");
	let countries = map.selectAll(".countries")
		.each(function(d){
		    let country = d3.select(this)._groups[0];
		    for(var i=0; i<info.length; i++)
			if(country[0].getAttribute("class") == ("countries "+info[i]["Country Code"])){
			    d3.select(this)
				.style("fill",(worldmap.colorScale(parseInt(info[i][selected_year+" [YR"+selected_year+"]"]))));}
			   
		});
	
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
