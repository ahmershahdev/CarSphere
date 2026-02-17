# AutoWorld - Premium Car Dealership Website

A premium single-page car dealership website built with HTML5, Bootstrap 5, Vanilla JavaScript, and CSS3.

## Features

### 🎨 Design & UI
- **Dark Premium Theme**: Black background with OrangeRed accents
- **CSS Animations**: Smooth gradient animations, fade-in effects, and hover states
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Bootstrap Icons**: Modern icon set throughout the application

### 🏎️ Core Features

1. **Header/Navbar**
   - Sticky navigation with gradient-animated logo
   - Active section highlighting during scroll
   - Mobile-responsive menu

2. **Hero Section**
   - Eye-catching banner with gradient text animation
   - Call-to-action button with glow effect

3. **Search & Filter**
   - Real-time search with brand/model suggestions
   - Filter by brand and price range
   - Responsive search UI

4. **Car Catalog**
   - Grid layout of available vehicles
   - Car cards with image, features, and price
   - Click to view detailed information in modal

5. **Car Details Modal**
   - High-resolution car image
   - Complete feature list
   - Price and location information
   - Add to comparison option

6. **Comparison Tool**
   - Select and compare up to 3 vehicles
   - Feature-by-feature comparison table
   - Price and warranty comparison
   - Visual checkmarks for available features

7. **Finance & Warranty**
   - Brand-specific warranty schemes
   - Partner bank information (7 banks)
   - Interest rates and tenure options
   - Interactive EMI Calculator

8. **EMI Calculator**
   - Calculate monthly EMI (60% of car price as loan)
   - Adjustable interest rate and tenure
   - Shows total payable amount
   - Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)

9. **Dealer Locator**
   - Find showrooms across Pakistan
   - Filter by car brand
   - Contact information for each dealership
   - View brands available at each location

10. **Contact & Footer**
    - Company information
    - Social media links
    - Quick navigation links
    - Contact details

## Tech Stack

- **HTML5**: Semantic markup with Open Graph and Schema.org metadata
- **Bootstrap 5**: Layout and responsive components
- **CSS3**: Custom animations, gradients, and styling
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **Bootstrap Icons**: Icon library
- **JSON**: Local mock data storage

## Color Scheme

- **Primary**: OrangeRed (#ff4500)
- **Secondary**: #ff6b35, #ff8c42
- **Background**: Black (#0a0a0f)
- **Card Background**: #111118
- **Text**: #f0f0f5
- **Muted**: rgba(240, 240, 245, 0.5)

## File Structure

```
/CarSphere
├── index-auto.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── auto-style.css          # Custom styling with animations
│   ├── js/
│   │   ├── auto-script.js          # Main JavaScript logic
│   │   └── cars-data.json          # Mock car and dealer data
│   ├── images/
│   │   ├── cars/                   # Car images (AVIF format)
│   │   ├── financing partners/     # Bank logos
│   │   ├── logo/                   # Company logo
│   │   └── favicon/                # Favicon
│   └── blender/                    # 3D model source files
```

## Mock Data Structure

### Cars Data (cars-data.json)
- **cars**: Array of vehicle objects with brand, model, price, features, warranty
- **warranties**: Brand-specific warranty schemes
- **banks**: Partner banks with interest rates and loan terms
- **dealers**: Showroom locations with contact information

### Example Car Object
```json
{
  "id": 1,
  "brand": "Honda",
  "model": "Civic",
  "year": 2024,
  "price": 3500000,
  "image": "assets/images/cars/honda/honda-1.avif",
  "features": ["1.8L Engine", "Automatic Transmission", ...],
  "dealer": "CarSphere Karachi",
  "location": "Karachi",
  "warranty": "3 Years / 100,000 KM"
}
```

## Setup Instructions

### 1. File Placement
Ensure all files are in the correct directory structure:
```
d:\CarSphere\
├── index-auto.html
├── assets/
│   ├── css/auto-style.css
│   ├── js/
│   │   ├── auto-script.js
│   │   └── cars-data.json
│   └── images/
```

### 2. Image Assets
Place car images in the appropriate folders:
```
assets/images/cars/
├── honda/
├── toyota/
├── bmw/
├── audi/
├── porsche/
└── lamborghini/
```

Banking partner logos:
```
assets/images/financing partners/
├── hbl.avif
├── mcb_bank.avif
├── allied_bank_limited.avif
├── bank_al_habib.avif
├── faysal_bank.avif
├── meezan_bank.avif
└── standard_chartered.avif
```

### 3. Running the Application

**Option A: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npm install -g http-server
http-server -p 8000
```

Then open: `http://localhost:8000` and navigate to `index-auto.html`

**Option B: Direct File Access**
Simply open `index-auto.html` in your browser (note: some features like JSON loading may not work with `file://` protocol)

## Key Functionality

### Search with Autocomplete
- Type to search by brand or model
- Suggestions appear as dropdown
- Click or type to select

### Filtering
- Filter by brand
- Filter by price range (5M, 10M, 20M, 50M+ PKR)
- Results update in real-time

### Car Comparison
- Select up to 3 cars
- View side-by-side comparison
- Shows features, price, and warranty

### EMI Calculator
- Input car price
- Loan calculated at 60% of price
- Monthly EMI = P × r × (1+r)^n / ((1+r)^n - 1)
- Adjustable tenure (up to 84 months)
- Flexible interest rates from different banks

### Responsive Navigation
- Fixed navbar stays visible during scroll
- Active section highlighting
- Smooth scroll to sections

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## SEO Optimization

- Semantic HTML5 structure
- Open Graph meta tags for social sharing
- Schema.org JSON-LD markup
- Mobile-specific meta viewport
- Structured data for organization

## Performance Features

- Lazy-loaded images (AVIF format)
- CSS animations use GPU acceleration
- Minimal JavaScript dependencies
- Optimized Bootstrap CSS/JS
- Smooth scrolling behavior

## Customization

### Change Colors
Edit the CSS variables in `auto-style.css`:
```css
:root {
  --primary: #ff4500;           /* OrangeRed */
  --bg-dark: #0a0a0f;           /* Black */
  --text-white: #f0f0f5;        /* Off-white */
}
```

### Add More Cars
Edit `cars-data.json` and add to the cars array:
```json
{
  "id": 11,
  "brand": "NewBrand",
  "model": "Model",
  "year": 2024,
  "price": 5000000,
  ...
}
```

### Update Bank Interest Rates
Modify the `interestRate` in the banks array in `cars-data.json`

### Add Showrooms
Add new dealer entries to the dealers array with city, address, phone, and brands

## SEO & OG Tags

- Title: AutoWorld – Premium Car Dealership by CarSphere
- Description: Discover premium vehicles with flexible financing
- Keywords: cars, dealership, automotive, financing, loans
- Open Graph: Ready for social media sharing
- Twitter Card: Suitable for Twitter/X sharing

## Future Enhancements

- [ ] Backend integration with real database
- [ ] User authentication and accounts
- [ ] Admin panel for inventory management
- [ ] Test drive booking system
- [ ] Payment gateway integration
- [ ] Real-time chat support
- [ ] AR car viewer
- [ ] Advanced analytics
- [ ] Multi-language support

## License

This project is created for CarSphere AutoWorld by premium automotive solutions.

## Support

For issues or feature requests, contact: info@autoworld.com
Phone: +92-300-0000000

---

**Created**: 2024
**Version**: 1.0
**Status**: Production Ready
