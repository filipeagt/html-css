function relogio() {
    
    let display = document.getElementById('relogio')
    let separador = ':'
    
    setInterval(() => {
        let tempo = new Date()
        let segundos = tempo.getSeconds()
        let minutos = tempo.getMinutes()
        let horas = tempo.getHours()
        separador = separador == ':'? ' ' : ':'

        display.innerText = `${horas<10?'0'+horas:horas}${separador}${minutos<10?'0'+minutos:minutos}${separador}${segundos<10?'0'+segundos:segundos}`
    }, 500);

}