$(function () {
  if ($("#accountPage").length) {
    var user = getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    $("#accName").text(user.name);
    $("#accEmail").text(user.email);
    $("#editName").val(user.name);
    $("#editEmail").val(user.email);
    $("#editPhone").val(user.phone || "");
    $("#editBio").val(user.bio || "");
    $("#editAddress").val(user.address || "");
    $("#socialGithub").val(user.socialGithub || "");
    $("#socialLinkedin").val(user.socialLinkedin || "");
    $("#socialFacebook").val(user.socialFacebook || "");
    $("#socialWebsite").val(user.socialWebsite || "");

    if (user.profileImage) {
      $("#avatarImg").attr("src", user.profileImage).show();
      $("#avatarInitials").hide();
    }

    if (user.resumeName) {
      $("#resumeFileName").text(user.resumeName);
    }

    var initials = user.name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("")
      .toUpperCase()
      .substring(0, 2);
    $("#avatarInitials").text(initials);

    $("#profileAvatar").on("click", function () {
      $("#profileImageInput").click();
    });

    $("#profileImageInput").on("change", function () {
      var file = this.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        showToast("Please select a valid image file", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image must be under 2MB", "error");
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        user.profileImage = e.target.result;
        setCurrentUser(user);
        var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
        var idx = users.findIndex(function (u) {
          return u.email === user.email;
        });
        if (idx !== -1) users[idx] = user;
        localStorage.setItem("novio_users", JSON.stringify(users));
        $("#avatarImg").attr("src", e.target.result).show();
        $("#avatarInitials").hide();
        showToast("Profile photo updated!", "success");
      };
      reader.readAsDataURL(file);
    });

    $("#resumeUpload").on("change", function () {
      var file = this.files[0];
      if (!file) return;
      var allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedTypes.indexOf(file.type) === -1) {
        showToast("Please upload a PDF or Word document", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("Resume must be under 5MB", "error");
        return;
      }
      user.resumeName = file.name;
      setCurrentUser(user);
      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));
      $("#resumeFileName").text(file.name);
      showToast("Resume uploaded!", "success");
    });

    $(".account-nav a").on("click", function (e) {
      e.preventDefault();
      $(".account-nav a").removeClass("active");
      $(this).addClass("active");
      var target = $(this).attr("href");
      $(".account-tab").addClass("d-none");
      $(target).removeClass("d-none");
    });

    $("#editProfileForm").on("submit", function (e) {
      e.preventDefault();
      user.name = $("#editName").val().trim();
      user.email = $("#editEmail").val().trim();
      user.phone = $("#editPhone").val().trim();
      user.bio = $("#editBio").val().trim();
      user.address = $("#editAddress").val().trim();
      setCurrentUser(user);

      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));

      $("#accName").text(user.name);
      $("#avatarInitials").text(
        user.name
          .split(" ")
          .map(function (n) {
            return n[0];
          })
          .join("")
          .toUpperCase()
          .substring(0, 2),
      );
      showToast("Profile updated!", "success");
    });

    $("#socialLinksForm").on("submit", function (e) {
      e.preventDefault();
      user.socialGithub = $("#socialGithub").val().trim();
      user.socialLinkedin = $("#socialLinkedin").val().trim();
      user.socialFacebook = $("#socialFacebook").val().trim();
      user.socialWebsite = $("#socialWebsite").val().trim();
      setCurrentUser(user);
      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));
      showToast("Social links saved!", "success");
    });

    $("#changePasswordForm").on("submit", function (e) {
      e.preventDefault();
      var currentPw = $("#currentPassword").val();
      var newPw = $("#newPassword").val();
      var confirmPw = $("#confirmNewPassword").val();

      if (currentPw !== user.password) {
        showToast("Current password is incorrect", "error");
        return;
      }

      if (newPw.length < 8) {
        showToast("New password must be at least 8 characters", "error");
        return;
      }

      if (newPw !== confirmPw) {
        showToast("New passwords do not match", "error");
        return;
      }

      user.password = newPw;
      setCurrentUser(user);

      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));

      showToast("Password changed successfully!", "success");
      this.reset();
    });

    var enrollments = JSON.parse(
      localStorage.getItem("novio_enrollments") || "[]",
    );
    if (enrollments.length > 0) {
      var enrollHtml = "";
      enrollments.forEach(function (item) {
        enrollHtml +=
          '<div class="enrolled-course">' +
          '<img src="' +
          item.image +
          '" alt="' +
          item.title +
          '">' +
          '<div class="course-info">' +
          "<h6>" +
          item.title +
          "</h6>" +
          '<div class="progress"><div class="progress-bar" style="width:' +
          item.progress +
          '%"></div></div>' +
          '<span class="progress-text">' +
          item.progress +
          "% complete</span>" +
          '<a href="' +
          (item.progress >= 100
            ? "certificate.html?id="
            : "course-player.html?id=") +
          item.id +
          '" class="btn btn-primary btn-sm mt-2">' +
          (item.progress >= 100
            ? "View Certificate"
            : item.progress > 0
              ? "Continue Learning"
              : "Start Course") +
          "</a>" +
          "</div>" +
          "</div>";
      });
      $("#enrolledCourses").html(enrollHtml);
    } else {
      $("#enrolledCourses").html(
        '<div class="text-center py-4">' +
          '<p class="text-muted">No courses enrolled yet.</p>' +
          '<a href="courses.html" class="btn btn-primary btn-sm">Browse Courses</a>' +
          "</div>",
      );
    }
  }

  $(document).on("click", "#logoutBtn", function (e) {
    e.preventDefault();
    logoutUser();
  });

  // Settings page logic
  if ($("#profile-settings").length) {
    var user = getCurrentUser();
    if (user) {
      $("#settingsName").val(user.name || "");
      $("#settingsEmail").val(user.email || "");
    }

    // Sidebar nav smooth scroll
    $(".nav.flex-column a").on("click", function (e) {
      e.preventDefault();
      $(".nav.flex-column a")
        .removeClass("active")
        .css({ background: "", color: "" })
        .addClass("text-secondary");
      $(this)
        .addClass("active")
        .removeClass("text-secondary")
        .css({ background: "var(--primary-light)", color: "var(--primary)" });
      var target = $(this).attr("href");
      if ($(target).length) {
        $("html, body").animate(
          { scrollTop: $(target).offset().top - 100 },
          400,
        );
      }
    });

    // Save profile
    $("#profile-settings .btn-primary").on("click", function () {
      var user = getCurrentUser();
      if (!user) {
        showToast("Please log in first", "error");
        return;
      }
      user.name = $("#settingsName").val().trim();
      setCurrentUser(user);
      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));
      showToast("Profile settings saved!", "success");
    });

    // Update password
    $("#btnUpdatePassword").on("click", function () {
      var user = getCurrentUser();
      if (!user) {
        showToast("Please log in first", "error");
        return;
      }
      var newPass = $("#settingsNewPass").val();
      var confirmPass = $("#settingsConfirmPass").val();
      if (newPass.length < 8) {
        showToast("Password must be at least 8 characters", "error");
        return;
      }
      if (newPass !== confirmPass) {
        showToast("Passwords do not match", "error");
        return;
      }
      user.password = newPass;
      setCurrentUser(user);
      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));
      showToast("Password updated!", "success");
      $("#settingsNewPass, #settingsConfirmPass").val("");
    });

    // Save privacy
    $("#btnSavePrivacy").on("click", function () {
      var settings = {
        profileVisible: $("#profileVisibility").is(":checked"),
        showProgress: $("#showProgress").is(":checked"),
        activityStatus: $("#activityStatus").is(":checked"),
      };
      localStorage.setItem("novio_privacy", JSON.stringify(settings));
      showToast("Privacy settings saved!", "success");
    });

    // Load privacy settings
    try {
      var privacy = JSON.parse(localStorage.getItem("novio_privacy") || "{}");
      if (privacy.profileVisible !== undefined)
        $("#profileVisibility").prop("checked", privacy.profileVisible);
      if (privacy.showProgress !== undefined)
        $("#showProgress").prop("checked", privacy.showProgress);
      if (privacy.activityStatus !== undefined)
        $("#activityStatus").prop("checked", privacy.activityStatus);
    } catch (e) {}

    // Load billing history
    try {
      var enrollments = JSON.parse(
        localStorage.getItem("novio_enrollments") || "[]",
      );
      if (enrollments.length > 0) {
        var billingHtml = '<div class="list-group">';
        enrollments.forEach(function (item) {
          var course =
            typeof coursesData !== "undefined"
              ? coursesData.find(function (c) {
                  return c.id === item.id;
                })
              : null;
          var price = course ? "PKR " + course.price.toLocaleString() : "N/A";
          var date = new Date(item.enrolledDate).toLocaleDateString("en-PK", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          billingHtml +=
            '<div class="list-group-item d-flex justify-content-between align-items-center">' +
            "<div><strong>" +
            item.title +
            '</strong><br><small class="text-muted">' +
            date +
            "</small></div>" +
            '<span class="fw-semibold text-primary">' +
            price +
            "</span></div>";
        });
        billingHtml += "</div>";
        $("#billingHistory").html(billingHtml);
      }
    } catch (e) {}
  }
});
