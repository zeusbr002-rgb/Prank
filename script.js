const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');

// 1. Cada clique gera um anúncio aleatório
document.addEventListener('click', (e) => {
    // Não cria anúncios se o susto já estiver na tela
    if (!jumpscare.classList.contains('hidden')) return;

    // Impede criar anúncio se clicar dentro do input de busca
    if (e.target.id === 'search-input') return;

    createAd();
});

function createAd() {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    // Posições aleatórias na tela
    ad.style.left = `${Math.random() * 70 + 5}vw`;
    ad.style.top = `${Math.random() * 70 + 5}vh`;
    ad.innerHTML = `<span>FECHAR [X]</span><p style="padding:10px;">VOCÊ GANHOU UM PRÊMIO! CLIQUE AQUI!</p>`;
    
    // Ao clicar em QUALQUER lugar do anúncio (incluindo o "fechar"), aparece o Ghostface
    ad.onclick = (e) => {
        e.stopPropagation(); // Impede que o clique crie outro anúncio atrás
        triggerJumpscare();
    };
    
    adsContainer.appendChild(ad);
}

// 2. Cada tecla digitada gera um animal andando devagar
document.addEventListener('keydown', (e) => {
    // Atalho secreto para resetar (ESC)
    if (e.key === 'Escape') {
        resetPrank();
        return;
    }

    if (!jumpscare.classList.contains('hidden')) return;

    const animal = document.createElement('img');
    // GIF de um gato andando (pode trocar por outro link se quiser)
    animal.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndndndndndndndndndndndndndndndndndndndndndndnd/3o7TKDkDbIDJieKbVm/giphy.gif"; 
    animal.className = 'animal';
    
    // Define a direção (esquerda para direita ou direita para esquerda)
    const fromLeft = Math.random() > 0.5;
    const yPos = `${Math.random() * 80 + 10}vh`; // Altura aleatória

    if (fromLeft) {
        animal.style.left = '-120px'; // Começa fora da tela à esquerda
        animal.style.top = yPos;
        setTimeout(() => {
            animal.style.left = '110vw'; // Vai para a direita
        }, 50);
    } else {
        animal.style.left = '110vw'; // Começa fora da tela à direita
        animal.style.top = yPos;
        animal.style.transform = 'scaleX(-1)'; // Inverte o GIF para olhar para a esquerda
        setTimeout(() => {
            animal.style.left = '-120px'; // Vai para a esquerda
        }, 50);
    }
    
    document.body.appendChild(animal);

    // Remove do DOM após 11 segundos (tempo da animação CSS + margem)
    setTimeout(() => animal.remove(), 11000);
});

// 3. Função do Susto
function triggerJumpscare() {
    jumpscare.classList.remove('hidden');
    scaryAudio.play().catch(e => console.log("Áudio bloqueado pelo navegador até interação."));
}

// 4. Reiniciar (O segredo do ESC)
function resetPrank() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = ''; // Remove todos os anúncios
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    // Remove todos os animais que estiverem na tela
    const animals = document.querySelectorAll('.animal');
    animals.forEach(a => a.remove());
}