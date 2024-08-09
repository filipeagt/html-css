let display = document.getElementById('display')
let acumulador = 0
let operador = ''
let operando = false
function calc(tecla) {
    switch(tecla) {
        case 'AC':
            acumulador = 0
            display.innerText = '0'
            break
        case 'sqrt':
            acumulador = Math.sqrt(Number(display.innerText))
            display.innerText = acumulador//.toPrecision(9)
            break
        case '%':
            break
        case '/':
            break
        case '*':
            break
        case '+':
            acumulador += Number(display.innerText)
            operador = '+'
            operando = true
            break
        case '-':
            acumulador += Number(display.innerText)
            operador = '-'
            operando = true
            break
        case '=':
            switch(operador){
                case '+':
                    acumulador += Number(display.innerText)
                    operador = ''
                    break
                case '-':
                    acumulador -= Number(display.innerText)
                    operador = ''
                    break
            }
            display.innerText = acumulador
            acumulador = 0
            break
        default:
            if(display.innerText=='0' || operando) {
                display.innerText = tecla
                operando = false
            } else {
                display.innerHTML += tecla
            }
    }
}