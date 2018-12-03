$(document).ready(function(){
    
    // Initial state
    $("#getallform").hide();
    $("#postform").hide();
    $("#getidform").hide();
    $("#putidform").hide();
    $("#deleteidform").hide();
    
    // Click header
    $("#getall").click(function(){
        if ( $("#getallform").is(":visible") ) {
            $( "#getallform" ).hide();
        } else{
            $( "#getallform" ).show();
        }
    });
    $("#post").click(function(){
        if ( $("#postform").is(":visible") ) {
            $( "#postform" ).hide();
        } else{
            $( "#postform" ).show();
        }
    });
    $('#getid').click(function(){
        if ( $("#getidform").is(":visible") ) {
            $( "#getidform" ).hide();
        } else{
            $( "#getidform" ).show();
        }
    });
    $("#putid").click(function(){
        if ( $("#putidform").is(":visible") ) {
            $( "#putidform" ).hide();
        } else{
            $( "#putidform" ).show();
        }
    });
    $('#deleteid').click(function(){
        if ( $("#deleteidform").is(":visible") ) {
            $( "#deleteidform" ).hide();
        } else{
            $( "#deleteidform" ).show();
        }
    });

});