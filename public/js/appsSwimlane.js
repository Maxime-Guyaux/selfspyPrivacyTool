/**
 * Created by Maxime on 24/07/2015.
 */


var currentAppsData;

function getAndPrintAppSwimlane()
{
    $.get("/getAppsData", {start:interVal.start, stop : interVal.stop}, function(data){
        currentAppsData = data.result;
        printAppsSwimlanes(); //print the resqueted dilters
        privacyFilter_checkDeletedApps(); // print the filters that will be deteted by the privacy filter
    });
}


function printAppsSwimlanes(){

    var p = d3.selectAll("#sliderSVG svg  g.appSwimlane");

        p.remove();

    d3.select(".appText").remove();
    d3.select(".appLine").remove();

    d3.select("#sliderSVG svg").append("text")
        .attr("x", 10)
        .attr("y", 75)
        .attr("dy", ".35em")
        .text("Applications")
        .attr("class", "appText");
    //hr
    d3.select("#sliderSVG svg").append("line")
        .attr("x1", margin.left - 30)
        .attr("x2", width+margin.left +30)
        .attr("y1", 55)
        .attr("y2", 55)
        .attr("stroke-width", 2)
        .attr("stroke", "grey")
        .attr("class", "appLine");

    var svg = d3.select("#sliderSVG svg");

    var nump = 0;
    FiltredApps.forEach(function(one){
        var color = one.color;
        var name = one.name;

        var thisAppData = [];
        for(var i = 0; i!= currentAppsData.length; i++)
        {
            if(currentAppsData[i].name == name)
                thisAppData.push(currentAppsData[i]);
        }
        if(thisAppData.length > 0) {
            printOneAppSwimlane(name, color, thisAppData, nump);
            nump++;
        }

        $( document ).tooltip();
    })
}

function printOneAppSwimlane(name, color, data, bottom){


    var mini = d3.select("#sliderSVG svg").append('g')
        .attr('transform', 'translate(' + margin.left + ','+(100 - height + 10)+')')
        .attr('width', width)
        .attr('height', 15)
        .attr('class', 'appSwimlane');

    var rectangles = mini.selectAll("line")
        .data(data)
        .enter()
        .append("line");


    var rectangleAttributes = rectangles
        .attr("x1", function (d) {
            return xSmallSlider(new Date(d.start));
        })
        .attr("x2", function (d) {
            return xSmallSlider(new Date(d.stop));
        })
        .attr("y1", bottom*6)
        .attr("y2", bottom*6)
        .attr("stroke", color)
        .attr("stroke-width", 5)
        .attr("title", name);


}

function notifyAppsFilterChanged()
{
    printAppsSwimlanes();
}