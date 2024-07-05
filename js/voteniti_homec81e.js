// To change the state name depending on the year
$(document).ready(function(){

    var url = (window.location.search == '')? window.location.href+'?cache=yes': window.location.href+'&cache=yes';

    var request = $.ajax({
        //  Get data after page loads               
        type: "POST",
        url: url,
        dataType: "html",
        success: function(data){
            $("#loading").remove();             
            //document.getElementById('mianContent').innerHTML = data;                
            $('#breadcrumb').prependTo('.mianContent');
            $('.fb-like, .g-plusone').attr('data-href',window.location.href);

            // datatableFilter(0,true);
            if(document.getElementById("runInnerJavascript") != null){
                eval(document.getElementById("runInnerJavascript").innerHTML);
            }
            
            $("#id_state_graph_div").html("");               
            //getChart();
        },
        beforeSend: function(jqXHR,settings) {
            var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
            //$('.mianContent').html(html);
            $("#id_state_graph_div").html(html);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });



    var value = "0";
    $("#state").val(value);
    $("#year").val(value);
    $("#stateac").val(value);
    $("#yearac").val(value);
	
    $('#year').change(function(){
								
        $("#loading").show();

        $("#state > option").remove();
        var field_id = $('#year').val();
        if(field_id == "" || field_id == 'NULL'){
                 
            $("#state > option").remove();
            var opt = $('<option />');
            opt.text('No Data');
            $('#state').append(opt);

        }else{

            $.ajax({
	        	
                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list
	            
                type: "POST",
                url: base_url+"home/Ajaxstatepc/"+field_id,
                dataType: "json",		             
                success: function(state){

                    // after selection first delete the previous content and the add new item to the second dropdown list
                    $("#loading").hide();
                         
                    if(state == ""   || state == 'NULL'){
                        $("#state > option").remove();
                        var opt = $('<option />');
                        opt.text('No Data');
                        $('#state').append(opt);

                    }else{
                        $("#state > option").remove();
                        $('#state').append(opt);

                        $.each(state,function(id,state){
                            var opt = $('<option />');
                            opt.val(state.id);
                            opt.text(state.value);
                            $('#state').append(opt);	                    	
                        });
                    }	                                      
                }
            });                           
        }			    			  
    });//  end to get the 

    $('#stateac').change( function(){

        // field_id  is the value of the data which has been selected
        $("#yearac > option").remove();
        var field_id = $('#stateac').val();
			   
        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL'){
            $("#year > option").remove();
            var opt = $('<option />');
            opt.text('Year');

            $('#yearac').append(opt);

        }else{

            $.ajax({

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"home/GetyearacAjaxhome/"+field_id,


                success: function(year){
                    // after selection first delete the previous content and the add new item to the second dropdown list
	
                    if(year == ""   || year == 'NULL'){
                        $("#yearac > option").remove();
                        var opt = $('<option />');
		
                        opt.text('Year');
		
                        $('#yearac').append(opt);
                    }else{
                        $("#yearac > option").remove();
                        $.each(year,function(id,year){
		
                            var opt = $('<option />');
                            opt.val(year.id);
                            opt.text(year.year);		
                            $('#yearac').append(opt);
                        });
                    }
                }
            });
        }
    });
    
    // For District
    
    $('#state_ac_dist').change( function(){

        // field_id  is the value of the data which has been selected
        $("#year_dist > option").remove();
        $("#dist > option").remove();
        var field_id = $('#state_ac_dist').val();
			   
        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL'){
            $("#year_dist > option").remove();
            var opt = $('<option />');
            opt.text('Year');

            $('#year_dist').append(opt);
            
            $("#dist > option").remove();
            var opt = $('<option />');
            opt.text('District');

            $('#dist').append(opt);

        }else{

            $.ajax({

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"home/GetyearacAjaxhome_dist/"+field_id,


                success: function(year){
                    // after selection first delete the previous content and the add new item to the second dropdown list
	
                    if(year == ""   || year == 'NULL'){
                        $("#year_dist > option").remove();
                        var opt = $('<option />');
		
                        opt.text('Year');
		
                        $('#year_dist').append(opt);
                        $("#dist > option").remove();
                        var opt = $('<option />');
                        opt.text('District');

                        $('#dist').append(opt);
                    }else{
                        $("#year_dist > option").remove();
                        $.each(year,function(id,year){
		
                            var opt = $('<option />');
                            opt.val(year.id);
                            opt.text(year.year);		
                            $('#year_dist').append(opt);
                            $("#dist > option").remove();
                            var opt = $('<option />');
                            opt.text('District');

                            $('#dist').append(opt);
                        });
                    }
                }
            });
        }
    });
    
     $('#state_voting').change(function() {
        var state_id = $(this).val();
        $('#error_voting').html('');
        var def='<select id="pc_voting_date" style="margin-left: 4%;width: 45%;"  ><option>Select PC</option></select>';
        if (state_id != '0') {
            $.ajax({
                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url + "home/getElectionDate/" + state_id,
                datatype:'json',
                 success: function(pclist){
                   
                    $('#polling_date_div').html(pclist);
                 }
            })
        }else{
             var msg ='Please Select State'; 
            $('#error_voting').html(msg).show();  
            setTimeout(function(){
                $("#error_dist").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            $('#polling_date_div').html(def);
            return false;
        }
    })
    $('#year_dist').change( function(){

        // field_id  is the value of the data which has been selected dist
       
        $("#dist > option").remove();
        var field_id = $('#state_ac_dist').val();
        var emid = $('#year_dist').val();
			   
        // If field_id is empty then dropown list will have only 'Please Select Field Opotion
        if(field_id == "" || field_id == 'NULL' || emid == "" || emid == 'NULL' ){
            
            $("#dist > option").remove();
            var opt = $('<option />');
            opt.text('District');

            $('#dist').append(opt);

        }
        else{

            $.ajax({

                //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list

                type: "POST",
                url: base_url+"home/Get_dist_ac/"+field_id+"/"+emid,


                success: function(year){
                    // after selection first delete the previous content and the add new item to the second dropdown list
	
                    if(year == ""   || year == 'NULL'){
                        $("#dist > option").remove();
                        var opt = $('<option />');
		
                        opt.text('District');
		
                        $('#dist').append(opt);
                    }else{
                        $("#dist > option").remove();
                        $.each(year,function(id,year){
		
                            var opt = $('<option />');
                            opt.val(year.id);
                            opt.text(year.year);		
                            $('#dist').append(opt);
                        });
                    }
                }
            });
        }
    });
    
    $('body').on('submit','#form_ac_dist', function(e) { 
        e.preventDefault();
        
        var state= $('#state_ac_dist').val();
        var emid= $('#year_dist').val();
        var distid= $('#dist').val();
        
        //         return false;
        if(state == 0 || state == ''){
           
            var msg ='Please Select State'; 
            $('#error_dist').html(msg).show();  
            setTimeout(function(){
                $("#error_dist").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
        if(emid == 0 || emid == ''){
           
            var msg ='Please Select Year'; 
            $('#error_dist').html(msg).show();  
            setTimeout(function(){
                $("#error_dist").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
        if(distid == 0 || distid == ''){
           
            var msg ='Please Select District'; 
            $('#error_dist').html(msg).show();  
            setTimeout(function(){
                $("#error_dist").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
        window.location.href = base_url+"district/ac/"+emid+"/"+distid;
    
    });
    
    
    
    $('body').on('submit','#state_summary_form', function(e) { 
        e.preventDefault();
        
        var state= $('#state_summary').val();
       
        
        //         return false;
        if(state == 0 || state == ''){
           
            var msg ='Please Select State'; 
            $('#error_state').html(msg).show();  
            setTimeout(function(){
                $("#error_state").fadeOut("slow", function () {
 
                    });
 
            }, 5000);
            return false;
        }
       
       
        window.location.href = base_url+"state/summary/"+state;
    
    });

    //$('.sortable').tablesorter(option);
    var sortObject = [];
    $.each($('.sortable tbody tr:first td'),function(i,j){   

        if($(this).hasClass('noFilter')){            
            var obj = {
                "sType": 'noFilter'
            };
        }else{
            var obj = {
                "sType": "natural"
            };
            
        }
        sortObject.push(obj);
    });

    $('.sortable').dataTable({ 
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false,
        "aoColumns":sortObject,
        "aaSorting" : [[ 0, 'desc' ]]
    });


    ///// IV BLOGS

    /*$.ajax({
        type: "POST",
        url: base_url+"home/iv_blog",
        dataType : 'json',
        success: function(msg) {
            if(msg.status){
                var show_data = msg.data;
                $('#iv_blog').html('').html(show_data).show();
                       
            }
        }
               
    });*/

/////


$('body').on('mouseover', 'img#help', function(){
        $('#pop_help').show();
        
    });
    
    $('body').on('click', 'img#help_close', function(){
        
        $('#pop_help').hide();
        
        
    });




});//$(document).ready(function() close

function validatepc(action=false){
                          
    var year = document.getElementById('year').value;
    var state = document.getElementById('state').value;
    
    var yearSelect = document.getElementById("year");
    var selectedYr = yearSelect.options[yearSelect.selectedIndex].text;

    var stateSelect = document.getElementById("state");
    var selectedState = stateSelect.options[stateSelect.selectedIndex].text;


    if(year == 0 && state==0 )
    {		
        $('#error').html('Please Select Year').show();      
        setTimeout(function(){ $('#error').html(''); }, 3000);   
        return false;

    }
    else if(year == 0 )
    {       
        $('#error').html('Please Select Year').show();    
        setTimeout(function(){ $('#error').html(''); }, 3000);     
        return false;

    }
    else
    {

        if(state==0)
        {
            selectedState ="all-states";
        }
        if(year==0)
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
        else
        {
            return true;
        }
    }               
}

function validateactrend(){
    var acname = document.getElementById('acname').value;

    if(acname == ''){
        // document.getElementById("error31").style.visibility = "visible";
        $('#error31').show();  
        return false;
    }else{	
        return true;
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

function validateac(){
     
    var yearac = document.getElementById('yearac').value;
    var stateac = document.getElementById('stateac').value;
    
    if((yearac == 0 && stateac == 0)){

        //document.getElementById("errorac").innerHTML = "Please select State";
        //document.getElementById("errorac").style.visibility = "visible";
        $('#errorac').html('Please Select State').show();  
        
        return false;
    }else if(stateac == 0){

        //document.getElementById("errorac").innerHTML = "Please select state";
        //document.getElementById("errorac").style.visibility = "visible";
        $('#errorac').html('Please Select State').show();  
  
        return false;
    }else{	

        return true;
    }
}

<!--  TO set the  hidden_radioval which will be used for the ac and pc selection -->
function setradiovalue(radioval){

    $("#hidden_radioval").val(radioval);
}
      	    
function validateparty(){

    var partyname = document.getElementById('partylist').value;
    if(partyname == ''){

        //document.getElementById("error1").style.visibility = "visible";
        $('#error1').show();  
        return false;
    }else{	
        return true;
    }
                       
}



function validatecandidate(){
    var partyname = document.getElementById('candidate').value;

    if(partyname == ''){

        //document.getElementById("error4").style.visibility = "visible";
        $('#error4').show();  
        return false;
    }else{	
        return true;
    }
	                       
}

function validatestate(){
    var statename = document.getElementById('state').value;
			
    if(statename == 0){

        //document.getElementById("error1").style.visibility = "visible";
        $('#error1').show(); 
        return false;
    }else{

        return true;
    }   
}


function validatestatelist(){
    var statename = document.getElementById('statelist').value;
            
    if(statename == 0){

        //document.getElementById("error1").style.visibility = "visible";
        $('#error2').show(); 
        return false;
    }else{

        var statename = document.getElementById('statelist').value;

        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(statename);
        var state_id = matches[1];

        document.stateSummaryfrm.action = base_url + "state/summary/" + state_id;

        document.getElementById("stateSummaryfrm").submit();
        return true;
    }   
}


function GotoSummaryPage(state_id)
{    
    document.frmStateSummary.action = base_url + "state/summary/" + state_id;
    document.getElementById("frmStateSummary").submit();
}

function validate_ac(action=false)
{

    var year = document.getElementById('yearac').value;
    var state = document.getElementById('stateac').value;

    var yearSelect = document.getElementById("yearac");
    var selectedYr = yearSelect.options[yearSelect.selectedIndex].text;

    var stateSelect = document.getElementById("stateac");
    var selectedState = stateSelect.options[stateSelect.selectedIndex].text;
   
     if((year == 0 && state == 0)){

        //document.getElementById("errorac").innerHTML = "Please select State";
        //document.getElementById("errorac").style.visibility = "visible";
        $('#errorac').html('Please Select State').show();
        setTimeout(function(){ $('#errorac').html(''); }, 3000);  
        
        return false;
    }else if(state == 0){

        //document.getElementById("errorac").innerHTML = "Please select state";
        //document.getElementById("errorac").style.visibility = "visible";
        $('#errorac').html('Please Select State').show();  
        setTimeout(function(){ $('#errorac').html(''); }, 3000);
  
        return false;
    }
    else if((year == 0 || year == "Year") && state == 0 )
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