function InitLanguageSelect(lang,href) {

    if (lang != null && lang != "") {
        $("#langSelect option[value=" + lang + "]").attr("selected", "selected");
        switch (lang) {
            case "en":
                $("#webhelp").html("Help");
                break;
            case "es":
                $("#webhelp").html("Ayuda");
                break;
            case "ru":
                $("#webhelp").html("袩芯屑芯褖褜");
                break;
            default:
        }
    }

    $("#langSelect").change(
        function () {
            location.href = "/" + $(this).val() + href;
        }
    );
}

