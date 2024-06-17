$(document).ready(function () {
  // ************************************** get data
  $(".show-user-name").html("NameTest1");
  $("#userPosition").html("Admin");

  const default_data = getQueryParams();
  const { CustomerID, CustomerName, PJName, RefNo } = default_data;
  console.log(default_data);
  $("#inputCustomer").val(CustomerName);
  $("#inputPJname").val(PJName);
  $("#inputRefNo").val(RefNo);

  // ************************************** fill table
  let tbPJrevise = $("#tablePJrevise").DataTable({
    bDestroy: true,
    searching: true,
    paging: false,
    info: false,
    // ordering: false,
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

  // ************************************** sweetalert

  $(".btn-swal-sign").unbind();
  $(".btn-swal-sign").on("click", function () {
    let id = $(this).attr("id");
    swalalertSign(id);
  });

  // ************************************** add project revise
  $("#btnPJReviseAdd").unbind();
  $("#btnPJReviseAdd").on("click", function () {
    $(".show-edit").addClass("d-none");
    $("#modalPJRevisemanagement").removeClass("d-none");
    $("#tablePJrevise tbody tr").removeClass("selected");
    // clear input
    $("#modalPJRevisemanagement input, #modalPJRevisemanagement select").val("");
    scrollPageTo("modalPJRevisemanagement");

    $("#btnReviseSave").unbind();
    $("#btnReviseSave").on("click", function () {
      // todo ajax
      tbPJrevise.ajax.reload(null, false);
    });
  });

  // ************************************** revise history
  $("#btnReviseHistory").unbind();
  $("#btnReviseHistory").on("click", function () {
    const data = {
      CustomerID: 1,
      CustomerName: "John Doe",
      PJName: "Project Name",
      RefNo: "test0001",
    };

    // แปลงข้อมูลเป็น query string
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `/reviseHistory?${queryString}`;
  });

  $("#btnPJReviseDoc").unbind();
  $("#btnPJReviseDoc").on("click", function () {
    // todo ajax
  });

  // ************************************** upload file
  $("#btnUpload").unbind();
  $("#btnUpload").on("click", function () {
    $("#fileUpload").click();
  });

  $("#fileUpload").on("change", function () {
    // todo ajax
  });

  // ************************************** click table
  $("#tablePJrevise tbody").on("click", "tr", function () {
    $("#modalPJRevisemanagement").addClass("d-none");
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $("#btnPJReviseEdit, #btnPJReviseDel,#btnPJReviseDoc").addClass("d-none");
    } else {
      $("#tablePJrevise tbody").find("tr.selected").removeClass("selected");
      $(this).addClass("selected");
      $("#btnPJReviseEdit, #btnPJReviseDel,#btnPJReviseDoc").removeClass("d-none");
      let data = tbPJrevise.row(this).data();

      // ************************************** edit project
      $("#btnPJReviseEdit").unbind();
      $("#btnPJReviseEdit").on("click", function () {
        $("#modalPJRevisemanagement,.show-edit").removeClass("d-none");
        scrollPageTo("modalPJRevisemanagement");
        // fill input
        $("#selectCustomer")
          .val(data.customer || "Customer2")
          .trigger("change");
        $("#inputPartname").val("test Part Name");
        $("#inputPartcode").val("test PJ Ref No.");
        $("#txtareaReviseDetail").val("Detail");
        $("#showIssue").val("test 12/6/2567");
        $("#showCheck").val("test 12/6/2567");
        $("#showApprove").val("test 12/6/2567");
        $().val();

        $("#btnReviseSave").unbind();
        $("#btnReviseSave").on("click", function () {
          console.log("ssssss");
          // todo ajax
          tbPJrevise.ajax.reload(null, false);
        });

        // ************************************** send email
        $("#btnPJsend").unbind();
        $("#btnPJsend").on("click", function () {
          console.log("ssssss");
          // todo ajax
        });
      });

      // ************************************** delete project
      $("#btnPJReviseDel").unbind();
      $("#btnPJReviseDel").on("click", function () {
        $("#modalPJRevisemanagement").addClass("d-none");
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
