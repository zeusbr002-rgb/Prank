const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

function triggerChaos() {
    if (!jumpscare.classList.contains('hidden')) return;
    createAd();
    spawnCat();
}

// Dispara ao digitar no input ou em qualquer tecla
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetEverything();
        return;
    }
    triggerChaos();
});

// Dispara ao clicar na página (exceto no input de busca para deixar a pessoa digitar)
document.addEventListener('click', (e) => {
    if (e.target.id !== 'search-input' && jumpscare.classList.contains('hidden')) {
        triggerChaos();
    }
});

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    ad.style.left = `${Math.random() * 75}vw`;
    ad.style.top = `${Math.random() * 75}vh`;
    ad.innerHTML = `<span>[X]</span><br><br><b>VOCÊ GANHOU!</b><p>CLIQUE PARA RECEBER O PRÊMIO</p>`;
    
    // CLICOU NO ANÚNCIO = SUSTO
    ad.onclick = (e) => {
        e.stopPropagation();
        showGhostface();
    };
    adsContainer.appendChild(ad);
}

function spawnCat() {
    const cat = document.createElement('img');
    // GIF de gato fofinho andando
    cat.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3/MDJ9IbMv3UZS8/giphy.gif";
    cat.className = 'cat-gift';
    
    cat.style.top = `${Math.random() * 85}vh`;
    cat.style.left = '-150px';

    document.body.appendChild(cat);

    setTimeout(() => {
        cat.style.left = '115vw';
    }, 50);

    setTimeout(() => cat.remove(), 16000);
}

function showGhostface() {
    jumpscare.classList.remove('hidden');
    scaryAudio.play().catch(error => {
        console.log("Erro ao tocar áudio. O navegador exige uma interação antes.");
    });
}

function resetEverything() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    document.querySelectorAll('.cat-gift').forEach(c => c.remove());
}