
//BUILD METADATA

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata ;

    var resultArray = metadata.filter(sampleObj => sampleObj.id ==sample);
    var result =resultArray[0];

    var BLANK =d3.select("#sample-metadata");

    BLANK.html("");

    Object.entries(result).forEach(([key,value]) => {
      BLANK.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}




// BUILD BUBBLE CHART

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray= samples.filter(sampleObj => sampleObj.id ==sample);
      var result = resultArray[0];

      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;


    
      var bubbleLayout = {
        title: "Bacteria cultures bubble chart",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title:"OTU ID"},
        margin: { t: 22}
      };

      var bubbleData = [
        {
          x: otu_ids,
          y:sample_values,
          text: otu_labels,
          mode:"markers",
          marker: {
            size: sample_values,
            color:otu_ids
            
          }
        }
      ];

      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x:sample_values.slice(0,10).reverse(),
          text:otu_labels.slice(0,10).reverse(),
          type: "bar",
          orientation: "h"
        }
      ];

      var barLayout = {
        title: "top 10 bacteria found",
        margin: { t:25, l:140}


        
      };


//BUILD HORIZONTAL BAR CHART  
// create drop down menu & use sample_values as the values for the bar chart.

      Plotly.newPlot("bar",barData, barLayout);
    });
  }

function init() {
    
  var selector = d3.select("#selDataset");
  
    
  d3.json("samples.json").then((data) => {
      var sampNames = data.names;
  
      sampNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      
      var sampleOne = sampNames[0];
      buildCharts(sampleOne);
      buildMetadata(sampleOne);
    });
  }
  
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
init();

  
  