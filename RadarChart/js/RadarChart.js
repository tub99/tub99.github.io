function RadarChart()
{
    //SVG parameters
    var svgNS="http://www.w3.org/2000/svg";
    //Axis parameters
    var xOrigin=50,yOrigin=250,xUpperLimit,yUpperLimit,xLowerLimit,ylowerLimit,xDifference,yDifference;
    var xDivisions,yDivisons,xAxisLength=800,yAxisLength=400,xLabel=[],yLabel,axisData,noOfComponents;
    var scalingFactor=30;
    var axisCordinates=[];
    //Data parameters
    var chartData="Hello";
        //Radar Parametrs
    var radian=Number(Math.PI/180);
    var radar=[];
   var radarCenter,radarRadius,radarCoordinates=[],tooText;
   var innerRadarCoordinates=[[],[]];
    var polId=["Kaspersky","Norton"];
    //Event Handler
    var clickFlag=[];

   //////////////////////////////////////////////////
       var getMax=function(dataVal)
    {
        var max=dataVal[0];
        for(var i=1;i<dataVal.length;i++)
        {
            if(max<dataVal[i])
                max=dataVal[i];
        }
        console.log(max);
        return max;
    }
    var getMin=function(dataVal)
    {
           var min=dataVal[0];
        
        for(var i=1;i<dataVal.length;i++)
        {
            if(min>dataVal[i])
                min=dataVal[i];
        }
        console.log(min);
        return min;
    }
    //////////////////////////////////////////////////////
       
    this.setChartData=function(dataObject)
    {
        chartData=dataObject;
        console.log(chartData);
    }
    var generateAxisParameters=function()
     {
        
        console.log(chartData);
        axisData=chartData.categories[0].category; 
        console.log("Labels are of the form"+axisData[0].label);
        for(var i=0;i<axisData.length;i++)
        {
         xLabel[i]=axisData[i].label;   
        }
        //Generating Axis Cordinates
        var angle=360/7;
        var rad=2;
        var axisRad;
       
        for(var i=0;i<4;i++)
         {
              var axisString="";
             angle=Number(360/7);
           for(var j=0;j<7;j++)
           {
            axisRad=Number(rad)/2*scalingFactor;

            var xVal=xAxisLength/2+axisRad*Math.cos(angle*radian);
            var yVal=yAxisLength/2+axisRad*Math.sin(angle*radian);
           // var coObj={x:xVal,y:yVal}; 
            axisString+=xVal+","+yVal+" ";
            
            
            angle+=360/7;  
            }
            axisCordinates[i]=axisString;
            console.log(axisCordinates[i]);
            rad=rad+2;
            
         }
      
 }
    
    var generateRadarParameters=function()
    {
        var myData=chartData.dataset[0];
        noOfComponents=chartData.dataset.length;
        //Radar radius=charData.axisValue
        var seriesName,radarColor,radarAlpha,radarData;
        console.log(noOfComponents+"   "+chartData.dataset[0].data[0].value);
        var x=0;
         var arr=[];
        for(var i=0;i<noOfComponents;i++)
        {
            radar[i]={seriesName:myData.seriesname,radarColor:myData.color,radarAlpha:myData.alpha,radarData:myData.data};
            for(var j=0;j<chartData.dataset[i].data.length;j++) 
            {
                arr[x]=chartData.dataset[i].data[j].value;
                console.log("radar val :"+arr[x]);
                x++;

            }
        }
    
        yUpperLimit=Number(getMax(arr));
        ylowerLimit=Number(getMin(arr));
        //RadarCenterX=xAxisLength/2;RadarcenterY=yAxisLength/2;
        //**********radarCenter={x:Number(xAxisLength)/2, y:Number(yAxisLength)/2};
        radarCenter={x:xAxisLength/2, y:yAxisLength/2};

        radarRadius=Number(yUpperLimit-ylowerLimit)*scalingFactor;
        var theta=Number(360/7);
        console.log("Center is at"+radarCenter.x+","+radarCenter.y+" Radar Radius is"+radarRadius);

        //x=a+rcos0; y=b+rsin0;
        for(var i=0;i<7;i++)
         {
        //a=xOrigin,b=yOrigin,r=radarRadius,0=360/no of sides;
            
            var xVal=xAxisLength/2+radarRadius*Math.cos(theta*radian);
            var yVal=yAxisLength/2+radarRadius*Math.sin(theta*radian);
            radarCoordinates[i]={x:xVal,y:yVal};   
            console.log(radarCoordinates[i].x+"  "+radarCoordinates[i].y);      
            theta+=360/7;  
            console.log("theta value:"+theta);
         }
        
         var radarRadius2=radarRadius;
         for(var i=0;i<noOfComponents;i++)
         {
             theta=Number(360/7);
           for(var j=0;j<chartData.dataset[0].data.length;j++)
           {
            radarRadius2=Number(chartData.dataset[i].data[j].value)/2*scalingFactor;

            var xVal=xAxisLength/2+radarRadius2*Math.cos(theta*radian);
            var yVal=yAxisLength/2+radarRadius2*Math.sin(theta*radian);
            var coObj={x:xVal,y:yVal}; 
            console.log("New Radius is"+radarRadius2+"  "+xVal,yVal,noOfComponents,coObj);
           innerRadarCoordinates[i][j]=coObj;
           console.log("Co-Ordinates are"+innerRadarCoordinates[i][j].x);
           theta+=360/7;  
            }
            
         }
    }
        var drawPolyGonElement=function(el,coArray)
    {
        var mycolor=["#2F4F4F","#008080","yellow","blue","lime"];

        for(var i=0;i<noOfComponents;i++)
         {
            var polyString="",fromString="";
         for(var j=0;j<chartData.dataset[0].data.length;j++)
           {
                polyString+=coArray[i][j].x+",";
                polyString+=coArray[i][j].y+" ";
                fromString+=radarCenter.x+",";
                fromString+=radarCenter.y+" ";
           }
           console.log("Polygon Points:"+polyString);

           var poly=document.createElementNS(svgNS,"polygon");
           poly.setAttributeNS(null,"points",polyString);
           poly.setAttributeNS(null,"fill",mycolor[i]);
           poly.setAttributeNS(null,"id",polId[i]);
           poly.setAttributeNS(null,"opacity",0.3);
           var ani=document.createElementNS(svgNS,"animate");
           ani.setAttributeNS(null,"attributeName","points");
        
           
           ani.setAttributeNS(null,"from",fromString);
            ani.setAttributeNS(null,"to",polyString);
           ani.setAttributeNS(null,"begin","0s");
           ani.setAttributeNS(null,"dur","5s");
           poly.appendChild(ani);
           document.getElementById(el).appendChild(poly);
           clickFlag[i]=0;

        }
    }
    var drawAxis=function(element,axisLabels,radarPoints,radAxisArr)
    {
        for(var i=0;i<radarPoints.length;i++)
        {
            var myText=document.createElementNS(svgNS,"text");
            if(i==2|| i==3 || i==1)
                myText.setAttributeNS(null,"x",radarPoints[i].x-100);
            else
                myText.setAttributeNS(null,"x",radarPoints[i].x);

            myText.setAttributeNS(null,"y",radarPoints[i].y);

            myText.setAttributeNS(null,"fill","#191970");
            var textNode=document.createTextNode(axisLabels[i]);
            myText.appendChild(textNode);
            document.getElementById(element).appendChild(myText);
        }
         var colorArr=["blue","red","black","maroon"];
        for(var i=0;i<radAxisArr.length;i++)
        {
           
            var axisPolygon=document.createElementNS(svgNS,"polygon");
            axisPolygon.setAttributeNS(null,"points",radAxisArr[i]);
            axisPolygon.setAttributeNS(null,"stroke","black");
            axisPolygon.setAttributeNS(null,"stroke-opacity",0.9);
            axisPolygon.setAttributeNS(null,"fill","none");
            document.getElementById(element).appendChild(axisPolygon);
        }

    }
	var drawRadar=function(element,radarPoints)
    {
        var myPolygon=document.createElementNS(svgNS,"polygon");
        var myStr="";
        for(var i=0;i<radarPoints.length;i++)
        {
            myStr+=radarPoints[i].x+",";
            myStr+=radarPoints[i].y+" ";
        }
        console.log(myStr);
       myPolygon.setAttributeNS(null,"points",myStr);
        myPolygon.setAttributeNS(null,"id",i);
        myPolygon.setAttributeNS(null,"fill","none");
       myPolygon.setAttributeNS(null,"stroke-width","1");
        myPolygon.setAttributeNS(null,"stroke-opacity",0.9);

       myPolygon.setAttributeNS(null,"stroke","black")
       document.getElementById(element).appendChild(myPolygon);


	for(var i=0;i<radarCoordinates.length;i++)
	{
		var myLine=document.createElementNS(svgNS,"line");
		myLine.setAttributeNS(null,"x1",radarCenter.x );
		myLine.setAttributeNS(null,"y1",radarCenter.y);
		myLine.setAttributeNS(null,"x2",radarCoordinates[i].x);
		myLine.setAttributeNS(null,"y2",radarCoordinates[i].y);
		myLine.setAttributeNS(null,"stroke","black");
		myLine.setAttributeNS(null,"stroke-opacity",0.9);
		document.getElementById(element).appendChild(myLine);

	}

 }
 var eventHandler=function(idArr,div)
 {
    var bt1=document.createElement("input");
     bt1.setAttribute("type", "button");
        bt1.setAttribute("value",idArr[0]);
        bt1.setAttribute("id", idArr[0]);
        var kasp=idArr[0];
    bt1.onclick=function()
    {
        
            if(clickFlag[0]==0)
            {
                document.getElementById(kasp).style.visibility="hidden";
                clickFlag[0]=1;
            }
            else
            {
                document.getElementById(kasp).style.visibility="visible";
                clickFlag[0]=0;
            }
    };

    /////////////////////Button2////////////////
    var bt2=document.createElement("input");
     bt2.setAttribute("type", "button");
        bt2.setAttribute("value",idArr[1]);
        bt2.setAttribute("id", idArr[1]);
        var nort=idArr[1];
    bt2.onclick=function()
    {
        if(clickFlag[1]==0)
        {
            document.getElementById(nort).style.visibility="hidden";
             clickFlag[1]=1;
			 console.log("Btn2 1st click");
            
        }
        else
        {
                document.getElementById(nort).style.visibility="visible";
                clickFlag[1]=0;
				console.log("Btn2 2nd click");
        }
    };
    document.getElementById(div).appendChild(bt1);
    document.getElementById(div).appendChild(bt2);
 }
    this.drawChart=function(el,div)
    {
        generateAxisParameters();
        generateRadarParameters();
        drawAxis(el,xLabel,radarCoordinates,axisCordinates);
        drawRadar(el,radarCoordinates);
        drawPolyGonElement(el,innerRadarCoordinates);
        eventHandler(polId,div);
    }
}