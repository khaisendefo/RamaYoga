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

    breakpoints: {
      1200: {
        perPage: 3,
      },
      768: {
        perPage: 2, 
      },
      500: {
        perPage: 1,
      }
    }
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

const stepCards = document.querySelectorAll('.step__card');
stepCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (card.classList.contains('active')) {
      card.classList.remove('active');
    } else {
      stepCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    }
  });
});


const toggleModal = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal');
    const body = document.body; 
    const modalOpenButtons = document.querySelectorAll('.modal-open');
    const modalCloseButton = document.querySelector('.modal__close');

    function openModal() {
      modal.classList.add('active');
      body.classList.add('body-no-scroll'); 
    }

    function closeModal() {
      modal.classList.remove('active');
      body.classList.remove('body-no-scroll'); 
    }

    modalOpenButtons.forEach(button => {
      button.addEventListener('click', openModal);
    });

    modalCloseButton.addEventListener('click', closeModal);

    modal.querySelector('.modal__overlay').addEventListener('click', (event) => {
      const modalWindow = modal.querySelector('.modal__window');
      if (!modalWindow.contains(event.target)) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  });
}
toggleModal();

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7(999) 999-99-99');
im.mask(inputs);

var forms = document.querySelectorAll('.form');
forms.forEach(function(form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка отправки данных: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      alert("Данные успешно отправлены!"); // Уведомление об успешной отправке
      console.log(data);
      this.reset();
    })
    .catch(error => {
      alert("Ошибка отправки данных: " + error.message);
      console.error(error);
    });
  });
});
