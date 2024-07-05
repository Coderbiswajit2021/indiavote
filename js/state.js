/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
	
    var url = (window.location.search == '')? window.location.href+'?cache=yes': window.location.href+'&cache=yes';

    var request = $.ajax({
        //  Get data after page loads 	            
        type: "POST",
        url: url,
        dataType: "html",
        success: function(data){
            $("#loading").remove();	            
            document.getElementById('mianContent').innerHTML = data;	            
            $('#breadcrumb').prependTo('.mianContent');
            $('.fb-like, .g-plusone').attr('data-href',window.location.href);

            //                  datatableFilter(0,true);
            if(document.getElementById("runInnerJavascript") != null){
                eval(document.getElementById("runInnerJavascript").innerHTML);
            }  
 
           
	           
        //getChart();	            
        },
        beforeSend: function(jqXHR,settings) {
            var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
            $('.mianContent').html(html);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });
    
    $('body').on('submit','#form_district', function(e) { 
        e.preventDefault();
        
        
        var dist_id = $('#district_sum').val();
        var state = $('#stateid_sum').val();
        
        if(dist_id == 0){
            msg ='<b><i>Select District</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
            
            
            
        window.location.href = base_url+"district/summary/"+state+"/"+dist_id;
    
    });
    
    $('body').on('submit','#form_pc', function(e) { 
        e.preventDefault();
       
        var pc = $('#pc_sum').val();
        var state = $('#stateid_sum').val();
        if(pc == 0){
            msg ='<b><i>Select PC</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
        window.location.href = base_url+"pc/summary/"+pc;
    
    });
    
    $('body').on('submit','#form_ac', function(e) { 
        e.preventDefault();
        
        var state = $('#stateid_sum').val();
        var ac = $('#ac_sum').val();
        if(ac == 0){
            msg ='<b><i>Select AC</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
        window.location.href = base_url+"ac/summary/"+ac;
    
    });
    
    
    
    $('body').on('click','.sumaryTab', function(){
        var id = $(this).attr('rel');
        $('.summary_tabListing').hide();
        $('a.sumaryTab').removeClass('sumaryTabActive');
        $('#'+id).show();
        $(this).addClass('sumaryTabActive');
    });
    
  
    //    $('#example').dataTable( {
    //        .dataTable();
    //    } );
     


    $('body').on('click', 'img#district_hover', function(){
        
        var dist = $(this).data('dist');
        var acemid = $(this).data('emid');
        var state = $(this).data('state');
        
        //        console.log('dist'+dist+'acemid'+acemid+'state'+state);
        //        return false;
       
         
        var request = $.ajax({
            //  Get data after page loads               
            type: "POST",
            url: base_url+'state/dist_ac/',
            dataType: "json",
            data:  {
           
                dist:dist,
                acemid:acemid,
                state:state
            },
            success: function(data){
                $("#loading").remove();
                $('#pop_state').html('').html(data.check).show();
                  
            
            },
            beforeSend: function(jqXHR,settings){
                var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
                $('#pop_state').html(html).show();
            }
        });

        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        }); 
        
        
    });
    
    $('body').on('click', 'a#district_close', function(){
        
        $('#pop_state').html('').hide(); 
        
        
    });
    
    $('body').on('click', 'img#pc_hover', function(){
        
        var pcid = $(this).data('pcid');
        var request = $.ajax({
            //  Get data after page loads               
            type: "POST",
            url: base_url+'state/pc_ac',
            dataType: "json",
            data:  {
                pcid:pcid
            },
            success: function(data){
                $("#loading").remove();
                $('#pop_state').html('').html(data.check).show();
                  
            
            },
            beforeSend: function(jqXHR,settings){
                var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
                $('#pop_state').html(html).show();
            }
        });

        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        }); 
    });
    
    
    // For state change summary change
    
    $('body').on('change','#state_cmp_select', function() { 
       
        var state = $('#state_cmp_select').val();
       
        if(state != 0){
            window.location.href = base_url+"state/summary/"+state;
        }else{
            var msg ='<b><i>Select State</i></b>'; 
            $('#error333').html(msg).show();  
            setTimeout(function(){
                $("div.error333").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
        }

    }); 
});

function showRuralGraph(m, f, did)
{
    $('#chartRural'+did+'div').html('');
    var chart;
    chart = new Highcharts.Chart({

        chart: {
            renderTo: 'chartRural'+did+'div',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Rural'
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
                size: 120
            }
        },
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: [
            ['Male',   m],  
            ['Female', f]
            ]
        }]
    });
}

function showUrbanGraph(m, f, did)
{
    $('#chartUrban'+did+'div').html('');
    var chart;
    chart = new Highcharts.Chart({

        chart: {
            renderTo: 'chartUrban'+did+'div',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Urban'
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
                size: 120
            }
        },
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: [
            ['Male',   m],  
            ['Female', f]
            
            ]
        }]
    });
}