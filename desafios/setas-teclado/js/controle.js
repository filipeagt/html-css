var cima = document.getElementById('cima')
var esquerda = document.getElementById('esquerda')
var baixo = document.getElementById('baixo')
var direita= document.getElementById('direita')

function pressionada(event) {
    //alert(event.key)
    if (event.key == 'ArrowUp') cima.style.backgroundColor = 'white'
    if (event.key == 'ArrowLeft') esquerda.style.backgroundColor = 'white'
    if (event.key == 'ArrowDown') baixo.style.backgroundColor = 'white'
    if (event.key == 'ArrowRight') direita.style.backgroundColor = 'white'
}

function solta(event) {
    if (event.key == 'ArrowUp') cima.style.backgroundColor = 'black'
    if (event.key == 'ArrowLeft') esquerda.style.backgroundColor = 'black'
    if (event.key == 'ArrowDown') baixo.style.backgroundColor = 'black'
    if (event.key == 'ArrowRight') direita.style.backgroundColor = 'black'
}