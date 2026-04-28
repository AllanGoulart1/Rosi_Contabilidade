// ========================================
// MENU MOBILE
// ========================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && !e.target.closest('.mobile-menu')) {
        mobileMenu.classList.remove('active');
    }
});

// ========================================
// SCROLL SUAVE
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.remove('active');
    }
}

// Links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        scrollToSection(target);
    });
});

// ========================================
// FORMULÁRIO DE CONTATO - WHATSAPP
// ========================================
const contatoForm = document.getElementById('contatoForm');
const formMessage = document.getElementById('formMessage');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !mensagem) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
    }

    // Montar a mensagem para o WhatsApp com formatação simples e funcional
    const textoWhatsApp = `Olá! Novo contato pelo site Rosiani Garcia Contabilidade\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}`;

    // URL do WhatsApp - codifica a mensagem
    const urlWhatsApp = `https://wa.me/5548984292437?text=${encodeURIComponent(textoWhatsApp)}`;

    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');

    // Mostrar mensagem de sucesso
    showMessage('Redirecionando para o WhatsApp... Você será conectado à Rosiani Garcia Contabilidade.', 'success');

    // Limpar formulário
    contatoForm.reset();

    // Scroll para mostrar a mensagem
    setTimeout(() => {
        formMessage.scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// ANIMAÇÕES AO SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos com animação
document.querySelectorAll('.servico-card, .depoimento-card, .info-item, .highlight-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// HEADER STICKY COM EFEITO
// ========================================
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop;
});

// ========================================
// CONTADOR DE NÚMEROS (OPCIONAL)
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// VALIDAÇÃO DE TELEFONE (MÁSCARA)
// ========================================
const telefonInput = document.getElementById('telefone');
if (telefonInput) {
    telefonInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        if (value.length <= 2) {
            value = value;
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
        }

        e.target.value = value;
    });
}

// ========================================
// VERIFICAR SUPORTE A FEATURES MODERNAS
// ========================================
// ========================================
// ANO DINÂMICO NO FOOTER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o navegador suporta Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer não suportado. Algumas animações podem não funcionar.');
    }

    // Adicionar classe ao HTML se suporta CSS Grid
    if (CSS.supports('display', 'grid')) {
        document.documentElement.classList.add('css-grid-supported');
    }
});

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
const btnTop = document.getElementById('btnTop');

if (btnTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    });

    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
