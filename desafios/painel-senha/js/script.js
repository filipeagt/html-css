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
    let senhaForm = document.getElementById('next')
    localStorage.setItem('senha', senhaForm.value)
    senhaForm .value = parseInt(senhaForm.value) + 1
}