$(function () {
  if (!$("#certificatePage").length) return;

  var urlParams = new URLSearchParams(window.location.search);
  var courseId = parseInt(urlParams.get("id")) || 0;
  var course = coursesData.find(function (c) {
    return c.id === courseId;
  });

  if (!course) {
    $("#certificateContent").html(
      '<div class="text-center py-5"><h4>Course not found</h4><a href="my-courses.html" class="btn btn-primary">My Courses</a></div>',
    );
    return;
  }

  var enrollments = JSON.parse(
    localStorage.getItem("novio_enrollments") || "[]",
  );
  var enrollment = enrollments.find(function (e) {
    return e.id === courseId;
  });

  if (!enrollment || enrollment.progress < 100) {
    $("#certificateContent").html(
      '<div class="text-center py-5">' +
        '<i class="bi bi-lock" style="font-size: 3rem; color: var(--text-muted);"></i>' +
        '<h4 class="mt-3">Course Not Yet Completed</h4>' +
        '<p class="text-muted">Complete all lessons including the final exam to earn your certificate.</p>' +
        '<a href="course-player.html?id=' +
        courseId +
        '" class="btn btn-primary">Continue Learning</a>' +
        "</div>",
    );
    return;
  }

  var certificates = JSON.parse(
    localStorage.getItem("novio_certificates") || "[]",
  );
  var existing = certificates.find(function (c) {
    return c.courseId === courseId;
  });

  if (existing) {
    showCertificate(existing, course);
    return;
  }

  var user = getCurrentUser();
  $("#certCourseName").text(course.title);
  if (user) $("#certName").val(user.name || "");

  $("#certificateForm").removeClass("d-none");

  $("#certificateForm").on("submit", function (e) {
    e.preventDefault();
    var name = $("#certName").val().trim();
    if (!name) {
      showToast("Please enter your name", "error");
      return;
    }

    var cert = {
      courseId: courseId,
      courseName: course.title,
      recipientName: name,
      instructor: course.instructor,
      category: course.category,
      duration: course.duration,
      lessons: course.lessons,
      level: course.level,
      issueDate: new Date().toISOString(),
      certId: "NOVIO-" + courseId + "-" + Date.now().toString(36).toUpperCase(),
    };

    certificates.push(cert);
    localStorage.setItem("novio_certificates", JSON.stringify(certificates));

    $("#certificateForm").addClass("d-none");
    showCertificate(cert, course);
    showToast("Certificate generated!", "success");
  });

  function showCertificate(cert, course) {
    var date = new Date(cert.issueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    var verifyUrl =
      "verify-certificate.html?id=" + encodeURIComponent(cert.certId);

    var html =
      '<div class="certificate-display" id="certificateDisplay">' +
      '<div class="certificate">' +
      '<div class="cert-watermark">NOVIO</div>' +
      '<div class="cert-border">' +
      '<div class="cert-corner tl"></div><div class="cert-corner tr"></div><div class="cert-corner bl"></div><div class="cert-corner br"></div>' +
      '<div class="cert-inner">' +
      '<img src="assets/images/logo/novio-logo.png" alt="Novio" class="cert-logo-img">' +
      '<div class="cert-ornament"><div class="cert-ornament-line"></div><i class="bi bi-award-fill cert-ornament-icon"></i><div class="cert-ornament-line"></div></div>' +
      '<h6 class="cert-subtitle">CERTIFICATE OF COMPLETION</h6>' +
      '<p class="cert-title">This is to certify that</p>' +
      '<h1 class="cert-name">' +
      cert.recipientName +
      "</h1>" +
      '<p class="cert-text">has successfully completed the course</p>' +
      '<h3 class="cert-course">' +
      cert.courseName +
      "</h3>" +
      '<p class="cert-hours"><i class="bi bi-clock me-1"></i>' +
      (cert.duration || course.duration) +
      " &bull; " +
      (cert.lessons || course.lessons) +
      " lessons &bull; " +
      (cert.level || course.level) +
      "</p>" +
      '<p class="cert-text">in the field of <strong>' +
      cert.category +
      "</strong></p>" +
      '<div class="cert-details">' +
      '<div class="cert-detail"><span>Instructor</span><strong>' +
      cert.instructor +
      "</strong></div>" +
      '<div class="cert-detail"><span>Date Issued</span><strong>' +
      date +
      "</strong></div>" +
      '<div class="cert-detail"><span>Certificate ID</span><strong>' +
      cert.certId +
      "</strong></div>" +
      '<div class="cert-detail"><span>Category</span><strong>' +
      cert.category +
      "</strong></div>" +
      "</div>" +
      '<div class="cert-footer-sigs">' +
      '<div class="cert-signature"><div class="sig-line"></div><span class="sig-name">' +
      cert.instructor +
      '</span><span class="sig-title">Course Instructor</span></div>' +
      '<div class="cert-signature"><div class="sig-line"></div><span class="sig-name">Novio Education</span><span class="sig-title">Platform Verification</span></div>' +
      "</div>" +
      '<div class="cert-verify-badge">' +
      '<i class="bi bi-patch-check-fill text-success me-1"></i>' +
      '<a href="' +
      verifyUrl +
      '">Verify this certificate at novio.com</a>' +
      '<div class="cert-qr-section"><small class="text-muted">ID: ' +
      cert.certId +
      "</small></div>" +
      "</div>" +
      '<div class="cert-seal"><i class="bi bi-patch-check-fill"></i><span>Verified</span></div>' +
      "</div></div></div></div>" +
      '<div class="cert-actions mt-4">' +
      '<button class="btn btn-primary" id="btnPrintCert"><i class="bi bi-printer me-1"></i> Print Certificate</button>' +
      '<button class="btn btn-outline-primary" id="btnDownloadCert"><i class="bi bi-download me-1"></i> Download PDF</button>' +
      '<a href="' +
      verifyUrl +
      '" class="btn btn-outline-success"><i class="bi bi-patch-check me-1"></i> Verify Certificate</a>' +
      '<a href="my-courses.html" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> My Courses</a>' +
      "</div>";

    $("#certificateContent").html(html);

    $("#btnPrintCert").on("click", function () {
      window.print();
    });

    $("#btnDownloadCert").on("click", function () {
      window.print();
    });
  }
});
