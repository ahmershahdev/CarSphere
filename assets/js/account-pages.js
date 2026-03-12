$(function () {
  if ($("#myCoursesGrid").length && !$("#accountPage").length) {
    var enrollments = JSON.parse(
      localStorage.getItem("novio_enrollments") || "[]",
    );
    if (enrollments.length > 0) {
      var html = "";
      enrollments.forEach(function (item) {
        var course = coursesData.find(function (c) {
          return c.id === item.id;
        });
        var progress = item.progress || 0;
        var btnText =
          progress === 100
            ? "View Certificate"
            : progress > 0
              ? "Continue Learning"
              : "Start Course";
        var btnHref =
          progress === 100
            ? "certificate.html?id=" + item.id
            : "course-player.html?id=" + item.id;
        html +=
          '<div class="col-lg-4 col-md-6 mb-4">' +
          '<div class="card border-0 shadow-sm h-100">' +
          '<img src="' +
          item.image +
          '" class="card-img-top" alt="' +
          item.title +
          '" style="height:180px;object-fit:cover;">' +
          '<div class="card-body">' +
          '<h6 class="fw-bold">' +
          item.title +
          "</h6>" +
          (course
            ? '<small class="text-muted">By ' + course.instructor + "</small>"
            : "") +
          '<div class="progress mt-3" style="height: 8px;">' +
          '<div class="progress-bar" role="progressbar" style="width:' +
          progress +
          '%;background:linear-gradient(135deg, var(--primary), var(--accent));" aria-valuenow="' +
          progress +
          '" aria-valuemin="0" aria-valuemax="100"></div>' +
          "</div>" +
          '<div class="d-flex justify-content-between mt-2">' +
          '<small class="text-muted">' +
          progress +
          "% complete</small>" +
          '<small class="text-muted">' +
          new Date(item.enrolledDate).toLocaleDateString("en-PK", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          "</small>" +
          "</div>" +
          '<a href="' +
          btnHref +
          '" class="btn btn-primary btn-sm w-100 mt-3">' +
          btnText +
          "</a>" +
          "</div></div></div>";
      });
      $("#myCoursesGrid").html(html);
    }
  }

  if ($("#purchaseList").length) {
    var enrollments = JSON.parse(
      localStorage.getItem("novio_enrollments") || "[]",
    );
    if (enrollments.length > 0) {
      var html =
        '<div class="table-responsive"><table class="table table-hover align-middle">' +
        "<thead><tr><th>Course</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>";
      enrollments.forEach(function (item) {
        var course = coursesData.find(function (c) {
          return c.id === item.id;
        });
        var price = course ? "PKR " + course.price.toLocaleString() : "N/A";
        var date = new Date(item.enrolledDate).toLocaleDateString("en-PK", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        html +=
          "<tr>" +
          '<td><div class="d-flex align-items-center gap-3">' +
          '<img src="' +
          item.image +
          '" alt="' +
          item.title +
          '" style="width:60px;height:40px;border-radius:6px;object-fit:cover;">' +
          "<div><strong>" +
          item.title +
          "</strong>" +
          (course
            ? '<br><small class="text-muted">By ' +
              course.instructor +
              "</small>"
            : "") +
          "</div></div></td>" +
          "<td>" +
          date +
          "</td>" +
          '<td class="fw-semibold">' +
          price +
          "</td>" +
          '<td><span class="badge bg-success">Completed</span></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      $("#purchaseList").html(html);
    }
  }

  if ($("#completedCount").length) {
    var enrollments = JSON.parse(
      localStorage.getItem("novio_enrollments") || "[]",
    );
    var certificates = JSON.parse(
      localStorage.getItem("novio_certificates") || "[]",
    );
    var completed = enrollments.filter(function (e) {
      return e.progress >= 100;
    });

    $("#completedCount").text(completed.length);
    $("#certCount").text(certificates.length);

    var badges = $(".card[style*='opacity: 0.4']");
    if (completed.length >= 1) badges.eq(0).css("opacity", "1");
    if (completed.length >= 5) badges.eq(2).css("opacity", "1");
    if (completed.length >= 10) badges.eq(3).css("opacity", "1");
  }
});
