function relogio() {

    let pontHora = document.getElementById('h')
    let pontMinuto = document.getElementById('m')
    let pontSegundo = document.getElementById('s')

    setInterval(() => {

        let tempo = new Date()
        let segundos = tempo.getSeconds()
        let minutos = tempo.getMinutes()
        let horas = tempo.getHours()

        pontHora.style.rotate = `${horas < 12 ? horas * 30 : (horas - 12) * 30}deg`
        pontMinuto.style.rotate = `${minutos * 6}deg`
        pontSegundo.style.rotate = `${segundos * 6}deg`
        
    }, 1000);
}