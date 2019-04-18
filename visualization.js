// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  const datasetPath = "cereal.csv";
  d3.csv(datasetPath).then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});

function visualize(data) {
  // Boilerplate:
  const canvasDimension = { width: 1024, height: 800 };
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  const effectiveDimension = {
    width: canvasDimension.width - margin.left - margin.right,
    height: canvasDimension.height - margin.top - margin.bottom
  };

  var svg = d3
    .select("#visualization")
    .append("svg")
    .attr("width", canvasDimension.width)
    .attr("height", canvasDimension.height)
    .style("width", canvasDimension.width)
    .style("height", canvasDimension.height)
    .append("g");

  // Visualization Code:

  var canvasBackground = svg
    .append("rect")
    .attr("width", canvasDimension.width)
    .attr("height", canvasDimension.height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "dodgerblue")
    .attr("stroke", "black");

  var background = svg
    .append("rect")
    .attr("width", effectiveDimension.width)
    .attr("height", effectiveDimension.height)
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("fill", "grey")
    .attr("stroke", "blue");

  const points = [[1, 1], [500, 35], [300, 400], [100, 200], [260, 50]];
  const categories = [
    ["calories", 160],
    ["protein", 6],
    ["sodium", 320],
    ["fiber", 14],
    ["sugars", 15]
  ];

  //   const cerealName = "Clusters";
  const percentages = [];
  console.log("Categories: " + categories);
  let theta = 360 / categories.length;
  const angles = [];
  for (let a = 1; a <= 3; a += 1) {
    // Spacing the polygons horizontally
    let translation = a * 250;

    // The cereal we are drawing the polygon for
    const cerealRow = data[14 + a];

    // Radius of the polygon
    let scale = 250;

    categories.forEach((category, index) => {
      percentages[index] = cerealRow[category[0]] / category[1];
      console.log("Percentage of " + category[0] + " is " + percentages[index]);
    });

    for (let i = 0; i < categories.length; i += 1) {
      angles[i] = theta * i;
      let magnitude = scale * percentages[i];
      points[i] = [
        magnitude * Math.cos(degreesToRadians(angles[i] + 90)) + translation,
        magnitude * Math.sin(degreesToRadians(angles[i] + 90)) + 400
      ];
    }
    console.log("Angles: " + angles);
    console.log("Points: " + points);
    drawPolygon(svg, points);
  }
}

function degreesToRadians(degrees) {
  return (Math.PI * degrees) / 180.0;
}

function pointsToString(points) {
  let pointsString = "";
  if (points.length >= 1) {
    pointsString += points[0][0] + " " + points[0][1];
  }
  for (let i = 1; i < points.length; i += 1) {
    let point = points[i];
    pointsString += ", " + point[0] + " " + point[1];
    console.log("Point: ", point);
  }
  return pointsString;
}

function drawPolygon(svg, points) {
  let pointsString = pointsToString(points);
  console.log("Points string: ", pointsString);
  svg
    .append("polygon")
    .attr("points", pointsString)
    .style("fill", "green")
    .style("stroke", "black")
    .style("strokeWidth", "10px");
}
