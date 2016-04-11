function ChartManager(ht,wd,data,el,pap)
{
	var chart=new Chart();
	chart.setData(data);
	chart.buildChart(ht,wd,el,pap);

}