document.addEventListener('DOMContentLoaded',()=>{    
    req=new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
    req.send();
    req.onload=()=>{
      USGDP.onReady()
    };   
  });
const USGDP = {
  w: 800,
  h: 400,
  padding: 40,
  onReady: () => {
    json=JSON.parse(req.responseText);
    const dataset = json.data;
    console.log(dataset[0][1]);
    const rectW = USGDP.w / dataset.length;
    console.log(dataset[0][1]);
    const svg = d3.select(".diagram")
                  .append("svg")
                  .attr("width", USGDP.w)
                  .attr("height", USGDP.h);
    
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * rectW + USGDP.padding)
       .attr("y", (d) => USGDP.h - d[1] - USGDP.padding)
       .attr("width", rectW)
       .attr("height", (d) => d[1])
       .attr("fill", "navy")
  }
}
