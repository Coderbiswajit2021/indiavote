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

            // datatableFilter(0,true);
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




    // Code added by Raj pawar...
    $('body').on('click', '#btn_go', function(e) {
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

        var acid 	= $.trim(($('#ac_list').val()));
        var pcid 	= $.trim(($('#pc_list').val()));
        var dist_id = $.trim(($('#district_list').val()));

        // http://192.168.11.93/indiavotes/trunk/ac/summary/7569
        if(acid != 0 && acid != 'Select AC') {
        	window.location.href = base_url + 'ac/summary/' + acid;
        	return false;
        }

        // http://192.168.11.93/indiavotes/trunk/pc/summary/7569
        if(pcid != 0 && pcid != 'Select PC') {
        	window.location.href = base_url + 'pc/summary/' + pcid;
        	return false;
        }

        //http://192.168.11.93/indiavotes/trunk/district/summary/30/298
        if(dist_id != 0 && dist_id != 'Select District'){
        	window.location.href = base_url + 'district/summary/' + st_id + '/' + dist_id;
        	return false;
        }

        //http://192.168.11.93/indiavotes/trunk/state/summary/29
        window.location.href = base_url + 'state/summary/' + st_id;

    });


    $('body').on('change', '#pc_list', function(e) {
    	$('#district_list').val(0);
    	$("#ac_list>option").remove();
        var opt = $('<option />');
        opt.text('Select AC');
        $('#ac_list').append(opt);
    });

    $('body').on('change', '#district_list', function(e) {
    	$('#pc_list').val(0);
    	$("#ac_list>option").remove();
        var opt = $('<option />');
        opt.text('Select AC');
        $('#ac_list').append(opt);
    });


});


function change_pc(s)
{
	$("#ac_list>option").remove();
    var s = $('#state').val();

    var pc = $('#pc_list').val();
	if(pc == 0){
        $("#li_ac").hide();
        $("#ac_list>option").remove();
        var opt = $('<option />');
        opt.text('Select AC');
        $('#ac_list').append(opt);
    }else{
    	$("#li_ac").show();
        $.ajax({
            type: "POST",
            url: base_url+"summary/ajax_pc_ac_list/" + s + "/"+ pc,
            success: function(acs){
                //console.log(acs);
                if(acs == "" || acs == 'NULL')
                {
                    $("#ac_list>option").remove();
                    var opt = $('<option />');
                    opt.text('Select AC');
                    $('#ac_list').append(opt);
                }
                else
                {
                    $("#ac_list>option").remove();
                    $.each(acs,function(id,acs){
                        var opt = $('<option />');
                        opt.val(acs.sid);
                        opt.text(acs.sname);
                        $('#ac_list').append(opt);
                    });
                }
            }
        });
    }
}


function change_district(d)
{
	$("#ac_list>option").remove();
    var s = $('#state').val();

    var d = $('#district_list').val();
	if(d == 0){
        $("#li_ac").hide();
        $("#ac_list>option").remove();
        var opt = $('<option />');
        opt.text('Select AC');
        $('#ac_list').append(opt);
    }else{
    	$("#li_ac").show();
        $.ajax({
            type: "POST",
            url: base_url+"summary/ajax_district_ac_list/" + s + "/"+ d,
            success: function(acs){
                //console.log(acs);
                if(acs == "" || acs == 'NULL')
                {
                    $("#ac_list>option").remove();
                    var opt = $('<option />');
                    opt.text('Select AC');
                    $('#ac_list').append(opt);
                }
                else
                {
                    $("#ac_list>option").remove();
                    $.each(acs,function(id,acs){
                        var opt = $('<option />');
                        opt.val(acs.sid);
                        opt.text(acs.sname);
                        $('#ac_list').append(opt);
                    });
                }
            }
        });
    }
}



function change_state(s)
{
    $("#pc_list>option").remove();
    var s = $('#state').val();

	if(s == 0){
        $("#li_pc_district").hide();
        $("#li_ac").hide();
        $("#pc_list>option").remove();
        var opt = $('<option />');
        opt.text('Select PC');
        $('#pc_list').append(opt);

    }else{
    	$("#li_pc_district").show();
        $.ajax({
            type: "POST",
            url: base_url+"summary/ajax_pc_list/" + s,
            success: function(pcs){
                //console.log(pcs);
                if(pcs == "" || pcs == 'NULL')
                {
                    $("#pc_list>option").remove();
                    var opt = $('<option />');
                    opt.text('Select PC');
                    $('#pc_list').append(opt);
                }
                else
                {
                    $("#pc_list>option").remove();
                    $.each(pcs,function(id,pcs){
                        var opt = $('<option />');
                        opt.val(pcs.sid);
                        opt.text(pcs.sname);
                        $('#pc_list').append(opt);
                    });
                }
            }
        });


        //  Call district list..
        $.ajax({
            type: "POST",
            url: base_url+"summary/ajax_district_list/" + s,
            success: function(dist){
                //console.log(dist);
                if(dist == "" || dist == 'NULL')
                {
                    $("#district_list>option").remove();
                    var opt = $('<option />');
                    opt.text('Select District');
                    $('#district_list').append(opt);
                }
                else
                {
                    $("#district_list>option").remove();
                    $.each(dist,function(id,dist){
                        var opt = $('<option />');
                        opt.val(dist.sid);
                        opt.text(dist.sname);
                        $('#district_list').append(opt);
                    });
                }
            }
        });
    }
}

