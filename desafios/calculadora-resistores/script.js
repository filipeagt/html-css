var faixa1 = document.getElementById('faixa1')
var faixa2 = document.getElementById('faixa2')
var faixa3 = document.getElementById('faixa3')
var faixa4 = document.getElementById('faixa4')
var result = document.getElementById('result')

function faixa(num) {
    let faixa = document.getElementById(`f${num}`)
    let select = document.getElementById(`faixa${num}`)
    let cor = ''
    switch (select.value) {
        case '0':
        case 'Ω':
            cor = 'black'
            break
        case '1':
        case '1%':
        case '0Ω':
            cor = 'brown'
            break
        case '2':
        case '2%':
        case '00Ω':
            cor = 'red'
            break
        case '3':
        case 'kΩ':
            cor = 'orange'
            break
        case '4':
        case '0kΩ':
            cor = 'yellow'
            break
        case '5':
        case '00kΩ':
            cor = 'green'
            break
        case '6':
        case 'MΩ':
            cor = 'blue'
            break
        case '7':
        case '0MΩ':
            cor = 'violet'
            break
        case '8':
        case '00MΩ':
            cor = 'grey'
            break
        case '9':
        case 'GΩ':
        case '20%':
            cor = 'white'
            break
        case '5%':
        case '00mΩ':
            cor = 'gold'
            break
        case '10%':
        case '0mΩ':
            cor = 'silver'
            break
    }
    faixa.style.backgroundColor = cor
    calcular()
}

function calcular() {
    let res = `${faixa1.value}${faixa2.value}${faixa3.value} ±${faixa4.value}`
    result.innerHTML = `<p>${res}</p>`
}