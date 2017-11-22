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
    updateMap(info, type, year, cluster) {
	if(info==null){
	    d3.select("#map").selectAll(".alertinfo").remove();
	    let map = d3.select("#map");
	    let c=map.selectAll(".countries");
	    map.append("text")
		.text("Please select one info type from selection bar!")
		.attr("dx", 400)
		.attr("dy", 250)
		.attr("class", "alertinfo");
	}
	else if(year==null){
	    d3.select("#map").selectAll(".alertinfo").remove();
	    let map = d3.select("#map");
	    let c=map.selectAll(".countries");
	    map.append("text")
		.text("Please select a year from the year chart below!")
		.attr("dx", 400)
		.attr("dy", 250)
		.attr("class", "alertinfo");
	    
	    
	}
	else{
	    cluster.updateCluster(type, year);
	    d3.select("#map").selectAll(".alertinfo").remove();
	    d3.select("#map").selectAll(".alertrec").remove();
	    d3.select("#map").selectAll(".mapinfo").remove();
	    let selected_year = year;
	    let domain = [];
	    let range =[];
	    let lginfo=[];
	    let mapinfo=[];
	    switch(type){
	    case 'PT':
		domain = [0, 5000000, 10000000, 20000000, 40000000, 100000000, 1000000000];
		range = ["#D2D8DE", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];
		lginfo = "(in millions)";
		mapinfo = "Total Population";
		break;
	    case 'BR':
		domain = [0, 10, 20, 30, 40, 50];
		range = ["#c6dbef", "#9ecae1","#6baed6", "#3182bd", "#08519c", "#063e78"];
		lginfo = "(per 1000 people)";
		mapinfo="Birth Rate";
		break;
	    case 'DR':
		domain = [0, 5, 10, 15, 20, 25];
		range = ["#d9d9d9","#dadaeb","#bcbddc","#9e9ac8", "#756bb1", "#54278f"];
		lginfo = "(per 1000 people)";
		mapinfo="Death Rate";
		break;
	    case 'LE':
		domain = [20, 30, 40, 50, 60, 70, 80];
		range = ["#edf8fb", "#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"];
		lginfo = "(years)";
		mapinfo="Life Expectancy";
		break;
	    default:
		break;
	    }
	    this.colorScale = d3.scaleThreshold()
		.domain(domain)
		.range(range);
	    
	    let legend=[];
	    for(let i=0;i<domain.length-1;i++){
		if(type=="PT")
		    legend.push([[domain[i]/1000000+" - "+(domain[i+1]/1000000-0.1), range[i]]]);
		else
		    legend.push([[domain[i]+" - "+(domain[i+1]-0.1), range[i]]]);
	    }
	    if(type=="PT")
		legend.push([[domain[domain.length-1]/1000000+" +",range[domain.length-1]]]);
	    else
		legend.push([[domain[domain.length-1]+" +",range[domain.length-1]]]);
	    legend[0][0][0] = "Missing data";
	    legend[0][0][1] = "#d9d9d9";
	    
	    let worldmap=this;
	    let map = d3.select("#map");
	    let c=map.selectAll("rect")
		    .data(legend);
	    let countries = map.selectAll(".countries")
		    .each(function(d){
			let country = d3.select(this)._groups[0];
			for(var i=0; i<info.length; i++)
			    if(country[0].getAttribute("class") == ("countries "+info[i]["Country Code"])){
				d3.select(this)
				    .style("fill",(worldmap.colorScale(parseInt(info[i][selected_year+" [YR"+selected_year+"]"]))));}
			   
		    });
	    map.append("text")
		.text(function(d){return selected_year+" World Map";})
		.attr("dx", 530)
		.attr("dy", 480)
		.style("font-size", "42px")
	    	.style("fill", function(d){
		    return range[5];})
	        .style("stroke-width", "1px")
		.style("opacity", ".3")
		.attr("class", "mapinfo");
	    
	    map.append("text")
		.text(function(d){return mapinfo;})
		.attr("dx", 550)
		.attr("dy", 500)
		.style("font-size", "38px")
	    	.style("fill", function(d){
		    return range[5];})
	        .style("stroke-width", "10px")
		.style("opacity", ".8")
		.attr("class", "mapinfo");

	    map.append("text")
		.text("Legend")
		.attr("dx", 10)
		.attr("dy", 20)
		.style("font-size", "30px")
		.style("fill", function(d){
		    return range[5];})
		.style("stroke-width","1px")
		.attr("class", "mapinfo");
	    
	    map.append("text")
		.text(lginfo)
		.attr("dx", 10)
		.attr("dy", 45)
		.attr("class", "mapinfo");

	    c.enter().append("rect")
		.attr("x", 10)
		.attr("y", function(d, i){
		    return 60+30*i;})
		.attr("height", 20)
		.attr("width",20)
		.style("fill", function(d){return d[0][1];})
		.attr("class", "mapinfo");
	    
	    c.enter().append("text")
		.text(function(d){return d[0][0];})
		.attr("dx", function(d,i){
		    if(i==0)
			return 40;
		    return 40;
		})
		.attr("dy", function(d, i){
		    return 75+30*i;})
		.style("font-size", "16px")
		.attr("class", "mapinfo");

	    
	}
	
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world, parallel, lineChar) {


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
		.attr("d", path)
            .on("click",function (d) {
                // steps:
                // 1. make Population_total=[] ... lists to be global (window.)
                // 2. combine these 4 lists to be one dataset that is only for the selected country with id d.id only from 1960~2015
                // 3. pass the new list to parallel.js
                d3.selectAll(".highlighted").classed("highlighted", false);
                d3.select(this).classed("highlighted", true);

                let rawCntryData = [];
                rawCntryData = cntryRow(Population_total, d.id, rawCntryData);
                rawCntryData = cntryRow(Birth_rate, d.id, rawCntryData);
                rawCntryData = cntryRow(Death_rate, d.id, rawCntryData);
                rawCntryData = cntryRow(Life_expectancy, d.id, rawCntryData);

                d3.select("#selectedCntry").text("Country: "+rawCntryData[0]["Country Name"]).classed("cntry", true)
                    .style("font-weight", 'bold')
                    .style("font-size", "18px");

                let coorData = [];
                for (let year=1960; year<=2015; year++) {
                    coorData.push({"year": year, "Total Population": rawCntryData[0][year+' [YR'+year+']'],
                        "Birth Rate": rawCntryData[1][year+' [YR'+year+']'],
                        "Death Rate": rawCntryData[2][year+' [YR'+year+']'],
                        "Life Expectancy": rawCntryData[3][year+' [YR'+year+']']});
                }
                parallel.drawCoord(coorData);

                // add the line chart
                let active=d3.select("#SelectedAttribute").node().value;
                // console.log("qc active", active, rawCntryData);
                if (active === "anscombe_I") {
                    lineData.push(rawCntryData[0]);
                } else if (active === "anscombe_II") {
                    lineData.push(rawCntryData[1]);
                    // console.log("push?? ", rawCntryData[1], lineData);
                } else if (active === "anscombe_III") {
                    lineData.push(rawCntryData[2]);
                } else {
                    lineData.push(rawCntryData[3]);
                }

                lineChar.drawLines(lineData);
            });

	    map.append("path")
		.datum(topojson.mesh(json, json.objects.countries, function(a, b) { return a !== b && a.id !== "IRL"; }))
		.attr("d", path)
		.attr("class", "path");
	    

	    map.append("rect")
		.attr("x", 150)
		.attr("height",70)
		.attr("y", 210)
		.attr("width", 500)
		.attr("class", "alertrec");

	    map.append("text")
		.text("Please select a pair of info type and year!")
		.attr("dx", 400)
		.attr("dy", 250)
		.attr("class", "alertinfo");

	});

	

	function cntryRow(list, id, rawCntryData) {
	    // console.log("before pushing ", list, id, rawCntryData);
	    list.forEach(function (row) {
            if (row["Country Code"] === id) {
                rawCntryData.push(row);
                // console.log("inside if ", row);
            }
        });
	    // console.log("after pushing ", rawCntryData);
	    return rawCntryData;
    }

    }


}
