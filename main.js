// Main JavaScript for DSG Website

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                service: document.getElementById('service').value,
                location: document.getElementById('location').value,
                homeSize: document.getElementById('homeSize').value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                referralSource: document.getElementById('referralSource').value,
                notes: document.getElementById('notes')?.value || '',
                estimatedPrice: document.getElementById('priceDisplay').textContent
            };

            // QuoteIQ integration would go here
            console.log('Quote Request:', formData);
            
            alert('Thank you! Your quote request has been received. We\'ll contact you within 2 hours to confirm your service.');
            
            this.reset();
            const estimatedPrice = document.getElementById('estimatedPrice');
            const priceAlert = document.getElementById('priceAlert');
            if (estimatedPrice) estimatedPrice.classList.remove('show');
            if (priceAlert) priceAlert.classList.remove('show');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
