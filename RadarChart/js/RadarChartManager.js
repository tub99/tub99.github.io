function RadarChartManager(val,div)
{
   this.createChart=function()
   {
    var chartData=getData();
       console.log(chartData);
    var radarChart=new RadarChart();
    radarChart.setChartData(chartData);
    radarChart.drawChart(val,div);
   }
}