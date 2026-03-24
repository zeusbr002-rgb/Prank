const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

// Nomes das suas fotos locais
const photoFiles = ['foto1.jpg', 'foto2.jpg'];
let photoIndex = 0; // Para alternar entre as fotos

function triggerChaos() {
    // Se o susto já estiver na tela, não faz nada
    if (!jumpscare.classList.contains('hidden')) return;
    
    createAd();
    spawnPhoto();
}

// Dispara ao digitar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetEverything();
        return;
    }
    triggerChaos();
});

// Dispara ao clicar (exceto no input de busca)
document.addEventListener('click', (e) => {
    if (e.target.id !== 'search-input' && jumpscare.classList.contains('hidden')) {
        triggerChaos();
    }
});

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    // Posição aleatória na tela (evitando as bordas extremas)
    ad.style.left = `${Math.random() * 70 + 5}vw`;
    ad.style.top = `${Math.random() * 70 + 5}vh`;
    ad.innerHTML = `<span>[X]</span><br><br><b>OFERTA VINDA DO ALÉM!</b><p>CLIQUE RAPIDO!</p>`;
    
    // CLICOU NO ANÚNCIO = SUSTO IMEDIATO
    ad.onclick = (e) => {
        e.stopPropagation(); // Impede que o clique crie outro caos atrás
        showGhostface();
    };
    adsContainer.appendChild(ad);
}

function spawnPhoto() {
    const photo = document.createElement('img');
    
    // Define qual foto local usar (alternando)
    photo.src = photoFiles[photoIndex];
    photoIndex = (photoIndex + 1) % photoFiles.length; // Alterna 0, 1, 0, 1...
    
    photo.className = 'moving-photo';
    
    // Define a direção (esquerda para direita ou direita para esquerda)
    const fromLeft = Math.random() > 0.5;
    const yPos = `${Math.random() * 80 + 5}vh`; // Altura aleatória

    if (fromLeft) {
        photo.style.left = '-250px'; // Começa fora da tela à esquerda
        photo.style.top = yPos;
        // Inicia o movimento lento para a direita
        setTimeout(() => {
            photo.style.left = '110vw';
        }, 50);
    } else {
        photo.style.left = '110vw'; // Começa fora da tela à direita
        photo.style.top = yPos;
        // Inicia o movimento lento para a esquerda
        setTimeout(() => {
            photo.style.left = '-250px';
        }, 50);
    }

    document.body.appendChild(photo);

    // Remove a foto do HTML depois que ela termina de passar (21 segundos)
    setTimeout(() => photo.remove(), 21000);
}

function showGhostface() {
    jumpscare.classList.remove('hidden');
    // Tenta tocar a música local. Note que navegadores bloqueiam som sem interação prévia.
    scaryAudio.play().catch(error => {
        console.log("Áudio bloqueado pelo navegador. Requer clique prévio na página.");
    });
}

function resetEverything() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    // Remove todas as fotos que estiverem passando
    document.querySelectorAll('.moving-photo').forEach(p => p.remove());
}