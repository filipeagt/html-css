function relogio() {
    
    let display = document.getElementById('relogio')
    
    setInterval(() => {
        let tempo = new Date()
        let segundos = tempo.getSeconds()
        let minutos = tempo.getMinutes()
        let horas = tempo.getHours()


        display.innerText = `${horas<10?'0'+horas:horas}:${minutos<10?'0'+minutos:minutos}:${segundos<10?'0'+segundos:segundos}`
    }, 1000);

}