/**
 * Instagram Clone - Efeitos de Fundo
 * @author Wesley de Albuquerque Filgueiras
 * @version 1.0.0
 */

// ===== Configurações do Canvas =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Array para armazenar os efeitos ativos
window.activeEffects = [];

// ===== Configurações de Efeitos =====
const EFFECTS = {
    PARTICLES: {
        count: 50,
        color: 'rgba(255, 255, 255, 0.5)',
        size: { min: 2, max: 5 },
        speed: { min: 0.5, max: 2 }
    },
    WAVES: {
        amplitude: 50,
        frequency: 0.02,
        speed: 0.05,
        color: 'rgba(255, 255, 255, 0.3)'
    },
    CIRCLES: {
        count: 5,
        color: 'rgba(255, 255, 255, 0.2)',
        size: { min: 50, max: 200 },
        speed: 0.02
    },
    LINES: {
        count: 20,
        color: 'rgba(255, 255, 255, 0.2)',
        speed: { min: 1, max: 3 }
    },
    STARS: {
        count: 100,
        color: 'rgba(255, 255, 255, 0.8)',
        size: { min: 1, max: 3 },
        twinkleSpeed: 0.02
    },
    MATRIX: {
        fontSize: 14,
        color: 'rgba(0, 255, 0, 0.8)',
        speed: { min: 1, max: 3 }
    },
    FIREFLIES: {
        count: 30,
        color: 'rgba(255, 255, 0, 0.8)',
        size: { min: 2, max: 4 },
        speed: { min: 0.5, max: 2 }
    }
};

// ===== Funções de Utilidade =====

/**
 * Redimensiona o canvas para preencher a tela
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Gera um número aleatório entre min e max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatório
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// ===== Implementação dos Efeitos =====

/**
 * Efeito de Partículas
 */
const particlesEffect = {
    particles: [],
    
    init() {
        this.particles = [];
        for (let i = 0; i < EFFECTS.PARTICLES.count; i++) {
            this.particles.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                size: random(EFFECTS.PARTICLES.size.min, EFFECTS.PARTICLES.size.max),
                speedX: random(EFFECTS.PARTICLES.speed.min, EFFECTS.PARTICLES.speed.max),
                speedY: random(EFFECTS.PARTICLES.speed.min, EFFECTS.PARTICLES.speed.max)
            });
        }
    },
    
    draw() {
        ctx.fillStyle = EFFECTS.PARTICLES.color;
        
        this.particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }
};

/**
 * Efeito de Ondas
 */
const wavesEffect = {
    time: 0,
    
    init() {
        this.time = 0;
    },
    
    draw() {
        ctx.strokeStyle = EFFECTS.WAVES.color;
        ctx.lineWidth = 2;
        
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const wave = Math.sin(x * EFFECTS.WAVES.frequency + this.time) * EFFECTS.WAVES.amplitude;
                ctx.lineTo(x, y + wave);
            }
            ctx.stroke();
        }
        
        this.time += EFFECTS.WAVES.speed;
    }
};

/**
 * Efeito de Círculos
 */
const circlesEffect = {
    circles: [],
    
    init() {
        this.circles = [];
        for (let i = 0; i < EFFECTS.CIRCLES.count; i++) {
            this.circles.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                size: random(EFFECTS.CIRCLES.size.min, EFFECTS.CIRCLES.size.max),
                angle: random(0, Math.PI * 2)
            });
        }
    },
    
    draw() {
        ctx.strokeStyle = EFFECTS.CIRCLES.color;
        ctx.lineWidth = 2;
        
        this.circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
            ctx.stroke();
            
            circle.angle += EFFECTS.CIRCLES.speed;
            circle.x += Math.cos(circle.angle) * 2;
            circle.y += Math.sin(circle.angle) * 2;
            
            if (circle.x < -circle.size) circle.x = canvas.width + circle.size;
            if (circle.x > canvas.width + circle.size) circle.x = -circle.size;
            if (circle.y < -circle.size) circle.y = canvas.height + circle.size;
            if (circle.y > canvas.height + circle.size) circle.y = -circle.size;
        });
    }
};

/**
 * Efeito de Linhas
 */
const linesEffect = {
    lines: [],
    
    init() {
        this.lines = [];
        for (let i = 0; i < EFFECTS.LINES.count; i++) {
            this.lines.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                speed: random(EFFECTS.LINES.speed.min, EFFECTS.LINES.speed.max)
            });
        }
    },
    
    draw() {
        ctx.strokeStyle = EFFECTS.LINES.color;
        ctx.lineWidth = 1;
        
        this.lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.x, 0);
            ctx.lineTo(line.x, canvas.height);
            ctx.stroke();
            
            line.x += line.speed;
            if (line.x > canvas.width) line.x = 0;
        });
    }
};

/**
 * Efeito de Estrelas
 */
const starsEffect = {
    stars: [],
    
    init() {
        this.stars = [];
        for (let i = 0; i < EFFECTS.STARS.count; i++) {
            this.stars.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                size: random(EFFECTS.STARS.size.min, EFFECTS.STARS.size.max),
                brightness: random(0, 1)
            });
        }
    },
    
    draw() {
        this.stars.forEach(star => {
            star.brightness += Math.sin(Date.now() * EFFECTS.STARS.twinkleSpeed) * 0.1;
            const alpha = Math.max(0, Math.min(1, star.brightness));
            
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
};

/**
 * Efeito Matrix
 */
const matrixEffect = {
    columns: [],
    
    init() {
        this.columns = [];
        const columnCount = Math.floor(canvas.width / EFFECTS.MATRIX.fontSize);
        
        for (let i = 0; i < columnCount; i++) {
            this.columns.push({
                x: i * EFFECTS.MATRIX.fontSize,
                y: random(-canvas.height, 0),
                speed: random(EFFECTS.MATRIX.speed.min, EFFECTS.MATRIX.speed.max)
            });
        }
    },
    
    draw() {
        ctx.fillStyle = EFFECTS.MATRIX.color;
        ctx.font = `${EFFECTS.MATRIX.fontSize}px monospace`;
        
        this.columns.forEach(column => {
            const char = String.fromCharCode(random(33, 126));
            ctx.fillText(char, column.x, column.y);
            
            column.y += column.speed;
            if (column.y > canvas.height) {
                column.y = random(-canvas.height, 0);
            }
        });
    }
};

/**
 * Efeito de Vaga-lumes
 */
const firefliesEffect = {
    fireflies: [],
    
    init() {
        this.fireflies = [];
        for (let i = 0; i < EFFECTS.FIREFLIES.count; i++) {
            this.fireflies.push({
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                size: random(EFFECTS.FIREFLIES.size.min, EFFECTS.FIREFLIES.size.max),
                speedX: random(-EFFECTS.FIREFLIES.speed.max, EFFECTS.FIREFLIES.speed.max),
                speedY: random(-EFFECTS.FIREFLIES.speed.max, EFFECTS.FIREFLIES.speed.max),
                brightness: random(0.3, 1)
            });
        }
    },
    
    draw() {
        this.fireflies.forEach(firefly => {
            firefly.brightness = 0.3 + Math.sin(Date.now() * 0.003) * 0.7;
            
            ctx.fillStyle = `rgba(255, 255, 0, ${firefly.brightness})`;
            ctx.beginPath();
            ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
            ctx.fill();
            
            firefly.x += firefly.speedX;
            firefly.y += firefly.speedY;
            
            if (firefly.x < 0) firefly.x = canvas.width;
            if (firefly.x > canvas.width) firefly.x = 0;
            if (firefly.y < 0) firefly.y = canvas.height;
            if (firefly.y > canvas.height) firefly.y = 0;
        });
    }
};

// ===== Gerenciamento de Efeitos =====

/**
 * Mapa de efeitos disponíveis
 */
const effects = {
    1: particlesEffect,
    2: wavesEffect,
    3: circlesEffect,
    4: linesEffect,
    5: starsEffect,
    6: matrixEffect,
    7: firefliesEffect
};

/**
 * Altera o efeito de fundo
 * @param {number} effectId - ID do efeito a ser ativado
 */
window.changeBackgroundEffect = function(effectId) {
    if (effects[effectId]) {
        effects[effectId].init();
    }
};

// ===== Loop de Animação =====

/**
 * Função de animação principal
 */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    window.activeEffects.forEach(effectId => {
        if (effects[effectId]) {
            effects[effectId].draw();
        }
    });
    
    requestAnimationFrame(animate);
}

// ===== Inicialização =====

// Configura o canvas inicialmente
resizeCanvas();

// Adiciona listener para redimensionamento
window.addEventListener('resize', resizeCanvas);

// Inicia a animação
animate(); 