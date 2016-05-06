function ChartManager(wd,ht,data,pap,tool)
{
	var chart=new Chart();
	chart.setData(data);
	chart.buildChart(wd,ht,pap,tool);
	var delay=chart.getRefreshTime();
	var fnc=chart.realTimeUpdate;
	setInterval(fnc,delay);
	//chart.realTimeUpdate();

}