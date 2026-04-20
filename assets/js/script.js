document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // keep it scrolled immediately or toggle
            if(window.scrollY <= 10) {
                header.classList.remove('scrolled');
            }
        }
    });

    // 2. Scroll Reveal Animations
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 3. Dynamic Google Reviews Population
    const reviewsData = [
        {
            name: "Sarah Jenkins",
            date: "2 days ago",
            text: "Absolutely the best dental experience I've ever had. The staff is incredibly welcoming, and Dr. Smith was gentle and walked me through my entire procedure. Highly recommended!",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=47"
        },
        {
            name: "Michael Chen",
            date: "1 week ago",
            text: "I used to have terrible anxiety about going to the dentist, but Family Dental Care completely changed that. The clinic is modern, spotless, and the team makes you feel right at home.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=11"
        },
        {
            name: "Emily Rodriguez",
            date: "3 weeks ago",
            text: "Got my teeth whitened here before my wedding. The results are phenomenal! The process was quick, painless, and the pricing was very transparent. Thank you team!",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=5"
        }
    ];

    const reviewsTrack = document.getElementById('reviewsTrack');

    if (reviewsTrack) {
        reviewsData.forEach(review => {
            const starsHTML = '<i class="ph-fill ph-star"></i>'.repeat(review.rating);
            
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card', 'reveal');
            
            reviewCard.innerHTML = `
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.name}" class="reviewer-img">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="stars">${starsHTML} <span style="color:#64748b;font-size:0.8rem;margin-left:5px;">${review.date}</span></div>
                    </div>
                </div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-footer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" class="google-logo-small">
                </div>
            `;
            
            reviewsTrack.appendChild(reviewCard);
        });
        
        // Ensure dynamically added reveals show up if in viewport
        setTimeout(revealOnScroll, 100);
    }
    
    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileMenuBtn && mobileMenu) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                menuIcon.classList.remove('ph-list');
                menuIcon.classList.add('ph-x');
            } else {
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            }
        });

        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            });
        });
    }

    // 5. Form submission and success modal
    const appointmentForm = document.getElementById('appointment-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalDateDisplay = document.getElementById('modal-date-display');
    const modalTimeDisplay = document.getElementById('modal-time-display');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    if (appointmentForm && successModal) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // Get standard YYYY-MM-DD from input
            const selectedDate = dateInput.value; 
            const selectedTime = timeInput ? timeInput.value : '';
            
            if (selectedDate) {
                // Format date nice for display: e.g., "April 20, 2026"
                const dateObj = new Date(selectedDate);
                // Adjust for local timezone issues by adding timezone offset if needed
                // Using UTC since the input type="date" yields "YYYY-MM-DD"
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
                const formattedDate = dateObj.toLocaleDateString(undefined, options);
                
                modalDateDisplay.textContent = formattedDate;
            } else {
                modalDateDisplay.textContent = "the selected date";
            }

            if (selectedTime) {
                modalTimeDisplay.textContent = selectedTime;
            } else {
                modalTimeDisplay.textContent = "the selected time";
            }

            // Show the modal
            successModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // prevent scrolling behind
            
            // Optionally clear form
            appointmentForm.reset();
        });

        // Close on clicking 'Awesome, thanks!'
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close on clicking outside the modal content
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});
