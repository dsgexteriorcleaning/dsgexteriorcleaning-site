// DSG Exterior Cleaning - Official Pricing Calculator
// Based on Official Pricing Structure document

// Base prices for Dutchess County (multipliers applied for Putnam/Westchester)
const basePrices = {
    // House Soft Wash
    'house-wash': {
        small: [349, 499],      // Small (under 1,800)
        medium: [499, 699],     // Medium (1,801-2,800)
        large: [699, 949],      // Large (2,801-3,800)
        xl: [949, 1399]         // XL/Complex (3,800+)
    },
    
    // Roof Soft Wash
    'roof-wash': {
        small: [499, 799],
        medium: [799, 1199],
        large: [1199, 1899],
        xl: [1199, 1899]
    },
    
    // Gutter Cleaning
    'gutter-clean': {
        small: [229, 349],      // 1-Story
        medium: [299, 499],     // 2-Story
        large: [499, 799],      // Complex/Guards
        xl: [499, 799]
    },
    
    // Window Cleaning (Exterior)
    'window-clean': {
        small: [199, 349],      // Small (under 20)
        medium: [349, 599],     // Medium (20-35)
        large: [599, 999],      // Large (35-60)
        xl: [599, 999]
    },
    
    // Concrete/Flatwork
    'flatwork': {
        small: 249,             // Minimum
        medium: [399, 699],     // Standard driveway
        large: [699, 1199],     // Large/multiple areas
        xl: [699, 1199]
    },
    
    // Bundles
    'bundle-essentials': {
        small: [699, 899],      // Home Essentials (House + Gutters)
        medium: [699, 899],
        large: [699, 899],
        xl: [899, 999]
    },
    
    'bundle-curb': {
        small: [899, 1199],     // Curb Appeal (House + Gutters + Driveway)
        medium: [899, 1199],
        large: [1099, 1299],
        xl: [1199, 1399]
    },
    
    'bundle-full': {
        small: [1099, 1599],    // Full Exterior (House + Gutters + Windows + Flatwork)
        medium: [1299, 1599],
        large: [1399, 1599],
        xl: [1599, 1799]
    },
    
    'bundle-premium': {
        small: [1699, 2799],    // Premium Reset (House + Roof + Full driveway + walkway)
        medium: [1999, 2799],
        large: [2299, 2799],
        xl: [2799, 3299]
    },
    
    // Home Care Plans (annual pricing)
    'plan-essential': {
        small: 495,
        medium: 495,
        large: 495,
        xl: 495
    },
    
    'plan-complete': {
        small: 945,
        medium: 945,
        large: 1045,
        xl: 1145
    },
    
    'plan-estate': {
        small: 1495,
        medium: 1495,
        large: 1645,
        xl: 1795
    }
};

// County multipliers
const countyMultipliers = {
    'dutchess': 1.0,
    'putnam': 1.1,
    'westchester': 1.15  // Base Westchester, some areas higher
};

// Function to get county from location selection
function getCountyFromLocation(location) {
    if (location.includes('-dutchess')) return 'dutchess';
    if (location.includes('-putnam')) return 'putnam';
    if (location.includes('-westchester')) return 'westchester';
    return 'dutchess';
}

// Function to calculate price
function calculatePrice() {
    const serviceElement = document.getElementById('service');
    const locationElement = document.getElementById('location');
    const homeSizeElement = document.getElementById('homeSize');
    const priceDisplay = document.getElementById('priceDisplay');
    const estimatedPrice = document.getElementById('estimatedPrice');
    const priceAlert = document.getElementById('priceAlert');
    
    if (!serviceElement || !locationElement || !homeSizeElement) return;
    
    const service = serviceElement.value;
    const location = locationElement.value;
    const homeSize = homeSizeElement.value;
    
    if (!service || !location || !homeSize) {
        if (estimatedPrice) estimatedPrice.classList.remove('show');
        if (priceAlert) priceAlert.classList.remove('show');
        return;
    }
    
    // Get base price
    const priceData = basePrices[service]?.[homeSize];
    if (!priceData) return;
    
    // Get county and multiplier
    const county = getCountyFromLocation(location);
    const multiplier = countyMultipliers[county];
    
    // Calculate final price
    let finalPrice;
    if (Array.isArray(priceData)) {
        // Range pricing
        const lowPrice = Math.round(priceData[0] * multiplier);
        const highPrice = Math.round(priceData[1] * multiplier);
        finalPrice = `$${lowPrice}-$${highPrice}`;
    } else {
        // Fixed pricing
        finalPrice = `$${Math.round(priceData * multiplier)}`;
    }
    
    // Display price
    if (priceDisplay) {
        priceDisplay.textContent = finalPrice;
    }
    if (estimatedPrice) {
        estimatedPrice.classList.add('show');
    }
    
    // Show alert for premium areas
    if (priceAlert) {
        if (county === 'putnam') {
            priceAlert.textContent = '💰 Putnam County pricing: Services are 10% higher than Dutchess County base rates.';
            priceAlert.classList.add('show');
        } else if (county === 'westchester') {
            priceAlert.textContent = '💰 Westchester County pricing: Services are 15-35% higher than Dutchess County base rates due to travel distance and local market conditions.';
            priceAlert.classList.add('show');
        } else {
            priceAlert.classList.remove('show');
        }
    }
}

// Attach event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const serviceElement = document.getElementById('service');
    const locationElement = document.getElementById('location');
    const homeSizeElement = document.getElementById('homeSize');
    
    if (serviceElement) serviceElement.addEventListener('change', calculatePrice);
    if (locationElement) locationElement.addEventListener('change', calculatePrice);
    if (homeSizeElement) homeSizeElement.addEventListener('change', calculatePrice);
    
    // Initial calculation if values are pre-filled
    calculatePrice();
});
