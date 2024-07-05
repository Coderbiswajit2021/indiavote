$(document).ready(function(){	
	
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
            if(window.location.href.indexOf('pc/party/lostinyears') !== -1){   
                datatableFilter(0,true);
            }
            //            else if(window.location.href.indexOf('pc/search?name=') !== -1){
            //                datatableFilter(0,true);   
            //            }
            else{
                datatableFilter(0);    
            }
            
        //  getChart();
        },
        beforeSend: function(jqXHR,settings){
            var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
            $('.mianContent').html(html);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });	
    
    
    // By raj for party cote in pc detail page
    
    
    $('body').on('submit','#poll_form', function(e){
        e.preventDefault();
       
        var form = $(this).serializeArray();
        var mobile_no = $.trim(($('#txtMobileNo').val()));

        var st_id=$.trim(($('#stateid_poll').val()));
        var pc_id =$.trim(($('#pcid_poll').val()));
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
                    var myCookie = "votepoll_" + mobile_no + "_pc_" + pc_id;
                    
                    if(getCookie(myCookie)) {
                        display_poll_graph(data);
                    } else {
                        pc_poll_check_msisdn(mobile_no, logtime, data);                        
                    }
                    $('#container').show();
                } else {
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
    
    $('body').on('change','#form20year', function() {
        $("#form20state>option").remove();
        var e = $('#form20year').val();

        if(e == 0){
            $("#form20state>option").remove();
            var opt = $('<option />');
            opt.text('State');
            $('#form20state').append(opt);
            
            $("#form20pc>option").remove();
            var opt = $('<option />');
            opt.text('PC');
            $('#form20pc').append(opt);
            
            $("#form20ac>option").remove();
            var opt = $('<option />');
            opt.text('AC');
            $('#form20ac').append(opt);

        }else{
            $.ajax({
                type: "POST",
                url: base_url+"pc/get_statefromyear_form20/"+e,
                success: function(year){
                    //console.log(year);
                    if(year == "" || year == 'NULL'){
                        $("#form20state>option").remove();
                        var opt = $('<option />');
                        opt.text('State');
                        $('#form20state').append(opt);
                    }else{
                        $("#form20state>option").remove();
                        $.each(year,function(id,year){
                            var opt = $('<option />');
                            opt.val(year.sid);
                            opt.text(year.sname);
                            $('#form20state').append(opt);
                        });
                    }
                }
            });
        }
    });



$('body').on('change','#form20state', function() {
        $("#form20pc>option").remove();
        var e = $('#form20year').val();
        var s = $('#form20state').val();

        if(s == 0){
            $("#form20pc>option").remove();
            var opt = $('<option />');
            opt.text('PC');
            $('#form20pc').append(opt);
            
            $("#form20ac>option").remove();
            var opt = $('<option />');
            opt.text('AC');
            $('#form20ac').append(opt);

        }else{
            $.ajax({
                type: "POST",
                url: base_url+"pc/get_pcfrom_year_state_form20/"+e+"/"+s,
                success: function(year){
                    //console.log(year);
                    if(year == "" || year == 'NULL'){
                        $("#form20pc>option").remove();
                        var opt = $('<option />');
                        opt.text('PC');
                        $('#form20pc').append(opt);
                    }else{
                        $("#form20pc>option").remove();
                        $.each(year,function(id,year){
                            var opt = $('<option />');
                            opt.val(year.pcid);
                            opt.text(year.pcname);
                            $('#form20pc').append(opt);
                        });
                    }
                }
            });
        }
    });
    
    
    $('body').on('change','#form20pc', function() {
        $("#form20ac>option").remove();
        var e = $('#form20year').val();
        var s = $('#form20state').val();
        var pc = $('#form20pc').val();

        if(pc == 0){
            $("#form20ac>option").remove();
            var opt = $('<option />');
            opt.text('AC');
            $('#form20ac').append(opt);

        }else{
            $.ajax({
                type: "POST",
                url: base_url+"pc/get_acfrom_year_state_pc_form20/"+e+"/"+s+"/"+pc,
                success: function(year){
                    //console.log(year);
                    if(year == "" || year == 'NULL'){
                        $("#form20ac>option").remove();
                        var opt = $('<option />');
                        opt.text('AC');
                        $('#form20ac').append(opt);
                    }else{
                        $("#form20ac>option").remove();
                        $.each(year,function(id,year){
                            var opt = $('<option />');
                            opt.val(year.acid);
                            opt.text(year.acname);
                            $('#form20ac').append(opt);
                        });
                    }
                }
            });
        }
    });
    
    
      $('body').on('click','#form20pcsearch', function(e){
        e.preventDefault();
       
        var eid=$.trim(($('#form20year').val()));
        var st_id=$.trim(($('#form20state').val()));
        var pc_id =$.trim(($('#form20pc').val()));
        var acid = $.trim(($('#form20ac').val()));
        
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
        if(pc_id == 0){
            msg ='<b><i>Please Select PC</i></b>'; 
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
        
        window.location.href = base_url + 'pc/form20/' + pc_id + '/' +acid + '/' + eid;
        
      });



    // Code added by Raj pawar...
    $('body').on('click', '#btn_pc_summary', function(e) {
        e.preventDefault();

        var st_id = $.trim(($('#state').val()));
        if (st_id == 0) {
            msg = '<b><i>Please Select State</i></b>';
            $('#error').html(msg).show();
            setTimeout(function() {
                $("#error").fadeOut("slow", function() {
                });
            }, 5000);
            return false;
        }

        var pcid = $.trim(($('#pc_list').val()));
        if (pcid == 0) {
            msg = '<b><i>Please Select PC</i></b>';
            $('#error').html(msg).show();
            setTimeout(function() {
                $("#error").fadeOut("slow", function() {
                });
            }, 5000);
            return false;
        }

        window.location.href = base_url + 'pc/summary/' + pcid;
    });




    /*
        Functions use for Form20 Header information display...
    */
    $('body').on('click', 'img#id_form20_header_div', function(){
        
        var pcid = $(this).data('pcid');
        var acno = $(this).data('acno');

        var request = $.ajax({
            //  Get data after page loads               
            type: "POST",
            url: base_url+'pc/form20_header',
            dataType: "json",
            data:  {
                pcid:pcid,
                acno:acno
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






    
});

function change_pc_summary_list(s)
{
    $("#pc_list>option").remove();

    var e = $('#emid_poll').val();
    var s = $('#state').val();

    if(s == 0){
        $("#pc_list>option").remove();
        var opt = $('<option />');
        opt.text('Select PC');
        $('#pc_list').append(opt);
    }else{
        $.ajax({
            type: "POST",
            url: base_url+"pc/get_pc_list_summary/"+ e + "/" + s,
            success: function(year){
                //console.log(year);
                if(year == "" || year == 'NULL')
                {
                    $("#pc_list>option").remove();
                    var opt = $('<option />');
                    opt.text('Select PC');
                    $('#pc_list').append(opt);
                }
                else
                {
                    $("#pc_list>option").remove();
                    $.each(year,function(id,year){
                        var opt = $('<option />');
                        opt.val(year.sid);
                        opt.text(year.sname);
                        $('#pc_list').append(opt);
                    });
                }
            }
        });
    }
}



function validatepcdetail(){

    var pcnamecheck = document.getElementById('pcname').value;
    if(pcnamecheck == ''){
        // document.getElementById("error").style.visibility = "visible";
        $('#errordetail').show(); 
        return false;
    }else{
        return true;
    }
}



function validate(action=false)
{

   
    var year = document.getElementById('year').value;
    var state = document.getElementById('state').value;

    var yearSelect = document.getElementById("year");
    var selectedYr = yearSelect.options[yearSelect.selectedIndex].text;

    var stateSelect = document.getElementById("state");
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
            if(action=='lok-sabha')
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

function validate_state(action=false)
{

    var state = document.getElementById('state').value;
    var stateSelect = document.getElementById("state");
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
            if(action=='lok-sabha')
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


 


$(document).ready(function(){
    // Start to get the city

    $('body').on('change','#state', function(){

        // field_id  is the value of the data which has been selected
        $("#year > option").remove();
        var field_id = $('#state').val();

        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL')
        {
            $("#year > option").remove();
            var opt = $('<option />');
            opt.text('Select');

            $('#year').append(opt);

        }else{

            $.ajax(
            {

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"home/get_year/"+field_id,


                success: function(year)
                {
                    // after selection first delete the previous content and the add new item to the second dropdown list

                    if(year == ""   || year == 'NULL')

                    {
                        $("#year > option").remove();
                        var opt = $('<option />');

                        opt.text('No Data');

                        $('#year').append(opt);

                    }else{

                        $("#year > option").remove();
                        $.each(year,function(id,year)
                        {                
                            var opt = $('<option />');
                            opt.val(year.id);
                            opt.text(year.year);

                            $('#year').append(opt);
                        });
                    }
                }
            });
        }
    });//  end to get the 
    
   
   
    // Get state on year selection for allianvce pc detail page
   
    $('body').on('change','#years', function(){

       
        // field_id  is the value of the data which has been selected
        $("#state_alliance > option").remove();
        var field_id = $('#years').val();

        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL')
        {
            $("#state_alliance > option").remove();
            var opt = $('<option />');
            opt.text('Select');

            $('#state_alliance').append(opt);

        }else{

            $.ajax(
            {

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"alliance/get_state_allaince/"+field_id,


                success: function(state_alliance)
                {
                    // after selection first delete the previous content and the add new item to the second dropdown list

                    if(state_alliance == ""   || state_alliance == 'NULL')

                    {
                        $("#state_alliance > option").remove();
                        var opt = $('<option />');

                        opt.text('No Data');

                        $('#state_alliance').append(opt);

                    }else{

                        $("#state_alliance > option").remove();
                        
                        $.each(state_alliance,function(id,state_alliance)
                        {                
                            var opt = $('<option />');
                            opt.val(state_alliance.id);
                            if(state_alliance.id == 0){
                                opt.text('All States');
                            }else{
                                opt.text(state_alliance.value);
                            }

                            $('#state_alliance').append(opt);
                        });
                    }
                }
            });
        }
    });//  end to get the 
    
    
    //  For ac wise pc report shailesh
    $('body').on('submit','#form_pc_ac', function(e) {
        e.preventDefault();

        var eid = $('#emid').val();
        var state = $('#state_pc').val();
        var pc = $('#pc_trnd').val();
        if(pc != 0){
            window.location.href = base_url+"pc/ac_result/"+eid+"/"+state+"/"+pc;
        }else{
            window.location.href = base_url+"pc/ac_result/"+eid+"/"+state;
        }

    }); 
    
    
    	
    $('body').on('change','#state_pc', function() { 

        $("#loading").show();

        $('#pc_trnd').html('');
        var state_id = $('#state_pc').val();
        var eid = $('#emid').val();
        $.ajax(
        {

            type: "POST",
            dataType: 'json',
            url: base_url+"pc/get_pc/"+eid+"/"+state_id,
            success: function(pclisting)
            {
                $("#loading").hide();
                $.each(pclisting,function(id,pcs)
                {
					
                    var opt = $('<option />');
                    opt.val(pcs.id);
                    opt.text(pcs.pcid);
                    $('#pc_trnd').append(opt);
                });
            }
        });
    });
    
    
    // FOr prediction form submit
    
    //    $('body').on('submit','#form_pc_ac_pred', function(e) {
    $('body').on('change','#state_cmp', function() { 
        //        e.preventDefault();

        var eid = $('#emid').val();
        var state = $('#state_cmp').val();
       
        if(state != 0){
            window.location.href = base_url+"pc/ac_aggregated_pc/"+state;
        }else{
            var msg ='<b><i>Select State</i></b>'; 
            $('#error333').html(msg).show();  
            setTimeout(function(){
                $("div.error333").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
        }

    }); 
   
    //    $('body').on('submit','#form_pc_ac_pred_state', function(e) {
    //        e.preventDefault();
    $('body').on('change','#state_cmp_select', function() { 
       
        var state = $('#state_cmp_select').val();
       
        if(state != 0){
            window.location.href = base_url+"pc/ac_aggregated_pc/"+state;
        }else{
            var msg ='<b><i>Select State</i></b>'; 
            $('#error333').html(msg).show();  
            setTimeout(function(){
                $("div.error333").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
        }

    }); 
    
    
    
    $('body').on('mouseover', 'img#help_predict', function(){
        $('#pop_help_predict').show();
        
    });
    
    $('body').on('click', 'img#help_close_predict', function(){
        
        $('#pop_help_predict').hide();
        
        
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
	
    var pcval = document.getElementById('pc').value;
    var sval = document.getElementById('state').value;
    if(sval != 0)
    {
        if(pcval == 0)
        {
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

function validatepctrend(){
    var pcnamehome = document.getElementById('pcnamehome').value;

    if(pcnamehome == ''){
        //document.getElementById("error41").style.visibility = "visible";
        $('#error41').show();  
        return false;
    }else{	
        return true;
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

function pc_poll_check_msisdn(mobileno,logtime, data)
{
    $.ajax(
    {
        type: "POST",
        url: base_url+'pc/check_msisdn/'+mobileno+'/'+logtime,
        success: function(data1)
        {
            var f = alert_trim(data1);
            f = f.replace(/\n/g, "");
            var filldata = JSON.stringify(data1);
            if(f == '1')
            {   
                var pc_id     = $.trim(($('#pcid_poll').val()));
                var myCookie = "votepoll_" + mobileno + "_pc_" + pc_id;
                createCookie(myCookie, 1, 100); 

                display_poll_graph(data);
            }
            else
            {
                $('.errorLightbox').html(data.data).removeClass('error01').addClass('success');
                setTimeout( function(){
                    pc_poll_check_msisdn(mobileno,logtime, data);
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
    var pc_id =$.trim(($('#pcid_poll').val()));
    var emid = $.trim(($('#emid_poll').val()));

    $.ajax({ 
        type: "POST",
        dataType: "json",
     
        url: base_url+"pc/poll_data_result/"+st_id+"/"+pc_id+"/"+emid,
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
