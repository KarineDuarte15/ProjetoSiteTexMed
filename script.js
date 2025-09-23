
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return; // Se o slider não existir, não faz nada

    const track = sliderContainer.querySelector('.servicos-track');
    const items = Array.from(track.children);
    const dotsNav = document.getElementById('sliderDots');
    const autoPlayDelay = 10000; // Tempo em milissegundos (10000 = 10 segundos)
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

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const scrollLeft = track.parentElement.scrollLeft;
            let currentIndex = Math.round(scrollLeft / (itemWidth + gap));
            
            // Avança para o próximo slide ou volta ao primeiro se estiver no final
            const nextIndex = (currentIndex + 1) % items.length;
            moveToSlide(nextIndex);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            startAutoPlay(); // Opcional: se quiser que o auto-play continue após o clique
        });
    });

    // Pausa o auto-play quando o rato está sobre o slider
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    // Retoma o auto-play quando o rato sai do slider
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Inicia o auto-play quando a página carrega
    startAutoPlay();
});