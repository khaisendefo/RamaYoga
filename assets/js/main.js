const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__nav-link');
    const body = document.body;

    function closeNav() {
      toggleButton.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('no-scroll');
    }

    toggleButton.addEventListener('click', function () {
      const isActive = toggleButton.classList.toggle('active');
      nav.classList.toggle('active');
      if (isActive) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    });

    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        closeNav();
      }
    });

    navLinks.forEach(function(navLink) {
      navLink.addEventListener('click', function() {
        closeNav();
      });
    });
  });
}
toggleMenu();


const splide = new Splide('.categories__slider', {
    perPage: 4, 
    perMove: 1,
    pagination: false,
    arrows: false,
    gap: '24px',
  });

  splide.mount();

  const prevButton = document.querySelector('.categories__slider-arrow--prev');
  const nextButton = document.querySelector('.categories__slider-arrow--next');

  prevButton.addEventListener('click', () => splide.go('<'));
  nextButton.addEventListener('click', () => splide.go('>'));

  updateArrowState();

  splide.on('move', updateArrowState);
  splide.on('updated', updateArrowState); 

  function updateArrowState() {
    if (splide.index === 0) {
      prevButton.classList.add('categories__slider-arrow--is-disabled');
    } else {
      prevButton.classList.remove('categories__slider-arrow--is-disabled');
    }

    const lastSlideIndex = splide.Components.Controller.getEnd();

    if (splide.index === lastSlideIndex) {
      nextButton.classList.add('categories__slider-arrow--is-disabled');
    } else {
      nextButton.classList.remove('categories__slider-arrow--is-disabled');
    }
  }
