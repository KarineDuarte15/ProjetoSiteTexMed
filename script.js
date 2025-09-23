// --- CÓDIGO DO SLIDER (COM SETAS, PONTINHOS E AUTO-PLAY) ---
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const track = sliderContainer.querySelector('.servicos-track');
    const items = Array.from(track.children);
    const dotsNav = document.getElementById('sliderDots');
    
    // Adicionamos os botões de seta
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');

    const autoPlayDelay = 5000;
    let autoPlayInterval;

    items.forEach((item, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const moveToSlide = (targetIndex) => {
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        track.parentElement.scrollLeft = targetIndex * (itemWidth + gap);
    };
    
    const updateDots = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const scrollLeft = track.parentElement.scrollLeft;
        const currentIndex = Math.round(scrollLeft / (itemWidth + gap));
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };
    track.parentElement.addEventListener('scroll', updateDots);

    // --- LÓGICA DO AUTO-PLAY E INTERAÇÕES ---
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const scrollLeft = track.parentElement.scrollLeft;
            let currentIndex = Math.round(scrollLeft / (itemWidth + gap));
            const nextIndex = (currentIndex + 1) % items.length;
            moveToSlide(nextIndex);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => clearInterval(autoPlayInterval);
    
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Adicionamos a lógica para os cliques nas setas
    nextButton.addEventListener('click', () => {
        track.parentElement.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        track.parentElement.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
        resetAutoPlay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            resetAutoPlay();
        });
    });

    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
});