/* ============================================
   NOVIO - Main JavaScript
   ============================================ */

$(document).ready(function () {
  // ==========================================
  // COURSE DATA
  // ==========================================
  const coursesData = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2026",
      category: "Web Development",
      instructor: "Sarah Johnson",
      instructorImg:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 2847,
      students: 15230,
      duration: "42 hours",
      lessons: 285,
      level: "Beginner",
      badge: "Bestseller",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course.",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning with Python",
      category: "Data Science",
      instructor: "Michael Chen",
      instructorImg:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      price: 94.99,
      originalPrice: 189.99,
      rating: 4.9,
      reviews: 1953,
      students: 12450,
      duration: "56 hours",
      lessons: 340,
      level: "Intermediate",
      badge: "Top Rated",
      description:
        "Learn data analysis, visualization, machine learning, and deep learning with Python from scratch.",
    },
    {
      id: 3,
      title: "Python Programming Masterclass",
      category: "Programming",
      instructor: "Alex Rivera",
      instructorImg:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
      price: 69.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 3421,
      students: 21340,
      duration: "38 hours",
      lessons: 250,
      level: "Beginner",
      badge: "Bestseller",
      description:
        "From zero to hero in Python. Learn automation, web scraping, data analysis and more.",
    },
    {
      id: 4,
      title: "UI/UX Design: Complete Guide to Figma",
      category: "Design",
      instructor: "Emily Park",
      instructorImg:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
      price: 79.99,
      originalPrice: 169.99,
      rating: 4.8,
      reviews: 1287,
      students: 8920,
      duration: "32 hours",
      lessons: 195,
      level: "Beginner",
      badge: "New",
      description:
        "Design stunning user interfaces and create amazing user experiences with Figma.",
    },
    {
      id: 5,
      title: "Machine Learning & AI: Advanced Concepts",
      category: "Artificial Intelligence",
      instructor: "Dr. James Wright",
      instructorImg:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      price: 109.99,
      originalPrice: 249.99,
      rating: 4.9,
      reviews: 892,
      students: 6740,
      duration: "64 hours",
      lessons: 380,
      level: "Advanced",
      badge: "Top Rated",
      description:
        "Deep dive into neural networks, NLP, computer vision, and reinforcement learning.",
    },
    {
      id: 6,
      title: "Cybersecurity: Ethical Hacking from Scratch",
      category: "Cybersecurity",
      instructor: "Sarah Johnson",
      instructorImg:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
      price: 84.99,
      originalPrice: 179.99,
      rating: 4.7,
      reviews: 1564,
      students: 9870,
      duration: "48 hours",
      lessons: 310,
      level: "Intermediate",
      badge: "",
      description:
        "Learn penetration testing, network security, and ethical hacking techniques.",
    },
    {
      id: 7,
      title: "AWS Cloud Practitioner & Solutions Architect",
      category: "Cloud Computing",
      instructor: "Michael Chen",
      instructorImg:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
      price: 99.99,
      originalPrice: 219.99,
      rating: 4.8,
      reviews: 2134,
      students: 13560,
      duration: "52 hours",
      lessons: 295,
      level: "Beginner",
      badge: "Bestseller",
      description:
        "Master AWS cloud services and prepare for official AWS certification exams.",
    },
    {
      id: 8,
      title: "React & Next.js: Build Modern Web Apps",
      category: "Web Development",
      instructor: "Alex Rivera",
      instructorImg:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
      price: 74.99,
      originalPrice: 159.99,
      rating: 4.8,
      reviews: 1876,
      students: 11230,
      duration: "36 hours",
      lessons: 230,
      level: "Intermediate",
      badge: "New",
      description:
        "Build production-ready React and Next.js applications with modern best practices.",
    },
    {
      id: 9,
      title: "DevOps Engineering: CI/CD & Kubernetes",
      category: "DevOps",
      instructor: "Dr. James Wright",
      instructorImg:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 987,
      students: 7890,
      duration: "44 hours",
      lessons: 265,
      level: "Advanced",
      badge: "",
      description:
        "Master Docker, Kubernetes, Jenkins, GitHub Actions and cloud deployment strategies.",
    },
  ];

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }

    // Back to top visibility
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").addClass("visible");
    } else {
      $(".back-to-top").removeClass("visible");
    }
  });

  // Back to top click
  $(".back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================
  function animateOnScroll() {
    $(".animate-on-scroll").each(function () {
      var elemTop = $(this).offset().top;
      var winBottom = $(window).scrollTop() + $(window).height();
      if (elemTop < winBottom - 60) {
        $(this).addClass("animated");
      }
    });
  }

  $(window).on("scroll", animateOnScroll);
  animateOnScroll();

  // ==========================================
  // AUTH STATE MANAGEMENT
  // ==========================================
  function getCurrentUser() {
    var userData = localStorage.getItem("novio_user");
    return userData ? JSON.parse(userData) : null;
  }

  function setCurrentUser(user) {
    localStorage.setItem("novio_user", JSON.stringify(user));
  }

  function logoutUser() {
    localStorage.removeItem("novio_user");
    showToast("Logged out successfully", "success");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 500);
  }

  function updateNavAuth() {
    var user = getCurrentUser();
    if (user) {
      $("#loginBtn, #signupBtn").addClass("d-none");
      $("#accountBtn").removeClass("d-none");
    } else {
      $("#loginBtn, #signupBtn").removeClass("d-none");
      $("#accountBtn").addClass("d-none");
    }
  }

  updateNavAuth();

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type) {
    type = type || "success";
    var iconMap = {
      success: "bi-check-circle-fill",
      error: "bi-x-circle-fill",
      warning: "bi-exclamation-circle-fill",
    };
    var toast = $(
      '<div class="custom-toast ' +
        type +
        '">' +
        '<i class="bi ' +
        iconMap[type] +
        '"></i>' +
        "<p></p>" +
        "</div>",
    );
    toast.find("p").text(message);

    var container = $(".toast-container");
    if (!container.length) {
      container = $('<div class="toast-container"></div>');
      $("body").append(container);
    }

    container.append(toast);

    setTimeout(function () {
      toast.css({ opacity: 0, transform: "translateX(100%)" });
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3000);
  }

  window.showToast = showToast;

  // ==========================================
  // CART MANAGEMENT
  // ==========================================
  function getCart() {
    var cart = localStorage.getItem("novio_cart");
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem("novio_cart", JSON.stringify(cart));
    updateCartBadge();
  }

  function addToCart(courseId) {
    var cart = getCart();
    var course = coursesData.find(function (c) {
      return c.id === courseId;
    });
    if (!course) return;

    var exists = cart.find(function (item) {
      return item.id === courseId;
    });
    if (exists) {
      showToast("Course already in cart", "warning");
      return;
    }

    cart.push({
      id: course.id,
      title: course.title,
      image: course.image,
      price: course.price,
      instructor: course.instructor,
    });

    saveCart(cart);
    showToast("Added to cart!", "success");
  }

  function removeFromCart(courseId) {
    var cart = getCart();
    cart = cart.filter(function (item) {
      return item.id !== courseId;
    });
    saveCart(cart);
    showToast("Removed from cart", "success");
  }

  function updateCartBadge() {
    var cart = getCart();
    var count = cart.length;
    $(".cart-badge").text(count).attr("data-count", count);
  }

  updateCartBadge();
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.getCart = getCart;
  window.saveCart = saveCart;
  window.coursesData = coursesData;

  // ==========================================
  // RENDER COURSE CARDS
  // ==========================================
  function renderCourseCard(course) {
    var badgeHtml = course.badge
      ? '<span class="badge-overlay ' +
        (course.badge === "Bestseller" ? "bestseller" : "") +
        '">' +
        course.badge +
        "</span>"
      : "";

    var starsHtml = "";
    var fullStars = Math.floor(course.rating);
    for (var i = 0; i < fullStars; i++)
      starsHtml += '<i class="bi bi-star-fill"></i>';
    if (course.rating % 1 >= 0.5)
      starsHtml += '<i class="bi bi-star-half"></i>';

    return (
      '<div class="col-lg-4 col-md-6 mb-4">' +
      '<div class="course-card">' +
      '<div class="card-img-wrapper">' +
      '<img src="' +
      course.image +
      '" alt="' +
      course.title +
      '" loading="lazy">' +
      badgeHtml +
      "</div>" +
      '<div class="card-body">' +
      '<span class="card-category">' +
      course.category +
      "</span>" +
      '<h5 class="card-title"><a href="course-detail.html?id=' +
      course.id +
      '">' +
      course.title +
      "</a></h5>" +
      '<div class="card-instructor">' +
      '<img src="' +
      course.instructorImg +
      '" alt="' +
      course.instructor +
      '">' +
      "<span>" +
      course.instructor +
      "</span>" +
      "</div>" +
      '<div class="card-meta">' +
      '<span><i class="bi bi-clock"></i>' +
      course.duration +
      "</span>" +
      '<span><i class="bi bi-book"></i>' +
      course.lessons +
      " lessons</span>" +
      '<span><i class="bi bi-bar-chart"></i>' +
      course.level +
      "</span>" +
      "</div>" +
      '<div class="card-rating">' +
      '<span class="stars">' +
      starsHtml +
      "</span>" +
      "<span>" +
      course.rating +
      "</span>" +
      '<span class="count">(' +
      course.reviews.toLocaleString() +
      ")</span>" +
      "</div>" +
      '<div class="card-footer-custom">' +
      '<div class="price">$' +
      course.price.toFixed(2) +
      '<span class="original">$' +
      course.originalPrice.toFixed(2) +
      "</span></div>" +
      '<button class="btn-enroll" onclick="addToCart(' +
      course.id +
      ')">Add to Cart</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  window.renderCourseCard = renderCourseCard;

  // Render featured courses on homepage
  if ($("#featuredCourses").length) {
    var featured = coursesData.slice(0, 6);
    var html = "";
    featured.forEach(function (course) {
      html += renderCourseCard(course);
    });
    $("#featuredCourses").html(html);
  }

  // Render all courses on courses page
  if ($("#allCourses").length) {
    renderAllCourses(coursesData);
  }

  function renderAllCourses(courses) {
    if (courses.length === 0) {
      $("#allCourses").html(
        '<div class="col-12 text-center py-5">' +
          '<i class="bi bi-search" style="font-size: 3rem; color: var(--text-muted);"></i>' +
          '<h5 class="mt-3">No courses found</h5>' +
          '<p class="text-muted">Try adjusting your search or filters</p>' +
          "</div>",
      );
      $(".result-count").text("0 courses found");
      return;
    }

    var html = "";
    courses.forEach(function (course) {
      html += renderCourseCard(course);
    });
    $("#allCourses").html(html);
    $(".result-count").text(courses.length + " courses found");
  }

  // ==========================================
  // COURSE SEARCH & FILTER
  // ==========================================
  var searchTimeout;
  $("#courseSearch").on("input", function () {
    clearTimeout(searchTimeout);
    var query = $(this).val().toLowerCase().trim();
    searchTimeout = setTimeout(function () {
      filterCourses();
    }, 300);
  });

  $(".filter-check").on("change", function () {
    filterCourses();
  });

  $("#sortSelect").on("change", function () {
    filterCourses();
  });

  function filterCourses() {
    var query = ($("#courseSearch").val() || "").toLowerCase().trim();
    var selectedCategories = [];
    $(".filter-category:checked").each(function () {
      selectedCategories.push($(this).val());
    });
    var selectedLevels = [];
    $(".filter-level:checked").each(function () {
      selectedLevels.push($(this).val());
    });

    var filtered = coursesData.filter(function (course) {
      var matchQuery =
        !query ||
        course.title.toLowerCase().indexOf(query) > -1 ||
        course.category.toLowerCase().indexOf(query) > -1 ||
        course.instructor.toLowerCase().indexOf(query) > -1 ||
        course.description.toLowerCase().indexOf(query) > -1;

      var matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.indexOf(course.category) > -1;

      var matchLevel =
        selectedLevels.length === 0 ||
        selectedLevels.indexOf(course.level) > -1;

      return matchQuery && matchCategory && matchLevel;
    });

    // Sort
    var sortVal = $("#sortSelect").val();
    if (sortVal === "price-low") {
      filtered.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sortVal === "price-high") {
      filtered.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (sortVal === "rating") {
      filtered.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else if (sortVal === "popular") {
      filtered.sort(function (a, b) {
        return b.students - a.students;
      });
    }

    renderAllCourses(filtered);
  }

  // ==========================================
  // COURSE DETAIL PAGE
  // ==========================================
  if ($("#courseDetailPage").length) {
    var urlParams = new URLSearchParams(window.location.search);
    var courseId = parseInt(urlParams.get("id")) || 1;
    var course = coursesData.find(function (c) {
      return c.id === courseId;
    });

    if (course) {
      $("#cdTitle").text(course.title);
      $("#cdDescription").text(course.description);
      $("#cdImage").attr("src", course.image).attr("alt", course.title);
      $("#cdInstructor").text(course.instructor);
      $("#cdInstructorImg").attr("src", course.instructorImg);
      $("#cdRating").text(course.rating);
      $("#cdReviews").text("(" + course.reviews.toLocaleString() + " reviews)");
      $("#cdStudents").text(course.students.toLocaleString() + " students");
      $("#cdPrice").text("$" + course.price.toFixed(2));
      $("#cdOriginalPrice").text("$" + course.originalPrice.toFixed(2));
      $("#cdDuration").text(course.duration);
      $("#cdLessons").text(course.lessons + " lessons");
      $("#cdLevel").text(course.level);
      $("#cdCategory").text(course.category);

      var discount = Math.round(
        (1 - course.price / course.originalPrice) * 100,
      );
      $("#cdDiscount").text(discount + "% off");

      var starsHtml = "";
      for (var i = 0; i < Math.floor(course.rating); i++)
        starsHtml += '<i class="bi bi-star-fill"></i>';
      if (course.rating % 1 >= 0.5)
        starsHtml += '<i class="bi bi-star-half"></i>';
      $("#cdStars").html(starsHtml);

      document.title = course.title + " | Novio";
      $('meta[name="description"]').attr("content", course.description);

      $("#cdAddToCart").on("click", function () {
        addToCart(course.id);
      });

      // Related courses
      var related = coursesData
        .filter(function (c) {
          return c.category === course.category && c.id !== course.id;
        })
        .slice(0, 3);

      if (related.length === 0) {
        related = coursesData
          .filter(function (c) {
            return c.id !== course.id;
          })
          .slice(0, 3);
      }

      var relHtml = "";
      related.forEach(function (c) {
        relHtml += renderCourseCard(c);
      });
      $("#relatedCourses").html(relHtml);
    }
  }

  // ==========================================
  // CART PAGE
  // ==========================================
  if ($("#cartPage").length) {
    renderCart();
  }

  function renderCart() {
    var cart = getCart();

    if (cart.length === 0) {
      $("#cartItems").html(
        '<div class="cart-empty">' +
          '<i class="bi bi-cart3 d-block"></i>' +
          "<h5>Your cart is empty</h5>" +
          "<p>Browse our courses and find something to learn!</p>" +
          '<a href="courses.html" class="btn btn-primary">Browse Courses</a>' +
          "</div>",
      );
      $("#cartSummary").addClass("d-none");
      return;
    }

    var html = "";
    var subtotal = 0;

    cart.forEach(function (item) {
      subtotal += item.price;
      html +=
        '<div class="cart-item">' +
        '<img src="' +
        item.image +
        '" alt="' +
        item.title +
        '">' +
        '<div class="cart-item-info">' +
        "<h6>" +
        item.title +
        "</h6>" +
        "<p>By " +
        item.instructor +
        "</p>" +
        "</div>" +
        '<span class="cart-item-price">$' +
        item.price.toFixed(2) +
        "</span>" +
        '<button class="btn-remove" onclick="removeCartItem(' +
        item.id +
        ')" title="Remove"><i class="bi bi-x-lg"></i></button>' +
        "</div>";
    });

    $("#cartItems").html(html);
    $("#cartSummary").removeClass("d-none");
    $("#cartSubtotal").text("$" + subtotal.toFixed(2));
    $("#cartTotal").text("$" + subtotal.toFixed(2));
    $("#cartCount").text(
      cart.length + " course" + (cart.length > 1 ? "s" : ""),
    );
  }

  window.removeCartItem = function (courseId) {
    removeFromCart(courseId);
    renderCart();
  };

  // ==========================================
  // PAYMENT PAGE
  // ==========================================
  if ($("#paymentPage").length) {
    var cart = getCart();
    var subtotal = 0;
    var orderHtml = "";

    cart.forEach(function (item) {
      subtotal += item.price;
      orderHtml +=
        '<div class="d-flex justify-content-between align-items-center py-2 border-bottom">' +
        '<div class="d-flex align-items-center gap-2">' +
        '<img src="' +
        item.image +
        '" alt="' +
        item.title +
        '" style="width:50px;height:35px;border-radius:4px;object-fit:cover;">' +
        '<span class="small">' +
        item.title +
        "</span>" +
        "</div>" +
        '<span class="fw-semibold">$' +
        item.price.toFixed(2) +
        "</span>" +
        "</div>";
    });

    $("#paymentOrderItems").html(orderHtml);
    $("#paymentSubtotal").text("$" + subtotal.toFixed(2));
    $("#paymentTotal").text("$" + subtotal.toFixed(2));

    var user = getCurrentUser();
    if (user) {
      $("#payName").val(user.name || "");
      $("#payEmail").val(user.email || "");
      $("#payPhone").val(user.phone || "");
    }

    $(".method-option").on("click", function () {
      $(".method-option").removeClass("active");
      $(this).addClass("active");
    });

    $("#paymentForm").on("submit", function (e) {
      e.preventDefault();
      var name = $("#payName").val().trim();
      var email = $("#payEmail").val().trim();
      if (!name || !email) {
        showToast("Please fill in all required fields", "error");
        return;
      }

      // Save enrollments
      var user = getCurrentUser();
      if (user) {
        var enrollments = JSON.parse(
          localStorage.getItem("novio_enrollments") || "[]",
        );
        cart.forEach(function (item) {
          if (
            !enrollments.find(function (e) {
              return e.id === item.id;
            })
          ) {
            enrollments.push({
              id: item.id,
              title: item.title,
              image: item.image,
              enrolledDate: new Date().toISOString(),
              progress: 0,
            });
          }
        });
        localStorage.setItem("novio_enrollments", JSON.stringify(enrollments));
      }

      localStorage.removeItem("novio_cart");
      updateCartBadge();
      showToast("Payment successful! You are now enrolled.", "success");

      setTimeout(function () {
        window.location.href = user ? "account.html" : "courses.html";
      }, 1500);
    });
  }

  // ==========================================
  // LOGIN PAGE
  // ==========================================
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    var email = $("#loginEmail").val().trim();
    var password = $("#loginPassword").val().trim();

    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
    var user = users.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (!user) {
      showToast("Invalid email or password", "error");
      return;
    }

    setCurrentUser(user);
    showToast("Welcome back, " + user.name + "!", "success");

    var btn = $(this).find('button[type="submit"]');
    btn.prop("disabled", true).text("Logging in...");

    setTimeout(function () {
      window.location.href = "account.html";
    }, 1000);
  });

  // ==========================================
  // SIGNUP PAGE
  // ==========================================
  // Password strength indicator
  $("#signupPassword").on("input", function () {
    var password = $(this).val();
    var strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    var width = (strength / 5) * 100;
    var colorMap = {
      0: "#E5E7EB",
      1: "#EF4444",
      2: "#F59E0B",
      3: "#F59E0B",
      4: "#10B981",
      5: "#10B981",
    };
    var labelMap = {
      0: "",
      1: "Weak",
      2: "Fair",
      3: "Good",
      4: "Strong",
      5: "Very Strong",
    };

    $("#strengthBar").css({
      width: width + "%",
      background: colorMap[strength],
    });
    $("#strengthText").text(labelMap[strength]);
  });

  $("#signupForm").on("submit", function (e) {
    e.preventDefault();
    var name = $("#signupName").val().trim();
    var email = $("#signupEmail").val().trim();
    var phone = $("#signupPhone").val().trim();
    var password = $("#signupPassword").val();
    var confirmPassword = $("#signupConfirmPassword").val();

    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (password.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
    var exists = users.find(function (u) {
      return u.email === email;
    });
    if (exists) {
      showToast("Email already registered", "error");
      return;
    }

    var newUser = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      joinDate: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("novio_users", JSON.stringify(users));
    setCurrentUser(newUser);
    showToast("Account created successfully!", "success");

    var btn = $(this).find('button[type="submit"]');
    btn.prop("disabled", true).text("Creating account...");

    setTimeout(function () {
      window.location.href = "account.html";
    }, 1000);
  });

  // ==========================================
  // FORGOT PASSWORD PAGE
  // ==========================================
  $("#forgotForm").on("submit", function (e) {
    e.preventDefault();
    var email = $("#forgotEmail").val().trim();

    if (!email) {
      showToast("Please enter your email", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.prop("disabled", true).text("Sending...");

    setTimeout(function () {
      showToast("Password reset link sent to your email!", "success");
      btn.prop("disabled", false).text("Send Reset Link");
    }, 1500);
  });

  // ==========================================
  // ACCOUNT PAGE
  // ==========================================
  if ($("#accountPage").length) {
    var user = getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    // Populate profile
    $("#accName").text(user.name);
    $("#accEmail").text(user.email);
    $("#editName").val(user.name);
    $("#editEmail").val(user.email);
    $("#editPhone").val(user.phone || "");

    var initials = user.name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("")
      .toUpperCase()
      .substring(0, 2);
    $(".profile-initials").text(initials);

    // Tab navigation
    $(".account-nav a").on("click", function (e) {
      e.preventDefault();
      $(".account-nav a").removeClass("active");
      $(this).addClass("active");
      var target = $(this).attr("href");
      $(".account-tab").addClass("d-none");
      $(target).removeClass("d-none");
    });

    // Edit profile
    $("#editProfileForm").on("submit", function (e) {
      e.preventDefault();
      user.name = $("#editName").val().trim();
      user.email = $("#editEmail").val().trim();
      user.phone = $("#editPhone").val().trim();
      setCurrentUser(user);

      // Update in users array too
      var users = JSON.parse(localStorage.getItem("novio_users") || "[]");
      var idx = users.findIndex(function (u) {
        return u.email === user.email;
      });
      if (idx !== -1) users[idx] = user;
      localStorage.setItem("novio_users", JSON.stringify(users));

      $("#accName").text(user.name);
      $(".profile-initials").text(
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

    // Change password
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

    // Render enrollments
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

    // Logout
    $("#logoutBtn").on("click", function () {
      logoutUser();
    });
  }

  // ==========================================
  // PASSWORD TOGGLE
  // ==========================================
  $(".btn-toggle-password").on("click", function () {
    var input = $(this).siblings("input");
    var icon = $(this).find("i");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("bi-eye").addClass("bi-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("bi-eye-slash").addClass("bi-eye");
    }
  });

  // ==========================================
  // CONTACT FORM
  // ==========================================
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    var name = $("#contactName").val().trim();
    var email = $("#contactEmail").val().trim();
    var message = $("#contactMessage").val().trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.prop("disabled", true).text("Sending...");

    setTimeout(function () {
      showToast(
        "Message sent successfully! We'll get back to you soon.",
        "success",
      );
      btn.prop("disabled", false).text("Send Message");
      $("#contactForm")[0].reset();
    }, 1500);
  });

  // ==========================================
  // NEWSLETTER FORM
  // ==========================================
  $(".newsletter-form").on("submit", function (e) {
    e.preventDefault();
    var email = $(this).find("input").val().trim();
    if (!email) {
      showToast("Please enter your email", "error");
      return;
    }
    showToast("Subscribed successfully!", "success");
    $(this).find("input").val("");
  });

  // Close offcanvas on link click (mobile)
  $(".offcanvas-body .nav-link").on("click", function () {
    var offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("navbarOffcanvas"),
    );
    if (offcanvas) offcanvas.hide();
  });
});
