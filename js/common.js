var oTable;

function disableSelection(target) {

    $('div, span, p, td ').attr('unselectable', 'on');
    $('#wrapper, .bodyBg').addClass('unselectable');
}

// divert alerts to console.log if available
if (typeof (console) !== "undefined") {
    window.alert = function(content) {
        try {
            window.console.log(content); /* send alerts to console.log if available. */
        } catch(e) {} /* otherwise do nussink else */
    }
}
// enabled right click 3rd June 2013
/*$(document).bind("contextmenu", function(e) {
    e.preventDefault();
});*/

/* This code is being used to disable selection*/
(function ($) {
    $.fn.disableSelection = function () {

        $(this).attr('unselectable', 'on');
        $(this).addClass('unselectable');
        return this.each(function () {
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function() {   
                    return false; 
                };
            } else if (typeof this.style.MozUserSelect != 'undefined') {                
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function() {
                    return false;
                };
            }
        });
    };

})(jQuery);

$(document).ready( function() {
    //disableSelection(); // disabled on 14th march 
    //select all the a tag with name equal to modal
    $('body').on('click','a[name=modal]', function(e) {
        //Cancel the link behavior
        $('.window .close').trigger('click');
        e.preventDefault();
        //Get the A tag
        errorReportFormFill();
        
        var id = $(this).attr('href');
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Set heigth and width to mask to fill up the whole screen
        $('#mask').css({
            'width':maskWidth,
            'height':maskHeight
        });
        //transition effect
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow",0.5);
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center

        $(id).css('top',  winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);

        //transition effect
        $(id).fadeIn(2000);
    });
    
    $('body').on("click",'#mask, .window .close', function (e) {
        //Cancel the link behavior        
        e.preventDefault();        
        $('.ajaxFormSubmit').each(function(){
            this.reset();
        });
        $('.errorLightbox').html('');
        $('#mask').hide();
        $('.window').hide();        
    });

    //$('.main, .header, .footer').disableSelection();
    
    $('.ajaxFormSubmit').submit( function(e){

        e.preventDefault();
        var form = $(this);
        var data = $(form).serialize();
        var getState =  $.ajax({
            url: $(form).attr('action'),
            cache: false,
            type: "POST",
            dataType:'json',
            data: data,
            success: function(msg){                    

               $("form .click_subt").LoadingOverlay("hide");
               
                if(msg.status == 'fail')
                {      
                    $(form).children('.errorLightbox').html(msg.data).addClass('error01').removeClass('success');
                  
                   

                }else
                {    
                    
                    $(form).children('.errorLightbox').html(msg.data).removeClass('error01').addClass('success');
                    $('.ajaxFormSubmit').each(function(){
                        this.reset();
                    });
                    setTimeout(function () {
                        $('.close').trigger('click');
                    }, 3000);                    
                }                
            }
        });
        return false;    
    });    

    // call recent view ajax where neccesory 
    loadRecentView();
    
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('.backtotop').fadeIn();	
        } else {
            $('.backtotop').fadeOut();
        }
    });
    
    
    $('.backtotop').click(function(){
        $('html, body').animate({
            scrollTop:0
        }, 'slow');
    });

    if ($('#contactus_captcha').length == 1  ) {
        showRecaptcha("contactus_captcha");  
    };   

});

function errorReportFormFill() {
    $('.errorLink').val(window.location.href);
    $('.user_agent').val(navigator.sayswho);
    showRecaptcha("error_captcha");    
}

var query_string = {};
QueryStringToHash(window.location.href);
function QueryStringToHash (url) {

    if(typeof(url.split('?')[1]) !== 'undefined'){

        var vars = url.split('?')[1].split("&");

        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            pair[0] = decodeURIComponent(pair[0]);
            pair[1] = decodeURIComponent(pair[1]);

            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
            // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
            // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }   
    }   
    return query_string;
};


// This adds 'placeholder' to the items listed in the jQuery .support object. 
jQuery(function() {
    jQuery.support.placeholder = false;
    test = document.createElement('input');
    if ('placeholder' in test) jQuery.support.placeholder = true;
});

//jQuery(function() {
//    // add placeholder support to browsers that wouldn't otherwise support it. 
//    if (!$.support.placeholder) {
//        var active = document.activeElement;
//        $(':text,:password').focus(function() {
//            if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
//                $(this).val('').removeClass('hasPlaceholder');
//            }
//        }).blur(function() {
//            if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
//                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
//            }
//        });
//
//        $(':text,:password').blur();
//        $(active).focus();
//        $('form:eq(0)').submit(function() {
//            $(':text.hasPlaceholder,:password.hasPlaceholder').val('');            
//        });
//    }
//
//    Placeholders.init({
//        live: true, //Apply to future and modified elements too
//        hideOnFocus: true //Hide the placeholder when the element receives focus
//    });
//});

// see the broser user agent 
navigator.sayswho= (function() {
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M;
})();

function should_sortByDesc() {
    var arr = ['party/detail','party/state_info','party/ac_info','party/info','pc/pctrendinside?delimitation',
    'party/pc_detail','ac/trend?','pc/trend?name','pc/multitrend/','lok-sabha/0/0/0/0','vidhan-sabha'];

    //,'nitiac/acinfo?stateac'
    var url = window.location.href;
    var p = false;
    if(url.indexOf('eid=0') !== -1  && url.indexOf('vidhan-sabha') !== -1 ){
        p = true;
    }

    $.each(arr, function(i,j){
        if(url.indexOf(j) !== -1 ){
            p = true;
        }
    });
    return p;
}

function datatableFilter(colsort,nofilter) {

    var s = should_sortByDesc();        
    if(s){
        var aaSorting = [[ 0, 'desc' ]];               
    }else{
        var aaSorting = [[ 0, 'asc' ]];
    }

    // for page which needs sorting on third column
    if(window.location.href.indexOf('pc/acwisedetails') !== -1){           
        aaSorting = [[ 2, 'desc' ]];  
    }

    if(window.location.href.indexOf('pc/acwisedetails') !== -1){           
        aaSorting = [[ 2, 'desc' ]];  
    }
    
    // for page which needs sorting on fourth column
    if(window.location.href.indexOf('party/AllPartyPerformance') !== -1 ){             
        aaSorting = [[ 3, 'desc' ]];  
    }
    
    if(window.location.href.indexOf('vidhan-sabha') !== -1 ){ 
        var url = window.location.href;
        if(url.indexOf('eid=0') !== -1){
            aaSorting = [[ 0, 'desc' ]];  
        }else{
            aaSorting = [[ 1, 'asc' ]];  
        }
      
    }

    if(window.location.href.indexOf('discovery') !== -1 ){ 
        aaSorting = [[ 1, 'desc' ]];  
      
    }
    
    if((window.location.href.indexOf('pc/pcpartyallstates') !== -1) || (window.location.href.indexOf('pc/party') !== -1) || (window.location.href.indexOf('ac/party/detail') !== -1)){             
        aaSorting = [[ 2, 'desc' ]];  
    }
    
    // for page which needs sorting on  fifth column
    if(window.location.href.indexOf('party/performance') !== -1 ){             
        aaSorting = [[ 4, 'desc' ]];  
    }
    
    if(window.location.href.indexOf('ac/search?acname=') !== -1){
        aaSorting = [[ colsort, 'desc' ]];
    }
        
    if(window.location.href.indexOf('pc/search?name') !== -1){
        aaSorting = [[ colsort, 'desc' ]];
    }
        
    if(window.location.href.indexOf('district/ac/') !== -1 ){             
        aaSorting = [[ 1, 'asc' ]];  
    }
    if(window.location.href.indexOf('pc/prediction/') !== -1 ){             
        aaSorting = [[ 1, 'desc' ]];  
    }
    if(window.location.href.indexOf('analysis/swing_usage') !== -1 ){             
        aaSorting = [[ 7, 'desc' ]];  
    }
    
    if(window.location.href.indexOf('analysis/ac_aggrigated_pc_report') !== -1 ){             
        aaSorting = [[ 1, 'asc' ]];  
    }
    if(window.location.href.indexOf('analysis/dl3_pc_summary') !== -1 ){             
        aaSorting = [[ 1, 'asc' ]];  
    }

    //$('.sortable').tablesorter(option);
    var sortObject = [];
    $.each($('.sortable tbody tr:first td'),function(i,j){
        var obj = {
            "sType": "natural" // sort all columns with natural plugin
        };
        sortObject.push(obj);
    });

    var filterObject = [];
    $.each($('.sortable tbody tr:first td'),function(i,j) {
        
        var text = '';
        $('.sortable>tbody>tr>td:nth-child('+(i+1)+')').each( function(p,q){
            text = $(q).html().replace(/<.*?>/g, "").replace(/[,.%]/g,'');
            //add item to array
            if(!isNaN(text)){                
                return false; // return if it finds a number                 
            }

            var letters = /[A-Za-z]$/;  
            if(text.match(letters))
                return false; // return if it finds a alphabets

        });
        
        if(isNaN(text)){
            
            //console.log(sortObject[i].sType);
            var obj = {
                type:"text"
            };
            sortObject[i].sType = 'html';
        }else{

            var obj = {
                type:"GtLt"
            };
        //var obj = {type:"number"};
        }

        if($(this).parents('tbody').prev('thead').find('th').eq($(this).index()).hasClass('noFilter')){            
            var obj = null;  
        }
        filterObject.push(obj);
    });
    
    var option = { 
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false,
        "oLanguage": {
            "sSearch": "Search all columns:"
        },
        "aaSorting" : aaSorting,
        "aoColumns": sortObject,
        "fnDrawCallback": function( oSettings ) {
            reorderRowNumbering();
        }
    }

    var theadTr = $('.sortable thead tr').length;

    if(window.location.href.indexOf('pc/acwisedetails') !== -1 ){            
        var option = { 
            "bPaginate": false,
            "bLengthChange": true,
            "bFilter": false,
            "bSort": true,
            "bInfo": false,
            "bAutoWidth": false,
            "oLanguage": {
                "sSearch": "Search all columns:"
            },
            "aoColumns": sortObject,
            "aaSorting" : aaSorting
        }
        oTable = $('.sortable').dataTable(option);    
    //$('.sortable thead tr:first').prepend('<th rowspan="">&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;</th>');
        
    }
    else if(nofilter){  
        //   if(window.location.href.indexOf('pc/search') !== -1){
        //  aaSorting = [[ colsort, 'desc' ]];
        //  }
        //        else if(window.location.href.indexOf('ac/search?acname=') !== -1){
        //            aaSorting = [[ colsort, 'desc' ]];
        //        }
        
        //  else{
        aaSorting = [[ colsort, 'asc' ]];
        // }
        var option = { 
            "bPaginate": false,
            "bLengthChange": true,
            "bFilter": false,
            "bSort": true,
            "bInfo": false,
            "bAutoWidth": false,
            "oLanguage": {
                "sSearch": "Search all columns:"
            },
            "aoColumns": sortObject,
            "aaSorting" : aaSorting,
            "fnDrawCallback": function( oSettings ) {
                reorderRowNumbering();
            }
        }
        oTable = $('.sortable').dataTable(option);    
        $('.sortable thead tr:first').prepend('<th rowspan='+theadTr+'>&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;</th>');
    //new FixedHeader( oTable );

    }else{
        if((window.location.href.indexOf('state/summary11/') !== -1) || (window.location.href.indexOf('pc/summary/') !== -1 ) || (window.location.href.indexOf('ac/summary/') !== -1 ) ){
            dataTable_globalSearch();
            return;
        }else{
            $('.sortable  thead tr').after($('.sortable  thead tr').clone()).addClass('gridFilter');
            oTable = $('.sortable').dataTable(option).columnFilter({
                sPlaceHolder:'head:before',
                aoColumns:filterObject
            }); 
            $('.sortable thead tr').prepend('<th  rowspan='+theadTr+'>&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;</th>');
        }
         
        
    }

    if(document.getElementById("runInnerJavascript") != null){
        eval(document.getElementById("runInnerJavascript").innerHTML);
    }    
    
    $('.dataTables_filter').remove(); // remove search field
    
    //get recent visits
    getRecentView();

    googleAnalytics(); // Create Tracking Code    
    
    //    console.log(downloadCSV);
    if(typeof downloadCSV != 'undefined'  ){
        if(downloadCSV == true && window.location.href.indexOf('pc/acwisedetails') == -1 && window.location.href.indexOf('form20/meta_report') == -1 ){
            export_csv_button(); //Create Export CSV button
        }    
    }
}

function dataTable_globalSearch(){
    var option = { 
        "bPaginate": false,
        "bLengthChange": true,
            
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false     
    }
//    $('#district').dataTable(option);
//    $('#ac').dataTable(option);
//    $('#pc').dataTable(option);
    //              $('#census').dataTable(option);
    if(document.getElementById("runInnerJavascript") != null){
        eval(document.getElementById("runInnerJavascript").innerHTML);
    }    
   
    
    //get recent visits
    getRecentView();

    googleAnalytics(); // Create Tracking Code    
    
    //    console.log(downloadCSV);
    if(typeof downloadCSV != 'undefined'  ){
        
        if(downloadCSV == true && window.location.href.indexOf('pc/acwisedetails') == -1 && window.location.href.indexOf('form20/meta_report') == -1){
            export_csv_button(); //Create Export CSV button
        }    
    }
    
}

function reorderRowNumbering(){    
    $('.numberTable').remove();
    $('.sortable').each(  function(){         
        $(' tbody tr',this).each( function(i,j){ 
            var k = i+1;
            $(this).prepend('<td class="numberTable">'+ k +'</td>');
        });
    });
}

function getRecentView(){

    $('body').on('click','.relatedTab', function(){
        var id = $(this).attr('rel');
        $('.tabListing').hide();
        $('a.relatedTab').removeClass('relatedTabActive');
        $('#'+id).show();
        $(this).addClass('relatedTabActive');
    });

    $('a.relatedTab :first').addClass('relatedTabActive').css('border-radius','8px 0px 0px 0px');    
    var recentVisit =  $.ajax({
        url: base_url+'home/getRecentVisit',
        cache: false,
        type: "POST",
        dataType:'json',
        data:{
            url:window.location.href,
            title:window.document.title
        },
        success: function(msg){    
            var html = '';            
            jQuery.each(msg, function(i,j){
                if(j.title !== '' && j.url !== 'undefined' && j.url !== '')
                    html += '<li> <a href="'+j.url+'" >'+j.title+'</a></li>' ;
            });
            jQuery('#recentViews').html(html);
        }
    });
}

// this will load when there is no table loading and function getRecentView() not being called
function loadRecentView(){
    var arr = ['home/contact_us','home/about_us'];

    //,'nitiac/acinfo?stateac'
    var url = window.location.href;    

    $.each(arr, function(i,j){
        if(url.indexOf(j) !== -1 ){
            getRecentView();
        }
    });
}

function googleAnalytics(){
    $('body').on('click', '.sorting_desc, .sorting_asc, .sorting', function(event){
        var element = $(event.target || event.srcElement);               

        try{
            _gaq.push(['_trackEvent', 'Sorting', $(element).text().trim(), $(element).attr('class')]);
        }catch(err){
        }       

    });
}

function export_csv_button(){
    var str = "<input type='button' id='csvexport' value = 'Export to CSV' class='btn fl'>";

    $('#DataTables_Table_0_wrapper').parent().before(str);

    $('#csvexport').click(function(event) {
        //console.log('HI');
        event.preventDefault();
        table2csv(oTable, 'full', 'table.sortable');
    });
}

function showRecaptcha(div) {
    // Recaptcha.create("6Lf-2eASAAAAAA6x6aiS3hRWw7n4yeJEBZb9Plkx", div, {              
    //     tabindex: 1,
    //     theme: "clean"
    // });
     /*gayatri Added code*/
    return true;
}
function updateShouts(url){
    var s= ( $('#lastid').val());
    var s1= ( $('#lastidmisscall').val());
    // $("#lastid").remove();
    $('#lastid').each(function() {
        $(this).remove();
    });  
    //$("#lastidmisscall").remove();
    $('#lastidmisscall').each(function() {
        $(this).remove();
    });
    var str="lastid="+s+"&lastidmisscall="+s1;
    $.ajax({                                      
        url: url,
        type:'post',
        data:str,                                      
        success: function(data)         
        {        
            $('table > tbody').prepend(data);
        } 
    });
}          
