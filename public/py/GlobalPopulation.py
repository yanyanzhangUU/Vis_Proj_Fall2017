import km
import numpy as np
import base64
from sklearn.decomposition import PCA
from numpy import genfromtxt

import csv

with open('label_LE.csv', 'rb') as f:
    reader = csv.reader(f, quotechar='"')
    label = list(reader)
label =[l[0] for l in label]
print(label)


label = km.np.array(label)

data = km.np.genfromtxt('info-BR-1960.csv',delimiter=',')

mapper = km.KeplerMapper()

lens = mapper.fit_transform(data, projection=km.decomposition.PCA(n_components=2))

graph = mapper.map(lens,
                   clusterer=km.cluster.DBSCAN(eps=0.1, min_samples=5),
                   nr_cubes=10,
                   overlap_perc=0.2)

mapper.visualize(graph,
                path_html="PT1960_keplermapper_output.html",
		graph_gravity=0.25,
		custom_tooltips=label)

