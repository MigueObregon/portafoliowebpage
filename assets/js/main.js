(function() {
  "use strict";


window.addEventListener('scroll', toggleScrolled);


function toggleScrolled() {
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  // Solo funciona si el header tiene alguna de estas clases
  if (!selectHeader.classList.contains('scroll-up-sticky') && 
      !selectHeader.classList.contains('sticky-top') && 
      !selectHeader.classList.contains('fixed-top')) return;

  // Si scroll vertical > 100, agrega .scrolled, si no, la quita
  window.scrollY > 100 
    ? selectBody.classList.add('scrolled') 
    : selectBody.classList.remove('scrolled');
}

if (typeof(Storage) !== "undefined") {
    // Get the current visit count from localStorage
    let visitCount = localStorage.getItem("visitCount");

    // If no count exists, initialize to 1, otherwise increment
    if (visitCount === null) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }

    // Store the updated count
    localStorage.setItem("visitCount", visitCount);

    // Display the visit count
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("visit-count").innerText = `You have visited this page ${visitCount} times.`;
    });
} else {
    console.warn("Local Storage is not supported in this browser.");
}



  
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.style.display = "none";

  svg.innerHTML = `
    <defs>
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.011" numOctaves="2" seed="92" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="77" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  `;

  document.body.prepend(svg);


  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }



const heroImages = document.querySelectorAll(".hero-image img");

// Datos por imagen para animación
const imagesData = Array.from(heroImages).map((img, index) => ({
  img,
  depth: 0.5 + index * 0.1,       // Profundidad para parallax simplificado
  angle: Math.random() * 360,     // Rotación inicial aleatoria
  bounceAngle: Math.random() * 360,// Rebote inicial aleatorio
  zOffset: (index - heroImages.length / 2) * 20 // Posición en z
}));

function animateHero() {
  const { innerWidth, innerHeight } = window;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  imagesData.forEach(data => {
    // Rebote vertical suave
    const bounce = Math.sin(data.bounceAngle * 0.06) * 5 * data.depth;

    // Parallax simplificado
    const rotateY = Math.sin(data.angle * 0.02) * 15 * data.depth;
    const rotateX = Math.cos(data.angle * 0.02) * 15 * data.depth;

    // Aplicar transform con translate3d para GPU
    data.img.style.transform = `
      translate3d(0px, ${bounce}px, ${data.zOffset}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    // Incrementar ángulos para animación continua
    data.angle += 0.5 * data.depth;
    data.bounceAngle += 0.5 * data.depth;
  });

  requestAnimationFrame(animateHero); // Loop animación
}

// Iniciar animación
animateHero();




  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
 * Init swiper sliders (UNIFICADO)
 */
function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim()
    );

    // Navigation
    config.navigation = {
      nextEl: ".next",
      prevEl: ".prev1",
    };

    let swiper = new Swiper(swiperElement, config);

    // Botón Play/Pause sobrepuesto
    const playPauseBtn = swiperElement.querySelector(".play-pause");
    if (playPauseBtn) {
      let isPlaying = true;

      // Estado inicial
      playPauseBtn.textContent = "❚❚";          // símbolo Pause
      playPauseBtn.title = "Pausar";    // tooltip inicial


      playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
          swiper.autoplay.stop();
          playPauseBtn.textContent = "❚❚";      // símbolo Play
          playPauseBtn.title = " Reproducir ";         // tooltip cuando está pausado
        } else {
          swiper.autoplay.start();
          playPauseBtn.textContent = "⯈";      // símbolo Pause
          playPauseBtn.title = " Pausar ";       // tooltip cuando se va a pausar
        }
        isPlaying = !isPlaying;
        showButton(); // 🔹 al hacer click también reinicia el temporizador
      });


      
      //Lógica de auto-ocultar estilo YouTube
      let hideTimeout;

      function showButton() {
        playPauseBtn.style.opacity = "1";
        playPauseBtn.style.visibility = "visible";

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          playPauseBtn.style.opacity = "0";
          playPauseBtn.style.visibility = "hidden";
        }, 2000); // se oculta tras s
      }

      // Mostrar al mover mouse o tocar
      swiperElement.addEventListener("mousemove", showButton);
      swiperElement.addEventListener("touchstart", showButton);

      // Mostrar al inicio y arrancar temporizador
      showButton();
    }
  });
}
window.addEventListener("load", initSwiper);








  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

















  













  /**
   * Init isotope layout and filters
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

})();
