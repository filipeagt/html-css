function posicao(event) {
    document.getElementById('posX').innerHTML = "X = " + event.clientX
    document.getElementById('posY').innerHTML = "Y = " + (innerHeight - event.clientY - 1)
    let mira = document.getElementById('mira')
    mira.style.left = event.clientX + "px"
    mira.style.top = event.clientY + "px"
}