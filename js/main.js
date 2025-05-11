// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Language toggle function
function toggleLanguage() {
    // Add your language toggle logic here
    alert('Switching language to English');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// // Stats animation
document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function checkStats() {
        statItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight && itemBottom > 0) {
                item.classList.add('visible');
                
                // Animate numbers
                statNumbers.forEach(number => {
                    if (number.classList.contains('visible')) {
                        const target = parseInt(number.getAttribute('data-target'));
                        let current = 0;
                        
                        const updateNumber = () => {
                            const increment = target / 100;
                            current += increment;
                            number.textContent = Math.round(current);
                            
                            if (current < target) {
                                requestAnimationFrame(updateNumber);
                            }
                        };
                        
                        updateNumber();
                    }
                });
            }
        });
    }

    // Initial check
    checkStats();

    // Check on scroll
    window.addEventListener('scroll', checkStats);
});



// Auto-scroll for about cards slider
// Auto-scroll for about cards slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.about-cards-slider');
    if (!slider) return;
    
    // Add extra space at the end for smooth scrolling
    const scrollContainer = slider.parentElement;
    scrollContainer.style.overflow = 'hidden';
    slider.style.paddingRight = '50%';
    
    let scrollAmount = 0;
    let scrollSpeed = 1; // Changed from const to let
    let isPaused = false;
    let animationFrameId;
    
    function autoScroll() {
        if (isPaused) return;
        
        // Calculate maximum scroll
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        // Change direction when reaching the end
        if (scrollAmount >= maxScroll) {
            scrollAmount = maxScroll;
            scrollSpeed = -Math.abs(scrollSpeed);
        } else if (scrollAmount <= 0) {
            scrollAmount = 0;
            scrollSpeed = Math.abs(scrollSpeed);
        }
        
        // Apply scrolling
        scrollAmount += scrollSpeed;
        slider.scrollLeft = scrollAmount;
        
        // Request next animation frame
        animationFrameId = requestAnimationFrame(autoScroll);
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
    });
    
    // Resume on mouse leave
    slider.addEventListener('mouseleave', () => {
        isPaused = false;
        animationFrameId = requestAnimationFrame(autoScroll);
    });
    
    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);
    
    // Clean up animation frame on unmount
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
});


particlesJS.load('particles-js', 'js/particlesjs-config.json', function() {
  console.log('particles.js loaded - callback');
});

// --- زر العودة للأعلى مع دائرة تقدم ديناميكية ---

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('scrollToTopBtn');
  const circle = document.querySelector('.progress-ring__circle');
  if (!btn || !circle) return; // أمان

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = offset;
  }

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
    setProgress(scrollPercent);
  });

  btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  setProgress(0);
});