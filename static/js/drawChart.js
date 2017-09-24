/* ==============================================================

Function: Draw radarChart
Author : RCDD Dujiewen
Version : v1.0.0
Created : 14 Jan  2017
Last update : 14 Feb  2017

============================================================== */
var dataset = [[161.2, 51.6], [167.5, 59.0], [-159.5, 49.2], [157.0, 63.0], [-155.8, 53.6],
  [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
  [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
  [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
  [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
  [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
  [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
  [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
  [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
  [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
  [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
  [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
  [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
  [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
  [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
  [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
  [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
  [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
  [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
  [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
  [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
  [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
  [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
  [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
  [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
  [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
  [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
  [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
  [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
  [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
  [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
  [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
  [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
  [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
  [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
  [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
  [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
  [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
  [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
  [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
  [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
  [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
  [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
  [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
  [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
  [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
  [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
  [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
  [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
  [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
  [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
  [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
 ];
function generateRadar(data,dataLabel,el){
    // 镭射图
    var radarChartData = {
        labels : ["MW","ALogP","HBD","HBA","TPSA","RB"],
        datasets : [
            {
                fillColor : "rgba(255,99,132,0.2)",
                strokeColor : "rgba(255,99,132,1)",
                pointColor : "rgba(255,99,132,1)",
                pointStrokeColor : "#fff",
                data : [(500)/1200,(5+3)/15,5/15,10/15,140/250,10/20],
                dataLabel : [500,5,5,10,140,10]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : data,
                dataLabel : dataLabel
            }            
        ]    
    }
    var ctx = document.getElementById(el).getContext("2d");
    var myNewChart = new Chart(ctx).Radar(radarChartData,{
        animation: true, 
        showTooltips: true, 
        scaleLineWidth : 1,
        pointDot : true,
        pointLabelFontFamily : "'Helvetica Neue'", 
        pointLabelFontSize : 12,
        scaleOverride : true, 
        scaleSteps : 5,
        scaleShowLabels : false,
        scaleStepWidth : 0.3
    });
}

function generateUniformHistogram (binSize, sampleData, element) {
    var cwidth = 480, cheight = 250;
    var margin = {top: 20, right: 10, bottom: 20, left: 40};

    //setting up empty data array
    var data = [];

    getData(); // popuate data
    // line chart based on http://bl.ocks.org/mbostock/3883245
    var width = cwidth - margin.left - margin.right,
        height = cheight - margin.top - margin.bottom;
    //  X轴使用序数比例尺
    var xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
    //  Y轴使用线性比例尺
    var yScale = d3.scale.linear().range([height, 0]);

    // 定义x轴和y轴
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format("%"));
    
    var svg = d3.select(element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // p:个数，q:X轴的刻度
    xScale.domain(data.map(function(d) {
        return d.q;
    }));

    yScale.domain(d3.extent(data, function(d) {
        return d.p/sampleData.length;
    }));

    // 添加坐标轴元素
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.q); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.p/sampleData.length); })
        .attr("height", function(d) { return height - yScale(d.p/sampleData.length); });

    //添加文字元素
    /*var texts = svg.selectAll(".MyText")
        .data(data)
        .enter()
        .append("text")
        .attr("class","MyText")
        //.attr("transform","translate("+ (0-(xScale.rangeBand()) + ",0)")
        .attr("x", function(d) { return xScale(d.q); })
        .attr("y",function(d) { return y(d.p); })
        .attr("dx",function(){
            return xScale.rangeBand();
        })
        .attr("dy",function(d){
            return 20;
        })
        .text(function(d){
            return d.p;
        });*/

    function getData() {
        var i;
        /*var xRandom = dl.random.uniform(min, max);
        console.log("xRandom=====" + xRandom);var valNum = sampleData;*/
        var binNum = binSize;
        //var rValues = xRandom.samples(valNum),
        var rValues =  sampleData;
        var valNum = sampleData.length;
        var bins = [];
        for (i = 0; i < binNum; i++) {
            bins.push(0);
        }
        //  d3.extent()返回sampleData数组中的最小值和最大值即返回[min,max]
        var rRange = d3.extent(rValues, function(d) {
            return d;
        });
        //  Math.floor(x)向下取整，返回小于或等于x，并且与之最接近的整数
        for (i = 0; i < valNum; i++) {
            var bin = Math.floor((rValues[i] - rRange[0]) / ((rRange[1] - rRange[0]) / (binNum - 1)));
            bins[bin] += 1;
        }
        //  Math.round(x)四舍五入取整 p:个数，q:X轴的刻度
        var binInterval = ((rRange[1] - rRange[0]) / (binNum - 1));
        for (i = 0; i < binNum; i++) {
            data.push({q: Math.round((binInterval * i + rRange[0]) * 10) / 10, p: bins[i]});
        }
    }
    return true;
}

//红色代表相似度为1，绿色为0。越红越相似。similarity为1-d.value
function generateHeatmap(element,dataUrl){
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = 600 - margin.left - margin.right,
        height = 540 - margin.top - margin.bottom,
        buckets = 10,
        colors = ["#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#ECF5FF","#FFE6D9","#c6dbef","#9ecae1","#6baed6","#3182bd"]; // alternatively colorbrewer.YlGnBu[9]
    var a = d3.rgb(255,64,64);  //红色
    var b = d3.rgb(0,204,0);    //蓝色

    var gridSize;
    var legendElementWidth; 
    d3.tsv(dataUrl,
        function(d){
            return {
                row: Number(d.row),
                col: Number(d.col),
                value: Math.round(d.value*100)/100
            };
        }, function(error,data){
            if (error) {
                alert(error);
            } else {
                var molCnt = Math.sqrt(data.length);
                //console.log("data.length===" + molCnt);
                gridSize = (500 / molCnt).toFixed(2);
                legendElementWidth = gridSize*10;
                //console.log("gridSize===" + gridSize);

                var svg = d3.select(element).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .attr("transform", "translate(4,4)")
                        .attr("class","matrix_main");
                

                var heatmapChart = function(data) {
                    var colorScale = d3.interpolate(a,b);
                    var cards = svg.selectAll(".hour")
                                    .data(data, function(d) {return d.row+':'+d.col;});

                    cards.enter().append("rect")
                        .attr("x", function(d) { return (d.col - 1) * gridSize; })
                        .attr("y", function(d) { return (d.row - 1) * gridSize; })
                        /*.attr("rx", 1)
                        .attr("ry", 1)*/
                        .attr("class", "hour bordered")
                        .attr("width", gridSize)
                        .attr("height", gridSize)
                        .on("mouseover",function(d){
                            $(".label-col-hover").text("Col: " + d.col);
                            $(".label-row-hover").text("Row: " + d.row);
                            $(".label-sim-hover").text("Similarity: " + (1-d.value).toFixed(2));
                            var mol1 = libDetail.mols[d.col];
                            var mol2 = libDetail.mols[d.row];
                            hoverMolInitial();
                            loadMolOfHeatMap(mol1.Mol,0);
                            loadMolOfHeatMap(mol2.Mol,1);
                        })
                        .on("mouseout",function(d){
                            /*$(".label-col-hover").text("");
                            $(".label-row-hover").text("");
                            $(".label-sim-hover").text("");*/
                        })
                        .on("click",function(d){
                            $(".label-col-select").text("Col: " + d.col);
                            $(".label-row-select").text("Row: " + d.row);
                            $(".label-sim-select").text("Similarity: " + (1-d.value).toFixed(2));
                            selectMolInitial();
                            var mol3 = libDetail.mols[d.col];
                            var mol4 = libDetail.mols[d.row];
                            loadMolOfHeatMap(mol3.Mol,2);
                            loadMolOfHeatMap(mol4.Mol,3);
                        });
                    cards.transition().duration(1000)
                        .style("fill", function(d) { return colorScale(d.value); });
                    /*cards.append("title");
                    cards.select("title").text(function(d) { return d.value; });*/

                    //  删除多余的数据或者元素
                    cards.exit().remove();

                    var legend = d3.select(element).select("svg").append("g")
                                .attr("transform", "translate(520,4)")
                                .attr("class","legend");
                    
                    var defs = legend.append("defs");
                    var linearGradient = defs.append("linearGradient")
                                        .attr("id","linearColor")
                                        .attr("x1","0%")
                                        .attr("y1","100%")
                                        .attr("x2","0%")
                                        .attr("y2","0%");
 
                    var stop1 = linearGradient.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",colorScale(0));
 
                    var stop2 = linearGradient.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",colorScale(1));
                    //添加一个矩形，并应用线性渐变
                    var colorRect = legend.append("rect")
                                    .attr("x", 0)
                                    .attr("y", 0)
                                    .attr("width", 20)
                                    .attr("height", 500)
                                    .style("fill","url(#" + linearGradient.attr("id") + ")");

                    //  Y轴使用线性比例尺
                    var yScale = d3.scale.ordinal().domain([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]).rangePoints([0, 500]);
                    var legend_yAxis = d3.svg.axis().scale(yScale).orient("right");

                    legend.append("g")
                        .attr("class", "y axis legendyAxis")
                        .attr("transform", "translate(25,0)")
                        .call(legend_yAxis);

                    function loadMolOfHeatMap (molStr,index) {
                        var tempCanvas = canMap.get(71+index);
                        var molecule = ChemDoodle.readMOL(molStr);
                        ChemDoodle.informatics.removeH(molecule);
                        structureStyle(tempCanvas);
                        tempCanvas.loadMolecule(molecule);   
                    }
                }
                
                heatmapChart(data);

                // similarity部分直方统计图
                var tempArr = [];
                for (var n = 0, temp_length = data.length; n < temp_length; n++) {
                    tempArr.push((1-data[n].value));
                }
                generateUniformHistogram(10,tempArr,"#cartogramAllData");
            }       
    });
}

//绘制散点图
function generateScatterplot(element,dataUrl){
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
 
    d3.tsv(dataUrl,
        function(d){
            return {
                pca1: Number(d.PC1),
                pca2: Number(d.PC2)
            };
        }, function(error,data){
            if (error) {
                alert(error);
            } else {
                var svg = d3.select(element).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(40,20)")
                        .attr("class","pcamain");
                // 创建x轴的比例尺
                var xMin = d3.min(data, function(d) {
                            return d.pca1;
                        }) - 0.3;
                var xMax = d3.max(data, function(d) {
                            return d.pca1;
                        }) + 0.3;                
                var xScale = d3.scale.linear()
                        .domain([xMin,xMax]).range([0, width]);

                // 创建y轴的比例尺
                var yMin = d3.min(data, function(d) {
                            return d.pca2;
                        }) - 0.3;
                var yMax = d3.max(data, function(d) {
                            return d.pca2;
                        }) + 0.3;

                var yScale = d3.scale.linear()
                        .domain([yMin,yMax]).range([height, 0]);
                // 创建x轴
                var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient('bottom');
                // 创建y轴
                var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient('left');
                // 把x轴应用到对应的SVG元素上
                svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);
                // 把y轴应用到对应的SVG元素上
                svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

                // 添加散点
                svg.selectAll('.point')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'point')
                .attr('cx', function(d) {
                    return xScale(d.pca1);
                })
                .attr('cy', function(d) {
                    return yScale(d.pca2);
                })
                .attr('r', 4)
                .on('mouseover', function(d,i) {
                    var molecule = ChemDoodle.readMOL(libDetail.mols[i].Mol);
                    ChemDoodle.informatics.removeH(molecule);
                    structureStyle(sketcher75);
                    sketcher75.loadMolecule(molecule);
                    $(".label-molName").text("Mol name: " + libDetail.mols[i].MolName);
                    $(".label-pc1").text("PC1 " + d.pca1.toFixed(3));
                    $(".label-pc2").text("PC2: " + d.pca2.toFixed(3));
                });
            }       
    });
}
