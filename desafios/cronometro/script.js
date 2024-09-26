const tela = document.getElementById('display')
const playBtn = document.getElementById('play')
const pauseBtn = document.getElementById('pause')
const botoes = document.getElementById('botoes')
let intervalo
let centesimos = 0
let segundos = 0
let minutos = 0


function play() {
    playBtn.style.display = 'none'
    botoes.style.display = 'flex'
    pauseBtn.innerText = 'Pause'
    pauseBtn.setAttribute('onclick', 'pause()')
    intervalo = setInterval(function() {
        if (centesimos < 99) {
            centesimos++
        } else if (segundos < 59) {
            centesimos = 0
            segundos++
        } else if  (minutos < 59) {
            centesimos = 0
            segundos = 0
            minutos ++
        } else {
            centesimos = 0
            segundos = 0
            minutos = 0
        }
        tela.innerText = `${minutos < 10? '0'+ minutos : minutos}:${segundos < 10? '0'+ segundos : segundos}:${centesimos < 10? '0'+ centesimos : centesimos}`
    }, 10)
}

function reset() {
    clearInterval(intervalo)
    playBtn.style.display = 'block'
    botoes.style.display = 'none'
    centesimos = 0
    segundos = 0
    minutos = 0
    tela.innerText = '00:00:00'
}

function pause() {
    clearInterval(intervalo)
    pauseBtn.innerText = 'Resume'
    pauseBtn.setAttribute('onclick', 'play()')
}