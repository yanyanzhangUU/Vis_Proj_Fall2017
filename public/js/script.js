    let worldMap = new Map();

    /* DATA LOADING */
    //Load in json data to make map
    d3.json("data/world.json", function (error, world) {
        if (error) throw error;
        worldMap.drawMap(world);
    });

    //yy 11/8
    let coordi = new ParaCoordinates();

    d3.csv("data/usa_tst0.csv", function (error, cntrydata) {
        coordi.drawCoord(cntrydata);
    });

//ly 11/09

let Population_total=[];
let Birth_rate=[];
let Death_rate=[];
let Life_expectancy=[];
d3.csv("data/global-population-estimates.csv", function(error, global_data){
    //console.log(global_data)
    
    for(let i =0; i< global_data.length; i++){
	if (global_data[i]["Series Name"]=="Population, total")
	    Population_total.push(global_data[i]);
	if (global_data[i]["Series Name"]=="Birth rate, crude (per 1,000 people)")
	    Birth_rate.push(global_data[i]);
	if (global_data[i]["Series Name"]=="Death rate, crude (per 1,000 people)")
	    Death_rate.push(global_data[i]);
	if (global_data[i]["Series Name"]=="Life expectancy at birth, total (years)")
	    Life_expectancy.push(global_data[i]);
    }
	
});


let yearchart = new YearChart(worldMap, Population_total, Birth_rate, Death_rate, Life_expectancy);
let year = yearchart.update();

   
