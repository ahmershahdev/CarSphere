window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loadingOverlay").classList.add("hide");
  }, 1000);
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $(".navbar-custom").addClass("scrolled");
    $(".back-to-top").addClass("show");
  } else {
    $(".navbar-custom").removeClass("scrolled");
    $(".back-to-top").removeClass("show");
  }
});

$(".nav-link").click(function (e) {
  const target = $(this).attr("href");
  if (target.startsWith("#")) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 70,
      },
      800,
    );
    $(".navbar-collapse").collapse("hide");
  }
});

$("#backToTop").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 800);
});

$(window).scroll(function () {
  let scrollPos = $(document).scrollTop() + 100;
  $(".nav-link").each(function () {
    let currLink = $(this);
    let refElement = $(currLink.attr("href"));
    if (
      refElement.length &&
      refElement.position().top <= scrollPos &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $(".nav-link").removeClass("active");
      currLink.addClass("active");
    }
  });
});

$("#carDetailModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const modal = $(this);

  modal.find("#carDetailName").text(button.data("name"));
  modal.find("#carDetailPrice").text(button.data("price"));
  modal.find("#carDetailImage").attr("src", button.data("image"));

  const specs = `
                <li><span class="spec-label">Engine:</span><span class="spec-value">${button.data("engine")}</span></li>
                <li><span class="spec-label">Power:</span><span class="spec-value">${button.data("power")}</span></li>
                <li><span class="spec-label">Transmission:</span><span class="spec-value">${button.data("transmission")}</span></li>
                <li><span class="spec-label">Mileage:</span><span class="spec-value">${button.data("mileage")}</span></li>
            `;
  modal.find("#carSpecs").html(specs);
  modal.find("#carFeatures").text(button.data("features"));
});

$("#dealerModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const brand = button.data("brand");
  $(this)
    .find(".modal-title")
    .text(brand + " Dealers Near You");
});

$("#warrantyModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const brand = button.data("brand");
  $(this)
    .find(".modal-title")
    .text(brand + " Warranty Details");
});

$("#financeModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  if (button.data("bank")) {
    const bank = button.data("bank");
    $(this)
      .find(".modal-title")
      .text(bank + " Financing");
  }
});

function filterCars() {
  const brandFilter = $("#brandFilter").val().toLowerCase();
  const priceFilter = $("#priceFilter").val();

  $(".car-item").each(function () {
    const carBrand = $(this).data("brand").toLowerCase();
    const carPrice = parseInt($(this).data("price"));

    let showBrand = !brandFilter || carBrand === brandFilter;
    let showPrice = true;

    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      showPrice = carPrice >= min && carPrice <= max;
    }

    if (showBrand && showPrice) {
      $(this).fadeIn();
    } else {
      $(this).fadeOut();
    }
  });
}

function compareCars() {
  const car1 = $("#compareCar1").val();
  const car2 = $("#compareCar2").val();

  if (!car1 || !car2) {
    $("#comparisonResult").html(
      '<div class="alert alert-warning">Please select both cars to compare</div>',
    );
    return;
  }

  if (car1 === car2) {
    $("#comparisonResult").html(
      '<div class="alert alert-warning">Please select different cars to compare</div>',
    );
    return;
  }

  const carData = {
    civic: {
      name: "Honda Civic 2025",
      price: "65,00,000",
      engine: "1.5L Turbo",
      power: "180 HP",
      transmission: "CVT",
      mileage: "16 kmpl",
    },
    accord: {
      name: "Honda Accord 2025",
      price: "1,25,00,000",
      engine: "2.0L Turbo",
      power: "252 HP",
      transmission: "10-Speed Auto",
      mileage: "14 kmpl",
    },
    corolla: {
      name: "Toyota Corolla 2025",
      price: "45,00,000",
      engine: "1.8L",
      power: "138 HP",
      transmission: "CVT",
      mileage: "18 kmpl",
    },
    camry: {
      name: "Toyota Camry 2025",
      price: "1,10,00,000",
      engine: "2.5L Hybrid",
      power: "208 HP",
      transmission: "E-CVT",
      mileage: "22 kmpl",
    },
    wagonr: {
      name: "Suzuki Wagon R 2025",
      price: "18,00,000",
      engine: "1.0L",
      power: "67 HP",
      transmission: "5-Speed Manual",
      mileage: "22 kmpl",
    },
    swift: {
      name: "Suzuki Swift 2025",
      price: "32,00,000",
      engine: "1.2L",
      power: "82 HP",
      transmission: "CVT",
      mileage: "20 kmpl",
    },
  };

  const c1 = carData[car1];
  const c2 = carData[car2];

  const table = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>${c1.name}</th>
                            <th>${c2.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Price</strong></td>
                            <td>PKR ${c1.price}</td>
                            <td>PKR ${c2.price}</td>
                        </tr>
                        <tr>
                            <td><strong>Engine</strong></td>
                            <td>${c1.engine}</td>
                            <td>${c2.engine}</td>
                        </tr>
                        <tr>
                            <td><strong>Power</strong></td>
                            <td>${c1.power}</td>
                            <td>${c2.power}</td>
                        </tr>
                        <tr>
                            <td><strong>Transmission</strong></td>
                            <td>${c1.transmission}</td>
                            <td>${c2.transmission}</td>
                        </tr>
                        <tr>
                            <td><strong>Mileage</strong></td>
                            <td>${c1.mileage}</td>
                            <td>${c2.mileage}</td>
                        </tr>
                    </tbody>
                </table>
            `;

  $("#comparisonResult").html(table);
}

function calculateFinance() {
  const price = parseFloat($("#carPrice").val()) || 5000000;
  const years = parseInt($("#loanPeriod").val()) || 3;
  const downPayment = price * 0.4;
  const loanAmount = price * 0.6;
  const interestRate = 0.14;
  const months = years * 12;

  const monthlyRate = interestRate / 12;
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  const result = `
                <div class="alert alert-success">
                    <h6 class="mb-3">Finance Breakdown:</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Car Price:</strong> PKR ${price.toLocaleString()}</p>
                            <p><strong>Down Payment (40%):</strong> PKR ${downPayment.toLocaleString()}</p>
                            <p><strong>Loan Amount (60%):</strong> PKR ${loanAmount.toLocaleString()}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Monthly Installment:</strong> PKR ${Math.round(monthlyPayment).toLocaleString()}</p>
                            <p><strong>Total Interest:</strong> PKR ${Math.round(totalInterest).toLocaleString()}</p>
                            <p><strong>Total Amount Payable:</strong> PKR ${Math.round(totalPayment + downPayment).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            `;

  $("#financeResult").html(result);
}

$("form").submit(function (e) {
  e.preventDefault();
  alert(
    "Thank you for your inquiry! Our team will contact you within 24 hours.",
  );
  this.reset();
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".car-card, .brand-card, .stats-card, .warranty-card, .bank-card, .contact-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
