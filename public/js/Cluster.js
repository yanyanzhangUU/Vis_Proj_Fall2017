class Cluster{


    constructor(){
	// this.width = document.getElementById("cluster").offsetWidth-20;
	//this.height = document.getElementById("cluster").offsetHeight-20;
    }

    cleanCluster(){
	d3.select('#cluster').selectAll(".divs").remove();
	d3.select('#cluster').selectAll("svg").remove();
    }

    updateCluster(type, year){
	this.cleanCluster();
	
	var color = d3.scaleOrdinal()
		.domain(["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"])
		.range(["#FF0000","#FF1400","#FF2800","#FF3c00","#FF5000","#FF6400","#FF7800","#FF8c00","#FFa000","#FFb400","#FFc800","#FFdc00","#FFf000","#fdff00","#b0ff00","#65ff00","#17ff00","#00ff36","#00ff83","#00ffd0","#00e4ff","#00c4ff","#00a4ff","#00a4ff","#0084ff","#0064ff","#0044ff","#0022ff","#0002ff","#0100ff","#0300ff","#0500ff"]);
	var force = d3.forceSimulation()
		.force("charge", d3.forceManyBody())
		.force("link", d3.forceLink().id(function(d) { return d.index; })) 
		.force("center", d3.forceCenter(200, 200))
		.force("charge", d3.forceManyBody())
		.force("y", d3.forceY(0))
		.force("x", d3.forceX(0));
	
	var svg = d3.select("#cluster").append("svg")
		.attr("width", 600)
		.attr("height", 600);
    
	var div = d3.select("#cluster").append("div")   
		.attr("class", "tooltip")               
		.style("opacity", 0.0);

    
	var divs = d3.select('#cluster').append('div')
		.attr('class', 'divs')
		.attr('style', function(d) { return 'overflow: hidden; width: ' + 600 + 'px; height: ' + 600 + 'px;'; });


	let graph = {"nodes": [{"color": "6", "group": 4, "name": "6_125_0.0_[6 5]_[ 0.3   0.25]", "tooltip": "<h2>Cluster 6_125_0.0_[6 5]_[ 0.3   0.25]</h2> Contains 12 members.<br>Algeria Canada Iraq Kenya Morocco Peru Small states Sudan Tanzania Uganda Uzbekistan Venezuela"}, {"color": "7", "group": 4, "name": "7_146_0.0_[7 6]_[ 0.35000001  0.3       ]", "tooltip": "<h2>Cluster 7_146_0.0_[7 6]_[ 0.35000001  0.3       ]</h2> Contains 11 members.<br>Afghanistan Angola Cote d'Ivoire Ghana Iraq Madagascar Malaysia Mozambique Other small states Saudi Arabia Yemen"}, {"color": "4", "group": 4, "name": "4_83_0.0_[4 3]_[ 0.2   0.15]", "tooltip": "<h2>Cluster 4_83_0.0_[4 3]_[ 0.2   0.15]</h2> Contains 12 members.<br>Egypt Ethiopia France Germany Iran Italy Mexico Philippines Thailand Turkey United Kingdom Vietnam"}, {"color": "18", "group": 4, "name": "18_377_0.0_[18 17]_[ 0.90000001  0.85000001]", "tooltip": "<h2>Cluster 18_377_0.0_[18 17]_[ 0.90000001  0.85000001]</h2> Contains 15 members.<br>Antigua and Barbuda Channel Islands Curacao French Polynesia Grenada Guam Micronesia New Caledonia Samoa Sao Tome and Principe St. Lucia St. Vincent and the Grenadines Tonga Vanuatu Virgin Islands (U.S.)"}, {"color": "16", "group": 4, "name": "16_334_0.0_[16 14]_[ 0.80000001  0.70000001]", "tooltip": "<h2>Cluster 16_334_0.0_[16 14]_[ 0.80000001  0.70000001]</h2> Contains 9 members.<br>Bahrain Cyprus Fiji Guinea-Bissau Guyana Mauritius Montenegro Swaziland Timor-Leste"}, {"color": "1", "group": 4, "name": "1_22_0.0_[1 2]_[ 0.05  0.1 ]", "tooltip": "<h2>Cluster 1_22_0.0_[1 2]_[ 0.05  0.1 ]</h2> Contains 15 members.<br>Arab World Euro area Europe & Central Asia (excluding high income) Europe & Central Asia (IDA & IBRD countries) Fragile and conflict affected situations Heavily indebted poor countries (HIPC) Latin America & Caribbean (excluding high income) Latin America & the Caribbean (IDA & IBRD countries) Low income Middle East & North Africa Middle East & North Africa (excluding high income) Middle East & North Africa (IDA & IBRD countries) North America Pre-demographic dividend United States"}, {"color": "13", "group": 4, "name": "13_271_0.0_[13 11]_[ 0.65000001  0.55000001]", "tooltip": "<h2>Cluster 13_271_0.0_[13 11]_[ 0.65000001  0.55000001]</h2> Contains 12 members.<br>Central African Republic Costa Rica Ireland Lebanon Lithuania Moldova New Zealand Nicaragua Puerto Rico Singapore Turkmenistan Uruguay"}, {"color": "13", "group": 2, "name": "13_270_0.0_[13 10]_[ 0.65000001  0.50000001]", "tooltip": "<h2>Cluster 13_270_0.0_[13 10]_[ 0.65000001  0.50000001]</h2> Contains 7 members.<br>Jordan Libya Nicaragua Paraguay Togo Turkmenistan United Arab Emirates"}, {"color": "10", "group": 4, "name": "10_208_0.0_[10  8]_[ 0.50000001  0.40000001]", "tooltip": "<h2>Cluster 10_208_0.0_[10  8]_[ 0.50000001  0.40000001]</h2> Contains 12 members.<br>Bolivia Chad Dominican Republic Guinea Haiti Malawi Mali Rwanda Senegal Somalia Tunisia Zambia"}, {"color": "10", "group": 2, "name": "10_209_0.0_[10  9]_[ 0.50000001  0.45000001]", "tooltip": "<h2>Cluster 10_209_0.0_[10  9]_[ 0.50000001  0.45000001]</h2> Contains 7 members.<br>Azerbaijan Bolivia Dominican Republic Guinea Haiti Rwanda Switzerland"}, {"color": "1", "group": 2, "name": "1_23_0.0_[1 3]_[ 0.05  0.15]", "tooltip": "<h2>Cluster 1_23_0.0_[1 3]_[ 0.05  0.15]</h2> Contains 6 members.<br>Arab World Euro area Middle East & North Africa (excluding high income) Middle East & North Africa (IDA & IBRD countries) North America United States"}, {"color": "8", "group": 2, "name": "8_167_0.0_[8 7]_[ 0.40000001  0.35000001]", "tooltip": "<h2>Cluster 8_167_0.0_[8 7]_[ 0.40000001  0.35000001]</h2> Contains 5 members.<br>Cameroon Chile Cote d'Ivoire Madagascar Syrian Arab Republic"}, {"color": "11", "group": 4, "name": "11_229_0.0_[11  9]_[ 0.55000001  0.45000001]", "tooltip": "<h2>Cluster 11_229_0.0_[11  9]_[ 0.55000001  0.45000001]</h2> Contains 11 members.<br>Benin Burundi Caribbean small states Dominican Republic Guinea Honduras Hong Kong SAR Israel Rwanda South Sudan Tajikistan"}, {"color": "16", "group": 4, "name": "16_335_0.0_[16 15]_[ 0.80000001  0.75000001]", "tooltip": "<h2>Cluster 16_335_0.0_[16 15]_[ 0.80000001  0.75000001]</h2> Contains 11 members.<br>Bahrain Bhutan Cabo Verde Comoros Djibouti Equatorial Guinea Fiji Macao SAR Montenegro Solomon Islands Suriname"}, {"color": "12", "group": 4, "name": "12_251_0.0_[12 11]_[ 0.60000001  0.55000001]", "tooltip": "<h2>Cluster 12_251_0.0_[12 11]_[ 0.60000001  0.55000001]</h2> Contains 13 members.<br>Bosnia and Herzegovina Croatia Finland Georgia Ireland Kyrgyz Republic Lithuania Moldova New Zealand Nicaragua Norway Puerto Rico Slovak Republic"}, {"color": "18", "group": 4, "name": "18_379_0.0_[18 19]_[ 0.90000001  0.95000001]", "tooltip": "<h2>Cluster 18_379_0.0_[18 19]_[ 0.90000001  0.95000001]</h2> Contains 9 members.<br>American Samoa Andorra Cayman Islands Liechtenstein Marshall Islands Northern Mariana Islands Sint Maarten (Dutch part) St. Martin (French part) Turks and Caicos Islands"}, {"color": "17", "group": 4, "name": "17_356_0.0_[17 16]_[ 0.85000001  0.80000001]", "tooltip": "<h2>Cluster 17_356_0.0_[17 16]_[ 0.85000001  0.80000001]</h2> Contains 13 members.<br>Bahamas Barbados Belize Brunei Darussalam Cabo Verde French Polynesia Iceland Macao SAR Maldives Malta New Caledonia Solomon Islands Vanuatu"}, {"color": "2", "group": 2, "name": "2_42_0.0_[2 2]_[ 0.1  0.1]", "tooltip": "<h2>Cluster 2_42_0.0_[2 2]_[ 0.1  0.1]</h2> Contains 7 members.<br>Arab World Brazil Indonesia Middle East & North Africa Middle East & North Africa (excluding high income) Middle East & North Africa (IDA & IBRD countries) Russian Federation"}, {"color": "0", "group": 4, "name": "0_0_0.0_[0 0]_[ 0.  0.]", "tooltip": "<h2>Cluster 0_0_0.0_[0 0]_[ 0.  0.]</h2> Contains 17 members.<br>China Early-demographic dividend East Asia & Pacific East Asia & Pacific (excluding high income) East Asia & Pacific (IDA & IBRD countries) High income India Late-demographic dividend Low & middle income Lower middle income Middle income OECD members Post-demographic dividend South Asia South Asia (IDA & IBRD) Upper middle income World"}, {"color": "11", "group": 2, "name": "11_231_0.0_[11 11]_[ 0.55000001  0.55000001]", "tooltip": "<h2>Cluster 11_231_0.0_[11 11]_[ 0.55000001  0.55000001]</h2> Contains 6 members.<br>Croatia Denmark Finland Georgia Serbia Slovak Republic"}, {"color": "6", "group": 4, "name": "6_124_0.0_[6 4]_[ 0.3  0.2]", "tooltip": "<h2>Cluster 6_124_0.0_[6 4]_[ 0.3  0.2]</h2> Contains 9 members.<br>Algeria Argentina Canada Colombia Morocco Poland Small states Spain Tanzania"}, {"color": "9", "group": 2, "name": "9_189_0.0_[9 9]_[ 0.45000001  0.45000001]", "tooltip": "<h2>Cluster 9_189_0.0_[9 9]_[ 0.45000001  0.45000001]</h2> Contains 6 members.<br>Austria Belarus Bulgaria Czech Republic Hungary Sweden"}, {"color": "19", "group": 4, "name": "19_398_0.0_[19 18]_[ 0.95000001  0.90000001]", "tooltip": "<h2>Cluster 19_398_0.0_[19 18]_[ 0.95000001  0.90000001]</h2> Contains 16 members.<br>American Samoa Antigua and Barbuda Aruba Bermuda Dominica Faroe Islands Gibraltar Greenland Grenada Isle of Man Liechtenstein Marshall Islands Monaco San Marino St. Kitts and Nevis Tonga"}, {"color": "0", "group": 4, "name": "0_2_0.0_[0 2]_[ 0.   0.1]", "tooltip": "<h2>Cluster 0_2_0.0_[0 2]_[ 0.   0.1]</h2> Contains 12 members.<br>Europe & Central Asia (excluding high income) Europe & Central Asia (IDA & IBRD countries) European Union Heavily indebted poor countries (HIPC) Latin America & Caribbean Latin America & Caribbean (excluding high income) Latin America & the Caribbean (IDA & IBRD countries) Least developed countries: UN classification Pre-demographic dividend Sub-Saharan Africa Sub-Saharan Africa (excluding high income) Sub-Saharan Africa (IDA & IBRD countries)"}, {"color": "4", "group": 2, "name": "4_84_0.0_[4 4]_[ 0.2  0.2]", "tooltip": "<h2>Cluster 4_84_0.0_[4 4]_[ 0.2  0.2]</h2> Contains 7 members.<br>Egypt Ethiopia Iran Philippines Thailand Turkey Vietnam"}, {"color": "14", "group": 4, "name": "14_292_0.0_[14 12]_[ 0.70000001  0.60000001]", "tooltip": "<h2>Cluster 14_292_0.0_[14 12]_[ 0.70000001  0.60000001]</h2> Contains 9 members.<br>Central African Republic Congo  Rep. Jamaica Latvia Liberia Mauritania Mongolia Oman Panama"}, {"color": "11", "group": 2, "name": "11_228_0.0_[11  8]_[ 0.55000001  0.40000001]", "tooltip": "<h2>Cluster 11_228_0.0_[11  8]_[ 0.55000001  0.40000001]</h2> Contains 5 members.<br>Chad Dominican Republic Guinea Rwanda South Sudan"}, {"color": "18", "group": 4, "name": "18_378_0.0_[18 18]_[ 0.90000001  0.90000001]", "tooltip": "<h2>Cluster 18_378_0.0_[18 18]_[ 0.90000001  0.90000001]</h2> Contains 18 members.<br>American Samoa Andorra Antigua and Barbuda Aruba Bermuda Dominica Greenland Grenada Isle of Man Kiribati Liechtenstein Marshall Islands Micronesia Northern Mariana Islands Seychelles St. Vincent and the Grenadines Tonga Virgin Islands (U.S.)"}, {"color": "5", "group": 4, "name": "5_103_0.0_[5 3]_[ 0.25  0.15]", "tooltip": "<h2>Cluster 5_103_0.0_[5 3]_[ 0.25  0.15]</h2> Contains 8 members.<br>Italy Korea Poland Spain Thailand Turkey Ukraine United Kingdom"}, {"color": "8", "group": 2, "name": "8_168_0.0_[8 8]_[ 0.40000001  0.40000001]", "tooltip": "<h2>Cluster 8_168_0.0_[8 8]_[ 0.40000001  0.40000001]</h2> Contains 7 members.<br>Belarus Belgium Cuba Czech Republic Greece Hungary Portugal"}, {"color": "11", "group": 4, "name": "11_230_0.0_[11 10]_[ 0.55000001  0.50000001]", "tooltip": "<h2>Cluster 11_230_0.0_[11 10]_[ 0.55000001  0.50000001]</h2> Contains 9 members.<br>Caribbean small states Denmark El Salvador Finland Honduras Hong Kong SAR Israel Slovak Republic Tajikistan"}, {"color": "8", "group": 4, "name": "8_166_0.0_[8 6]_[ 0.40000001  0.3       ]", "tooltip": "<h2>Cluster 8_166_0.0_[8 6]_[ 0.40000001  0.3       ]</h2> Contains 11 members.<br>Angola Cameroon Chile Cote d'Ivoire Ghana Kazakhstan Madagascar Mozambique Netherlands Syrian Arab Republic Yemen"}, {"color": "2", "group": 2, "name": "2_43_0.0_[2 3]_[ 0.1   0.15]", "tooltip": "<h2>Cluster 2_43_0.0_[2 3]_[ 0.1   0.15]</h2> Contains 7 members.<br>Arab World Brazil Indonesia Middle East & North Africa (excluding high income) Middle East & North Africa (IDA & IBRD countries) Pakistan Russian Federation"}, {"color": "14", "group": 4, "name": "14_293_0.0_[14 13]_[ 0.70000001  0.65000001]", "tooltip": "<h2>Cluster 14_293_0.0_[14 13]_[ 0.70000001  0.65000001]</h2> Contains 9 members.<br>Estonia Kosovo Latvia Lesotho Macedonia Mongolia Oman Pacific island small states Slovenia"}, {"color": "19", "group": 4, "name": "19_399_0.0_[19 19]_[ 0.95000001  0.95000001]", "tooltip": "<h2>Cluster 19_399_0.0_[19 19]_[ 0.95000001  0.95000001]</h2> Contains 15 members.<br>American Samoa British Virgin Islands Faroe Islands Gibraltar Liechtenstein Marshall Islands Monaco Nauru Not classified Palau San Marino Sint Maarten (Dutch part) St. Martin (French part) Turks and Caicos Islands Tuvalu"}, {"color": "18", "group": 2, "name": "18_376_0.0_[18 16]_[ 0.90000001  0.80000001]", "tooltip": "<h2>Cluster 18_376_0.0_[18 16]_[ 0.90000001  0.80000001]</h2> Contains 7 members.<br>Barbados Curacao French Polynesia Iceland New Caledonia Samoa Vanuatu"}, {"color": "17", "group": 4, "name": "17_355_0.0_[17 15]_[ 0.85000001  0.75000001]", "tooltip": "<h2>Cluster 17_355_0.0_[17 15]_[ 0.85000001  0.75000001]</h2> Contains 9 members.<br>Bhutan Cabo Verde Comoros Luxembourg Macao SAR Malta Montenegro Solomon Islands Suriname"}, {"color": "12", "group": 2, "name": "12_249_0.0_[12  9]_[ 0.60000001  0.45000001]", "tooltip": "<h2>Cluster 12_249_0.0_[12  9]_[ 0.60000001  0.45000001]</h2> Contains 5 members.<br>Benin Honduras Israel Papua New Guinea Tajikistan"}, {"color": "3", "group": 4, "name": "3_63_0.0_[3 3]_[ 0.15  0.15]", "tooltip": "<h2>Cluster 3_63_0.0_[3 3]_[ 0.15  0.15]</h2> Contains 10 members.<br>Bangladesh Brazil Central Europe and the Baltics Germany Japan Mexico Nigeria Pakistan Philippines Russian Federation"}, {"color": "9", "group": 4, "name": "9_188_0.0_[9 8]_[ 0.45000001  0.40000001]", "tooltip": "<h2>Cluster 9_188_0.0_[9 8]_[ 0.45000001  0.40000001]</h2> Contains 16 members.<br>Austria Belarus Belgium Bulgaria Cambodia Cuba Czech Republic Greece Guatemala Hungary Malawi Mali Portugal Sweden Zambia Zimbabwe"}, {"color": "15", "group": 4, "name": "15_313_0.0_[15 13]_[ 0.75000001  0.65000001]", "tooltip": "<h2>Cluster 15_313_0.0_[15 13]_[ 0.75000001  0.65000001]</h2> Contains 11 members.<br>Botswana Estonia Guinea-Bissau Kosovo Kuwait Lesotho Mauritius Namibia Oman Pacific island small states Trinidad and Tobago"}, {"color": "10", "group": 2, "name": "10_207_0.0_[10  7]_[ 0.50000001  0.35000001]", "tooltip": "<h2>Cluster 10_207_0.0_[10  7]_[ 0.50000001  0.35000001]</h2> Contains 5 members.<br>Malawi Mali Niger Senegal Zambia"}, {"color": "5", "group": 4, "name": "5_104_0.0_[5 4]_[ 0.25  0.2 ]", "tooltip": "<h2>Cluster 5_104_0.0_[5 4]_[ 0.25  0.2 ]</h2> Contains 11 members.<br>Argentina Colombia Congo  Dem. Rep. Korea Myanmar Poland South Africa Spain Tanzania Thailand Turkey"}, {"color": "0", "group": 4, "name": "0_1_0.0_[0 1]_[ 0.    0.05]", "tooltip": "<h2>Cluster 0_1_0.0_[0 1]_[ 0.    0.05]</h2> Contains 15 members.<br>China Europe & Central Asia Heavily indebted poor countries (HIPC) High income India Latin America & Caribbean Least developed countries: UN classification OECD members Post-demographic dividend Pre-demographic dividend South Asia South Asia (IDA & IBRD) Sub-Saharan Africa Sub-Saharan Africa (excluding high income) Sub-Saharan Africa (IDA & IBRD countries)"}, {"color": "15", "group": 4, "name": "15_314_0.0_[15 14]_[ 0.75000001  0.70000001]", "tooltip": "<h2>Cluster 15_314_0.0_[15 14]_[ 0.75000001  0.70000001]</h2> Contains 9 members.<br>Bahrain Estonia Gabon Gambia Guinea-Bissau Mauritius Qatar Swaziland Trinidad and Tobago"}, {"color": "13", "group": 4, "name": "13_272_0.0_[13 12]_[ 0.65000001  0.60000001]", "tooltip": "<h2>Cluster 13_272_0.0_[13 12]_[ 0.65000001  0.60000001]</h2> Contains 10 members.<br>Albania Armenia Central African Republic Eritrea Jamaica Latvia Lithuania Moldova Puerto Rico Uruguay"}, {"color": "7", "group": 4, "name": "7_145_0.0_[7 5]_[ 0.35000001  0.25      ]", "tooltip": "<h2>Cluster 7_145_0.0_[7 5]_[ 0.35000001  0.25      ]</h2> Contains 11 members.<br>Afghanistan Iraq Korea Malaysia Morocco Nepal Other small states Peru Romania Uzbekistan Venezuela"}, {"color": "9", "group": 4, "name": "9_187_0.0_[9 7]_[ 0.45000001  0.35000001]", "tooltip": "<h2>Cluster 9_187_0.0_[9 7]_[ 0.45000001  0.35000001]</h2> Contains 10 members.<br>Burkina Faso Cambodia Chile Ecuador Guatemala Malawi Mali Niger Zambia Zimbabwe"}, {"color": "17", "group": 2, "name": "17_357_0.0_[17 17]_[ 0.85000001  0.85000001]", "tooltip": "<h2>Cluster 17_357_0.0_[17 17]_[ 0.85000001  0.85000001]</h2> Contains 6 members.<br>Belize French Polynesia New Caledonia Sao Tome and Principe St. Lucia Vanuatu"}, {"color": "12", "group": 4, "name": "12_250_0.0_[12 10]_[ 0.60000001  0.50000001]", "tooltip": "<h2>Cluster 12_250_0.0_[12 10]_[ 0.60000001  0.50000001]</h2> Contains 16 members.<br>El Salvador Finland Honduras Israel Jordan Kyrgyz Republic Lao PDR Libya Nicaragua Norway Papua New Guinea Paraguay Sierra Leone Slovak Republic Tajikistan Togo"}], "links": [{"source": 0, "target": 1, "value": 1}, {"source": 0, "target": 20, "value": 1}, {"source": 0, "target": 42, "value": 1}, {"source": 0, "target": 46, "value": 1}, {"source": 1, "target": 11, "value": 1}, {"source": 1, "target": 31, "value": 1}, {"source": 1, "target": 46, "value": 1}, {"source": 2, "target": 24, "value": 1}, {"source": 2, "target": 28, "value": 1}, {"source": 2, "target": 38, "value": 1}, {"source": 2, "target": 42, "value": 1}, {"source": 3, "target": 16, "value": 1}, {"source": 3, "target": 22, "value": 1}, {"source": 3, "target": 27, "value": 1}, {"source": 3, "target": 35, "value": 1}, {"source": 3, "target": 48, "value": 1}, {"source": 4, "target": 13, "value": 1}, {"source": 4, "target": 36, "value": 1}, {"source": 4, "target": 40, "value": 1}, {"source": 4, "target": 44, "value": 1}, {"source": 15, "target": 22, "value": 1}, {"source": 15, "target": 27, "value": 1}, {"source": 15, "target": 34, "value": 1}, {"source": 6, "target": 7, "value": 1}, {"source": 6, "target": 14, "value": 1}, {"source": 6, "target": 25, "value": 1}, {"source": 6, "target": 45, "value": 1}, {"source": 6, "target": 49, "value": 1}, {"source": 7, "target": 14, "value": 1}, {"source": 7, "target": 49, "value": 1}, {"source": 8, "target": 9, "value": 1}, {"source": 8, "target": 12, "value": 1}, {"source": 8, "target": 26, "value": 1}, {"source": 8, "target": 39, "value": 1}, {"source": 8, "target": 41, "value": 1}, {"source": 8, "target": 47, "value": 1}, {"source": 9, "target": 12, "value": 1}, {"source": 9, "target": 26, "value": 1}, {"source": 10, "target": 17, "value": 1}, {"source": 10, "target": 32, "value": 1}, {"source": 11, "target": 31, "value": 1}, {"source": 11, "target": 47, "value": 1}, {"source": 12, "target": 26, "value": 1}, {"source": 12, "target": 30, "value": 1}, {"source": 12, "target": 37, "value": 1}, {"source": 12, "target": 49, "value": 1}, {"source": 13, "target": 16, "value": 1}, {"source": 13, "target": 36, "value": 1}, {"source": 13, "target": 44, "value": 1}, {"source": 14, "target": 19, "value": 1}, {"source": 14, "target": 30, "value": 1}, {"source": 14, "target": 45, "value": 1}, {"source": 14, "target": 49, "value": 1}, {"source": 17, "target": 32, "value": 1}, {"source": 17, "target": 38, "value": 1}, {"source": 18, "target": 43, "value": 1}, {"source": 19, "target": 30, "value": 1}, {"source": 19, "target": 49, "value": 1}, {"source": 20, "target": 28, "value": 1}, {"source": 20, "target": 42, "value": 1}, {"source": 20, "target": 46, "value": 1}, {"source": 21, "target": 29, "value": 1}, {"source": 21, "target": 39, "value": 1}, {"source": 28, "target": 42, "value": 1}, {"source": 23, "target": 43, "value": 1}, {"source": 24, "target": 28, "value": 1}, {"source": 24, "target": 38, "value": 1}, {"source": 24, "target": 42, "value": 1}, {"source": 25, "target": 33, "value": 1}, {"source": 25, "target": 40, "value": 1}, {"source": 25, "target": 45, "value": 1}, {"source": 16, "target": 35, "value": 1}, {"source": 16, "target": 36, "value": 1}, {"source": 16, "target": 48, "value": 1}, {"source": 27, "target": 34, "value": 1}, {"source": 5, "target": 10, "value": 1}, {"source": 5, "target": 17, "value": 1}, {"source": 5, "target": 23, "value": 1}, {"source": 5, "target": 32, "value": 1}, {"source": 5, "target": 43, "value": 1}, {"source": 29, "target": 39, "value": 1}, {"source": 30, "target": 37, "value": 1}, {"source": 30, "target": 49, "value": 1}, {"source": 31, "target": 47, "value": 1}, {"source": 32, "target": 38, "value": 1}, {"source": 33, "target": 40, "value": 1}, {"source": 33, "target": 44, "value": 1}, {"source": 33, "target": 45, "value": 1}, {"source": 35, "target": 48, "value": 1}, {"source": 37, "target": 49, "value": 1}, {"source": 39, "target": 41, "value": 1}, {"source": 39, "target": 47, "value": 1}, {"source": 40, "target": 44, "value": 1}, {"source": 41, "target": 47, "value": 1}, {"source": 22, "target": 27, "value": 1}, {"source": 22, "target": 34, "value": 1}]};
	force
            .nodes(graph.nodes)
            .force("link").links(graph.links);
	var link = svg.selectAll(".link")
		.data(graph.links)
		.enter().append("line")
		.attr("class", "link-cluster")
		.style("stroke-width", function(d) { return Math.sqrt(d.value); });

	var node = divs.selectAll('div')
		.data(graph.nodes)
		.enter().append('div')
		.on("mouseover", function(d) {      
		    div.transition()        
			.duration(200)      
			.style("opacity", .9);
		    div .html(d.tooltip + "<br/>")  
			.style("left", (d3.event.pageX -900) + "px")     
			.style("top", (d3.event.pageY - 150) + "px");    
		})                  
		.on("mouseout", function(d) {       
		    div.transition()        
			.duration(500)      
			.style("opacity", 0);   
		})
		.call(d3.drag()
		      .on("start", dragstarted)
                      .on("drag", dragged)
                      .on("end", dragended)
		     );
	function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active)
		force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        } 
      
	node.append("title")
            .text(function(d) { return d.name; });
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr('style', function(d) { return 'width: ' + (d.group * 2) + 'px; height: ' + (d.group * 2) + 'px; ' + 'left: '+(d.x-(d.group))+'px; ' + 'top: '+(d.y-(d.group))+'px; background: '+color(d.color)+'; box-shadow: 0px 0px 3px #111; box-shadow: 0px 0px 33px '+color(d.color)+', inset 0px 0px 5px rgba(0, 0, 0, 0.2);';})
        ;
      });
	
    }

    
}
