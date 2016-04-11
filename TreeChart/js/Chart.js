
function Chart()
{
	var radius=175,
		level_cnt=0,
		flag=false,
		theta=0,
		height,
		width,
		paper,
		st,
		nodeArray=[],
		setArr=[],
		scalefactor,
		parseData=function(pData) {
			var i=0,
				j=0,
				x,
				y,
				theta=0,
				circle,
				txt,
				line,
				px,
				py,
				node,
				radian,
				caption,
				parentNodeValue=pData.value*scalefactor;
				mySet=paper.set();

			//A node contains child only if it has data array and 
			// its length>0
			// root level
			if(typeof pData === "object" && pData.value!==undefined && pData.label!==undefined){
				// acquire individual properties for that object
				//console.log("Parent :"+pData.label);
				//it has children
				if(Array.isArray(pData.data) && pData.data.length>0) {

					//calculating datas for parent Node
					if(level_cnt===0){
						node={nodelabel:pData.label,X:width/2,Y:height-parentNodeValue,nodeRadius:parentNodeValue,parentlabel:"None",pX:"",pY:"",angle:360};		
						nodeArray.push(node);
						
					}
					//getting children at a level
					while(i<pData.data.length) {
						// theta changes according to level
						if(level_cnt === 0) {
							theta+=150/pData.data.length-1;
							px=width/2;
							py=height-parentNodeValue;

							
						}
						else {
							
							for(var k=0;k<nodeArray.length;k++){
								if(nodeArray[k].nodelabel === pData.label) {
									px=nodeArray[k].X;
									py=nodeArray[k].Y;
									theta+=150/pData.data.length-1;//+nodeArray[k].angle;
									console.log("In "+pData.data[i].label+" added is"+nodeArray[k].angle+" whose Parent "+nodeArray[k].nodelabel);
									console.log("So total angle of "+pData.data[i].label+" is "+theta);
									break;
								}
							}
							
						}
						//Calculate individual properties of a node/bubble
						radian=theta*(Math.PI/180);
						x=(radius*Math.cos(radian))+(px);
						y=(py)-(radius*Math.sin(radian));
						nR=pData.data[i].value*scalefactor;
						//Creating nodes for every component
						node={nodelabel:pData.data[i].label,X:x,Y:y,nodeRadius:nR,parentlabel:pData.label,pX:px,pY:py,angle:theta};
						nodeArray.push(node);

						i++;

					}
					radius+=20;

					
					level_cnt++;
					
					//now traverse children
					while(j<pData.data.length) {
						parseData(pData.data[j]);
						j++;
					}
				}
			}

		},
		drawComponents = function() {
			var i=0,
			colorPalette=['blue','red','orange','green','aqua','maroon','purple','gray','yellow','magenta','lime'],
				X,
				Y,
				dataLabel,
				nodeRadius,
				pX,
				line,
				title,
				pY;
			//Drawing Chart Title
			title=paper.text(nodeArray[0].X,nodeArray[0].Y+1.5*nodeArray[0].nodeRadius,"Bottom-Up Tree Chart").attr('font-size',50);
			st.push(title);

			// Drawing line first so that nodes remain above them	
			while(i<nodeArray.length) {
				X=nodeArray[i].X;
				Y=nodeArray[i].Y;
				nodeRadius=nodeArray[i].nodeRadius;
				dataLabel=nodeArray[i].nodelabel;
				pX=nodeArray[i].pX;
				pY=nodeArray[i].pY;
				if(i>0) {
					line=paper.path(['M',pX,pY,'L',X,Y]).attr({'stroke-dasharray':'--','stroke-width':2});
					st.push(line);
				}		
				i++;
			}
			i=0;
			//Drawing circle and text
			while(i<nodeArray.length) {
				X=nodeArray[i].X;
				Y=nodeArray[i].Y;
				nodeRadius=nodeArray[i].nodeRadius;
				dataLabel=nodeArray[i].nodelabel;
				pX=nodeArray[i].pX;
				pY=nodeArray[i].pY;
				//line=paper.path(['M',pX,pY,'L',X,Y]).attr({'stroke-dasharray':'--'});
				circle = paper.circle(X, Y,nodeRadius);
				// Sets the fill attribute of the circle to red (#f00)
				circle.attr({"fill": "#f00",'opacity':0.8});
				txt=paper.text(X,Y,dataLabel).attr({'font-size':20});
				st.push(circle,txt);
				i++;

			}
		};

	this.setData= function(data) {
		chartData=data;
	};

	this.buildChart = function(ht,wd,el,pap)
	{
		//paper = Raphael(0, 0, 700, 700);
		height=ht;
		width=wd;
		paper=pap;
		st=paper.set();
		console.log((chartData.value).toString().length);
		//Calculating scale factor
		//scalefactor=(Number(chartData.value)/Math.pow(10,(chartData.value).toString().length)*5);
		scalefactor=75/Number(chartData.value);
		p_Data=parseData(chartData);
		//Drawing is done here
		drawComponents();
		//Adjusting chart position
		var l_coord = st.getBBox().x,
			r_coord = st.getBBox().x2,
			t_coord = st.getBBox().y,
			b_coord = st.getBBox().y2;

		var cx = (l_coord + r_coord)/2,
			cy = (t_coord + b_coord)/2;

		//st.rotate(90,cx,cy);
		st.translate(400,150);
		
	};
}