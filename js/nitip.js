$(document).ready(function(){	
    var url = (window.location.search == '')? window.location.href+'?cache=yes': window.location.href+'&cache=yes';

    var request = $.ajax({
        type: "POST",
        url: url,
        dataType: "html",
        success: function(data){

            $("#loading").hide();
            document.getElementById('mianContent').innerHTML = data;
            $('#breadcrumb').prependTo('.mianContent');
            $('.fb-like, .g-plusone').attr('data-href',window.location.href);       
            // create filtering and sorting on table
            //datatableFilter();
            if((window.location.href.indexOf('pc/party/foothold') !== -1) || (window.location.href.indexOf('pc/party/footholdstatewise') !== -1) || (window.location.href.indexOf('ac/party/footholdstatewise') !== -1) || (window.location.href.indexOf('ac/party/footholdtrend') !== -1) || (window.location.href.indexOf('party/allStateYear') !== -1) ){   
                datatableFilter(0,true);
            }else{
                //console.log('asdasd');
                datatableFilter();    
            }
            getChart();

        },
        beforeSend: function(jqXHR,settings){
            var html = '<div id="loading"><img src="'+base_url+'images/ajax-loader.gif"></div>';
            $('.mianContent').html(html);
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });

    $('body').on('click','input:radio[name=radioselection]', function(e){		
		
        var radio = $(this).val();
		
        if (radio === 'pc') {
            var url = base_url+"party/ajax_statepc";
            $("#type").val ("pc");
        }else{
            var url = base_url+"party/ajax_stateac";
            $("#type").val ("ac");
        }
		

        $.ajax({
            //  Passing the field_id to the controller to having the function get_item to retrive the element for the second dropdown list
            type: "POST",
            url: url,
            success: function(state){
                // after selection first delete the previous content and the add new item to the second dropdown list

                if(state == ""   || state == 'NULL'){
                    $("#state > option").remove();
                    var opt = $('<option />');
                    opt.text('No Data');
                    $('#state').append(opt);

                }else{
                    $("#state > option").remove();
                    $('#state').append(opt);
                    $.each(state,function(id, state){

                        var opt = $('<option />');
                        opt.val(state.id);
                        opt.text(state.state);						
                        $('#state').append(opt);						        						         
                    });
               	
                    callsetstateid(state.id);
               		
                }
            }
        });
    }); 
    
    // To change state on the delimitation click on partyacfoothold       
    $('body').on('change','#delimitation', function(){
  
        $("#throbber").show(); 
        var del_id = $('#delimitation').val();
        var state_check = $('#state').val();
        console.log(state_check);
        var checkvalue =0;
            
        $.ajax({
            type: "POST",
            url: base_url+"ac/ajax_state_partyfoot/"+del_id,
            success: function(state){
                $("#throbber").hide(); 
                if(state == ""   || state == 'NULL'){
                    $("#state > option").remove();
                    var opt = $('<option />');
                    opt.text('No Data');
                    $('#state').append(opt);
                }else{
                    $("#state > option").remove();
                    var opt = $('<option />');
                    $.each(state,function(stateid,state){
                        var opt = $('<option />');
                        if (state.id == state_check ) {
           
                            checkvalue = 1;
                        
                        }
                        opt.val(state.id);
                        opt.text(state.stname);
                        $('#state').append(opt);
                    });
                         
                    if(checkvalue == 1){
                        $('#state').val(state_check);
                    }
                         
                }
            }// SUCCESS
        });//ajax
    });// delimitation change
                   
    // To change state on the delimitation click on partypcfoothold             
    $('body').on('change','#delimitationpc', function(){
        $("#throbber").show(); 
        var del_id = $('#delimitationpc').val();
        var state_check = $('#state').val();        
        var checkvalue =0;
        $.ajax({
            type: "POST",
            url: base_url+"pc/ajax_state_pcfoot/"+del_id,
            success: function(state){
                $("#throbber").hide(); 
                if(state == ""   || state == 'NULL'){
                    $("#state > option").remove();
                    var opt = $('<option />');
                    opt.text('No Data');
                    $('#state').append(opt);
                }else{
                    $("#state > option").remove();
                    var opt = $('<option />');
                    $.each(state,function(key,state){
                        var opt = $('<option />');
                        if (state.id == state_check ) {
           
                            checkvalue = 1;
                        
                        }
                        opt.val(state.id);
                        opt.text(state.state);

                        $('#state').append(opt);
                    });
                    if(checkvalue == 1){
                        $('#state').val(state_check);
                    }
                }
            }// SUCCESS
        });//ajax
    });// delimitationpc change
    

});

function getChart(){

}

function validateparty(){
    var partyname = document.getElementById('partylist').value;

    if(partyname == ''){

        document.getElementById("error1").style.visibility = "visible";               
        return false;
    }else{	
        return true;
    }
                       
}

function validateparty(){
    var radiotype = document.getElementById('type').value;
    var stateval = document.getElementById('state').value;

    if(radiotype == 'ac' && stateval == "0"){
        //document.getElementById("error11").innerHTML = "Please Select State for AC";
        //document.getElementById("error11").style.visibility = "visible";
        $('#error11').html('Please Select State for AC').show();
        return false;
    }else{	
        return true;
    }               
}


function validate_ac_party_foot(){
   
    var stateval = document.getElementById('state').value;

    if(stateval == "0"){
        //document.getElementById("error11").innerHTML = "Please Select State for AC";
        //document.getElementById("error11").style.visibility = "visible";
        $('#error').html('Please Select State').show();
        return false;
    }else{	
        return true;
    }               
}


function callsetstateid(stid){	
    $("#state").val(stid);
}
