let nPalpites = 0
let aleatorio = parseInt(Math.random()*1000)
let saida = document.getElementById('out')
let entrada = document.getElementById('num')
let tentativas = document.getElementById('tentativas')
function adivinha() {
    let palpite = parseInt(entrada.value)
    nPalpites++
    tentativas.innerHTML = nPalpites
    if (nPalpites > 10) {
        saida.innerHTML = `<p>Você perdeu! Eu pensei no número ${aleatorio}.</p>`
        saida.innerHTML += '<a href="index.html">Jogar Novamente</a>'
    } else {
        if (aleatorio < palpite) {
            saida.innerHTML = `<p>O número em que pensei é menor que ${palpite}.</p>`
        } else if (aleatorio > palpite) {
            saida.innerHTML = `<p>O número em que pensei é maior que ${palpite}.</p>`
        } else if (aleatorio == palpite) {
            saida.innerHTML = `<p>Parabéns você acertou! Eu pensei no número ${palpite}</p>`
            saida.innerHTML += '<a href="index.html">Jogar Novamente</a>'
        }

    }
}