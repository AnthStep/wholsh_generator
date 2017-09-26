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

console.log(adamarGenerator(2));