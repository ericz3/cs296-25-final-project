// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  const datasetPath = "cereal.csv";
  d3.csv(datasetPath).then(function(data) {
    // Write the data to the console for debugging:
    console.log(data, cereal1, cereal2, cereal3);
    var cereal1 = 0;
    var cereal2 = 0;
    var cereal3 = 0;
    // Call our visualize function:
    visualize(data, cereal1, cereal2, cereal3);
  });
});

function visualize(data, cereal1, cereal2, cereal3) {
  // Boilerplate:
  const canvasDimension = { width: 1024, height: 625 };
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50 };

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
    .attr("fill", "LightBlue")
    .attr("stroke", "black");

  var background = svg
    .append("rect")
    .attr("width", effectiveDimension.width)
    .attr("height", effectiveDimension.height)
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("fill", "lightgrey")
    .attr("stroke", "DarkGrey");

  const points = [[1, 1], [500, 35], [300, 400], [100, 200], [260, 50]];
  const axisPoints = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
  const categories = [
    ["calories", 160],
    ["sodium", 320],
    ["fiber", 14],
    ["sugars", 15],
    ["fat", 5]
  ];

  //   const cerealName = "Clusters";
  var listOfCereals = [cereal1, cereal2, cereal3];
  const percentages = [];
  console.log("Categories: " + categories);
  let theta = 360 / categories.length;
  const angles = [];
  const firstGraphX = canvasDimension.width/5;
  const graphY = canvasDimension.height/3.5;
  for (let a = 0; a < 3; a += 1) {
    // Spacing the polygons horizontally
    var translation = firstGraphX + a * (canvasDimension.width - 2 * firstGraphX)/2;

    // The cereal we are drawing the polygon for
    const cerealRow = data[listOfCereals[a]];

    // Radius of the polygon
    let scale = 125;



    categories.forEach((category, index) => {
      percentages[index] = cerealRow[category[0]] / category[1];
      console.log("Percentage of " + category[0] + " is " + percentages[index]);
    });

    for (let i = 0; i < categories.length; i += 1) {
      angles[i] = theta * i;
      let magnitude = scale * percentages[i];
      axisPoints[i] =  [
        scale * Math.cos(degreesToRadians(angles[i] + 90)) + translation,
        scale * Math.sin(degreesToRadians(angles[i] + 90)) + graphY
      ];
      points[i] = [
        magnitude * Math.cos(degreesToRadians(angles[i] + 90)) + translation,
        magnitude * Math.sin(degreesToRadians(angles[i] + 90)) + graphY
      ];
    }
    console.log("Angles: " + angles);
    console.log("Points: " + points);
    console.log("Axis Points: " + axisPoints);
    drawPolygon(svg, points);
    drawAxis(svg, axisPoints, translation, graphY);
    creatBrandOptions();
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
    .style("fill", "LimeGreen")
    .style("stroke", "black")
    .style("strokeWidth", "10px");
}

function drawAxis(svg, points, originX, originY) {
  const axisColors = ["red", "orange", "purple", "green", "blue"];
  for(let i = 0; i < points.length; i+=1){
    svg.append("line")
      .style("stroke", String(axisColors[i]))
      .attr("x1", originX)
      .attr("y1", originY)
      .attr("x2", points[i][0])
      .attr("y2", points[i][1]);
  }
}

function creatBrandOptions(){
    var cerealList = ["100% Bran", "100% Natural Bran", "All-Bran", "All-Bran with Extra Fiber", "Almond Delight", "Apple Cinnamon Cheerios", "Apple Jacks", "Basic 4", "Bran Chex", "Bran Flakes", "Cap'n'Crunch", "Cheerios", "Cinnamon Toast Crunch", "Clusters", "Cocoa Puffs", "Corn Chex", "Corn Flakes", "Corn Pops", "Count Chocula", "Cracklin' Oat Bran", "Cream of Wheat (Quick)", "Crispix", "Crispy Wheat & Raisins", "Double Chex", "Froot Loops", "Frosted Flakes", "Frosted Mini-Wheats", "Fruit & Fibre Dates; Walnuts; and Oats", "Fruitful Bran", "Fruity Pebbles", "Golden Crisp", "Golden Grahams", "Grape Nuts Flakes", "Grape-Nuts", "Great Grains Pecan", "Honey Graham Ohs", "Honey Nut Cheerios", "Honey-comb", "Just Right Crunchy  Nuggets", "Just Right Fruit & Nut", "Kix", "Life", "Lucky Charms", "Maypo", "Muesli Raisins; Dates; & Almonds", "Muesli Raisins; Peaches; & Pecans", "Mueslix Crispy Blend", "Multi-Grain Cheerios", "Nut&Honey Crunch", "Nutri-Grain Almond-Raisin", "Nutri-grain Wheat", "Oatmeal Raisin Crisp", "Post Nat. Raisin Bran", "Product 19", "Puffed Rice", "Puffed Wheat", "Quaker Oat Squares", "Quaker Oatmeal", "Raisin Bran", "Raisin Nut Bran", "Raisin Squares", "Rice Chex", "Rice Krispies", "Shredded Wheat", "Shredded Wheat 'n'Bran", "Shredded Wheat spoon size", "Smacks", "Special K", "Strawberry Fruit Wheats", "Total Corn Flakes", "Total Raisin Bran", "Total Whole Grain", "Triples", "Trix", "Wheat Chex", "Wheaties", "Wheaties Honey Gold"]
    var elementId = "brand-select"
    var element = 0

    for (let i = 0; i < 3; i+= 1){
      element = elementId + i
      for (let i = 0; i < cerealList.length; i += 1) {
        var x = document.createElement("OPTION");
        x.setAttribute("value", cerealList[i]);
        var t = document.createTextNode(cerealList[i]);
        x.appendChild(t);
        document.getElementById(element).appendChild(x);
      }
    }
}

function myFunction(){
  $('#visualization').empty();
  var cereal0 = 0;
  var cereal1 = 0;
  var cereal2 = 0;

  var cerealList = ["100% Bran", "100% Natural Bran", "All-Bran", "All-Bran with Extra Fiber", "Almond Delight", "Apple Cinnamon Cheerios", "Apple Jacks", "Basic 4", "Bran Chex", "Bran Flakes", "Cap'n'Crunch", "Cheerios", "Cinnamon Toast Crunch", "Clusters", "Cocoa Puffs", "Corn Chex", "Corn Flakes", "Corn Pops", "Count Chocula", "Cracklin' Oat Bran", "Cream of Wheat (Quick)", "Crispix", "Crispy Wheat & Raisins", "Double Chex", "Froot Loops", "Frosted Flakes", "Frosted Mini-Wheats", "Fruit & Fibre Dates; Walnuts; and Oats", "Fruitful Bran", "Fruity Pebbles", "Golden Crisp", "Golden Grahams", "Grape Nuts Flakes", "Grape-Nuts", "Great Grains Pecan", "Honey Graham Ohs", "Honey Nut Cheerios", "Honey-comb", "Just Right Crunchy  Nuggets", "Just Right Fruit & Nut", "Kix", "Life", "Lucky Charms", "Maypo", "Muesli Raisins; Dates; & Almonds", "Muesli Raisins; Peaches; & Pecans", "Mueslix Crispy Blend", "Multi-Grain Cheerios", "Nut&Honey Crunch", "Nutri-Grain Almond-Raisin", "Nutri-grain Wheat", "Oatmeal Raisin Crisp", "Post Nat. Raisin Bran", "Product 19", "Puffed Rice", "Puffed Wheat", "Quaker Oat Squares", "Quaker Oatmeal", "Raisin Bran", "Raisin Nut Bran", "Raisin Squares", "Rice Chex", "Rice Krispies", "Shredded Wheat", "Shredded Wheat 'n'Bran", "Shredded Wheat spoon size", "Smacks", "Special K", "Strawberry Fruit Wheats", "Total Corn Flakes", "Total Raisin Bran", "Total Whole Grain", "Triples", "Trix", "Wheat Chex", "Wheaties", "Wheaties Honey Gold"];

  var cereal0name = document.getElementById("brand-select0").value;
  var cereal1name = document.getElementById("brand-select1").value;
  var cereal2name = document.getElementById("brand-select2").value;

  for (let i = 0; i < cerealList.length; i += 1) {
    if(cereal0name == cerealList[i]){
      cereal0 = i;
    }
    if(cereal1name == cerealList[i]){
      cereal1 = i;
    }
    if(cereal2name == cerealList[i]){
      cereal2 = i;
    }
  }

  const datasetPath = "cereal.csv";
  d3.csv(datasetPath).then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);
    // Call our visualize function:
    visualize(data, cereal0, cereal1, cereal2);
  });
}
