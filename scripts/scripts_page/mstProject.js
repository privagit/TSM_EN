$(document).ready(function () {
  
  $(".show-user-name").html("NameTest1");
  $("#userPosition").html("Admin");
  // * fill table
  let tbPJlist = $("#tablePJmaster").DataTable({
    bDestroy: true,
    searching: true,
    paging: false,
    info: false,
    scrollCollapse: true,
    scrollX: true,
    scrollY: "40vh",
    // todo column : No, Project Status, Part Status, Customer, Project Name, Ref No., Issue Date, SOP Date, Revise No.
    // ajax: {
    //   url,
    //   dataSrc: "",
    // },
    // columns: [
    //   {
    //     data: "index",
    //     render: function (data, type, row) {
    //       return data || "-";
    //     },
    //   },
    // ],
    layout: {
      topStart: {
        // buttons: ["copy", "csv", "excel", "pdf", "print"],
        buttons: [
          {
            extend: "csvHtml5",
            text: "Export CSV",
            className: "btn dark", // Add custom class here
          },
        ],
      },
    },
  });

  // ************************************** select2
  fillDefaultSelect("selectCustomer", defaultCustomer);
  select2Single("selectCustomer");

  fillDefaultSelect("selectEmail", defaultEmail);
  select2MultipleAutoAdd("selectEmail");

  // ************************************** sweetalert

  $(".btn-swal-sign").unbind();
  $(".btn-swal-sign").on("click", function () {
    let id = $(this).attr("id");
    swalalertSign(id);
  });

  // ************************************** add project
  $("#btnPJadd").unbind();
  $("#btnPJadd").on("click", function () {
    $(".show-edit").addClass("d-none");
    $("#modalPJmanagement").removeClass("d-none");
    $("#tablePJmaster tbody tr").removeClass("selected");
  
    $("#modalPJmanagement input, #modalPJmanagement select").val("");
    scrollPageTo("modalPJmanagement");

    $("#btnPJsave").unbind();
    $("#btnPJsave").on("click", function () {
      // todo ajax
      tbPJlist.ajax.reload(null, false);
    });
  });

  // ************************************** revise
  $("#btnRevise").unbind();
  $("#btnRevise").on("click", function () {
    const data = {
      CustomerID: 1,
      CustomerName: "John Doe",
      PJName: "Project Name",
      RefNo: "test0001",
    };

    // แปลงข้อมูลเป็น query string
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/projectRevise?${queryString}`;
  });

  // ************************************** click table
  $("#tablePJmaster tbody").on("click", "tr", function () {
    $("#modalPJmanagement").addClass("d-none");
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $("#btnPJedit, #btnPJdel").addClass("d-none");
    } else {
      $("#tablePJmaster tbody").find("tr.selected").removeClass("selected");
      $(this).addClass("selected");
      $("#btnPJedit, #btnPJdel").removeClass("d-none");
      let data = tbPJlist.row(this).data();

      // ************************************** edit project
      $("#btnPJedit").unbind();
      $("#btnPJedit").on("click", function () {
        $("#modalPJmanagement,.show-edit").removeClass("d-none");
        scrollPageTo("modalPJmanagement");
        // fill input
        $("#selectCustomer")
          .val(data.customer || "Customer2")
          .trigger("change");
        $("#inputPJname").val("test PJ Name");
        $("#inputPJcode").val("test PJ Ref No.");
        $("#showIssue").val("test 12/6/2567");
        $("#showCheck").val("test 12/6/2567");
        $("#showApprove").val("test 12/6/2567");
        $("#showApproveSOP").val("test 12/6/2567");
        $("#selectEmail").val("").trigger("change");
        $().val();

        $("#btnPJsave").unbind();
        $("#btnPJsave").on("click", function () {
          console.log("ssssss");
          // todo ajax
          tbPJlist.ajax.reload(null, false);

        });

        // ************************************** send email
        $("#btnPJsend").unbind();
        $("#btnPJsend").on("click", function () {
          console.log("ssssss");
          // todo ajax
        });
      });

      // ************************************** delete project
      $("#btnPJdel").unbind();
      $("#btnPJdel").on("click", function () {
        $("#modalPJmanagement").addClass("d-none");
        Swal.fire({
          title: "ยืนยันการลบข้อมูล",
          text: "การกระทำนี้ไม่สามารถย้อนกลับได้",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.isConfirmed) {
            // todo ajax
          }
        });
      });
    }
  });
});
