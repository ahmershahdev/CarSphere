// Global variables
let allCars = [];
let filteredCars = [];
let allWorks = [];
let allBanks = [];
let allDealers = [];
let selectedCompareCars = [];
const MAX_COMPARE_CARS = 3;
let currentCarModal = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  setupScrollSpy();
  hidePreloader();
});

// Load all data from JSON
async function loadData() {
  try {
    const response = await fetch('assets/js/cars-data.json');
    const data = await response.json();
    
    allCars = data.cars;
    filteredCars = [...allCars];
    allWorks = data.warranties;
    allBanks = data.banks;
    allDealers = data.dealers;
    
    renderBrandCards();
    renderCars(filteredCars);
    populateBrandFilters();
    renderWarranties();
    renderFinancingCarousel();
    renderShowroomCarousel();
    renderBanks();
    renderDealers();
    renderComparisonSelection();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      document.getElementById('suggestionsDropdown').classList.remove('show');
    }, 200);
  });

  // Filter functionality
  document.getElementById('filterBtn').addEventListener('click', applyFilters);
  document.getElementById('brandFilter').addEventListener('change', applyFilters);
  document.getElementById('priceFilter').addEventListener('change', applyFilters);

  // Comparison
  document.getElementById('comparisonBtn').addEventListener('click', showComparison);
  document.getElementById('showAllDealersBtn').addEventListener('click', renderDealers);

  // Dealer filter
  document.getElementById('dealerBrandFilter').addEventListener('change', filterDealers);

  // EMI Form
  document.getElementById('emiForm').addEventListener('submit', calculateEMI);

  // Navbar scroll effect
  window.addEventListener('scroll', handleNavbarScroll);
}

// Handle navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Setup scroll spy for active nav links
function setupScrollSpy() {
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = ['home', 'catalog', 'compare', 'financing', 'dealers', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  
  for (const link of navLinks) {
    link.classList.remove('active');
  }

  let currentSection = 'home';
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element && element.getBoundingClientRect().top <= 150) {
      currentSection = section;
    }
  }

  document.querySelector(`a[href="#${currentSection}"]`)?.classList.add('active');
}

// Search functionality with suggestions
function handleSearch(e) {
  const value = e.target.value.toLowerCase();
  const suggestionsDropdown = document.getElementById('suggestionsDropdown');

  if (value.length < 1) {
    suggestionsDropdown.classList.remove('show');
    return;
  }

  const suggestions = allCars
    .filter(car => 
      car.brand.toLowerCase().includes(value) || 
      car.model.toLowerCase().includes(value)
    )
    .slice(0, 5);

  if (suggestions.length === 0) {
    suggestionsDropdown.classList.remove('show');
    return;
  }

  const suggestionsHTML = suggestions
    .map(car => 
      `<div class="suggestion-item" onclick="searchCar('${car.model}')">
        ${car.brand} ${car.model}
      </div>`
    )
    .join('');

  suggestionsDropdown.innerHTML = suggestionsHTML;
  suggestionsDropdown.classList.add('show');
}

function searchCar(model) {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = model;
  
  filteredCars = allCars.filter(car => 
    car.model.toLowerCase() === model.toLowerCase() ||
    car.brand.toLowerCase().includes(model.toLowerCase())
  );
  
  renderCars(filteredCars);
  document.getElementById('suggestionsDropdown').classList.remove('show');
}

// Populate brand filters
function populateBrandFilters() {
  const brandSet = new Set(allCars.map(car => car.brand));
  const brandFilter = document.getElementById('brandFilter');
  const dealerBrandFilter = document.getElementById('dealerBrandFilter');

  brandSet.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);

    const dealerOption = document.createElement('option');
    dealerOption.value = brand;
    dealerOption.textContent = brand;
    dealerBrandFilter.appendChild(dealerOption);
  });
}

// Apply filters
function applyFilters() {
  const brandFilter = document.getElementById('brandFilter').value;
  const priceFilter = document.getElementById('priceFilter').value;

  filteredCars = allCars.filter(car => {
    if (brandFilter && car.brand !== brandFilter) return false;

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
      if (car.price < minPrice || car.price > maxPrice) return false;
    }

    return true;
  });

  renderCars(filteredCars);
}

// Render cars grid
function renderCars(cars) {
  const carsContainer = document.getElementById('carsContainer');
  
  if (cars.length === 0) {
    carsContainer.innerHTML = '<div class="col-12 text-center text-muted">No cars found</div>';
    return;
  }

  carsContainer.innerHTML = cars
    .map(car => createCarCard(car))
    .join('');

  // Add click handlers
  document.querySelectorAll('.car-card').forEach(card => {
    card.addEventListener('click', () => {
      const carId = card.dataset.carId;
      const car = allCars.find(c => c.id === parseInt(carId));
      showCarModal(car);
    });
  });
}

function createCarCard(car) {
  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="car-card" data-car-id="${car.id}">
        <div class="car-image">
          <img src="${car.image}" alt="${car.brand} ${car.model}">
          <span class="car-badge">${car.year}</span>
        </div>
        <div class="car-info">
          <div class="car-brand">${car.brand}</div>
          <div class="car-model">${car.model}</div>
          <div class="car-specs">${car.features[0]} • ${car.features[1] || 'N/A'}</div>
          <div class="car-price">PKR ${formatPrice(car.price)}</div>
          <div class="car-dealer">
            <i class="bi bi-geo-alt"></i> ${car.location}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Format price
function formatPrice(price) {
  return (price / 1000000).toFixed(1) + 'M';
}

// Show car modal
function showCarModal(car) {
  currentCarModal = car;
  
  // Set modal title
  document.getElementById('carModalTitle').textContent = `${car.brand} ${car.model} - ${car.year}`;
  
  // Setup image carousel
  const carouselInner = document.getElementById('carImageCarouselInner');
  let carouselImages = '';
  
  // Add logo first
  carouselImages += `
    <div class="carousel-item active">
      <img src="assets/images/cars/${car.brand.toLowerCase()}/${car.brand.toLowerCase()}-logo.avif" 
           alt="${car.brand} Logo"
           onerror="this.src='assets/images/logo/CarSphere.avif'">
    </div>
  `;
  
  // Add car images
  for (let i = 1; i <= 4; i++) {
    carouselImages += `
      <div class="carousel-item">
        <img src="assets/images/cars/${car.brand.toLowerCase()}/${car.brand.toLowerCase()}-${i}.avif" 
             alt="${car.brand} ${car.model} Image ${i}"
             onerror="this.src='assets/images/cars/${car.brand.toLowerCase()}/${car.brand.toLowerCase()}-1.avif'">
      </div>
    `;
  }
  
  carouselInner.innerHTML = carouselImages;
  
  // Populate quick info table
  document.getElementById('carDetailYear').textContent = car.year;
  document.getElementById('carDetailPrice').textContent = `PKR ${formatPrice(car.price)}`;
  document.getElementById('carDetailLocation').textContent = car.location;
  document.getElementById('carDetailDealer').textContent = car.dealer;
  document.getElementById('carDetailWarranty').textContent = car.warranty;
  
  // Populate features table
  const featuresTable = document.getElementById('carFeaturesTable');
  let tableRows = '';
  
  car.features.forEach((feature, index) => {
    const bgClass = index % 2 === 0 ? 'table-dark' : 'even-row';
    tableRows += `
      <tr class="${bgClass}">
        <td colspan="2">
          <i class="bi bi-check-circle-fill text-warning me-2"></i>
          <strong>${feature}</strong>
        </td>
      </tr>
    `;
  });
  
  featuresTable.innerHTML = tableRows;
  
  // Initialize carousel
  const carImageCarousel = document.getElementById('carImageCarousel');
  if (carImageCarousel) {
    const carousel = new bootstrap.Carousel(carImageCarousel, {
      interval: 5000,
      wrap: true,
      pause: false
    });
  }
  
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('carModal'));
  modal.show();
}

// Add car to comparison
document.addEventListener('click', (e) => {
  if (e.target.id === 'compareCarBtn' && currentCarModal) {
    addToCompare(currentCarModal);
    bootstrap.Modal.getInstance(document.getElementById('carModal')).hide();
  }
});

function addToCompare(car) {
  if (selectedCompareCars.find(c => c.id === car.id)) {
    alert('This car is already added to comparison');
    return;
  }

  if (selectedCompareCars.length >= MAX_COMPARE_CARS) {
    alert(`You can compare maximum ${MAX_COMPARE_CARS} cars`);
    return;
  }

  selectedCompareCars.push(car);
  renderComparisonSelection();
  scrollToElement('compare');
}

// Render comparison selection
function renderComparisonSelection() {
  const container = document.getElementById('compareSelectionContainer');
  
  let html = '';
  for (let i = 0; i < MAX_COMPARE_CARS; i++) {
    const car = selectedCompareCars[i];
    
    if (car) {
      html += `
        <div class="col-md-4 mb-3">
          <div class="car-selection-box active">
            <div class="car-selection-box-content">
              <div>
                <strong>${car.brand} ${car.model}</strong>
              </div>
              <div class="text-muted small mt-2">${car.year}</div>
              <button class="car-selection-box-remove mt-2" onclick="removeFromCompare(${car.id})">Remove</button>
            </div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="col-md-4 mb-3">
          <div class="car-selection-box car-selection-box-empty">
            <div class="car-selection-box-content">
              <p class="mb-0">Empty Slot</p>
              <small>Add a car to compare</small>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  container.innerHTML = html;
}

function removeFromCompare(carId) {
  selectedCompareCars = selectedCompareCars.filter(c => c.id !== carId);
  renderComparisonSelection();
}

// Show comparison
function showComparison() {
  if (selectedCompareCars.length < 2) {
    alert('Select at least 2 cars to compare');
    return;
  }

  const comparisonResultContainer = document.getElementById('comparisonResultContainer');
  const headerRow = document.getElementById('comparisonHeaderRow');
  const featuresRow = document.getElementById('comparisonFeaturesRow');

  // Build header
  let headerHTML = '<th style="width: 20%; text-align: left;">Features</th>';
  selectedCompareCars.forEach(car => {
    headerHTML += `<th style="width: ${80 / selectedCompareCars.length}%; text-align: center;">
      ${car.brand} ${car.model}
    </th>`;
  });
  headerRow.innerHTML = headerHTML;

  // Get all unique features
  const allFeatures = new Set();
  selectedCompareCars.forEach(car => {
    car.features.forEach(f => allFeatures.add(f));
  });

  // Build features rows
  let featuresHTML = '';
  
  // Price row
  featuresHTML += '<tr><td><strong>Price</strong></td>';
  selectedCompareCars.forEach(car => {
    featuresHTML += `<td text-align: center;"><strong>PKR ${formatPrice(car.price)}</strong></td>`;
  });
  featuresHTML += '</tr>';

  // Warranty row
  featuresHTML += '<tr><td><strong>Warranty</strong></td>';
  selectedCompareCars.forEach(car => {
    featuresHTML += `<td style="text-align: center;">${car.warranty}</td>`;
  });
  featuresHTML += '</tr>';

  // Features rows
  allFeatures.forEach(feature => {
    featuresHTML += `<tr><td>${feature}</td>`;
    selectedCompareCars.forEach(car => {
      const hasFeature = car.features.includes(feature);
      featuresHTML += `<td style="text-align: center;">
        ${hasFeature ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-circle"></i>'}
      </td>`;
    });
    featuresHTML += '</tr>';
  });

  featuresRow.innerHTML = featuresHTML;
  comparisonResultContainer.style.display = 'block';
  scrollToElement('comparisonResultContainer');
}

// Render warranties
function renderWarranties() {
  const warrantyContainer = document.getElementById('warrantyContainer');
  
  warrantyContainer.innerHTML = allWorks
    .map(warranty => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="warranty-card">
          <div class="warranty-title">${warranty.brand}</div>
          <h6 class="text-warning">${warranty.scheme}</h6>
          <p class="text-muted small mb-2"><strong>Duration:</strong> ${warranty.duration}</p>
          <p class="text-muted small mb-0"><strong>Coverage:</strong> ${warranty.coverage}</p>
        </div>
      </div>
    `)
    .join('');
}

// Render banks
function renderBanks() {
  const banksContainer = document.getElementById('banksContainer');
  
  banksContainer.innerHTML = allBanks
    .map(bank => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="bank-card">
          <div class="bank-logo">${bank.name}</div>
          <h6 class="bank-name">${bank.name}</h6>
          <div class="bank-details">
            <div class="bank-details-item">
              <span class="bank-details-label">Interest Rate:</span>
              <span class="text-warning fw-bold">${bank.interestRate}% p.a.</span>
            </div>
            <div class="bank-details-item">
              <span class="bank-details-label">Max Loan:</span>
              <span class="text-warning fw-bold">${bank.maxLoanAmount}</span>
            </div>
            <div class="bank-details-item">
              <span class="bank-details-label">Tenure:</span>
              <span class="text-warning fw-bold">${bank.tenure}</span>
            </div>
          </div>
          <ul class="bank-desc list-unstyled">
            ${bank.features.map(f => `<li><i class="bi bi-check-circle text-warning"></i> <small>${f}</small></li>`).join('')}
          </ul>
          <button class="btn btn-primary btn-sm w-100 mt-3" 
            onclick="openEMICalculator(${bank.interestRate}, '${bank.name}')">
            Calculate EMI
          </button>
        </div>
      </div>
    `)
    .join('');
}

// Open EMI calculator
function openEMICalculator(interestRate, bankName) {
  document.getElementById('interestRate').value = interestRate;
  document.getElementById('emiResult').style.display = 'none';
  
  const modal = new bootstrap.Modal(document.getElementById('loanModal'));
  modal.show();
}

// Calculate EMI
function calculateEMI(e) {
  e.preventDefault();

  const carPrice = parseFloat(document.getElementById('carPrice').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value);
  const loanDuration = parseInt(document.getElementById('loanDuration').value);

  if (!carPrice || !interestRate || !loanDuration) {
    alert('Please fill all fields');
    return;
  }

  // 60% loan of car price
  const loanAmount = carPrice * 0.6;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanDuration;

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayable = emi * totalMonths;

  document.getElementById('loanAmount').textContent = `PKR ${formatPrice(loanAmount)}`;
  document.getElementById('monthlyEMI').textContent = `PKR ${formatPrice(emi)}`;
  document.getElementById('totalPayable').textContent = `PKR ${formatPrice(totalPayable)}`;
  document.getElementById('emiResult').style.display = 'block';
}

// Render dealers
function renderDealers() {
  const dealersContainer = document.getElementById('dealersContainer');
  
  dealersContainer.innerHTML = allDealers
    .map(dealer => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="dealer-card">
          <div class="dealer-icon"><i class="bi bi-shop"></i></div>
          <div class="dealer-city">${dealer.city}</div>
          <p class="dealer-address">${dealer.address}</p>
          <p class="dealer-contact"><i class="bi bi-telephone"></i> ${dealer.phone}</p>
          <div class="text-muted small mt-3">
            <strong>Brands:</strong> ${dealer.brands.join(', ')}
          </div>
        </div>
      </div>
    `)
    .join('');
}

// Filter dealers
function filterDealers() {
  const brand = document.getElementById('dealerBrandFilter').value;
  const dealersContainer = document.getElementById('dealersContainer');
  
  let filteredDealers = allDealers;
  if (brand) {
    filteredDealers = allDealers.filter(dealer => dealer.brands.includes(brand));
  }

  dealersContainer.innerHTML = filteredDealers
    .map(dealer => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="dealer-card">
          <div class="dealer-icon"><i class="bi bi-shop"></i></div>
          <div class="dealer-city">${dealer.city}</div>
          <p class="dealer-address">${dealer.address}</p>
          <p class="dealer-contact"><i class="bi bi-telephone"></i> ${dealer.phone}</p>
          <div class="text-muted small mt-3">
            <strong>Brands:</strong> ${dealer.brands.join(', ')}
          </div>
        </div>
      </div>
    `)
    .join('');
}

// Render brand cards with carousels
function renderBrandCards() {
  const brandsContainer = document.getElementById('brandsContainer');
  const brands = ['Honda', 'Toyota', 'BMW', 'Audi', 'Porsche', 'Lamborghini'];
  
  brandsContainer.innerHTML = brands
    .map((brand, index) => {
      const brandCars = allCars.filter(car => car.brand === brand);
      const carouselId = `carousel-${brand.toLowerCase()}`;
      
      let carouselItems = '';
      // Add logo first
      carouselItems += `
        <div class="carousel-item active">
          <img src="assets/images/cars/${brand.toLowerCase()}/${brand.toLowerCase()}-logo.avif" 
               alt="${brand} Logo"
               onerror="this.src='assets/images/logo/CarSphere.avif'">
        </div>
      `;
      
      // Add other images
      for (let i = 1; i <= 4; i++) {
        carouselItems += `
          <div class="carousel-item">
            <img src="assets/images/cars/${brand.toLowerCase()}/${brand.toLowerCase()}-${i}.avif" 
                 alt="${brand} Image ${i}"
                 onerror="this.src='assets/images/cars/${brand.toLowerCase()}/${brand.toLowerCase()}-1.avif'">
          </div>
        `;
      }
      
      return `
        <div class="col-lg-6 col-md-6 mb-4">
          <div class="brand-card">
            <div class="brand-carousel">
              <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-inner">
                  ${carouselItems}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                  <span class="carousel-control-next-icon"></span>
                </button>
              </div>
            </div>
            <h4 class="brand-title">${brand}</h4>
            <p class="brand-info">
              Available Models: ${brandCars.length} | 
              Price Range: PKR ${formatPrice(Math.min(...brandCars.map(c => c.price)))}-${formatPrice(Math.max(...brandCars.map(c => c.price)))}
            </p>
            <div class="brand-action-buttons">
              <button class="btn btn-primary btn-sm" onclick="viewBrandCars('${brand}')">View Now</button>
              <button class="btn btn-outline-primary btn-sm" onclick="viewBrandLive('${brand}')">View Live</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
  
  // Initialize all brand carousels with 5 second interval
  setTimeout(() => {
    const brands_list = ['Honda', 'Toyota', 'BMW', 'Audi', 'Porsche', 'Lamborghini'];
    brands_list.forEach(brand => {
      const carouselElement = document.getElementById(`carousel-${brand.toLowerCase()}`);
      if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          wrap: true,
          pause: false
        });
      }
    });
  }, 100);
}

// View brand cars
function viewBrandCars(brand) {
  const brandCars = allCars.filter(car => car.brand === brand);
  renderCars(brandCars);
  scrollToElement('carsContainer');
  
  // Simulate showing modal for first car if available
  if (brandCars.length > 0) {
    setTimeout(() => {
      showCarModal(brandCars[0]);
    }, 500);
  }
}

// View brand live (scroll to section)
function viewBrandLive(brand) {
  const section = document.getElementById('catalog');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render financing carousel with infinite loop
function renderFinancingCarousel() {
  const carousel = document.getElementById('financingCarousel');
  
  // Create list items (doubled for infinite loop effect)
  let items = '';
  
  allBanks.forEach(bank => {
    items += `
      <div class="financing-carousel-item">
        <img src="${bank.logo}" alt="${bank.name}" title="${bank.name}">
      </div>
    `;
  });
  
  // Duplicate for seamless loop
  items += items;
  
  carousel.innerHTML = items;
}

// Render showroom carousel
function renderShowroomCarousel() {
  const carouselElement = document.getElementById('showroomCarousel');
  const carouselInner = document.querySelector('#showroomCarousel .carousel-inner');
  
  const showroomImages = [
    'assets/images/showroom/CarSphere Showroom-1.avif',
    'assets/images/showroom/CarSphere Showroom-2.avif',
    'assets/images/showroom/CarSphere Showroom-3.avif',
    'assets/images/showroom/CarSphere Showroom-4.avif',
    'assets/images/showroom/CarSphere Showroom-5.avif',
    'assets/images/showroom/CarSphere Showroom-6.avif'
  ];
  
  carouselInner.innerHTML = showroomImages
    .map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image}" class="d-block w-100" alt="Showroom ${index + 1}">
      </div>
    `)
    .join('');
  
  // Initialize showroom carousel with 5 second interval
  setTimeout(() => {
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true,
        pause: false
      });
    }
  }, 100);
}

// Utility functions
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 800);
}

// Add smooth scroll to top button (optional)
window.addEventListener('scroll', () => {
  updateActiveNavLink();
});

// Prevent form submission on enter in search
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
