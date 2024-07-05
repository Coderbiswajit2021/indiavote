$(document).ready(function() {
    
	$("#candidate" ).autocomplete({
		serviceUrl: baseurl+"candidate/candidatelist"
	});

	$('#partylist').autocomplete({         
		serviceUrl:baseurl+"party/partylist"
	});	


	$('#statelist').autocomplete({         
		serviceUrl:baseurl+"state/statelist"
	});

	$('#acname').autocomplete({         
		serviceUrl: baseurl+"ac/listtrend/"
	});	

	$('#pcnamehome').autocomplete({         
		serviceUrl:baseurl+"pc/pclisting/"
	});

	var ac = $("#namesearch" ).autocomplete({
		serviceUrl:baseurl+"tools/search/ajax_get_firstname/"+$('#state_name').val()+"/",
		minChars: 1,
		params: {acno:  $('#acsearch').val()}
	});

	$('#acsearch').change( function(){
		ac.setOptions({
			serviceUrl:baseurl+"tools/search/ajax_get_firstname/"+$('#state_name').val()+"/",
			minChars: 1,
			params: {acno: $('#acsearch').val()}
		});
	});
});