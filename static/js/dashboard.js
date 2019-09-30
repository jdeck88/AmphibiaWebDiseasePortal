class Dashboard{
  constructor() {
    console.log("creating chart object")
  }

  // A simple example for demonstrating charting
  initTestChart() {
    var mychart = this;
    d3
    .json("https://api.geome-db.org/records/Sample/json?limit=10000&page=0&access_token=Ng_3nK4g_Kr9gMrjV6KP&networkId=1&q=_projects_:174+_select_:%5BEvent%5D+&source=Event.eventID,Sample.eventID,Sample.materialSampleID,Event.locality,Event.country,Event.yearCollected,Event.decimalLatitude,Event.decimalLongitude,Sample.genus,Sample.specificEpithet,fastqMetadata.tissueID,fastqMetadata.identifier,fastqMetadata.bioSample,fastqMetadata.libraryLayout,fastqMetadata.librarySource,fastqMetadata.librarySelection,fastqMetadata.bcid,Event.bcid,Sample.bcid,Sample.phylum,Sample.scientificName,Tissue.materialSampleID,Tissue.tissueID,Tissue.bcid,Tissue.tissueType,Tissue.tissuePlate,Tissue.tissueWell,expeditionCode")
    .then(function(samples) {
      var countryMetrics = d3.nest()
      .key(function(d) { return d.country; })
      .rollup(function(v) { return {
        count: v.length,
        total: d3.sum(v, function(d) { return d.yearCollected; }),
        avg: d3.mean(v, function(d) { return d.yearCollected; })
      }; })
      .entries(samples.content.Event);

      // The resulting object contains elements for count, total, avg
      //console.log(countryMetrics);

      var labels = countryMetrics.map(function(d) {
        return d.key;
      });

      var codes = countryMetrics.map(function(d) {
        return d.value.count;
      });

      mychart.makeGenericChart(labels,codes);
    }
    );
  }

  makeGenericChart(labels,codes) {
    var chart = new Chart('chart', {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            data: codes
          }
        ]
      }
    });
  }
}
