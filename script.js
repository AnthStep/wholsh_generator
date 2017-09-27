function radamaher(x,n){
    return Math.sign(Math.sin(Math.pow(2,n)*Math.PI*x));
}

function radamaherRow(k,n){
  let radamaherRow = [];
  for (var index = 0; index < Math.pow(2,k); index++) {
    let x = (1/Math.pow(2,k))*(index+1);
    let y = radamaher(x,n);
    radamaherRow.push([x,y]);
  }
  return radamaherRow;
}

function adamarGenerator(n){
  let matr=[];
  for (var i = 0; i < Math.pow(2,n); i++) {
    matr[i] = [];
    for (var j = 0; j < Math.pow(2,n); j++) {
      matr[i][j] = (Math.pow(-1,(i&j).toString(2).split("").filter((c)=>c==="1").length))
    }
  }
  return matr;
}

function transformToLineCoordinates(){

}

function drawGraphs(data,name){


  let body = d3.select("body")
  let graphs = body
    .selectAll("svg")
    .data(data)
    .enter()
    .append("svg")
    .attr("width","100%")
    .attr("height", "300px")
    .style("margin-top","20px")
  let controlGroup = graphs
    .append("g")
    .attr("width","100%")
    .attr("height","100%")



  let headerBackground = controlGroup
    .append("rect")
    .style("fill","gray")
    .attr("cx",0)
    .attr("cy",20)
    .attr("height","20")
    .attr("width","100%")
  let headerText = controlGroup
    .append("text")
    .attr("font-size","16px")
    .attr("font-family","sans-serif")
    .attr("fill","white")
    .text((d,i,a) => `${name} №${i+1}`)
    .attr("x","50%")
    .attr("y","15px")
    .attr("text-anchor","middle")


  let xAxisScale = d3.scaleLinear()
    .domain([0,data[0].length])
    .range([0,Math.floor(graphs.node().getBBox().width*0.9)])
  let xAxisRange = d3.axisBottom()
    .scale(xAxisScale)
    .ticks(data[0].length)
    .tickFormat("")
  let xAxis = controlGroup
    .append("g")
    .call(xAxisRange)
    .attr("transform",`translate(${Math.floor(graphs.node().getBBox().width*0.05)},170)`)

  let yAxisScale = d3.scaleLinear()
    .domain([-2,2])
    .range([0,200])
  let yAxisRange = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(4)
  let yAxis = controlGroup
    .append("g")
    .call(yAxisRange)
    .attr("transform", `translate(${Math.floor(graphs.node().getBBox().width*0.05)-1},70)`)
  
};

drawGraphs(adamarGenerator(5),"Adamar")

// let svgContainer = d3
// .select("body")
// .append("svg")
// .attr("width","500px")
// .attr("height","500px")

// let circleRads = [1,2,3,4,5,6,7]

// let circles = svgContainer
// .selectAll("circle")
// .data(circleRads)
// .enter()
// .append("circle")

// let circlesAttr = circles
// .attr("cx","50%")
// .attr("cy","50%")
// .attr("r",d=>80 - d*10)
// .style("fill",d=>`rgb(${Math.floor(d*255/7)},${Math.floor(d*255/8)},${Math.floor(d*255/7)})`)