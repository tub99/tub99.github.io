function ChartManager(ht,wd,data,el,pap,tool)
{
	var chart=new Chart();
	chart.setData(data);
	chart.buildChart(ht,wd,el,pap,tool);

}