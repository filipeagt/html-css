function sortear() {
    let numeros = [0,0,0,0,0,0];

    let cont = 0;
    while(cont < 6) {
        let num = Math.floor(Math.random()*60 + 1);
        if(!numeros.includes(num)) {
            numeros[cont] = num;
            cont++;
        }
    }

    numeros.sort((a,b)=>{return a-b});

    for(let i=1; i<=6; i++) {
        let nTela = document.getElementById(`n${i}`);
        nTela.innerText = numeros[i-1];
    }
}