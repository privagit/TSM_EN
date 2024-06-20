let tableMstDefault = $("#tableMstDefault").DataTable({
    bDestroy: true,
    searching: true,
    paging: false,
    info: false,
    scrollCollapse: true,
    scrollX: true,
    scrollY: "40vh",
});

$("#tableMstDefault tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
    } else {
        $("#tableMstDefault tbody").find("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    }
});