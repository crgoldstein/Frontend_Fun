async function drawBars() {

  // 1. Access data >>https://michelledalson.wordpress.com/2017/12/31/harry-potter-and-the-big-five-personality-traits/
  const dataset = [
                  {"person":"Harry Potter",
                    "Openness":3,
                    "Conscientiousness":3,
                    "Extraversion":3,
                    "Agreeableness":3,
                    "Neuroticism":2
                  },
                  {"person":"Ron Weasley",
                    "Openness":2,
                    "Conscientiousness":2,
                    "Extraversion":3,
                    "Agreeableness":3,
                    "Neuroticism":4
                  },
                  {"person":"Hermione Granger",
                    "Openness":4,
                    "Conscientiousness":5,
                    "Extraversion":4,
                    "Agreeableness":4,
                    "Neuroticism":3
                  },
                  {"person":"Ginny Weasley",
                    "Openness":4,
                    "Conscientiousness":3,
                    "Extraversion":4,
                    "Agreeableness":3,
                    "Neuroticism":2
                  },
                  {"person":"Luna Lovegood",
                    "Openness": 5,
                    "Conscientiousness":3,
                    "Extraversion":3,
                    "Agreeableness":5,
                    "Neuroticism":1
                  },
                  {"person":"Neville Longbottom",
                    "Openness": 3,
                    "Conscientiousness":3,
                    "Extraversion":3,
                    "Agreeableness":5,
                    "Neuroticism":4
                  },
                  {"person":"Draco Malfoy",
                    "Openness": 2,
                    "Conscientiousness":4,
                    "Extraversion":3,
                    "Agreeableness":2,
                    "Neuroticism":4
                  }
                ]

  const metrics = [
    "Openness",
    "Conscientiousness",
    "Extraversion",
    "Agreeableness",
    "Neuroticism"
  ]

  // 2. Create chart dimensions
  const width = 800
  let dimensions = {
    width: width,
    height: width,
    radius: width / 2,
    margin: {
      top: 80,
      right: 80,
      bottom: 80,
      left: 80,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  dimensions.boundedRadius = dimensions.radius - ((dimensions.margin.left + dimensions.margin.right) / 2)

  // 3. Draw canvas
  const wrapper = d3.select("#wrapper")
                    .append("svg")
                      .attr("width", dimensions.width)
                      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  // 4. Create scales
  // console.log(d3.max(dataset, d => d["Openness"]));

  const scaleLinearG = d3.scaleLinear()
              .domain([0,5])
              .range([0, dimensions.boundedRadius])
              .nice();

  // 6. Draw peripherals
  // We're drawing our axes early here so they don't overlap our radar line
  const axis = bounds.append("g")
  const gridCircles = d3.range(4).map((d, i) => (
    axis.append("circle")
      .attr("cx", dimensions.boundedRadius)
      .attr("cy", dimensions.boundedRadius)
      .attr("r", dimensions.boundedRadius * (i / 3))
      .attr("class", "grid-line")
  ))

  const gridLines = metrics.map((metric, i) => {
    const angle = i * ((Math.PI * 2) / metrics.length) - Math.PI * 0.5
    return axis.append("line")
      .attr("x1", dimensions.boundedWidth / 2)
      .attr("x2", Math.cos(angle) * dimensions.boundedRadius + dimensions.boundedWidth / 2)
      .attr("y1", dimensions.boundedHeight / 2)
      .attr("y2", Math.sin(angle) * dimensions.boundedRadius + dimensions.boundedWidth / 2)
      .attr("class", "grid-line")
  })
  const labels = metrics.map((metric, i) => {
    const angle = i * ((Math.PI * 2) / metrics.length) - Math.PI * 0.5
    const x = Math.cos(angle) * (dimensions.boundedRadius * 1.1) + dimensions.boundedWidth / 2
    const y = Math.sin(angle) * (dimensions.boundedRadius * 1.1) + dimensions.boundedHeight / 2
    return axis.append("text")
      .attr("x", x)
      .attr("y", y)
      .attr("class", "metric-label")
      .style("text-anchor",
        i == 0 || i == metrics.length / 2 ? "middle" :
        i < metrics.length / 2            ? "start"  :
                                            "end"
      )
      .text(metric)
    })
  // 5. Draw data
  const legend= bounds.append("g").attr("id", "legend");

  const title = d3.select("#title")
  var X = -60;

  const legendLine = (person ,color) => {
  legend.append("text")
                .style("cursor", "pointer")
                .text(person["person"]+" ")
                .attr("id" ,"leg"+ person["person"].replace(/\s/g,''))
                .attr("fill", color)
                .attr("x", dimensions.boundedWidth-50)
                .attr("y",X)
                .on("click", function(){
                    console.log("click");
                  // if you want the gray to
                  //  be in the back you need to redraw the image with the one
                  //  you hovered over last in

                  console.log(d3.selectAll(".line"));
                    console.log(d3.selectAll(".S"));

                  for(var i=0; i<dataset.length ;i++){
                        if(dataset[i]["person"] === person["person"] && i !=dataset.length -1){
                            var upate= dataset.splice(i,1);
                            dataset.push(upate[0]);
                        }
                    }

                    DRAW(["gray","gray","gray", "gray", "gray", "gray", color]);
                    title.text(person["person"])
                    d3.selectAll(".line").attr("class","line S");

                })
                .on("mouseenter", function(){
                    d3.select(this).attr("fill", "gray")
                })
                .on("mouseleave", function(){
                    d3.select(this).attr("fill", color)
                })
                X=X+25;
      }

  const drawLine = (person ,color) => {
      const lineGenerator = d3.lineRadial()
            .angle(function(metric, i){
              return i * ((Math.PI * 2) / metrics.length);
              })
            .radius(function(metric, i){
                  return scaleLinearG(person[metric]);
                })
            .curve(d3.curveLinearClosed)


  const line = bounds.append("path")
                     .attr("class", "line")
                     .attr("id", "line"+person["person"].replace(/\s/g,''))
                     .datum(metrics)
                          .attr("d", lineGenerator)
                          .attr("fill", color)
                          .attr("stroke", color)
                          .style("transform", `translate(${dimensions.boundedRadius}px, ${dimensions.boundedRadius}px)`)

  }



  var Colors=["red","orange","gold", "pink", "blue", "purple", "green"]


  function DRAW(Colors){
      d3.selectAll("path").remove();
      for(var i=0; i<dataset.length ;i++){
          drawLine(dataset[i], Colors[i])

        }
    }


  DRAW(Colors);
  for(var i=0; i<dataset.length ;i++){
    legendLine(dataset[i], Colors[i])
  }


}
drawBars()
