let display = document.getElementById('display')
let acumulador = 0
let operador = ''
let operando = false
function calc(tecla) {
    switch(tecla) {
        case 'AC':
            acumulador = 0
            display.innerText = '0'
            operando = false
            operador = ''
            break
        case 'sqrt':
            acumulador = Math.sqrt(Number(display.innerText))
            display.innerText = acumulador.toLocaleString('en', {maximumSignificantDigits: '8'})
            tecla = '='
            
        case '%':
            break
        case '+':
            /*acumulador += Number(display.innerText.replace(',',''))
            display.innerText = acumulador.toLocaleString('en', {maximumSignificantDigits: '8'})
            operador = tecla
            operando = true
            break*/
        case '/':
        case '*':
        case '-':
            acumulador = Number(display.innerText.replace(',',''))
            display.innerText = acumulador.toLocaleString('en', {maximumSignificantDigits: '8'})
            operador = tecla
            operando = true
            //tecla = '='
            break
        
        case '=':
            switch(operador){
                case '+':
                    acumulador += Number(display.innerText)
                    break
                case '-':
                    acumulador -= Number(display.innerText)
                    break
                case '*':
                    acumulador *= Number(display.innerText)
                    break
                case '/':
                    acumulador /= Number(display.innerText)
                    break
                default:
                    acumulador = Number(display.innerText)
            }
            display.innerText = acumulador.toLocaleString('en', {maximumSignificantDigits: '8'})
            acumulador = 0
            operando = true
            operador = ''
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