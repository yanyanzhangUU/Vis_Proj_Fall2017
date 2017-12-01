## UofU Visualization Fall 2017 Final Project

# Explore Global Population from 1960 to 2016

## Information and links:

[Process Book](https://github.com/yanyanzhangUU/dataviscourse-pr-GlobalPopulation/blob/gh-pages/Process%20Book.pdf)

[Project Website](https://yanyanzhanguu.github.io/dataviscourse-pr-GlobalPopulation/GlobalPopulation.html)

[Demo Video](https://www.youtube.com/watch?v=4C3eAbYFTHo&index=2&list=PLYiZl0A2kNDU-JMqvdBh-hjP6W-DTvNa8)

## Structure:
Our project structure looks like this:

	GlobalPopulation.html
        public/
            css/
                style.css
            js/  # all js files
<<<<<<< HEAD
                script.js
                YearChart.js
		Map.js
		Cluster.js
		lineChartJS.js
		parallel.js
	    py/  # Python codes needed for clustering
	       GlobalPopulation.py
	       km.py
	data/
      	  global-population-estimates.csv
=======
               script.js
               YearChart.js
               Map.js
               Cluster.js
               lineChartJS.js
               parallel.js
            py/  # Python codes needed for clustering
               GlobalPopulation.py
               km.py
        data/
            global-population-estimates.csv
>>>>>>> origin/gh-pages
	Process Book.pdf
	Readme.md
	bower_components/ #contains local copies of d3 and d3-tip 	

## Features:

In the cluster chart, members contained in a cluster show up by hovering over the cluster. Clusters can be dragged to a different position for better distribution of clusters. 

Clicking a country on the world map adds a line in the line chart, and the parallel coordinates are created.

Hovering on a line in the line chart shows the country name.

Clicking a country name in the line chart highlights the name itself, the country on the world map and the line in the line chart. 

Double clicking a country name in the line chart removes highlights.

Double clicking a line in the line chart removes the country from the line chart and the country list.

In the parallel coordinates, grabbing an axis name and moving it to a different location relocates the whole axis. Thus the axes can be reordered. There are also brushes for selection for all axes.
