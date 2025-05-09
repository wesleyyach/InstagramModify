/**
 * Instagram Clone - Efeitos de Fundo
 * @author Wesley de Albuquerque Filgueiras
 * @version 1.0.0
 */

// ===== Configurações =====
const EFFECT_COUNT = 7;

// ===== Elementos do DOM =====
const effectSwitches = {
    1: document.getElementById('effect1'),
    2: document.getElementById('effect2'),
    3: document.getElementById('effect3'),
    4: document.getElementById('effect4'),
    5: document.getElementById('effect5'),
    6: document.getElementById('effect6'),
    7: document.getElementById('effect7')
};

// ===== Gerenciamento de Estado =====

/**
 * Salva o estado atual dos switches no localStorage
 */
function saveEffectStates() {
    const states = {};
    
    for (let i = 1; i <= EFFECT_COUNT; i++) {
        states[i] = effectSwitches[i].checked;
    }
    
    localStorage.setItem('effectStates', JSON.stringify(states));
}

/**
 * Carrega o estado dos switches do localStorage
 */
function loadEffectStates() {
    const savedStates = localStorage.getItem('effectStates');
    
    if (savedStates) {
        const states = JSON.parse(savedStates);
        
        for (let i = 1; i <= EFFECT_COUNT; i++) {
            if (states[i] !== undefined) {
                effectSwitches[i].checked = states[i];
                
                if (states[i]) {
                    activateEffect(i);
                } else {
                    deactivateEffect(i);
                }
            }
        }
    } else {
        // Se não houver estados salvos, desativa todos por padrão
        for (let i = 1; i <= EFFECT_COUNT; i++) {
            effectSwitches[i].checked = false;
            deactivateEffect(i);
        }
        saveEffectStates();
    }
}

// ===== Controle de Efeitos =====

/**
 * Ativa um efeito específico
 * @param {number} effectId - ID do efeito a ser ativado
 */
function activateEffect(effectId) {
    if (!window.activeEffects.includes(effectId)) {
        window.activeEffects.push(effectId);
        
        const effectBtn = effectSwitches[effectId]
            .closest('.effect-item')
            .querySelector('.effect-btn');
            
        effectBtn.style.opacity = '1';
        effectBtn.style.pointerEvents = 'auto';
        
        // Inicia o efeito
        window.changeBackgroundEffect(effectId);
    }
}

/**
 * Desativa um efeito específico
 * @param {number} effectId - ID do efeito a ser desativado
 */
function deactivateEffect(effectId) {
    const index = window.activeEffects.indexOf(effectId);
    
    if (index > -1) {
        window.activeEffects.splice(index, 1);
        
        const effectBtn = effectSwitches[effectId]
            .closest('.effect-item')
            .querySelector('.effect-btn');
            
        effectBtn.style.opacity = '0.5';
        effectBtn.style.pointerEvents = 'none';
    }
}

// ===== Event Listeners =====

// Adiciona event listeners para cada switch
for (let i = 1; i <= EFFECT_COUNT; i++) {
    effectSwitches[i].addEventListener('change', (e) => {
        const enabled = e.target.checked;
        
        if (enabled) {
            activateEffect(i);
        } else {
            deactivateEffect(i);
        }
        
        saveEffectStates();
    });
}

// ===== Inicialização =====

// Carrega os estados iniciais
loadEffectStates(); 