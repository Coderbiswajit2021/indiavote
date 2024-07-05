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

            // create filtering and sorting on table
            //            if(window.location.href.indexOf('ac/party/lostinyears') !== -1){   
            //                datatableFilter(0,true);
            //                
            //            }else if(window.location.href.indexOf('ac/search?acname=') !== -1){
            //	            
            //               datatableFilter(0,true);
            //            }else{
            //                datatableFilter(0);
            //            }
            // if(window.location.href.indexOf('ac/party/lostinyears') !== -1){   
            //     datatableFilter(0,true);
                
            // }else{
            // }
                datatableFilter(0);
	           
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

    
});

function validateactrend(){
    var acname = document.getElementById('ac').value;
    var sval = document.getElementById('state').value;

    if(sval != 0)
    {
        if(acname == '0' ){
            document.getElementById("error21").style.visibility = "hidden";
            document.getElementById("error31").style.visibility = "visible";
            return false;
	
        }else if(acname == 'No Data'){
			
            document.getElementById("error21").style.visibility = "hidden";
            document.getElementById("error31").style.visibility = "visible";
            return false;
        }else{	
            return true;
        }
    }else{
        document.getElementById("error21").style.visibility = "visible";
        return false;
    }

}


function setcolor(party){
	
    var colorSet = 'none';
    if(party == 'INC')
    {
        colorSet='#008000';
    }
    if(party == 'BJP')
    {
        colorSet='#E56717';
    }
    //        if(party == 'TDP')
    //        {
    //            colorSet ='#87CEEB';
    //        }
    if(party == 'NDA'){
        colorSet='#E56717';
    }
         
    if(party == 'UPA'){
        colorSet='#2E2EFE';
    }
    if(party == 'THIRD FRONT'){
        colorSet='#CCFF00';
    }
         
    if(party == 'TDP'){
        colorSet ='#FFCCFF';
    }
    if(party  == 'TRS')
    {
        colorSet='#9ACD32';
    }
    if(party == 'AIMIM')
    {
        colorSet='#A0522D';
    }
    if(party== 'AITC')
    {
        colorSet='#ADD8E6';
    }
    if(party == 'CPI')
    {
        colorSet='#DC143C';

    }
    if(party == 'Others')
    {
        colorSet='#6DCFF6';

    }
    if(party == 'OTHERS')
    {
        colorSet='#6DCFF6';

    }
    if(party == 'CPM')
    {
        colorSet ='#8B0000';

    }
    if(party == 'SP')
    {
        colorSet='#F08080';

    }
    if(party == 'JDU')
    {
        colorSet='#B8860B';

    }

    if(party == 'JKN')
    {
        colorSet='#00FF7F';

    }
    if(party == 'JKDP')
    {
        colorSet='#FFD700';

    }
    if(party == 'BSP')
    {
        colorSet='#2E2EFE';

    }
    if(party == 'JD(U)')
    {
        colorSet='#FFCC00';

    }
    if(party == 'JD')
    {
        colorSet='#81B298';

    }
    if(party == 'RJD')
    {
        colorSet='#BDB76B';

    }
    if(party == 'SAP')
    {
        colorSet='#FFD700';

    }
    if(party == 'JNP')
    {
        colorSet='#E18B6B';

    }
    if(party== "NCO")
    {
        colorSet='#E18B6B';

    }
    if(party == 'SWA')
    {
        colorSet='#ECD672';

    }
    if(party== "NCP")
    {
        colorSet='#00FF00';

    }
    if(party == 'PPA')
    {
        colorSet='#808000';

    }
    if(party== "IND")
    {
        colorSet='#696565';

    }
    if(party == 'INC(U)')
    {
        colorSet ='#00FF00';

    }
    if(party == 'MAG')
    {
        colorSet='#806D7E';

    }
    if(party== "ADMK")
    {
        colorSet='#66CC99';

    }
    if(party == "PRAP")
    {
        colorSet='#CCFF00';

    }
    if(party== 'INC(I)')
    {
        colorSet='#31B404';

    }

    if(colorSet == 'none'){
        var colorSet =get_random_color();
    }

    return colorSet;

}
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}


function ac_poll_check_msisdn(mobileno,logtime, data)
{
    $.ajax(
    {
        type: "POST",
        url: base_url+'ac/check_msisdn/'+mobileno+'/'+logtime,
        success: function(data1)
        {
            var f = alert_trim(data1);
            f = f.replace(/\n/g, "");
            // alert(f.length);
            var filldata = JSON.stringify(data1);
            //alert(filldata);
            if(f == '1')
            {
                var ac_id    = $.trim(($('#acid_poll').val()));
                var myCookie = "votepoll_" + mobileno + "_ac_" + ac_id;
                createCookie(myCookie, 1, 100);

                display_poll_graph(data);
            }
            else
            {
                $('.errorLightbox').html(data.data).removeClass('error01').addClass('success');
                setTimeout( function(){
                    ac_poll_check_msisdn(mobileno,logtime, data);
                }, 5000);
            }
        }            
    });
}
var t;
function alert_trim(s)
{
    var l=0;
    var r=s.length -1;
    while(l < s.length && s[l] == ' ')
    {
        l++;
    }
    while(r > l && s[r] == ' ')
    {
        r-=1;
    }
    return s.substring(l, r+1);
}

function display_poll_graph(data)
{
    $('.errorLightbox').html('').addClass('error01').removeClass('success');
                
    var msg ='<b><i>You have sucessfully voted for '+data.party+ '</i></b>';
    
    $('#error01').html(msg).show(); 
    setTimeout(function(){
        $("#error01").fadeOut("slow", function () {

            });
    }, 5000);

    var st_id=$.trim(($('#stateid_poll').val()));
    var ac_id =$.trim(($('#acid_poll').val()));
    var emid = $.trim(($('#emid_poll').val()));

    $.ajax({ 
        type: "POST",
        dataType: "json",
 
        url: base_url+"ac/poll_data_result/"+st_id+"/"+ac_id+"/"+emid,
        // url: '<?php echo base_url(); ?>pc/mediascan/bolovi',
        success: function(msg){ 
  
            var votes =[];
            var party = [];
            var partycolor;  
            var color_new =[];
            var data_to_show =[];
            $.each(msg.data, function(key, value) {
                //   
                var x_axis = key+'<br>('+value+'%)';
                votes.push(value);
                party.push(x_axis);
                partycolor=setcolor(key);
                data_to_show.push({
                    y: value, 
                    color: partycolor
                });             
                color_new.push(partycolor);                       
            });
       
            chart = new Highcharts.Chart({

                chart: {
                    renderTo: 'container',
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories:party
                },  
                        
                yAxis: {
                    // min: 0,
                    title: {
                        text: 'Votes %'
                    }
                },
                legend: {
                           
                },
                tooltip: {
                    formatter: function() {
                        return ''+
                        this.y;
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                      
                    data:data_to_show,
                    showInLegend: false                
                }]                     
            });                          

        },
        error:
        function () {
            var html_data = "<b> Error</b>";
        //            $('#mediascan').html(html_data);
        },
        beforeSend: function(jqXHR,settings){
            var html = '<div id="loadingchart"><img src="'+base_url+'images/ajax-loader_chart.gif"></div>';
            $('#container').html(html);
        } 
    });
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


 function frmValidateForm20() {
        alert($('#form20_state_id').val());
    }