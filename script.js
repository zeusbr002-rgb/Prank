const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

// Nomes das suas fotos locais (.jpeg)
const photoFiles = ['foto1.jpeg', 'foto2.jpeg'];
let photoIndex = 0;
let chaosInterval; // Variável para controlar o ciclo automático

// --- INÍCIO AUTOMÁTICO ---
// Assim que a janela carrega, o caos começa
window.onload = () => {
    startChaosLoop();
};

// Função que inicia o ciclo infinito de fotos e anúncios
function startChaosLoop() {
    // Cria uma foto e um anúncio a cada 300 milissegundos (MUITO RÁPIDO)
    chaosInterval = setInterval(() => {
        // Só cria se o susto não estiver na tela
        if (jumpscare.classList.contains('hidden')) {
            spawnPhoto();
            // Opcional: descomente a linha abaixo para criar anúncios automáticos também
            // createAd(); 
        }
    }, 300); 
}

// --- FUNÇÕES DE CRIAÇÃO ---

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    // Posição aleatória na tela
    ad.style.left = `${Math.random() * 60 + 10}vw`;
    ad.style.top = `${Math.random() * 60 + 10}vh`;
    ad.innerHTML = `<span>[X] FECHAR</span><b>VOCÊ É O VISITANTE Nº 1.000.000!</b><p>CLIQUE AGORA PARA RECLAMAR SEU IPHONE!</p>`;
    
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
    const yPos = `${Math.random() * 70 + 5}vh`; // Altura aleatória

    if (fromLeft) {
        photo.style.left = '-400px'; // Começa fora da tela à esquerda
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
            photo.style.left = '-400px';
        }, 50);
    }

    // --- NOVA LÓGICA ---
    // CLICOU NA FOTO = CRIA UM ANÚNCIO VERMELHO
    photo.onclick = (e) => {
        e.stopPropagation(); // Impede que o clique dispare outros eventos
        createAd();
    };

    document.body.appendChild(photo);

    // Remove a foto do HTML depois que ela termina de passar (26 segundos)
    setTimeout(() => photo.remove(), 26000);
}

// --- FUNÇÕES DO SUSTO ---

function showGhostface() {
    jumpscare.classList.remove('hidden');
    // Para o ciclo de criação automática para não travar o PC
    clearInterval(chaosInterval); 
    
    // Tenta tocar a música local. 
    // NOTA: Navegadores modernos bloqueiam som automático. 
    // O susto só tocará se a pessoa já tiver clicado em ALGO na página antes.
    scaryAudio.play().catch(error => {
        console.log("Áudio bloqueado pelo navegador. Requer clique prévio na página.");
    });
}

// --- FUNÇÃO SECRETA (ESC) ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetEverything();
    }
});

function resetEverything() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    // Remove todas as fotos que estiverem passando
    document.querySelectorAll('.moving-photo').forEach(p => p.remove());
    // Reinicia o ciclo automático
    startChaosLoop();
}