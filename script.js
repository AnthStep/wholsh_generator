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

function pellyGenerator(n){
  let matr = [];
  for (var i = 0; i < Math.pow(2,n); i++) {
    matr[i] = [];
    let binVal = i.toString(2).split("")
    for (var j = 0; j < Math.pow(2,n); j++) {
      let x = (j+1)/Math.pow(2,n)
      binVal.forEach(function(elem,index,arr){
        if(elem=="1"){
          let N = arr.length-index
          matr[i][j] = matr[i][j] ? matr[i][j] * radamaher(x,N) : radamaher(x,N)
        }
        if(i.toString(2)=="0"){
          matr[i][j] = 1
        }
      })
    }
  }
  return matr;
}

function cullyGenerator(n){
  let matr = [];
  for (var i = 0; i < Math.pow(2,n); i++) {
    matr[i] = [];
    let binVal = rightShiftGrayCode(i,n)
    for (var j = 0; j < Math.pow(2,n); j++) {
      let x = (j+1)/Math.pow(2,n)
      binVal.forEach(function(elem,index,arr){
        if(elem=="1"){
          let N = arr.length-index
          matr[i][j] = matr[i][j] ? matr[i][j] * radamaher(x,N) : radamaher(x,N)
        }
        if(i.toString(2)=="0"){
          matr[i][j] = 1
        }
      })
    }
  }
  return matr;
}

function rightShiftGrayCode(i,n){
  let binVal = i.toString(2).split("");
  if(binVal.length < n){
    let additionalZeros = Array(n - binVal.length+1).join('0').split('')
    Array.prototype.unshift.apply(binVal,additionalZeros)
  }
  binVal.forEach(function(elem,index,arr){
    if(index!=arr.length-1){
      arr[index] = (elem ^ arr[index+1])+"";
    }
  })

  return binVal;
}

console.log(cullyGenerator(2))

function transformToLineCoordinates(dataArr){
  let coordinatesNodes = []
  let currentLevel;
  for (let i = 0; i < dataArr.length; i++) {
    if(i==0){
      coordinatesNodes.push({x:0,y:dataArr[i]})
      currentLevel = {val:dataArr[i],index: i} 
    }else if(dataArr[i] != currentLevel.val){
      coordinatesNodes.push({x:i/dataArr.length,y:currentLevel.val})
      coordinatesNodes.push({x:i/dataArr.length,y:dataArr[i]})
      currentLevel = {val:dataArr[i],index: i} 
    }
    if(i==dataArr.length-1){
      coordinatesNodes.push({x:1,y:currentLevel.val})
    }
  }
  return coordinatesNodes
}

function getCoordinateMatr(dataArr){
  return dataArr.map(val=>transformToLineCoordinates(val))
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
  let linearGraph = graphs
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
  

  var lineFunction = d3.line().x(function(d) { return d.x*Math.floor(graphs.node().getBBox().width*0.9)}).y(function(d) { return 0-d.y*50; });

  var lineGraph = linearGraph.append("path")
      .datum(d=>transformToLineCoordinates(d))
      .attr("d", lineFunction)
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("transform", `translate(${Math.floor(graphs.node().getBBox().width*0.05)},170)`)
};

drawGraphs(adamarGenerator(1),"Adamar")

document.getElementById("build-button").addEventListener("click",function(){
  d3.select("body").selectAll("svg").remove();
  let options = {
    adam: {func:adamarGenerator,label:"Adamar"},
    pel: {func:pellyGenerator,label:"Pelly"},
    cul: {func:cullyGenerator,label:"Cully"}
  }
  let labels = {
    adam: "Adamar",
    pel: "Pely",
    cul: "Culy"
  }
  let selectedFunc = document.getElementById("function-type-input").value;
  let diada = Number(document.getElementById("diad-input").value)

  drawGraphs(options[selectedFunc].func(diada),options[selectedFunc].label)
})