class Dashboard{
    // Build the dashboard chart interface
    constructor() {
      console.log("Creating dashboard")
      var mychart = this;
  
      // TODO: create method to select projects that are part of the AD portal team (see /project/stats JSON call)
      // For now, the uploaded project identifiers are hard-coded right here, see
      // https://github.com/jdeck88/AmphibiaWebDiseasePortal/issues/6
      var projectIds = "221,222,223"
  
      var dashboardForm = $('#dashboardForm');
      var dashboardSelect = $('<select>').appendTo(dashboardForm);
  
      dashboardSelect.attr("id", "dashboardSelect")
      dashboardSelect.append($("<option>").attr("value","").text("-- Choose a Value --"));
      dashboardSelect.append($("<option>").attr("value","country").text("Country Count"));
      dashboardSelect.append($("<option>").attr("value","yearCollected").text("Year Collected Count"));
  
      dashboardForm.append(document.createTextNode("Choose a chart:"));
      dashboardForm.append(dashboardSelect);
  
      //dashboardSelect.setAttribute("onclick","drawChart(dashboardSelect.value);")
      $('#dashboardSelect').change(function(mychart) {
        var selectedVariable = $('#dashboardSelect').val().trim()
        if (selectedVariable == "country") {
          dashboard.countryCount();
        } else {
          dashboard.yearCollectedCount();
        }
      })
    }
    
  
    // Count of records by country
    countryCount() {
      d3
      .json("https://api.geome-db.org/records/Sample/json?limit=10000&page=0&networkId=1&q=_projects_:" + projectIds + "+" +
          "_select_:%5BEvent%5D+&source=Event.country,expeditionCode")
      .then(function(samples) {
        var metrics = d3.nest()
        .key(function(d) { return (d.country); })
        .rollup(function(v) { return {
          count: v.length
          //total: d3.sum(v, function(d) { return d.yearCollected; }),
          //avg: d3.mean(v, function(d) { return d.yearCollected; })
        }; })
        .entries(samples.content.Event);
  
        var labels = metrics.map(function(d) {
          return d.key;
        });
        var codes = metrics.map(function(d) {
          return d.value.count;
        });
        dashboard.makeGenericChart(labels, codes);
        ;
      }
      );
    }
    // Count of records by yearCollected
    yearCollectedCount() {
      d3
      .json("https://api.geome-db.org/records/Sample/json?limit=10000&page=0&networkId=1&q=_projects_:" + projectIds +"+" +
          "_select_:%5BEvent%5D+&source=Event.yearCollected,expeditionCode")
      .then(function(samples) {
        var metrics = d3.nest()
        .key(function(d) { return (d.yearCollected); })
        .rollup(function(v) { return {
          count: v.length
        }; })
        .entries(samples.content.Event);
  
        var labels = metrics.map(function(d) {
          return d.key;
        });
        var codes = metrics.map(function(d) {
          return d.value.count;
        });
        dashboard.makeGenericChart(labels, codes);
      }
      );
    }
  
    /*
    Pass an object to a generic function for mapping
    */
    makeGenericChart(labels, values) {
      var chart = new Chart('dashboardChart', {
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
              data: values
            }
          ]
        }
      });
    }
  }