var senhaForm = document.getElementById('next')

function proximaSenha() {
    let display = document.getElementById('display')
    const bip = new Audio('audio/bip.mp3')
    setInterval(() => {
        let senha = localStorage.getItem('senha').padStart(3, '0')
        if (display.innerHTML != senha) {
            display.innerHTML = senha
            bip.play()
        }
    }, 100);
}

function habilitaSom() {
    let mensagem = document.getElementById('msg')
    mensagem.style.color = 'black'
}


function chamar() {
    localStorage.setItem('senha', senhaForm.value)
    senhaForm .value = parseInt(senhaForm.value) + 1
}

senhaForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById('botao').click()
    }
})