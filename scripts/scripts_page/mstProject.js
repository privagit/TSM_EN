const defaultCustomer = ["Customer1", "Customer2", "Customer3", "Customer4"];
const defaultEmail = ["Email1@example.com", "Email2@example.com", "Email3@example.com"];
function scrollPageTo(target, t = 1000) {
  $("html, body").animate(
    {
      scrollTop: $(`#${target}`).offset().top,
    },
    t
  );
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มจาก 0, จึงต้อง +1
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มจาก 0, จึงต้อง +1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToFullMonth(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // รับชื่อเดือนจาก array
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function formatFullMonthToDate(date) {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มจาก 0, จึงต้อง +1
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function fillDefaultSelect(selectID, data) {
  let select = $(`#${selectID}`);
  select.empty();
  data.forEach((item) => {
    select.append(`<option value="${item}">${item}</option>`);
  });
}

function select2Single(selectID) {
  $(`#${selectID}`).select2({
    theme: "bootstrap",
  });
}

function select2MultipleAutoAdd(selectID) {
  $(`#${selectID}`).select2({
    // placeholder: "Select options",
    theme: "bootstrap",
    tags: true, // Enable tag creation
    createTag: function (params) {
      var term = $.trim(params.term);

      // ตรวจสอบว่าค่าที่ค้นหามีอยู่แล้วหรือไม่
      var exists = false;
      $(`#${selectID} option`).each(function () {
        if ($(this).text().toUpperCase() === term.toUpperCase()) {
          exists = true;
          return false;
        }
      });

      // หากค่าที่ค้นหาไม่ซ้ำกับที่มีอยู่ ให้สร้างแท็กใหม่
      if (!exists) {
        return {
          id: term,
          text: term,
          newOption: true,
        };
      }

      // หากค่าที่ค้นหาซ้ำกับที่มีอยู่ ให้คืนค่า null
      return null;
    },
    insertTag: function (data, tag) {
      // Insert the new tag at the end of the results
      data.push(tag);
    },
  });

  $(`#${selectID}`).on("select2:select", function (e) {
    console.log("New option created: ", $(this).val());
  });
}

function sweetalertSign(btnID) {
  let _this = $(`#${btnID}`);
  let title = _this.attr("swal-title");
  let targetShowSign = _this.attr("swal-target");
  let default_name = $(".show-user-name").html();
  let default_date = getCurrentDate();
  Swal.fire({
    title: title,
    html: `
      <div class="form-group row w-100">
        <label class="col-sm-2 form-control-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputSignName" autocomplete="off" value="${default_name}"/>
        </div>
      </div>
      <div class="form-group row w-100">
        <label class="col-sm-2 form-control-label">Date</label>
        <div class="col-sm-10">
          <input type="date" class="form-control" id="inputSignDate" autocomplete="off" value="${default_date}"/>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonColor: "#0275d8",
    cancelButtonColor: "#f44455",
    confirmButtonText: "Submit",
    cancelButtonText: "close",
    preConfirm: function () {
      let name = $("#inputSignName").val();
      let date = $("#inputSignDate").val();

      if (!name || !date) {
        name = "";
        date = "";
      }

      return {
        name: name,
        date: date,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { date, name } = result.value;
      let date_show = date ? new Date(date) : "";
      let signBy = !name || !date ? "" : `${name} ${formatDateToFullMonth(date_show)}`;

      $(`#${targetShowSign}`).val(signBy);
    }
  });
}

$(document).ready(function () {
  $(".show-user-name").html("NameTest1");
  $("#userPosition").html("Admin");
  // * fill table
  let tbPJlist = $("#tablePJmaster").DataTable({
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

  fillDefaultSelect("selectEmail", defaultEmail);
  select2MultipleAutoAdd("selectEmail");

  // ************************************** sweetalert

  $(".btn-swal-sign").unbind();
  $(".btn-swal-sign").on("click", function () {
    let id = $(this).attr("id");
    sweetalertSign(id);
  });

  // ************************************** add project
  $("#btnPJadd").unbind();
  $("#btnPJadd").on("click", function () {
    $(".show-edit").addClass("d-none");
    $("#modalPJmanagement").removeClass("d-none");
    $("#tablePJmaster tbody tr").removeClass("selected");
    // clear input
    $("#modalPJmanagement input, #modalPJmanagement select").val("");
    scrollPageTo("modalPJmanagement");

    $("#btnPJsave").unbind();
    $("#btnPJsave").on("click", function () {
      // todo ajax
    });
  });

  // ************************************** revise
  $("#btnRevise").unbind();
  $("#btnRevise").on("click", function () {
    window.location.href = "/projectRevise";
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
