// Course content data - generated per course for simulation
function generateCourseContent(course) {
  var videoIds = [
    "dQw4w9WgXcQ",
    "pQN-pnXPaVg",
    "rfscVS0vtbw",
    "PkZNo7MFNFg",
    "hdI2bqOjy3c",
    "1Rs2ND1ryYc",
    "kqtD5dpn9C8",
    "CgkZ7MvWUAA",
    "zOjov-2OZ0E",
    "JJmcL1N2KQs",
    "Ke90Tje7VS0",
    "8aGhZoqa6pQ",
  ];

  var lessons = [];
  var totalLessons = Math.min(course.lessons, 12);
  var moduleTitles = [
    "Introduction & Setup",
    "Core Fundamentals",
    "Essential Concepts",
    "Working with " + course.category,
    "Hands-On Practice",
    "Intermediate Techniques",
    "Advanced Patterns",
    "Real-World Project Part 1",
    "Real-World Project Part 2",
    "Testing & Best Practices",
    "Deployment & Production",
    "Final Review & Exam",
  ];

  for (var i = 0; i < totalLessons; i++) {
    var lessonType;
    if (i === totalLessons - 1) lessonType = "exam";
    else if (i % 3 === 0) lessonType = "video";
    else if (i % 3 === 1) lessonType = "text";
    else lessonType = "quiz";

    var lesson = {
      id: i + 1,
      title: moduleTitles[i] || "Lesson " + (i + 1),
      type: lessonType,
    };

    if (lessonType === "video") {
      lesson.videoId = videoIds[i % videoIds.length];
      lesson.description =
        "In this video lesson, we cover " +
        lesson.title.toLowerCase() +
        " for " +
        course.title +
        ". Watch the full video to mark this lesson complete.";
    } else if (lessonType === "text") {
      lesson.content = generateTextContent(lesson.title, course);
    } else if (lessonType === "quiz") {
      lesson.questions = generateQuiz(course, i);
    } else if (lessonType === "exam") {
      lesson.questions = generateExam(course);
    }

    lessons.push(lesson);
  }
  return lessons;
}

function generateTextContent(title, course) {
  return (
    "<h4>" +
    title +
    "</h4>" +
    '<p class="lead">This lesson covers the essential concepts of ' +
    title.toLowerCase() +
    " in the context of " +
    course.category +
    ".</p>" +
    "<h5>Key Learning Points</h5>" +
    "<ul><li>Understanding the fundamental principles behind " +
    title.toLowerCase() +
    "</li>" +
    "<li>How to apply these concepts in real-world " +
    course.category.toLowerCase() +
    " projects</li>" +
    "<li>Best practices and common patterns used by industry professionals</li>" +
    "<li>Hands-on exercises to reinforce your understanding</li></ul>" +
    "<h5>Detailed Overview</h5>" +
    "<p>" +
    course.title +
    " is designed to give you a comprehensive understanding of " +
    course.category.toLowerCase() +
    ". In this module, we focus specifically on " +
    title.toLowerCase() +
    ", which is a critical building block for mastering the subject.</p>" +
    "<p>As you work through this material, pay special attention to the patterns and techniques discussed. These will be essential for the upcoming quiz and practical exercises.</p>" +
    "<h5>Summary</h5>" +
    "<p>By the end of this lesson, you should be comfortable with the core ideas behind " +
    title.toLowerCase() +
    ". Practice the exercises below before moving on to the next lesson.</p>" +
    '<div class="alert alert-info mt-3"><i class="bi bi-lightbulb me-2"></i><strong>Tip:</strong> Take notes as you read. Writing down key concepts helps with retention and will be useful for the final exam.</div>'
  );
}

function generateQuiz(course, lessonIndex) {
  var quizSets = [
    [
      {
        q: "What is the primary purpose of " + course.category + "?",
        options: [
          "Building solutions",
          "Data entry",
          "Hardware repair",
          "Graphic design",
        ],
        correct: 0,
      },
      {
        q: "Which skill is most essential for " + course.category + "?",
        options: ["Problem solving", "Speed typing", "Memorization", "Drawing"],
        correct: 0,
      },
      {
        q:
          "What best describes a professional approach to " +
          course.category +
          "?",
        options: [
          "Rush to finish",
          "Plan, implement, test",
          "Skip testing",
          "Copy without understanding",
        ],
        correct: 1,
      },
    ],
    [
      {
        q: "In " + course.category + ", what does iterative development mean?",
        options: [
          "Build once",
          "Repeat and improve",
          "Never change",
          "Random approach",
        ],
        correct: 1,
      },
      {
        q: "Why is documentation important in " + course.category + "?",
        options: [
          "It's not important",
          "For future reference and collaboration",
          "To waste time",
          "Only for beginners",
        ],
        correct: 1,
      },
      {
        q: "What is a best practice when learning " + course.category + "?",
        options: [
          "Only read theory",
          "Practice hands-on regularly",
          "Skip fundamentals",
          "Avoid challenges",
        ],
        correct: 1,
      },
    ],
    [
      {
        q: "How should you handle errors in " + course.category + " projects?",
        options: [
          "Ignore them",
          "Debug systematically",
          "Delete everything",
          "Ask someone else always",
        ],
        correct: 1,
      },
      {
        q: "What makes " + course.category + " projects successful?",
        options: [
          "Luck",
          "Planning and execution",
          "Maximum complexity",
          "Working alone always",
        ],
        correct: 1,
      },
      {
        q: "Why are version control systems important?",
        options: [
          "They're not",
          "Track changes and collaborate",
          "Slow down work",
          "Only for large teams",
        ],
        correct: 1,
      },
    ],
  ];
  return quizSets[lessonIndex % quizSets.length];
}

function generateExam(course) {
  return [
    {
      q:
        "What is the most important takeaway from this " +
        course.category +
        " course?",
      options: [
        "Memorize all concepts",
        "Understanding principles and applying them",
        "Speed over quality",
        "Theory only matters",
      ],
      correct: 1,
    },
    {
      q: "How should you continue learning after completing this course?",
      options: [
        "Stop learning",
        "Build projects and practice",
        "Wait for next course",
        "Only review notes",
      ],
      correct: 1,
    },
    {
      q: "Which approach leads to mastery in " + course.category + "?",
      options: [
        "Passive watching",
        "Active practice and building",
        "Reading only",
        "Waiting for motivation",
      ],
      correct: 1,
    },
    {
      q: "What distinguishes an expert in " + course.category + "?",
      options: [
        "Years of experience only",
        "Deep understanding and practical skills",
        "Number of certificates",
        "Memorized facts",
      ],
      correct: 1,
    },
    {
      q: "How should you approach complex problems in " + course.category + "?",
      options: [
        "Panic and quit",
        "Break into smaller parts and solve",
        "Ignore complexity",
        "Wait for solution",
      ],
      correct: 1,
    },
  ];
}

$(function () {
  if (!$("#coursePlayerPage").length) return;

  var urlParams = new URLSearchParams(window.location.search);
  var courseId = parseInt(urlParams.get("id")) || 0;
  var course = coursesData.find(function (c) {
    return c.id === courseId;
  });

  if (!course) {
    $(".course-player-content").html(
      '<div class="text-center py-5"><h4>Course not found</h4><a href="courses.html" class="btn btn-primary">Browse Courses</a></div>',
    );
    return;
  }

  // Check enrollment
  var enrollments = JSON.parse(
    localStorage.getItem("novio_enrollments") || "[]",
  );
  var enrollment = enrollments.find(function (e) {
    return e.id === courseId;
  });
  if (!enrollment) {
    $(".course-player-content").html(
      '<div class="text-center py-5">' +
        '<i class="bi bi-lock" style="font-size: 3rem; color: var(--text-muted);"></i>' +
        '<h4 class="mt-3">You need to enroll in this course first</h4>' +
        '<p class="text-muted">Purchase this course to access all lessons, quizzes, and the final exam.</p>' +
        '<a href="course-detail.html?id=' +
        courseId +
        '" class="btn btn-primary">View Course Details</a>' +
        "</div>",
    );
    return;
  }

  var lessons = generateCourseContent(course);
  var completedLessons = JSON.parse(
    localStorage.getItem("novio_course_progress_" + courseId) || "[]",
  );
  var currentLesson = 0;

  // Set course info
  $("#playerCourseTitle").text(course.title);
  $("#playerInstructor").text("By " + course.instructor);

  // Render sidebar lessons
  function renderSidebar() {
    var html = "";
    lessons.forEach(function (lesson, idx) {
      var isComplete = completedLessons.indexOf(lesson.id) > -1;
      var isActive = idx === currentLesson;
      var isLocked =
        idx > 0 &&
        completedLessons.indexOf(lessons[idx - 1].id) === -1 &&
        !isComplete;
      var typeIcon =
        lesson.type === "video"
          ? "bi-play-circle"
          : lesson.type === "text"
            ? "bi-file-text"
            : lesson.type === "quiz"
              ? "bi-question-circle"
              : "bi-clipboard-check";

      html +=
        '<div class="lesson-item' +
        (isActive ? " active" : "") +
        (isComplete ? " completed" : "") +
        (isLocked ? " locked" : "") +
        '" data-index="' +
        idx +
        '">' +
        '<div class="lesson-icon"><i class="bi ' +
        (isComplete ? "bi-check-circle-fill text-success" : typeIcon) +
        '"></i></div>' +
        '<div class="lesson-info"><span class="lesson-number">Lesson ' +
        (idx + 1) +
        "</span>" +
        '<span class="lesson-title">' +
        lesson.title +
        "</span>" +
        '<span class="lesson-type badge bg-' +
        (lesson.type === "video"
          ? "primary"
          : lesson.type === "text"
            ? "info"
            : lesson.type === "quiz"
              ? "warning"
              : "danger") +
        '">' +
        lesson.type.charAt(0).toUpperCase() +
        lesson.type.slice(1) +
        "</span></div></div>";
    });
    $("#lessonsList").html(html);
  }

  function updateProgress() {
    var total = lessons.length;
    var done = completedLessons.length;
    var pct = Math.round((done / total) * 100);

    $("#progressBar")
      .css("width", pct + "%")
      .attr("aria-valuenow", pct);
    $("#progressText").text(
      pct + "% Complete (" + done + "/" + total + " lessons)",
    );

    // Update enrollment progress
    enrollment.progress = pct;
    var enrollments = JSON.parse(
      localStorage.getItem("novio_enrollments") || "[]",
    );
    var idx = enrollments.findIndex(function (e) {
      return e.id === courseId;
    });
    if (idx !== -1) enrollments[idx].progress = pct;
    localStorage.setItem("novio_enrollments", JSON.stringify(enrollments));

    if (pct === 100) {
      $("#courseCompleteAlert").removeClass("d-none");
      $("#getCertLink").attr("href", "certificate.html?id=" + courseId);
    }
  }

  function markComplete(lessonId) {
    if (completedLessons.indexOf(lessonId) === -1) {
      completedLessons.push(lessonId);
      localStorage.setItem(
        "novio_course_progress_" + courseId,
        JSON.stringify(completedLessons),
      );
      updateProgress();
      renderSidebar();
    }
  }

  function loadLesson(idx) {
    currentLesson = idx;
    var lesson = lessons[idx];
    renderSidebar();

    var contentHtml = '<h4 class="mb-3">' + lesson.title + "</h4>";

    if (lesson.type === "video") {
      contentHtml +=
        '<div class="ratio ratio-16x9 mb-4">' +
        '<iframe src="https://www.youtube.com/embed/' +
        lesson.videoId +
        '" title="' +
        lesson.title +
        '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        "</div>" +
        '<p class="text-muted">' +
        lesson.description +
        "</p>" +
        '<button class="btn btn-primary mt-3" id="btnMarkComplete">Mark as Complete <i class="bi bi-check2 ms-1"></i></button>';
    } else if (lesson.type === "text") {
      contentHtml +=
        '<div class="text-lesson-content">' +
        lesson.content +
        "</div>" +
        '<button class="btn btn-primary mt-3" id="btnMarkComplete">Mark as Complete <i class="bi bi-check2 ms-1"></i></button>';
    } else if (lesson.type === "quiz" || lesson.type === "exam") {
      var label = lesson.type === "exam" ? "Final Exam" : "Quiz";
      contentHtml +=
        '<div class="alert alert-' +
        (lesson.type === "exam" ? "danger" : "warning") +
        '">' +
        '<i class="bi bi-' +
        (lesson.type === "exam" ? "clipboard-check" : "question-circle") +
        ' me-2"></i>' +
        "<strong>" +
        label +
        ":</strong> Answer all questions correctly to pass. " +
        (lesson.type === "exam"
          ? "You need to pass this to complete the course."
          : "Test your knowledge from previous lessons.") +
        "</div>";
      contentHtml += '<form id="quizForm">';
      lesson.questions.forEach(function (q, qIdx) {
        contentHtml +=
          '<div class="quiz-question card border-0 shadow-sm p-4 mb-3">' +
          '<h6 class="fw-bold mb-3">Question ' +
          (qIdx + 1) +
          ": " +
          q.q +
          "</h6>";
        q.options.forEach(function (opt, oIdx) {
          contentHtml +=
            '<div class="form-check mb-2">' +
            '<input class="form-check-input" type="radio" name="q' +
            qIdx +
            '" value="' +
            oIdx +
            '" id="q' +
            qIdx +
            "o" +
            oIdx +
            '" required>' +
            '<label class="form-check-label" for="q' +
            qIdx +
            "o" +
            oIdx +
            '">' +
            opt +
            "</label></div>";
        });
        contentHtml += "</div>";
      });
      contentHtml +=
        '<button type="submit" class="btn btn-primary">Submit Answers <i class="bi bi-send ms-1"></i></button></form>' +
        '<div id="quizResult" class="mt-3 d-none"></div>';
    }

    // Navigation buttons
    contentHtml +=
      '<div class="d-flex justify-content-between mt-4 pt-3 border-top">';
    if (idx > 0) {
      contentHtml +=
        '<button class="btn btn-outline-primary" id="btnPrevLesson"><i class="bi bi-arrow-left me-1"></i> Previous</button>';
    } else {
      contentHtml += "<div></div>";
    }
    if (idx < lessons.length - 1) {
      contentHtml +=
        '<button class="btn btn-primary" id="btnNextLesson">Next <i class="bi bi-arrow-right ms-1"></i></button>';
    } else {
      contentHtml += "<div></div>";
    }
    contentHtml += "</div>";

    $("#lessonContent").html(contentHtml);

    // Mark complete handler
    $("#btnMarkComplete").on("click", function () {
      markComplete(lesson.id);
      $(this)
        .text("Completed!")
        .addClass("btn-success")
        .removeClass("btn-primary")
        .prop("disabled", true);
      showToast("Lesson completed!", "success");
    });

    // Quiz handler
    $("#quizForm").on("submit", function (e) {
      e.preventDefault();
      var allCorrect = true;
      lesson.questions.forEach(function (q, qIdx) {
        var selected = parseInt($('input[name="q' + qIdx + '"]:checked').val());
        if (selected !== q.correct) allCorrect = false;
      });

      if (allCorrect) {
        markComplete(lesson.id);
        $("#quizResult")
          .removeClass("d-none")
          .html(
            '<div class="alert alert-success"><i class="bi bi-check-circle-fill me-2"></i><strong>Congratulations!</strong> You passed ' +
              (lesson.type === "exam" ? "the final exam" : "the quiz") +
              "!</div>",
          );
        $("#quizForm button[type=submit]").prop("disabled", true);
        showToast(
          lesson.type === "exam"
            ? "You passed the final exam!"
            : "Quiz passed!",
          "success",
        );
      } else {
        $("#quizResult")
          .removeClass("d-none")
          .html(
            '<div class="alert alert-danger"><i class="bi bi-x-circle-fill me-2"></i><strong>Not quite!</strong> Some answers were incorrect. Review the material and try again.</div>',
          );
      }
    });

    // Nav handlers
    $("#btnPrevLesson").on("click", function () {
      loadLesson(idx - 1);
    });
    $("#btnNextLesson").on("click", function () {
      if (completedLessons.indexOf(lesson.id) === -1 && idx > 0) {
        showToast("Complete the current lesson first", "warning");
        return;
      }
      loadLesson(idx + 1);
    });

    window.scrollTo(0, 0);
  }

  // Sidebar click handler
  $(document).on("click", ".lesson-item:not(.locked)", function () {
    loadLesson(parseInt($(this).data("index")));
  });

  $(document).on("click", ".lesson-item.locked", function () {
    showToast("Complete the previous lesson first", "warning");
  });

  // Toggle sidebar on mobile
  $("#toggleSidebar").on("click", function () {
    $(".player-sidebar").toggleClass("show");
  });

  // Initialize
  renderSidebar();
  updateProgress();

  // Start from first incomplete lesson
  var startIdx = 0;
  for (var i = 0; i < lessons.length; i++) {
    if (completedLessons.indexOf(lessons[i].id) === -1) {
      startIdx = i;
      break;
    }
  }
  loadLesson(startIdx);
});
