let andar = document.getElementById('andar');
let direção = document.getElementById('direcao');

function elevador(num) {
    let andarAtual = Number(andar.innerHTML);
    let botãoClicado = document.getElementById(`btn${num}`);
    botãoClicado.classList.toggle('aceso');

    if(andarAtual < num) {
        direção.innerHTML = '<'
        let sobe = setInterval(function () {
            andar.innerHTML = `${andarAtual.toString()}`;
            andarAtual++;
            if(andarAtual > num) {
                clearInterval(sobe);
                setTimeout(function() {
                    direção.innerHTML = '';
                    botãoClicado.classList.toggle('aceso')
                }, 1000)
            }
        }, 1000);
    }
    
    if(andarAtual > num) {
        direção.innerHTML = '>'
        let desce = setInterval(function () {
            andar.innerHTML = `${andarAtual.toString()}`;
            andarAtual--;
            if(andarAtual < num) {
                clearInterval(desce);
                setTimeout(function() {
                    direção.innerHTML = '';
                    botãoClicado.classList.toggle('aceso')
                }, 1000)
            }
        }, 1000);
    }
}