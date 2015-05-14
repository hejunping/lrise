function refreshValidateCode() {
    var e = $("#validateCode");
    e.attr("src", '/Home/ValidateCode?sid=' + $("#validateCodeKey").val() + '&r=' + Math.random());
}
