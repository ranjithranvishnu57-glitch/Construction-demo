/**
 * BUILDNEXT CONSTRUCTION — PREMIUM LUXURY ARCHITECTURE & CONSTRUCTION
 * Vanilla JavaScript Module
 * Production-ready, fully accessible, zero dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. DATA: PROJECT PORTFOLIO REPOSITORY FOR MODAL
  // ==========================================================================
  const PROJECTS_DATA = {
    1: {
      title: 'The Glass Pavilion Residence',
      category: 'Residential Construction',
      year: '2024',
      location: 'Aspen, Colorado',
      area: '12,400 sq.ft',
      duration: '18 Months',
      architecture: 'Contemporary Monolithic Glass & Steel',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
      lead: 'A private mountain retreat featuring cantilevered structural steel volumes, heated monolithic limestone terraces, and triple-glazed curtain walls engineered for extreme alpine environments.',
      overview: 'Perched on an alpine ridge in Aspen, The Glass Pavilion represents the pinnacle of structural engineering and minimalist architecture. BuildNext coordinated with international structural consultants to execute seismic-isolated steel foundations and floor-to-ceiling structural glass panels weighing upwards of 1,800 lbs each.',
      highlights: [
        'Geothermal heating system achieving Net-Zero operational certification',
        'Floor-to-ceiling Swiss-engineered minimalist sliding glass assemblies',
        'Monolithic imported Valser quartzite stone fireplaces and terraces',
        'Custom subterranean vehicle gallery with integrated climate regulation'
      ]
    },
    2: {
      title: 'Metropolis Horizon Tower',
      category: 'Commercial Complex',
      year: '2023',
      location: 'Austin, Texas',
      area: '240,000 sq.ft',
      duration: '26 Months',
      architecture: 'High-Performance Double-Skin Glass & Steel',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1400&q=85',
      lead: 'A 28-story corporate headquarters featuring next-generation kinetic facade shading, smart building automation, and LEED Platinum sustainability standards.',
      overview: 'Commissioned for a leading technology collective in downtown Austin, this modern commercial tower required fast-track phased delivery while minimizing urban street disruption. BuildNext utilized 4D BIM schedule modeling to deliver structural steel erection four weeks ahead of baseline.',
      highlights: [
        'LEED Platinum certification with 42% energy use reduction',
        'Acoustically tuned double-skin ventilated glass facade',
        'Integrated sky gardens and biophilic employee collaboration hubs',
        'Seismic vibration-dampening tuned mass damper system'
      ]
    },
    3: {
      title: 'The Bel Air Heritage Villa',
      category: 'Villa Renovation',
      year: '2024',
      location: 'Bel Air, California',
      area: '9,800 sq.ft',
      duration: '14 Months',
      architecture: 'Modern Mediterranean & Structural Preservation',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
      lead: 'An exquisite structural modernization of a 1930s estate, integrating concealed seismic steel portals, handmade Venetian plaster, and museum-grade gallery lighting.',
      overview: 'Preserving historical legacy while incorporating modern earthquake safety codes required surgical engineering. BuildNext discreetly inserted subterranean moment frames and completely rebuilt the exterior thermal building envelope without altering the original facade lines.',
      highlights: [
        'Concealed carbon-fiber seismic strengthening across load-bearing masonry',
        'Artisanal hand-troweled Venetian plaster by master Italian finishers',
        'Thermal-break custom architectural bronze windows and doors',
        'Subterranean 1,200-bottle temperature-controlled wine vault'
      ]
    },
    4: {
      title: 'Apex Global Tech Headquarters',
      category: 'Interior Design & Finishing',
      year: '2023',
      location: 'Seattle, Washington',
      area: '65,000 sq.ft',
      duration: '10 Months',
      architecture: 'Mass Timber Architectural Interiors',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
      lead: 'Sophisticated corporate interior featuring custom fluted white oak millwork, precision acoustic baffle systems, and seamless technological integration.',
      overview: 'Designed to inspire hybrid creative teams, this corporate interior project transforms two expansive warehouse floors into an editorial work sanctuary. Every junction between raw industrial concrete, mass timber beams, and black architectural steel was detailed to millimeter tolerances.',
      highlights: [
        'FSC-certified Pacific Northwest white oak millwork and wall paneling',
        'Sound-absorbing micro-perforated acoustic ceiling installations',
        'Custom circadian rhythm lighting system syncing with natural daylight',
        'Biophilic interior living walls fed by closed-loop hydroponics'
      ]
    }
  };


  // ==========================================================================
  // 2. HEADER NAVIGATION & STICKY GLASS EFFECT
  // ==========================================================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Highlighting
    let currentSectionId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  // ==========================================================================
  // 2.5. HERO SECTION SMOOTH PARALLAX & CURSOR MICRO-INTERACTION
  // ==========================================================================
  const heroSection = document.getElementById('hero');
  const heroBg = document.getElementById('heroBgImage');
  const heroContent = document.querySelector('.hero-content');
  const heroFloatingCard = document.querySelector('.hero-floating-card');

  if (heroSection && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = xNorm;
      targetY = yNorm;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    // Smooth render loop with linear interpolation
    const renderHeroParallax = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      if (scrollY <= heroHeight + 50) {
        const scrollFactor = scrollY / heroHeight;

        if (heroBg) {
          heroBg.style.transform = `scale(${1.08 + scrollFactor * 0.05}) translate3d(${mouseX * -14}px, ${scrollY * 0.3 + mouseY * -10}px, 0)`;
        }
        if (heroContent) {
          heroContent.style.transform = `translate3d(${mouseX * 8}px, ${scrollY * 0.16}px, 0)`;
          heroContent.style.opacity = Math.max(1 - scrollFactor * 1.35, 0);
        }
        if (heroFloatingCard) {
          heroFloatingCard.style.transform = `translate3d(${mouseX * 20}px, ${scrollY * 0.12 + mouseY * 14}px, 0)`;
        }
      }

      requestAnimationFrame(renderHeroParallax);
    };

    requestAnimationFrame(renderHeroParallax);
  }


  // ==========================================================================
  // 3. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  const toggleMobileNav = (forceState) => {
    const isOpening = typeof forceState === 'boolean' ? forceState : !mobileNav.classList.contains('open');
    if (isOpening) {
      mobileNav.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => toggleMobileNav());

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileNav(false);
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMobileNav(false);
      }
    });

    // Close when clicking outside drawer
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        toggleMobileNav(false);
      }
    });
  }


  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => {
              el.classList.add('is-revealed');
            }, parseInt(delay, 10));
          } else {
            el.classList.add('is-revealed');
          }
          observer.unobserve(el);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Graceful fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }


  // ==========================================================================
  // 5. IMPACT & STATISTICS ANIMATED COUNTER
  // ==========================================================================
  const counters = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };

  const statsSection = document.getElementById('impact');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }


  // ==========================================================================
  // 6. PROCESS TIMELINE PROGRESSION
  // ==========================================================================
  const processSection = document.getElementById('process');
  const progressBar = document.getElementById('timelineBarProgress');
  const stepItems = document.querySelectorAll('.process-step-item');

  const updateProcessTimeline = () => {
    if (!processSection || !progressBar) return;
    const rect = processSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if section is inside view
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const totalDist = rect.height + windowHeight;
      const currentProgress = (windowHeight - rect.top) / totalDist;
      const percent = Math.min(Math.max(currentProgress * 100, 0), 100);
      progressBar.style.width = `${percent}%`;

      // Highlight step cards
      stepItems.forEach((step, index) => {
        const stepThreshold = (index + 0.5) / stepItems.length;
        if (currentProgress >= stepThreshold) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateProcessTimeline, { passive: true });


  // ==========================================================================
  // 7. TESTIMONIALS CAROUSEL (ACCESSIBLE, TOUCH-FRIENDLY & KEYBOARD-ENABLED)
  // ==========================================================================
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const counterDisplay = document.getElementById('carouselCounter');

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  const updateCarousel = (index) => {
    if (!track) return;
    currentSlideIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Update Dots
    dots.forEach((dot, idx) => {
      const isActive = idx === currentSlideIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Slides aria
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlideIndex);
    });

    // Update counter
    if (counterDisplay) {
      counterDisplay.textContent = `0${currentSlideIndex + 1} / 0${totalSlides}`;
    }
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentSlideIndex - 1));
    nextBtn.addEventListener('click', () => updateCarousel(currentSlideIndex + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateCarousel(targetIndex);
    });
  });

  // Touch Swipe Support for Testimonials
  let touchStartX = 0;
  let touchEndX = 0;

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateCarousel(currentSlideIndex + 1); // Next
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      updateCarousel(currentSlideIndex - 1); // Prev
    }
  };

  // Keyboard navigation when focusing carousel
  const carouselWrapper = document.getElementById('testimonialCarousel');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        updateCarousel(currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateCarousel(currentSlideIndex + 1);
      }
    });
  }


  // ==========================================================================
  // 8. PROJECT DETAIL MODAL (ACCESSIBLE, DETAILED, KEYBOARD-ENABLED)
  // ==========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const projectItems = document.querySelectorAll('.project-item');
  let lastActiveElement = null;

  const openProjectModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data || !projectModal || !modalBodyContent) return;

    lastActiveElement = document.activeElement;

    // Populate modal body
    modalBodyContent.innerHTML = `
      <div class="modal-hero-img-wrapper">
        <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
      </div>
      <div class="modal-content-inner">
        <div class="modal-eyebrow">
          <span>${data.category}</span>
          <span>Completed ${data.year}</span>
        </div>
        <h2 class="modal-title" id="modalProjectTitle">${data.title}</h2>
        
        <div class="modal-meta-grid">
          <div class="modal-meta-item">
            <span class="modal-meta-label">Location</span>
            <span class="modal-meta-value">${data.location}</span>
          </div>
          <div class="modal-meta-item">
            <span class="modal-meta-label">Gross Area</span>
            <span class="modal-meta-value">${data.area}</span>
          </div>
          <div class="modal-meta-item">
            <span class="modal-meta-label">Duration</span>
            <span class="modal-meta-value">${data.duration}</span>
          </div>
          <div class="modal-meta-item">
            <span class="modal-meta-label">Architecture</span>
            <span class="modal-meta-value">${data.architecture}</span>
          </div>
        </div>

        <p class="section-lead" style="margin-bottom: 1rem;">${data.lead}</p>
        <p class="modal-desc-text">${data.overview}</p>

        <h3 class="modal-desc-heading">Key Engineering Highlights</h3>
        <ul class="modal-highlights-list">
          ${data.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <div class="modal-actions">
          <a href="#contact" class="btn btn-primary modal-inquire-btn" data-service="${data.category}">
            <span>Inquire About A Similar Project</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <button type="button" class="btn btn-outline-light" id="modalDismissBtn" style="color: var(--color-navy); border-color: var(--color-warm-border);">
            Close Preview
          </button>
        </div>
      </div>
    `;

    // Bind event for inquiry button inside modal
    const modalInquireBtn = modalBodyContent.querySelector('.modal-inquire-btn');
    if (modalInquireBtn) {
      modalInquireBtn.addEventListener('click', (e) => {
        closeProjectModal();
        const selectedService = modalInquireBtn.getAttribute('data-service');
        preSelectService(selectedService);
      });
    }

    const modalDismissBtn = modalBodyContent.querySelector('#modalDismissBtn');
    if (modalDismissBtn) {
      modalDismissBtn.addEventListener('click', closeProjectModal);
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const pid = item.getAttribute('data-project-id');
      openProjectModal(pid);
    });

    // Keyboard enter support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View project details for ${item.querySelector('.project-title')?.textContent}`);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pid = item.getAttribute('data-project-id');
        openProjectModal(pid);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }


  // ==========================================================================
  // 9. SERVICE LINK SHORTCUTS TO FORM
  // ==========================================================================
  const serviceDropdown = document.getElementById('projectService');
  const serviceLinks = document.querySelectorAll('.service-link');

  const preSelectService = (serviceName) => {
    if (!serviceDropdown || !serviceName) return;
    for (let i = 0; i < serviceDropdown.options.length; i++) {
      if (serviceDropdown.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) || 
          serviceName.toLowerCase().includes(serviceDropdown.options[i].value.toLowerCase())) {
        serviceDropdown.selectedIndex = i;
        break;
      }
    }
  };

  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetService = link.getAttribute('data-service');
      preSelectService(targetService);
    });
  });


  // ==========================================================================
  // 10. CLIENT-SIDE VALIDATION & DEMO FORM SUBMISSION
  // ==========================================================================
  const form = document.getElementById('consultationForm');
  const nameInput = document.getElementById('clientName');
  const emailInput = document.getElementById('clientEmail');
  const serviceInput = document.getElementById('projectService');
  const messageInput = document.getElementById('projectMessage');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const setFieldError = (input, errorSpanId, message) => {
    input.classList.add('is-invalid');
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = message;
  };

  const clearFieldError = (input, errorSpanId) => {
    input.classList.remove('is-invalid');
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) errorSpan.textContent = '';
  };

  // Real-time input cleaning
  if (nameInput) {
    nameInput.addEventListener('input', () => clearFieldError(nameInput, 'nameError'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, 'emailError'));
  }
  if (serviceInput) {
    serviceInput.addEventListener('change', () => clearFieldError(serviceInput, 'serviceError'));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => clearFieldError(messageInput, 'messageError'));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'nameError', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'nameError');
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, 'emailError', 'Please enter a valid business or personal email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'emailError');
      }

      // Validate Service
      if (!serviceInput.value) {
        setFieldError(serviceInput, 'serviceError', 'Please select a service category for your project inquiry.');
        isValid = false;
      } else {
        clearFieldError(serviceInput, 'serviceError');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'messageError', 'Please provide a brief summary of your project (minimum 10 characters).');
        isValid = false;
      } else {
        clearFieldError(messageInput, 'messageError');
      }

      if (!isValid) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback-banner error';
          formFeedback.textContent = 'Please correct the highlighted fields before submitting.';
        }
        return;
      }

      // Simulate submission with button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Processing Consultation Request...</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#101C2C"></path>
        </svg>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const clientName = nameInput.value.trim();
        const selectedService = serviceInput.options[serviceInput.selectedIndex].text;

        // Honest demonstration success feedback
        if (formFeedback) {
          formFeedback.className = 'form-feedback-banner success';
          formFeedback.innerHTML = `
            <strong>Inquiry Demo Received!</strong><br>
            Thank you, <strong>${clientName}</strong>. Your consultation request for <em>${selectedService}</em> has been simulated successfully.<br>
            <span style="font-size: 0.8rem; opacity: 0.85;">* Production Note: Connect this form handler to your email service (e.g., Formspree, Resend) or backend API endpoint.</span>
          `;
        }

        form.reset();
      }, 1000);
    });
  }


  // ==========================================================================
  // 11. BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ==========================================================================
  // 12. AUTOMATIC COPYRIGHT YEAR
  // ==========================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

// Spinner keyframe for loading button
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);
