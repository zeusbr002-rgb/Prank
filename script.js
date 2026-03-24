const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

// Nomes das suas fotos locais com a extensão correta
const photoFiles = ['foto1.jpeg', 'foto2.jpeg'];
let photoIndex = 0;

function triggerChaos() {
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

// Dispara ao clicar (exceto no input)
document.addEventListener('click', (e) => {
    if (e.target.id !== 'search-input' && jumpscare.classList.contains('hidden')) {
        triggerChaos();
    }
});

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    ad.style.left = `${Math.random() * 70 + 5}vw`;
    ad.style.top = `${Math.random() * 70 + 5}vh`;
    ad.innerHTML = `<span>[X]</span><br><br><b>VOCÊ FOI SORTEADO!</b><p>CLIQUE PARA RECEBER</p>`;
    
    // CLICOU NO ANÚNCIO = SUSTO
    ad.onclick = (e) => {
        e.stopPropagation();
        showGhostface();
    };
    adsContainer.appendChild(ad);
}

function spawnPhoto() {
    const photo = document.createElement('img');
    
    // Usa a extensão .jpeg conforme solicitado
    photo.src = photoFiles[photoIndex];
    photoIndex = (photoIndex + 1) % photoFiles.length;
    
    photo.className = 'moving-photo';
    
    const fromLeft = Math.random() > 0.5;
    const yPos = `${Math.random() * 80 + 5}vh`;

    if (fromLeft) {
        photo.style.left = '-250px';
        photo.style.top = yPos;
        setTimeout(() => {
            photo.style.left = '110vw';
        }, 50);
    } else {
        photo.style.left = '110vw';
        photo.style.top = yPos;
        setTimeout(() => {
            photo.style.left = '-250px';
        }, 50);
    }

    // Se clicar na foto que está passando, também pode dar o susto? 
    // Se quiser, basta descomentar a linha abaixo:
    // photo.onclick = () => showGhostface();

    document.body.appendChild(photo);
    setTimeout(() => photo.remove(), 21000);
}

function showGhostface() {
    jumpscare.classList.remove('hidden');
    scaryAudio.play().catch(e => console.log("Áudio aguardando interação..."));
}

function resetEverything() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    document.querySelectorAll('.moving-photo').forEach(p => p.remove());
}