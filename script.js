const adsContainer = document.getElementById('ads-container');
const jumpscare = document.getElementById('jumpscare');
const scaryAudio = document.getElementById('scary-audio');
const input = document.getElementById('search-input');

// 1. Cada clique gera um anúncio aleatório
document.addEventListener('click', (e) => {
    if (jumpscare.classList.contains('hidden')) {
        createAd(e.pageX, e.pageY);
    }
});

function createAd(x, y) {
    const ad = document.createElement('div');
    ad.className = 'ad-box';
    ad.style.left = `${Math.random() * 80}vw`;
    ad.style.top = `${Math.random() * 80}vh`;
    ad.innerHTML = `<span>FECHAR [X]</span><p>VOCÊ GANHOU UM IPHONE!</p>`;
    
    // Ao clicar para fechar, aparece o Ghostface
    ad.onclick = (e) => {
        e.stopPropagation();
        triggerJumpscare();
    };
    
    adsContainer.appendChild(ad);
}

// 2. Cada tecla gera um animal andando
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetPrank();
        return;
    }

    const animal = document.createElement('img');
    animal.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndndndndndndndndndndndndndndndndndndndndndndnd/3o7TKDkDbIDJieKbVm/giphy.gif"; // Ex: Gato andando
    animal.className = 'animal';
    animal.style.left = '-100px';
    animal.style.top = `${Math.random() * 90}vh`;
    
    document.body.appendChild(animal);

    // Animação do animal atravessando a tela
    setTimeout(() => {
        animal.style.left = '110vw';
    }, 100);

    // Remove do DOM após sair da tela
    setTimeout(() => animal.remove(), 4000);
});

// 3. Função do Susto
function triggerJumpscare() {
    jumpscare.classList.remove('hidden');
    scaryAudio.play();
}

// 4. Reiniciar (O segredo do ESC)
function resetPrank() {
    jumpscare.classList.add('hidden');
    adsContainer.innerHTML = '';
    scaryAudio.pause();
    scaryAudio.currentTime = 0;
    const animals = document.querySelectorAll('.animal');
    animals.forEach(a => a.remove());
}