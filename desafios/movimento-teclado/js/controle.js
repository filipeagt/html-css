var ponto = document.getElementById('ponto')
var distCima = 50, distEsquerda = 50
var subindo  = false, descendo = false, indoEsq = false, indoDir = false
var moveCima, moveBaixo, moveDireita, moveEsquerda

function pressionada(event) {
    //alert(event.key)
    if (event.key == 'ArrowUp' && !subindo) {
        subindo = true
        moveCima = setInterval(() => {
            distCima -= 5
            ponto.style.top = distCima + 'px'
        }, 10);
    }
    if (event.key == 'ArrowDown' && !descendo) {
        descendo = true
        moveBaixo = setInterval(() => {
            distCima += 5
            ponto.style.top = distCima + 'px'
        }, 10);
    }
    if (event.key == 'ArrowLeft' && !indoEsq) {
        indoEsq = true
        moveEsquerda = setInterval(() => {
            distEsquerda -= 5
            ponto.style.left = distEsquerda + 'px'
        }, 10);
    }    
    if (event.key == 'ArrowRight' && !indoDir) {
        indoDir = true
        moveDireita = setInterval(() => {
            distEsquerda += 5
            ponto.style.left = distEsquerda + 'px'
        }, 10);
    }
}

function solta(event) {
    if (event.key == 'ArrowUp') {
        subindo = false 
        clearInterval(moveCima)
    }
    if (event.key == 'ArrowLeft') {
        indoEsq = false
        clearInterval(moveEsquerda)
    }
    if (event.key == 'ArrowDown') {
        descendo = false
        clearInterval(moveBaixo)
    }
    if (event.key == 'ArrowRight') {
        indoDir = false
        clearInterval(moveDireita)
    }
}
