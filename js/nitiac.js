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
            if(window.location.href.indexOf('ac/party/lostinyears') !== -1){   
                datatableFilter(0,true);
                
            }else{
                datatableFilter(0);
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
















$('body').on('change','#form20acstate', function() {
        $("#form20acyear>option").remove();
        var s = $('#form20acstate').val();

        if(s == 0){
            $("#form20acyear>option").remove();
            var opt = $('<option />');
            opt.text('PC');
            $('#form20acyear').append(opt);
            
            $("#form20ac1>option").remove();
            var opt = $('<option />');
            opt.text('AC');
            $('#form20ac1').append(opt);

        }else{
            $.ajax({
                type: "POST",
                url: base_url+"ac/get_ac_year_form20/"+s,
                success: function(year){
                    //console.log(year);
                    if(year == "" || year == 'NULL'){
                        $("#form20acyear>option").remove();
                        var opt = $('<option />');
                        opt.text('Year');
                        $('#form20acyear').append(opt);
                    }else{
                        $("#form20acyear>option").remove();
                        $.each(year,function(id,year){
                            var opt = $('<option />');
                            opt.val(year.sid);
                            opt.text(year.sname);
                            $('#form20acyear').append(opt);
                        });
                    }
                }
            });
        }
    });




    $('body').on('change','#form20acyear', function() {
        $("#form20ac1>option").remove();
        var e = $('#form20acyear').val();
        var s = $('#form20acstate').val();

        if(e == 0){
            $("#form20ac1>option").remove();
            var opt = $('<option />');
            opt.text('AC');
            $('#form20ac1').append(opt);

        }else{
            $.ajax({
                type: "POST",
                url: base_url+"ac/get_acfrom_year_state_form20/"+e+"/"+s,
                success: function(year){
                    //console.log(year);
                    if(year == "" || year == 'NULL'){
                        $("#form20ac1>option").remove();
                        var opt = $('<option />');
                        opt.text('AC');
                        $('#form20ac1').append(opt);
                    }else{
                        $("#form20ac1>option").remove();
                        $.each(year,function(id,year){
                            var opt = $('<option />');
                            opt.val(year.acid);
                            opt.text(year.acname);
                            $('#form20ac1').append(opt);
                        });
                    }
                }
            });
        }
    });


    $('body').on('click','#form20acsearch', function(e){
        e.preventDefault();
       
        var eid=$.trim(($('#form20acyear').val()));
        var st_id=$.trim(($('#form20acstate').val()));
        var acid = $.trim(($('#form20ac1').val()));
        
        if(eid == 0){
            msg ='<b><i>Please Select Year</i></b>'; 
            $('#error').html(msg).show();  
            setTimeout(function(){
                $("#error").fadeOut("slow", function () {
                    }); 
            }, 5000);
            return false;
        }
        if(st_id == 0){
            msg ='<b><i>Please Select State</i></b>'; 
            $('#error').html(msg).show();  
            setTimeout(function(){
                $("#error").fadeOut("slow", function () {
                    }); 
            }, 5000);
            return false;
        }        
        if(acid == 0){
            msg ='<b><i>Please Select AC</i></b>'; 
            $('#error').html(msg).show();  
            setTimeout(function(){
                $("#error").fadeOut("slow", function () {
                    }); 
            }, 5000);
            return false;
        }

         window.location.href = base_url + 'ac/form20/' + st_id + '/' +eid + '/' + acid;
        
      });























	
	
    $('body').on('change','#stateac', function() { 

        $("#loading").show();

        $('#yearac').html('');
        var state_id = $('#stateac').val();
        $.ajax(
        {

            type: "POST",
            dataType: 'json',
            url: base_url+"ac/get_year/"+state_id,
            success: function(year)
            {
                $("#loading").hide();
                $.each(year,function(id,year)
                {
					
                    var opt = $('<option />');
                    opt.val(year.id);
                    opt.text(year.year);
                    $('#yearac').append(opt);
                });
            }
        });
    });

    $('body').on('change', '#delimitation', function()
    {
        $("#throbber").show(); 
        var del_id = $('#delimitation').val();
        var state_check = $('#state').val();
        $.ajax(
        {
            type: "POST",
            url: base_url+"ac/ajax_state/"+del_id,
            success: function(state)
            {
                $("#throbber").hide(); 
                if(state == ""   || state == 'NULL')
                {
                    $("#state > option").remove();
                    var opt = $('<option />');
                    opt.text('No Data');
                    $('#state').append(opt);


                }
                else
                {
                    $("#state > option").remove();
                    var opt = $('<option />');
                    opt.text('State');
                    opt.val(0);
                    $('#state').append(opt);

                    $("#ac > option").remove();
                    var opt1 = $('<option />');
                    opt1.text('AC');
                    opt1.val(0);
                    $('#ac').append(opt1);
						
                    $.each(state,function(stateid,state)
                    {
                        var opt = $('<option />');
                        opt.val(state.id);
                        opt.text(state.stname);
										
                        $('#state').append(opt);
                    });

                    $('#state').val(state_check);
                }
            }// SUCCESS
        });//ajax
    });// delimitation change


    $('body').on('change', '#state', function()
    {	
        var del_id = $('#delimitation').val();
        var state_id = $('#state').val();
        $("#throbber").show(); 
        //alert(state_id);
        $.ajax(
        {
            type: "POST",
            url: base_url+"ac/ajax_ac/"+del_id+"/"+state_id,
            success: function(ac)
            {
                $("#throbber").hide(); 
                if(ac == ""   || ac == 'NULL'){
						
                    $("#ac > option").remove();
                    var opt = $('<option />');
                    opt.text('No Data');
                    $('#ac').append(opt);
                }
                else
                {
                    $("#ac > option").remove();
                    var opt = $('<option />');
                    opt.text('AC');
                    opt.val(0);
                    $('#ac').append(opt);

														
                    $.each(ac,function(acid,ac)
                    {
                        var opt = $('<option />');
                        opt.val(ac.id);
                        opt.text(ac.ac);
											
                        $('#ac').append(opt);
                    });
                }
            }// SUCCESS
        });//ajax
    }); //state change
    // Get state on year selection for alliance ac detail page-- Added by bhavesh on 8th August 2013 ---Start
   
    $('body').on('change','#state_alliance1', function(){
         
       
        // field_id  is the value of the data which has been selected
        $("#years1 > option").remove();
        var field_id = $('#state_alliance1').val();

        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL' || field_id == '0' )
        {
            $("#years1 > option").remove();
            var opt = $('<option />');
            opt.text('Select');

            $('#years1').append(opt);

        }else{

            $.ajax(
            {

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"alliance/get_state_allaince_ac/"+field_id,


                success: function(years1)
                {
                    // after selection first delete the previous content and the add new item to the second dropdown list

                    if(years1 == ""   || years1 == 'NULL')

                    {
                        $("#years1 > option").remove();
                        var opt = $('<option />');

                        opt.text('No Data');

                        $('#years1').append(opt);

                    }else{

                        $("#years1 > option").remove();
                        
                        $.each(years1,function(id,years1)
                        {                
                            var opt = $('<option />');
                            opt.val(years1.id);
                            if(years1.id == 0){
                                opt.text('Please Select years');
                            }else{
                                opt.text(years1.value);
                            }

                            $('#years1').append(opt);
                        });
                    }
                }
            });
        }
    });//  Get state on year selection for alliance ac detail page-- Added by bhavesh on 8th August 2013 ---End
    
    
    $('body').on('submit','#poll_form', function(e){
        e.preventDefault();
       
        var form = $(this).serializeArray();
        var mobile_no = $.trim(($('#txtMobileNo').val()));
        var st_id=$.trim(($('#stateid_poll').val()));
        var ac_id =$.trim(($('#acid_poll').val()));
        var emid = $.trim(($('#emid_poll').val()));

        if(mobile_no == '' || mobile_no == undefined){
            msg ='<b><i>Enter Mobile No</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {

                    }); 
            }, 5000);
            return false;
        }

        if(mobile_no.length != 10){
            msg ='<b><i>Enter Correct Mobile No</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {

                    }); 
            }, 5000);
            return false;
        }

        if(!$.isNumeric(mobile_no)) 
        {
            msg ='<b><i>Mobile No is number only</i></b>'; 
            $('#error01').html(msg).show();  
            setTimeout(function(){
                $("#error01").fadeOut("slow", function () {

                    }); 
            }, 5000);
            return false;
        }            
 
        //               console.log('hi');
        //               console.log(form);
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            dataType : 'json',
            data: form,
            success: function(data) {
                // $('#mobile_no').val('');                   
                // $("#alliancemessage").hide();
                // $("#status_delete").html(msg.data).show();

                
                var logtime = data.logtime;

                if((data.status != 0) ){ 
                    $('#txtMobileNo').val('');
                    $('#container').html('');
                    

                    // Here to check the cookies set or not Cookies : votepoll_9825362010_pc_7310
                    // if cookie set then directly call 

                    // Setting a cookie
                    var myCookie = "votepoll_" + mobile_no + "_ac_" + ac_id;
                    
                    if(getCookie(myCookie)) {
                        display_poll_graph(data);
                    } else {
                        ac_poll_check_msisdn(mobile_no, logtime, data);                        
                    }
                    $('#container').show();    

                }else{
                    msg ='<b><i>Your voting is not saved.Please revote. </i></b>'; 
                    
                    $('#error01').html(msg).show(); 
                    setTimeout(function(){
                        $("#error01").fadeOut("slow", function () {
             
                            });
             
                    }, 5000);          
                }
            }
        });
    });
    
   
    $('body').on('click','.sumaryTab', function(){
        var id = $(this).attr('rel');
        $('.summary_tabListing').hide();
        $('a.sumaryTab').removeClass('sumaryTabActive');
        $('#'+id).show();
        $(this).addClass('sumaryTabActive');
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


function validate_ac(action=false)
{

   
    var year = document.getElementById('yearac').value;
    var state = document.getElementById('stateac').value;

    var yearSelect = document.getElementById("yearac");
    var selectedYr = yearSelect.options[yearSelect.selectedIndex].text;

    var stateSelect = document.getElementById("stateac");
    var selectedState = stateSelect.options[stateSelect.selectedIndex].text;
   

    if((year == 0 || year == "Year") && state == 0 )
    {
        document.getElementById("error").style.visibility = "visible";
        return false;
    }
    else
    {
        if(state==0)
        {
            selectedState ="all-states";
        }
        if(year==0 || year == "Year")
        {
            selectedYr ="0";
        }

         selectedState = selectedState.trim(); 
         selectedState = selectedState.replace(" ", "-"); 
         selectedState = selectedState.toLowerCase();
        if(action!=false)
        {
            if(action=='vidhan-sabha')
            {
             var redirect_url = base_url+action+ "/"+selectedYr+'/'+selectedState+'/'+year+'/'+state;
             window.location.href = redirect_url;
             return false;
            }
        }
        else{
            return true;
        }
       
        

    }

}

function validate_ac_state(action=false)
{

    var state = document.getElementById('stateac').value;
    var stateSelect = document.getElementById("stateac");
    var selectedState = stateSelect.options[stateSelect.selectedIndex].text;
   

    if( state == 0 )
    {
        document.getElementById("error").style.visibility = "visible";
        return false;
    }
    else
    {
         selectedState = selectedState.trim(); 
         selectedState = selectedState.replace(" ", "-"); 
         selectedState = selectedState.toLowerCase();
        if(action!=false)
        {
            if(action=='vidhan-sabha')
            {
             var redirect_url = base_url+action+ '/0/'+selectedState+'/0/'+state;
             window.location.href = redirect_url;
             return false;
            }
        }
        else{
            return true;
        }
       
        

    }

}