const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

// Função mestre que gera o caos
function triggerChaos() {
    if (!jumpscare.classList.contains('hidden')) return;
    
    createAd();
    spawnCat();
}

// Dispara ao clicar
document.addEventListener('click', (e) => {
    if(e.target.id !== 'search-input') triggerChaos();
});

// Dispara ao digitar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetEverything();
        return;
    }
    triggerChaos();
});

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    ad.style.left = `${Math.random() * 80}vw`;
    ad.style.top = `${Math.random() * 80}vh`;
    ad.innerHTML = `<span>[X] FECHAR</span><br><b>VOCÊ É O VISITANTE Nº 1.000.000!</b><p>Clique para resgatar!</p>`;
    
    ad.onclick = (e) => {
        e.stopPropagation();
        showGhostface();
    };
    adsContainer.appendChild(ad);
}

function spawnCat() {
    const cat = document.createElement('img');
    // Link de um GIF de gato andando
    cat.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3/MDJ9IbMv3UZS8/giphy.gif";
    cat.className = 'cat-gift';
    
    const yPos = Math.random() * 90;
    cat.style.top = `${yPos}vh`;
    cat.style.left = '-150px'; // Começa fora da tela

    document.body.appendChild(cat);

    // Inicia o movimento lento
    setTimeout(() => {
        cat.style.left = '110vw';
    }, 50);

    // Limpa o gato do código depois que ele some da tela
    setTimeout(() => cat.remove(), 13000);
}

function showGhostface() {
    jumpscare.classList.remove('hidden');
    scaryAudio.play();
}

function resetEverything() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    document.querySelectorAll('.cat-gift').forEach(c => c.remove());
}