function ChartData() {
	var data= {
		"chart": {
			"title": " Real Time Analysis",
			"numOfdivLines":5,
			"refreshTime":"1000",
			"numOfColumnSetsToDisplay":"6"
		},
		"categories":[
				{}
			],
		"dataset": [
			{
				"color": "B3C1D0",
				"seriesname": "Internal",
				"data":[{"value": 100},{"value": 80},{"value": 75},{"value": 315}]
			},
			{
				"color": "6582A0",
				"seriesname": "External",
				"data":[{"value":42},{"value": 120},{"value": 88},{"value":123}]
			},
				{
				"color": "cccccc",
				"seriesname": "dfcdv",
				"data":[{"value":24},{"value": 115},{"value": 46},{"value":300}]
			}
		]
		
	};
	this.getData = function() {
		return data;
	};
}