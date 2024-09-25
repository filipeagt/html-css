const tela = document.getElementById('display')
const playBtn = document.getElementById('play')
const botoes = document.getElementById('botoes')

function play() {
    playBtn.style.display = 'none'
    botoes.style.display = 'flex'
    
}

function reset() {
    playBtn.style.display = 'block'
    botoes.style.display = 'none'
    
}