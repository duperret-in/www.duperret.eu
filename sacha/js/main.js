document.addEventListener("DOMContentLoaded", function() {
  fetch('data/experiences.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.swiper-wrapper');
      container.innerHTML = '';

      data.forEach(experience => {
        const card = document.createElement('div');
        card.classList.add('swiper-slide', 'experience-card');

        card.innerHTML = `
          <img src="${experience.image}" alt="${experience.alt}" loading="lazy" />
          <div class="copyright">© Gautier Dufau</div>
          <h3>${experience.title}</h3>
          <p>${experience.description}</p>
          <a href="${experience.link}" target="_blank" class="btn-link">${experience.linkText}</a>
        `;

        container.appendChild(card);
      });

      initializeCarousel();
    });
});

function initializeCarousel() {
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
}
