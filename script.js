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
    const rectW = USGDP.w / dataset.length;
    console.log(d3.min(dataset, (d) => d[1]) + ", " + d3.max(dataset, (d) => d[1]));
    
    const xScale = d3.scaleLinear()
                     .domain([0, dataset.length])
                     .range([USGDP.padding, USGDP.w - USGDP.padding]);
    
    const hScale = d3.scaleLinear()
                     .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
                     .range([USGDP.padding, USGDP.h - USGDP.padding]);
    
    const yScale = d3.scaleLinear()
                     .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
                     .range([USGDP.h - USGDP.padding, USGDP.padding]);
    
    
    const svg = d3.select(".diagram")
                  .append("svg")
                  .attr("width", USGDP.w + 100)
                  .attr("height", USGDP.h + 60);
    
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * rectW + 50)
       .attr("y", (d) => yScale(d[1]))
       .attr("width", rectW)
       .attr("height", (d) => hScale(d[1]))
       .attr("fill", "#A647B2")
  }
}
