
class YearChart {

    constructor (worldMap, Population_total, Birth_rate, Death_rate, Life_expectancy) {
	this.worldMap = worldMap;
	this.Population_total =Population_total;
	this.Birth_rate =Birth_rate;
	this.Death_rate=Death_rate;
	this.Life_expectancy=Life_expectancy;
	this.type = null;
	this.alldata = null;
	this.selected_year =null;
        this.margin = {top: 10, right: 20, bottom: 30, left: 50};
        let divyearChart = d3.select("#year-chart");
        this.svgBounds = divyearChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 100;
        this.svg = divyearChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);
	
    }


    update () {
	let yearChartHeight=this.svgHeight;
	let yearC=this;
	let yearCmargin=30;
	
	let yearChartScale=d3.scaleLinear()
		.domain([1960, 2016])
		.range([yearCmargin,this.svgWidth-yearCmargin]);
	let yearlist=[];
	let year5=[];
	for(let i =1960; i<2017; i++)
	    yearlist.push(i);
	for (let i =0; i<12; i++)
	    year5.push(1960+5*i);
	let elem = this.svg.selectAll("svg")
		.data(yearlist);
	
	elem.enter()
	    .append("circle")
	    .attr("cx", function(d){
		return yearChartScale(d);		
	    })
	    .attr("cy",yearChartHeight/3)
	    .attr("r", function(d){
		if(d%5==0)
		    return 6;
		else
		    return 3;
	    })
	    .attr("fill",  function(d){
		if(d%5==0)
		    return  "#a50f15";
		else
		    return "gray";
	    });
	
	let yeartext= this.svg.selectAll("svg")
		.data(year5);
	yeartext.enter().append("text")
	    .text(function(d){return d;})
	    .attr("dx", function(d){
		return yearChartScale(d);		
	    })
	    .attr("dy", 60)
	    .style("text-anchor", "middle");
	let yearChart= this;
	let ychv= this.svg.selectAll("circle");
	ychv.on("mouseover", function(d){
	    d3.select(this).classed("highlighted", true);
	    let sy=this["__data__"];
	    if(sy%5 !=0){
		yeartext.enter().append("text")
		    .text(sy)
		    .attr("dx", function(d){
			return yearChartScale(sy);		
		    })
		    .attr("dy", 20)
		    .style("text-anchor", "middle")
		    .style("fill","gray")
		    .attr("class","Hoveryear");
	    };

	});
	let attribute = [];
	let label_PT =[];
	let label_BR= [];
	let label_DR= [];
	let label_LE= [];

	document.getElementById("SelectedAttribute").onchange = function(){
	    let info_PT = [];
	    let info_BR =[];
	    let info_DR =[];
	    let info_LE =[];
	    
	    for(let i=0; i<yearChart.Population_total.length; i++){
		info_PT.push([]);
	    }
	    for(let i=0; i<yearChart.Population_total.length; i++){
		label_PT.push(yearChart.Population_total[i]["Country Name"]);
		for(let j=0; j<(2016-1960+1); j++){
		    info_PT[i].push(parseInt(yearChart.Population_total[i][(j+1960)+" [YR"+(j+1960)+"]"]));
		}
	    }

	    for(let i=0; i<yearChart.Death_rate.length; i++){
		info_DR.push([]);
	    }
	    for(let i=0; i<yearChart.Death_rate.length; i++){
		label_DR.push(yearChart.Death_rate[i]["Country Name"]);
		for(let j=0; j<(2016-1960+1); j++){
		    info_DR[i].push(parseInt(yearChart.Death_rate[i][(j+1960)+" [YR"+(j+1960)+"]"]));
		}
	    }

	    for(let i=0; i<yearChart.Birth_rate.length; i++){
		info_BR.push([]);
	    }
	    for(let i=0; i<yearChart.Birth_rate.length; i++){
		label_BR.push(yearChart.Birth_rate[i]["Country Name"]);
		for(let j=0; j<(2016-1960+1); j++){
		    info_BR[i].push(parseInt(yearChart.Birth_rate[i][(j+1960)+" [YR"+(j+1960)+"]"]));
		}
	    }

	    for(let i=0; i<yearChart.Life_expectancy.length; i++){
		info_LE.push([]);
	    }
	    for(let i=0; i<yearChart.Life_expectancy.length; i++){
		label_LE.push(yearChart.Life_expectancy[i]["Country Name"]);
		for(let j=0; j<(2016-1960+1); j++){
		    info_LE[i].push(parseInt(yearChart.Life_expectancy[i][(j+1960)+" [YR"+(j+1960)+"]"]));
		}
	    }

	    let csv1='';
	    info_BR.forEach(function(row){
		csv1 += row.join(',');
		csv1 += "\n";
		
	    });
	    var hiddenElement1 = document.createElement('a');
	    hiddenElement1.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv1);
	    hiddenElement1.target = '_blank';
	    hiddenElement1.download = 'info_BR.csv';
	    hiddenElement1.click();

	    let csv2='';
	    info_DR.forEach(function(row){
		csv2 += row.join(',');
		csv2 += "\n";
		
	    });
	    var hiddenElement2 = document.createElement('a');
	    hiddenElement2.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv2);
	    hiddenElement2.target = '_blank';
	    hiddenElement2.download = 'info_DR.csv';
	    hiddenElement2.click();
	    
	    let csv3='';
	    info_LE.forEach(function(row){
		csv3 += row.join(',');
		csv3 += "\n";
		
	    });
	    var hiddenElement3 = document.createElement('a');
	    hiddenElement3.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv3);
	    hiddenElement3.target = '_blank';
	    hiddenElement3.download = 'info_LE.csv';
	    hiddenElement3.click();

	    

	    switch(attribute){
	    case 'anscombe_I':
		yearChart.type ="PT";
		yearChart.alldata=yearChart.Population_total;
		yearChart.worldMap.updateMap(yearChart.alldata, yearChart.type , yearChart.selected_year);
		break;
	    case 'anscombe_II':
		yearChart.type="BR";
		yearChart.alldata=yearChart.Birth_rate;
		yearChart.worldMap.updateMap(yearChart.alldata, yearChart.type , yearChart.selected_year);
		break;
	    case 'anscombe_III':
		yearChart.type="DR";
		yearChart.alldata=yearChart.Death_rate;
		yearChart.worldMap.updateMap(yearChart.alldata, yearChart.type , yearChart.selected_year);
		break;
	    case 'anscombe_IV':
		yearChart.type="LE";
		yearChart.alldata=yearChart.Life_expectancy;
		yearChart.worldMap.updateMap(yearChart.alldata, yearChart.type , yearChart.selected_year);
		break;
	    default:
		break;
	    }
	};

	
	ychv.on("mouseout", function(d){
	    d3.select(this).classed("highlighted", false);
	    let hy =yearChart.svg.selectAll(".Hoveryear");
	    hy.remove();
	    
	});

	ychv.on("click", function(d){
	    ychv.classed("selected", false);
	    d3.select(this).classed("selected", true);
	    yearChart.selected_year=this["__data__"];
	    yearChart.worldMap.updateMap(yearChart.alldata, yearChart.type , yearChart.selected_year);
	});

    }

};
