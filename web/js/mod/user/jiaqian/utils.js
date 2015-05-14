// JavaScript Document
//String函数之LTrim(),用于清除字符串开头的空格\换行符\回车等
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function ltrim(str) {
    var pattern = new RegExp("^[\\s]+", "gi");
    return str.replace(pattern, "");
}
//End

//String函数之RTrim(),用于清除字符串结尾的空格\换行符\回车等
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function rtrim(str) {
    var pattern = new RegExp("[\\s]+$", "gi");
    return str.replace(pattern, "");
}
//End

//String函数之Trim(),用于清除字符串开头和结尾部分的空格\换行符\回车等
//组合调用LTrim(str)和RTrim(str)函数
//Date:2006-06-20
//@Param String(str)
//@Return String
//Begin
function trim(str) {
    return rtrim(ltrim(str));
}
//End
//只能输入英文,数字,标点符号
function CheckEN(str) {
    //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
    var reg = /^[\s|0-9a-zA-Z|~`!@#$%\^&\(\)_+-=\/\*\{\}\[\]\;'\:"|<>,.\/?\\]*$/
    return r = reg.test(str);
}
//End
//只能输入英文,数字
function CheckENorNumber(str) {
    //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
    var reg = /^[\s|0-9a-zA-Z]*$/
    return r = reg.test(str);
}
//End
//只能输入英文,空格
function CheckENorSpaces(str) {
    //var   reg =   /^[\u4E00-\u9FA5|a-zA-Z][\u4E00-\u9FA5|0-9a-zA-Z]*$/
    var reg = /^[\s|a-zA-Z| ]*$/
    return r = reg.test(str);
}
//End
//是否为Email
function IsEmail(str) {
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return r = reg.test(str);
}
//End
//是否为电话号码
function IsTel(str) {
    //var reg=/^\(\+{1}\d{1,3}\)-\d{1,4}-\d{4,8}$/
    var reg = /^[\s|0-9|~`!@#$%\^&\(\)_+-=\/\*\{\}\[\]\;'\:"|<>,.\/?\\]*$/
    return r = reg.test(str);
}
//End
//是否为URL
function IsURL(str) {
    var reg = /^[http|https]+:\/\/[^\s]*$/
    return r = reg.test(str);
}
//End