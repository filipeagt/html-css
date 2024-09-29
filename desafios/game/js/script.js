const personagem = document.getElementById('personagem')
const obstaculo1 = document.getElementById('obstaculo1')
const obstaculo2 = document.getElementById('obstaculo2')
const obstaculo3 = document.getElementById('obstaculo3')
const obstaculo4 = document.getElementById('obstaculo4')
const texto = document.getElementById('texto')
let primeiroClick = true
function pula() {
    if (primeiroClick) {
        primeiroClick = false
        obstaculo1.style.left = '-65px'
        setInterval(animacao, 2600, obstaculo1)
        setTimeout(() => {
            setInterval(animacao, 2600, obstaculo2)
        }, 1200);
        setTimeout(() => {
            setInterval(animacao, 2600, obstaculo3)
        }, 2400);
        setTimeout(() => {
            setInterval(animacao, 2600, obstaculo4)
        }, 3600);

        personagem.style.bottom = '100px'
        setTimeout(gravidade, 400)
        texto.style.display = 'none'
    }
    if (personagem.style.bottom == '0px') {       
        personagem.style.bottom = '100px'
        setTimeout(gravidade, 400)
    }
}

function gravidade() {
    personagem.style.bottom = '0px'
}

function animacao(obstaculo) {
    if (obstaculo.style.left == '400px') {
        obstaculo.style.transition = 'all 2500ms'
        obstaculo.style.left = '-65px'
    } else {
        obstaculo.style.transition = 'all 0ms'
        obstaculo.style.left = '400px'
    }
    
}