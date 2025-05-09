/**
 * Instagram Clone - Main JavaScript
 * @author Wesley de Albuquerque Filgueiras
 * @version 1.0.0
 */

// ===== Configurações Globais =====
const ANIMATION_DURATION = {
    LIKE: 1000,
    UNLIKE: 500,
    FRAME_RATE: 16 // 60fps
};

// ===== Funções de Utilidade =====

/**
 * Anima um número de um valor inicial até um valor final
 * @param {HTMLElement} element - Elemento que contém o número
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duração da animação em ms
 */
function animateNumber(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / ANIMATION_DURATION.FRAME_RATE);
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(current).toLocaleString('pt-BR') + ' curtidas';
    }, ANIMATION_DURATION.FRAME_RATE);
}

// ===== Gerenciamento de Likes =====

/**
 * Configura os botões de like em todos os posts
 */
function setupLikeButtons() {
    document.querySelectorAll('.like-button').forEach(button => {
        const post = button.closest('.post');
        const postId = post.dataset.postId;
        const likesElement = post.querySelector('.post-likes p');
        const icon = button.querySelector('i');
        
        let isLiked = false;
        let originalLikes = parseInt(likesElement.textContent);

        button.addEventListener('click', () => handleLikeClick(button, icon, likesElement, isLiked, originalLikes));
    });
}

/**
 * Manipula o clique no botão de like
 * @param {HTMLElement} button - Botão de like
 * @param {HTMLElement} icon - Ícone do botão
 * @param {HTMLElement} likesElement - Elemento que mostra o número de likes
 * @param {boolean} isLiked - Estado atual do like
 * @param {number} originalLikes - Número original de likes
 */
function handleLikeClick(button, icon, likesElement, isLiked, originalLikes) {
    isLiked = !isLiked;
    
    // Reset da animação do ícone
    icon.classList.remove('far', 'fas', 'animate-like');
    void icon.offsetWidth;
    
    if (isLiked) {
        // Ativa o like
        icon.classList.add('fas', 'animate-like');
        icon.style.color = '#ed4956';
        animateNumber(likesElement, 0, originalLikes + 1, ANIMATION_DURATION.LIKE);
        originalLikes++;
    } else {
        // Desativa o like
        icon.classList.add('far');
        icon.style.color = 'var(--text-primary)';
        animateNumber(likesElement, originalLikes, originalLikes - 1, ANIMATION_DURATION.UNLIKE);
        originalLikes--;
    }
}

// ===== Gerenciamento do Footer =====

/**
 * Configura o comportamento do footer
 */
function setupFooter() {
    const footer = document.querySelector('.footer');
    let isExpanded = false;
    let ticking = false;

    // Evento de scroll com throttling
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => checkScroll(footer, isExpanded));
            ticking = true;
        }
    });

    // Clique no footer para expandir/recolher
    footer.addEventListener('click', (e) => {
        if (e.target === footer || e.target === footer.querySelector('::before')) {
            isExpanded = !isExpanded;
            footer.classList.toggle('expanded');
        }
    });

    // Verifica a posição inicial
    checkScroll(footer, isExpanded);
}

/**
 * Verifica se o footer deve ser expandido baseado na posição do scroll
 * @param {HTMLElement} footer - Elemento do footer
 * @param {boolean} isExpanded - Estado atual do footer
 */
function checkScroll(footer, isExpanded) {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!isExpanded) {
            footer.classList.add('expanded');
            isExpanded = true;
        }
    } else {
        if (isExpanded) {
            footer.classList.remove('expanded');
            isExpanded = false;
        }
    }
    
    ticking = false;
}

// ===== Inicialização =====

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    setupLikeButtons();
    setupFooter();
}); 