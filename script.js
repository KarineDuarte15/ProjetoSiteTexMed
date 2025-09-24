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

// --- CÓDIGO DO MODAL DE CONTATO (QUE APARECE APÓS 5 SEGUNDOS) ---
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalNavBtn = document.getElementById('openModalNavBtn');

    // Se os elementos do modal não existirem nesta página, não faz nada
    if (!contactModal || !closeModalBtn || !openModalNavBtn) {
        return;
    }

    // Função para mostrar o modal
    const openModal = () => {
        contactModal.classList.add('visible');
    };

    // Função para esconder o modal
    const closeModal = () => {
        contactModal.classList.remove('visible');
    };

    // Mostra o modal 5 segundos depois que a página carregar
    setTimeout(openModal, 5000); // 5000 milissegundos = 5 segundos

    // Fecha o modal ao clicar no botão "X"
    closeModalBtn.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora dele (no fundo escuro)
    contactModal.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            closeModal();
        }
    });
});
const radioGroup = document.querySelector('.modal-content .radio-group');
if (radioGroup) {
    const radioButtons = radioGroup.querySelectorAll('.radio-button');
    const hiddenInput = document.getElementById('preferencia_contato');

    radioButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            radioButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            button.classList.add('active');
            // Atualiza o valor do campo escondido que será enviado com o formulário
            hiddenInput.value = button.getAttribute('data-value');
        });
    });
}
// --- CÓDIGO DO BOTÃO FLUTUANTE DE WHATSAPP ---
document.addEventListener('DOMContentLoaded', function() {
    const floatBtn = document.querySelector('.whatsapp-float-btn');
    const chatBox = document.querySelector('.whatsapp-chat-box');
    const closeBtn = document.querySelector('.chat-close-btn');
    const sendBtn = document.querySelector('.chat-send-btn');
    const messageBox = document.getElementById('whatsapp-message');

    if (floatBtn) {
        floatBtn.addEventListener('click', () => {
            chatBox.classList.toggle('visible');
        });

        closeBtn.addEventListener('click', () => {
            chatBox.classList.remove('visible');
        });

        sendBtn.addEventListener('click', () => {
            const numero = '5585987411585'; 
            const mensagem = encodeURIComponent(messageBox.value);
            const url = `https://wa.me/${numero}?text=${mensagem}`;
            window.open(url, '_blank');
        });
    }
});
//--- CÓDIGO DO FORMULÁRIO DE CONTATO (QUE USA AJAX PARA ENVIAR OS DADOS) ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', contactForm.action, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('Formulário enviado com sucesso!');
                contactForm.reset();
            } else {
                alert('Ocorreu um erro ao enviar o formulário.');
            }
        };
        xhr.send(formData);
    });
});