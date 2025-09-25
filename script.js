// --- CÓDIGO DO SLIDER DE SERVIÇOS ---
    document.addEventListener('DOMContentLoaded', function() {

    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) {
        console.error('O slider-container não foi encontrado!');
        return;
    }

    const track = sliderContainer.querySelector('.servicos-track');
    const wrapper = sliderContainer.querySelector('.servicos-wrapper');
    const items = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('sliderDots');

    if (items.length === 0) return;

    // Ajustado para 3 segundos, como solicitado
    const autoPlayDelay = 3000;
    let currentIndex = 0;
    let autoPlayInterval;

    // --- Cria os pontinhos ---
    dotsNav.innerHTML = '';
    items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            resetAutoPlay();
        });
        dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    // --- Função que move o slider e atualiza os controlos ---
    const updateSlider = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap, 10) || 0;
        const scrollAmount = currentIndex * (itemWidth + gap);
        
        wrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    // --- Ações dos botões de seta ---
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
        resetAutoPlay();
    });
    
    // --- Lógica do Auto-play ---
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => nextButton.click(), autoPlayDelay);
    };
    const stopAutoPlay = () => clearInterval(autoPlayInterval);
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // --- Inicia o slider ---
    updateSlider();
    startAutoPlay();
});






// --- CÓDIGO DO MODAL DE CONTATO ---
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalNavBtn = document.getElementById('openModalNavBtn');
    if (contactModal && closeModalBtn && openModalNavBtn) {
        const openModal = () => contactModal.classList.add('visible');
        const closeModal = () => contactModal.classList.remove('visible');

        openModalNavBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) closeModal();
        });

        // Opcional: Abrir automaticamente após alguns segundos
        // setTimeout(openModal, 5000); 
    }

    // --- CÓDIGO PARA OS BOTÕES DE SELEÇÃO NO FORMULÁRIO ---
    const radioGroup = document.querySelector('.modal-content .radio-group');
    if (radioGroup) {
        const radioButtons = radioGroup.querySelectorAll('.radio-button');
        const hiddenInput = document.getElementById('preferencia_contato');
        radioButtons.forEach(button => {
            button.addEventListener('click', () => {
                radioButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                if (hiddenInput) {
                    hiddenInput.value = button.getAttribute('data-value');
                }
            });
        });
    }

    // --- CÓDIGO DO BOTÃO FLUTUANTE DE WHATSAPP ---
    const floatBtn = document.querySelector('.whatsapp-float-btn');
    if (floatBtn) {
        const chatBox = document.querySelector('.whatsapp-chat-box');
        const closeBtn = document.querySelector('.chat-close-btn');
        const sendBtn = document.querySelector('.chat-send-btn');
        const messageBox = document.getElementById('whatsapp-message');

        floatBtn.addEventListener('click', () => chatBox.classList.toggle('visible'));
        closeBtn.addEventListener('click', () => chatBox.classList.remove('visible'));
        sendBtn.addEventListener('click', () => {
            const numero = '5585987411585';
            const mensagem = encodeURIComponent(messageBox.value);
            const url = `https://wa.me/${numero}?text=${mensagem}`;
            window.open(url, '_blank');
        });
    }
