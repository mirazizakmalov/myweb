/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// Wrap everything inside a function to prevent variables from leaking into the global scope
(function() {
  "use strict"; // Enforce better coding practices

  /**
   * Mobile Navigation Toggle (Hamburger Menu)
   * Clicking the menu button (☰) opens/closes the sidebar menu
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show'); // Show/hide sidebar menu
    headerToggleBtn.classList.toggle('bi-list'); // Change icon from ☰ (hamburger) to ✖ (close)
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Close Mobile Menu When Clicking a Navigation Link
   * If the sidebar menu is open and the user clicks a link, we close it.
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Mobile Dropdown Menu
   * If a menu item has a dropdown, clicking it will expand/collapse the submenu.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active'); // Add active class to the parent
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active'); // Show the dropdown menu
      e.stopImmediatePropagation(); // Prevents multiple clicks from triggering this event multiple times
    });
  });

  /**
   * Preloader Animation
   * Removes the preloader once the page has finished loading.
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove(); // Get rid of the preloader once everything loads
    });
  }

  /**
   * Scroll-to-Top Button
   * If the user scrolls down the page, the button appears. Clicking it brings them back to the top.
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  // Scroll to the top smoothly when the button is clicked
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Check scroll position on page load and while scrolling
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animate Elements on Scroll with AOS.js
   * AOS (Animate On Scroll) makes elements fade in as you scroll down.
   */
  function aosInit() {
    AOS.init({
      duration: 600, // How long the animations last
      easing: 'ease-in-out', // Smooth animation
      once: true, // Animation plays once, not every time you scroll
      mirror: false // Prevents animations from running in reverse
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js - Typing Animation in the Hero Section
   * This makes text in the hero section look like it is being typed live.
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');

    new Typed('.typed', {
      strings: typed_strings,  // Words that will be typed out
      loop: true,              // Keep looping the animation
      typeSpeed: 100,          // Speed of typing
      backSpeed: 50,           // Speed of deleting
      backDelay: 2000          // Wait 2 seconds before deleting the text
    });
  }

  /**
   * PureCounter - Animated Number Counting Effect
   * This makes numbers count up smoothly when scrolling to them.
   */
  new PureCounter();

  /**
   * Animate Skill Bars When They Appear on Screen
   * As you scroll down, the progress bars fill up.
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');

  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%', // When 80% of the element is visible, start animation
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * GLightbox - Image Popup Effect
   * Clicking on images opens them in a full-screen lightbox.
   */
  const glightbox = GLightbox({
    selector: '.glightbox' // Applies to elements with this class
  });

  /**
   * Isotope Layout for Filtering Portfolio Items
   * This enables sorting and filtering in the portfolio section.
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    // Clicking a filter updates the displayed projects
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Swiper.js - Image Sliders
   * Initializes sliders for images and testimonials.
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   * Ensures that clicking an internal page link scrolls smoothly to the correct section.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Scrollspy - Highlights the active menu link based on scrolling position.
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
