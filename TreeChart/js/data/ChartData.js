function ChartData()
{

	var datObj={
		"label": "World",
		"value": 100,
		"data":[
				{"label":"Africa " ,"value":30 ,
					"data":[
							{"label":"Egypt","value":5},
							{"label":"SouthAfrica","value":10,
								"data":[{"label":"Durban","value":7},{"label":"CapeTown","value":3}
								]
							},
							{"label":"Nigeria","value":5},
							{"label":"Algeria","value":10}
					]
				},
				{"label":"Asia" ,"value": 50,
					"data":[
							{"label":"India","value":30,
								"data":[
										{"label":"West" ,"value":10,
											"data":[
												{"label": "Bombay","value":2},{"label":"Pune" ,"value":3},{"label":"Gujarat" ,"value":5}
											]
										},
										{"label": "East" ,"value":10},
										{"label": "South" ,"value":5},
										{"label": "North" ,"value":5}
								]
							},
							{"label":" SriLanka" ,"value":5},
							{"label":"Pakistan" ,"value":15,
								"data":[{"label":"Karachi" ,"value":2},{"label":"Lahore" ,"value":3},{"label":"Peshawar" ,"value":6},{"label":"Islamabad" ,"value":4}
								]
							}
						]
				},
				{"label":"Australia" ,"value": 15},
				{"label":"America" ,"value": 5}
			]
	};
	this.getData=function(){
		return datObj;
	};
}