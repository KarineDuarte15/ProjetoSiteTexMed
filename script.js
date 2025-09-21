// DOCUMENTAÇÃO: Script para Navegação Suave
// Este script garante que, ao clicar num link do menu, a página role suavemente
// até à seção correspondente, em vez de saltar instantaneamente.

document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona todos os links de navegação que apontam para uma âncora (#)
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    // 2. Adiciona um "ouvinte" de evento de clique a cada um desses links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // a. Previne o comportamento padrão do link (o salto brusco)
            event.preventDefault();

            // b. Pega o ID da seção alvo (ex: '#sobre') do atributo href do link
            const targetId = this.getAttribute('href');

            // c. Encontra o elemento da seção no documento HTML
            const targetSection = document.querySelector(targetId);

            // d. Se a seção existir, rola a página suavemente até ela
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Define a animação como suave
                    block: 'start'      // Alinha o topo da seção com o topo da janela de visualização
                });
            }
        });
    });
});