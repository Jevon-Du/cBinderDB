String.prototype.trim = function() {
  var str = this,
  whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  for (var i = 0,len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
/*********************************** Top search ***************************************/
//	Click search button to submit job	
$(".jsJobsubmit").on({
	click: function () {
		var JobID = $(".jsJobID").val().trim();
        if (JobID.length==20) {
            $(".jsJobsubmit").removeClass("text-danger");
            window.location.href = "result?jobid=" + JobID;
        } else {
            alert("Please enter a valid JobID");
        }
	}
});
//	Using "Enter" to submit job
$(".jsJobID").keyup(function(event){
	if(event.keyCode == 13){
		var JobID = $(this).val().trim();
		if (JobID.length==20) {
            $(".jsJobsubmit").removeClass("text-danger");
            window.location.href = "result?jobid=" + JobID;
        } else {
            alert("Please enter a valid JobID");
        }
	}
});