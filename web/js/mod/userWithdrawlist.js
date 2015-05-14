

function RefundsRemark(remark) {
	if(remark==null || remark=="")
		remark="Content is empty ";
     alert(remark);
}
 function CancelRefund(num) {
    if (confirm("Are you sure you would like to delete the refund record?")) {
        var thisurl=$("#thisurl").attr("thisurl");
        $.post(thisurl,  {"id":num},function(data){
	        if(data.result)
	        {
	            alert("Revocation of success!");
	            window.location.reload();
	        }
	        else
	        {
	            alert("Revocation of failure, please try again later");
	        }
          
        },
        "json"
       );
        }
 }