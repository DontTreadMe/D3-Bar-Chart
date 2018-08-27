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
    
    const minDate = d3.min(dataset, (d) => new Date(d[0]).getFullYear());
    const maxDate = d3.max(dataset, (d) => new Date(d[0]).getFullYear());
    console.log(minDate, maxDate);
    const xScale = d3.scaleLinear()
                     .domain([minDate, maxDate])
                     .range([0, USGDP.w]);
    const hScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([0, USGDP.h]);
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([USGDP.h, 0]);
    const svg = d3.select(".diagram")
                  .append("svg")
                  .attr("width", USGDP.w + USGDP.padding * 2)
                  .attr("height", USGDP.h + USGDP.padding * 2);
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * rectW + USGDP.padding)
       .attr("y", (d) => yScale(d[1]) + USGDP.padding)
       .attr("width", rectW)
       .attr("height", (d) => hScale(d[1]))
       .attr("fill", "#A647B2")
    const xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format(""));
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
       .attr("transform", "translate(" + USGDP.padding + "," + (USGDP.h + USGDP.padding) + ")")
       .call(xAxis);
    svg.append("g")
       .attr("transform", "translate(" + USGDP.padding + "," + USGDP.padding + ")")
       .call(yAxis);
  }
}
