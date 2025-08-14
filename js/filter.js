// ================================
// GALLERY FILTER FUNCTIONALITY
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and gallery items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'filter-announcement';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only'; // Hidden visually but available to screen readers
    document.body.appendChild(liveRegion);
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class and update ARIA from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            // Add active class and update ARIA to clicked button
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            
            // Get the filter category
            const filterValue = button.getAttribute('data-filter');
            
            // Track visible items count
            let visibleCount = 0;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    // Show all items
                    item.classList.remove('hidden');
                    item.setAttribute('aria-hidden', 'false');
                    visibleCount++;
                } else {
                    // Show/hide based on category
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        item.setAttribute('aria-hidden', 'false');
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                        item.setAttribute('aria-hidden', 'true');
                    }
                }
            });
            
            // Announce to screen readers
            const announcement = filterValue === 'all' 
                ? `Showing all ${galleryItems.length} illustrations` 
                : `Showing ${visibleCount} ${filterValue} illustration${visibleCount !== 1 ? 's' : ''}`;
            liveRegion.textContent = announcement;
            
            // Update URL without page reload (optional)
            if (filterValue !== 'all') {
                const newUrl = `${window.location.pathname}?filter=${filterValue}`;
                window.history.replaceState({ filter: filterValue }, '', newUrl);
            } else {
                window.history.replaceState({}, '', window.location.pathname);
            }
        });
    });
    
    // Add keyboard support for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            // Arrow key navigation between filter buttons
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentIndex = Array.from(filterButtons).indexOf(button);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % filterButtons.length;
                } else {
                    nextIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
                }
                
                filterButtons[nextIndex].focus();
            }
        });
    });
    
    // Optional: Smooth scroll for anchor links (with accessibility check)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#0') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Check for reduced motion preference
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    
                    if (prefersReducedMotion) {
                        target.scrollIntoView({ behavior: 'auto', block: 'start' });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    
                    // Move focus to target for keyboard users
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            }
        });
    });
    
    // Optional: Add animation when items appear (respecting reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all gallery items
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }
});

// Optional: Function to get URL parameters (for future direct linking)
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if there's a filter in the URL on load
window.addEventListener('load', function() {
    const filterParam = getUrlParameter('filter');
    if (filterParam) {
        const targetButton = document.querySelector(`[data-filter="${filterParam}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
});