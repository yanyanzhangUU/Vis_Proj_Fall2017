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

