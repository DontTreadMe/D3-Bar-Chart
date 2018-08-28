document.addEventListener('DOMContentLoaded',()=>{    
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  req.send();
  req.onload=()=>{
    USGDP.onReady();
  };   
});
const USGDP = {
  w: 800,
  h: 400,
  padding: 56,
  div: d3.select(".diagram")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0),
  onReady: () => {
    json=JSON.parse(req.responseText);
    const dataset = json.data;
    let yearsTick = [];
    const years = dataset.map(d => {
      yearsTick = yearsTick.concat(d[0].slice(0, 4));
      switch (d[0].slice(5, 7)) {
        case "01":
          return d[0].slice(0, 5) + "Q1";
          break;
        case "04":
          return d[0].slice(0, 5) + "Q2";
          break;
        case "07":
          return d[0].slice(0, 5) + "Q3";
          break;
        case "10":
          return d[0].slice(0, 5) + "Q4";
          break;
        default:
          return d[0].toString();
      }
    });
    console.log(yearsTick);
    const rectW = USGDP.w / dataset.length;
    const minDate = d3.min(yearsTick);
    const maxDate = d3.max(yearsTick);
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
      .attr("height", USGDP.h + USGDP.padding * 2.4);
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * rectW + USGDP.padding)
      .attr("y", (d) => yScale(d[1]) + USGDP.padding)
      .attr("width", rectW)
      .attr("height", (d) => hScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on("mouseover", (d, i) => {
        USGDP.div.transition()
          .duration(200)
          .style("opacity", .9);
        USGDP.div.html(years[i] + "<br>" + "$" + d[1].toFixed(1).toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Billion")
          .attr("data-date", (d) => d[0]);
      })
      .on("mouseout", () => {
        USGDP.div.transition()        
          .duration(500)      
          .style("opacity", 0);
      })
      .on("mousemove", (d, i) => {
        USGDP.div.style("left", (d3.event.pageX - 60) + "px")
          .style("top", (d3.event.pageY - 60) + "px");
      });
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format(""));
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("transform", "translate(" + USGDP.padding + "," + (USGDP.h + USGDP.padding) + ")")
      .call(xAxis)      
      .attr("id", "x-axis");
    svg.append("g")
      .attr("transform", "translate(" + USGDP.padding + "," + USGDP.padding + ")")
      .call(yAxis)
      .attr("id", "y-axis");
    svg.append("text")
      .attr('transform', 'rotate(-90)')
      .attr('x', -320)
      .attr('y', 80)
      .text(json.name);
    svg.append("text")
      .attr('x', USGDP.w - USGDP.padding * 3.4)
      .attr('y', USGDP.h + USGDP.padding * 1.8)
      .text("http://www.bea.gov/national/pdf/nipaguid.pdf")
      .attr('class', 'info');
  }
}
