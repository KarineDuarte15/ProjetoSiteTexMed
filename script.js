document.addEventListener('DOMContentLoaded', function() {

    // --- CÓDIGO DO MENU HAMBÚRGUER (PARA MOBILE) ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navList = document.getElementById('nav-list');
    if (hamburgerButton && navList) {
        hamburgerButton.addEventListener('click', () => {
            navList.classList.toggle('nav-active');
        });
    }

    // --- CÓDIGO DO SLIDER COM LOOP INFINITO ---
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const track = sliderContainer.querySelector('.servicos-track');
        let items = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('sliderDots');

        if (items.length > 3) { // O loop só faz sentido se houver mais itens do que o visível
            const itemsToClone = 3; // Número de itens visíveis
            
            // 1. Clonar itens para criar o efeito infinito
            // Clona os últimos itens e coloca-os no início
            for (let i = 0; i < itemsToClone; i++) {
                const clone = items[items.length - 1 - i].cloneNode(true);
                track.insertBefore(clone, items[0]);
            }
            // Clona os primeiros itens e coloca-os no final
            for (let i = 0; i < itemsToClone; i++) {
                const clone = items[i].cloneNode(true);
                track.appendChild(clone);
            }

            let currentIndex = itemsToClone; // Começa nos primeiros itens reais
            
            const updateSliderPosition = (withTransition = true) => {
                const itemWidth = items[0].getBoundingClientRect().width;
                const gap = parseInt(window.getComputedStyle(track).gap, 10) || 0;
                const moveAmount = currentIndex * (itemWidth + gap);

                if (!withTransition) {
                    track.style.transition = 'none'; // Desliga a animação para o "salto"
                }
                
                track.style.transform = `translateX(-${moveAmount}px)`;

                if (!withTransition) {
                    // Força o navegador a aplicar o estilo e depois liga a transição de volta
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }
            };
            
            // Posiciona o slider no início (sem animação)
            updateSliderPosition(false);


            // Lógica para verificar e "saltar" quando chega aos clones
            track.addEventListener('transitionend', () => {
                if (currentIndex >= items.length + itemsToClone) {
                    currentIndex = itemsToClone;
                    updateSliderPosition(false);
                }
                if (currentIndex <= itemsToClone - 1) {
                    currentIndex = items.length + itemsToClone - 1;
                    updateSliderPosition(false);
                }
            });

            // Ações dos botões
            nextButton.addEventListener('click', () => {
                currentIndex++;
                updateSliderPosition();
            });

            prevButton.addEventListener('click', () => {
                currentIndex--;
                updateSliderPosition();
            });

            // Os pontinhos continuam a funcionar, mas agora apenas para os itens originais
            dotsNav.innerHTML = '';
            items.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    currentIndex = index + itemsToClone;
                    updateSliderPosition();
                });
                dotsNav.appendChild(dot);
            });
            const dots = Array.from(dotsNav.children);

            // Função para atualizar os pontinhos
            const updateDots = () => {
                const realIndex = (currentIndex - itemsToClone + items.length) % items.length;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === realIndex);
                });
            };
            
            // Atualiza os pontinhos sempre que a transição acaba
            track.addEventListener('transitionend', updateDots);
            // E também no início
            updateDots();
        }
    }

    // --- CÓDIGO DO WIDGET DE WHATSAPP ---
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