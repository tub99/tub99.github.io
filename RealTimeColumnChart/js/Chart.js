function Chart() {
	var chartData,
		obj,
		chartObj,
		catObj,
		dataObjArray=[],
		tooltip,
		paper,
		setArr=[],
		totalDataPair=[],
		totalObArray=[],
		colorPallete=['red','green','yellow','blue','#f3a302','#0541e0','#be7853','#3e482a','#ea71e2'],
		cnt=0,
		colArray=[],
		lineArray=[],
		textArray=[],
		maxValue,
		htFactor=20;
		getProperValue = function(){
			var val,
				i;
			for(i=0;i<arguments.length;i++){
				val =arguments[i];
				if(val!== undefined && val!== "" && val!== null){
					return val;
				}
			}
			return "";
		},
		pareseData= function(cData) {
			var dataObj={},
				dataSet,
				dataVal,
				dataLen,
				dataArr=[],
				colValue,
				chart,

				caption,
				subCaption,
				divLines,
				refreshTime,
				dataSetToDisplay,
				dataSetLen;
			//chartData=cData;

			// Parsing chart properties
			chart=cData.chart;
			caption=getProperValue(chart.title,"");
			//subcaption=getProperValue(chart.subTitle,"");
			divLines=getProperValue(chart.numOfdivLines,4);
			refreshTime=getProperValue(chart.refreshTime,2000);
			dataSetToDisplay=getProperValue(chart.numOfColumnSetsToDisplay,5);
			chartHeight=
			chartObj={
				Caption : caption,
				//SubCaption : subcaption,
				AxisDivision : divLines,
				ColumnsSetToDisplay : dataSetToDisplay,
				RefreshTime : refreshTime,
				chartHt : height,
				chartWidth : width
			};

			dataSetToDisplay=chart.numOfColumnSetsToDisplay || 5;
			// Parsing dataSet properties
			dataSet=chartData.dataset || [];
			dataSetLen=dataSet.length;
			for(i=0;i<dataSetLen;i++){
				dataVal=dataSet[i].data;
				dataLen=dataVal.length;
				for(var j=0;j<dataLen;j++){
					colValue=Number(dataVal[j].value) || 0;
					dataArr.push(colValue);
				}
				dataObj={
						color : getProperValue(dataSet[i].color,colorPallete[0]),
						name : dataSet[i].seriesname,
						id : i,
						datum : dataArr
				};
				dataObjArray.push(dataObj);
				dataArr=[];
			}
			//Parse categories

			obj={
				"chart" : chartObj,
				"dataset" : dataObjArray,
				"categories" : ""
			};
			spaceManage.call(obj,height,width);

		},
		spaceManage = function(ht,wd) {
			var captionHt=40,
				subcaptionHt=20,
				rect1,
				rect2,
				chart,
				dataSet,
				categories,
				canvasHt,
				canvasWt,
				canvasX1,canvasX2,canvasX3,canvasX4,
				canvasY1,canvasY2,canvasY3,canvasY4,
				canvasCoordinates={},
				obj;
			//rect1=paper.rect(0,0,wd,ht).attr({'stroke':2});
			obj=this;
			chart=obj.chart;
			if(chart.SubCaption !==""){
				canvasHt=ht-2*(captionHt+subcaptionHt);
				canvasY1=captionHt+subcaptionHt;
			}
			else{
				canvasHt=ht-2*captionHt;
				canvasY1=captionHt;
			}
			canvasX1=captionHt;
			canvasWt=wd-(2*canvasX1);
			canvasX2=canvasX1;canvasY2=canvasHt+canvasY1;
			canvasX3=canvasWt+canvasX2;canvasY3=canvasY2;
			canvasX4=canvasX3;canvasY4=canvasY1;
			canvasCoordinates={
				x1:canvasX1,
				y1:canvasY1,
				x2:canvasX2,
				y2:canvasY2,
				x3:canvasX3,
				y3:canvasY3,
				x4:canvasX4,
				y4:canvasY4
			};
			// var circle=paper.circle(canvasX1,canvasY1,5).attr({'fill':'red'});
			// var circle1=paper.circle(canvasX2,canvasY2,5).attr({'fill':'red'});
			// var circle2=paper.circle(canvasX3,canvasY3,5).attr({'fill':'red'});
			// var circle3=paper.circle(canvasX4,canvasY4,5).attr({'fill':'red'});
			chart.caption={
				size:captionHt,
				x:(canvasX4-canvasX1)/2,
				y:captionHt/2,
				txt: chart.Caption

			};
			// chart.subcaption={
			// 	size: subcaptionHt,
			// 	x:(canvasX4-canvasX1)/2,
			// 	y:captionHt+20,
			// 	txt:chart.SubCaption

			// };
			chart.canvas={

				height: canvasHt,
				width: canvasWt,
				coord:canvasCoordinates
			};
			rect2=paper.rect(canvasX1,canvasY1,canvasWt,canvasHt).attr({'stroke-width':2});
			//calculateColumnProperties.call(this);
		
		},
		drawCaption = function(){
			var ob,
			chart,
			cap,
			subCap;
			ob=obj;
			chart=ob.chart;
			cap=chart.caption;
			subCap=chart.subcaption;
			var caption=paper.text(cap.x,cap.y,cap.txt).attr({'font-size':cap.size});

		},
		getColumnAttr= function(totDarr,canvas,gap,m,columnWidth,scaleFactor,n){
			var x,
				y,
				ht,
				wd=columnWidth,
				ob={},
				obArray=[],
				loopchecker=0,
				colX=canvas.coord.x2,
				i,j,
				prevX=0;
				//initialize Column as x and width are not going to change
				if(cnt===0){
					for(var q=0;q<n;q++){
						obArray=[];
						for(var l=0;l<m;l++){
							if(l===0){
								ob={
										Ht : 0,
										Wd : wd,
										X : colX,
										Y : 0,
										labelVal : 0

								};
								prevX=ob.X;
								
							}
							else{
								ob={
										Ht : 0,
										Wd : wd,
										X : prevX+wd,
										Y : 0,
										labelVal : 0
									};
									prevX=ob.X;

							}
							obArray.push(ob);
						}
						colX=prevX+gap+wd;
						totalObArray.push(obArray);

					}
				}
	
				//setting values of y and Height of column
				for(i=0;i<n;i++){
					for(j=0;j<m;j++){
						if(totDarr[i][j]!==0){
							ht=totDarr[i][j]*scaleFactor;
							y=(canvas.coord.y3)-ht;
							totalObArray[i][j].Y=y;
							totalObArray[i][j].Ht=ht;
							totalObArray[i][j].labelVal=parseInt(totDarr[i][j]);
						}
					}
				}
					


				return totalObArray;

		},
		getPositiononAxis = function(val,scale){
			var obj,
				chart,
				canvas,
				coord,
				x,
				y,
				txt;
			obj=this;
			chart=obj.chart;
			canvas=chart.canvas;
			coord=canvas.coord;
			return{
				X: coord.x2,
				Y:(coord.y3-(val*scale)),
				txtVal: Math.round(val)
			};

		},
		drawAxis = function(axisObjArr,canvas){
			if(lineArray.length>0){
				for(var i=0;i<lineArray.length;i++){
					lineArray[i].remove();
					textArray[i].remove();
				}
			}

			// Draw Axis Line ['M',axisObjArr.X,axisObjArr.Y,'L',canvas.coord.X3,axisObjArr.Y]
			for(var j=0;j<axisObjArr.length;j++){
				var line = paper.path(['M',axisObjArr[j].X,axisObjArr[j].Y,'L',canvas.coord.x3,axisObjArr[j].Y]).attr({'stroke-dasharray':'--','stroke-width':1});
				lineArray.push(line);
				var text = paper.text(axisObjArr[j].X-25,axisObjArr[j].Y,axisObjArr[j].txtVal).attr({'font-size':'20'});
				textArray.push(text);
			}

			//Draw Axis No
		},
		calculateAxisProperties = function(max,scale) {
			var obj,
				chart,
				canvas,
				coord,
				axisDiff,
				divLines,
				axisScale,
				axisValue=0,
				axisObj={},
				axisArray=[];

			obj=this;
			chart=obj.chart;
			divLines=chart.AxisDivision;
			canvas=chart.canvas;
			coord=canvas.coord;
			//axisScale=(canvas.height-20)/max;
			// maxValue corr to CanvasHt-htfactor
			axisDiff=(maxValue-0)/(divLines+1);
			for(var i=0;i<divLines;i++){
				axisValue=axisValue+axisDiff;
				axisObj=getPositiononAxis.call(obj,axisValue,scale);
			
				axisArray.push(axisObj);
				
			}
			drawAxis(axisArray,canvas);
		},

		calculateColumnProperties= function(){
			var obj,
				chart,
				m,
				n,
				gap,
				cX4,
				cY4,
				colWidth,
				colHt,
				scaleFactor,
				dataSet,
				randVal,
				dataPair=[],
				val,
				max,
				maxArray=[],
				arr=[],
				canvas,
				coord,
				dArr=[];
				
				
			obj=this;
			chart=obj.chart;
			canvas=chart.canvas;
			coord=canvas.coord;
			dataSet=obj.dataset;
			m=Number(dataSet.length);
			n=Number(chart.ColumnsSetToDisplay);
			gap=50;
			columnWidth=(canvas.width-((n-1)*gap))/(m*n);
		
			if(cnt===0){
				for(var q=0;q<n;q++){
					dataPair=[];
					for(var l=0;l<m;l++){
						dataPair.push(0);
					}
					totalDataPair.push(dataPair);
				}
			}
			for(var i=0;i<m;i++)
			{
				randVal=Number((Math.random()*1000).toFixed(2))+10;
				val=dataSet[i].datum[cnt];
				if((val!== undefined) && (typeof val) === "number"){
					dArr.push(Number(dataSet[i].datum[cnt]));
				}
				else{
					dArr.push(Number(randVal));
				}

			}
			
			totalDataPair.shift();
			totalDataPair.push(dArr);
			
		
			for(var k=0;k<totalDataPair.length;k++)
			{
				maxArray.push(Math.max.apply(Math, totalDataPair[k]));
			}
			maxValue=Math.max.apply(Math, maxArray);
			
			scaleFactor=(canvas.height-20)/maxValue;

			

			calculateAxisProperties.call(obj,maxValue,scaleFactor);
			
			/*When u have the first total data pair convert it into a 2-D Array of
				ob={
						Ht : ht,
						Wd : wd,
						X : x,
						Y : y

					};
				dataPairObj[][]=[[ob1,ob2],[ob1,ob2],[]...]
				function(dataPair as input)--> gives dataPairObj[][] as output
			*/ 
			
			totalObArray=getColumnAttr(totalDataPair,canvas,gap,m,columnWidth,scaleFactor,n);
			
			cnt++;



			
			
		},
		getRandomColor = function() {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		},
		tempDraw = function(){
			
			var colorArr=obj.dataset[0].color;

			if(colArray.length>0){
				for(var t=0;t<colArray.length;t++)
					colArray[t].remove();
			}
			for(var i=0;i<totalObArray.length;i++){
				for(var j=0;j<totalObArray[i].length;j++){
					var col=totalObArray[i][j];
					if(col.X>=obj.chart.canvas.coord.x2){
						var rect=paper.rect(col.X,col.Y,col.Wd,col.Ht).attr({
							'fill':obj.dataset[j%obj.dataset.length].color,
							'stroke-width' : 1,
						});
						//var c=paper.circle(col.X,col.Y,20);
						var txt = paper.text(col.X+(col.Wd/2),col.Y-10,col.labelVal).attr({'font-size': 20,'fill':'blue'});
						colArray.push(rect,txt);	
					}
				

				}
			}
		};

		this.setData = function(data){
			chartData=data;

		};
		this.getRefreshTime = function(){
			return obj.chart.RefreshTime;
		};
		this.buildChart = function(wd,ht,pap,tool){
			
			height=ht;
			width=wd;
			paper=pap;

			//setArr=paper.set();
			tooltip=tool;
			pareseData(chartData);
			drawCaption();
		


			


		};
		this.realTimeUpdate = function(){
			calculateColumnProperties.call(obj);
			tempDraw();
		
		};
		

}