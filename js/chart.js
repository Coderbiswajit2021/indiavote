
	function generate_graph_dynamic(color_new_all,chart_data_all,div_name,text,x,y,height){

        Highcharts.setOptions(
        {
            colors: color_new_all 
        });

        
        $('#' + div_name).html('');
        $('#' + div_name).css('height',height);
    	
        var chart;
        chart = new Highcharts.Chart({

            chart: {
                renderTo: div_name,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                spacingTop: -10, 
                spacingBottom: 30  
                            
            },
            title: {
                text: text,
                align: 'center',
                x: x,
                //            verticalAlign: 'bottom',
                y: y
            },
            tooltip: {
                //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return  Math.round(this.percentage * 10 ) / 10 +' %';
                        }
                    },
                    showInLegend: true,
                    size: 140
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Percentage',
                    data: chart_data_all
                }]
        });
    }


    function setcolor_chart(gcolor) 
    {
        var colorSet = 'none';
       
        if (gcolor == "18-24")  { colorSet = '#5799C7'; }
        if (gcolor == "25-34")  { colorSet = '#C2D5EE'; }
        if (gcolor == "35-44")  { colorSet = '#FF9F4A'; }
        if (gcolor == "44-54")  { colorSet = '#FFCC9A'; }
        if (gcolor == "55-64")  { colorSet = '#61B861'; }
        if (gcolor == "65+")    { colorSet = '#FFB2B0'; }

        if (gcolor == "ST")  { colorSet = '#830302'; }
        if (gcolor == "GEN") { colorSet = '#FF7F0E'; }
        if (gcolor == 'SC')  { colorSet = '#2E2EFE'; }

        if (gcolor == 'Literate')  { colorSet = '#1F77B4'; }
        if (gcolor == 'Illiterate')  { colorSet = '#FF7F0E'; }

        if (gcolor == 'Rural')  { colorSet = '#1F77B4'; }
        if (gcolor == 'Urban')  { colorSet = '#FF7F0E'; }

        if (colorSet == 'none') {
            var colorSet = get_random_color_chart();
        }
        return colorSet;
    }


    function get_random_color_chart() 
    {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    } 
