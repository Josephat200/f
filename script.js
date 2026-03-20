const floatingArrow = document.querySelector('.hero-arrow-main');
const backgroundPhoto = document.querySelector('.background-photo');
const prevSlide = document.querySelector('#prevSlide');
const nextSlide = document.querySelector('#nextSlide');

const architectureImages = [
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?auto=format&fit=crop&w=2200&q=80'
];

let activeImageIndex = 0;

const preloadImages = () => {
  architectureImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const showImage = (index) => {
  if (!backgroundPhoto) {
    return;
  }

  activeImageIndex = (index + architectureImages.length) % architectureImages.length;
  backgroundPhoto.classList.add('is-changing');

  window.setTimeout(() => {
    backgroundPhoto.style.backgroundImage = `url("${architectureImages[activeImageIndex]}")`;
    backgroundPhoto.classList.remove('is-changing');
  }, 120);
};

if (backgroundPhoto) {
  backgroundPhoto.style.backgroundImage = `url("${architectureImages[0]}")`;
  preloadImages();
}

if (prevSlide) {
  prevSlide.addEventListener('click', () => {
    showImage(activeImageIndex - 1);
  });
}

if (nextSlide) {
  nextSlide.addEventListener('click', () => {
    showImage(activeImageIndex + 1);
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    showImage(activeImageIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    showImage(activeImageIndex + 1);
  }
});

if (floatingArrow && window.matchMedia('(pointer: fine)').matches) {
  const offsetX = 14;
  const offsetY = 14;

  const updatePosition = (event) => {
    floatingArrow.style.left = `${event.clientX + offsetX}px`;
    floatingArrow.style.top = `${event.clientY + offsetY}px`;
    floatingArrow.style.opacity = '1';
  };

  window.addEventListener('pointermove', updatePosition);

  window.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) {
      floatingArrow.style.opacity = '0';
    }
  });

  window.addEventListener('pointerover', () => {
    floatingArrow.style.opacity = '1';
  });
}
