const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".calendar-navigation span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let reference = new Date('2024/01/02');//Turno começa numa manhã
var listaFeriados; //lista obtida via API

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function renderCalendar() {    
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    const firstDateofMonth = new Date(currYear, currMonth, 1)
    let liTag = "";
    let indiceTurno = (firstDateofMonth-reference)/1000/60/60/24%10    
    let turno = ''
    let diasMesQVem = 13 //Máximo de dias do pŕoximo mês exibidos no calendário
                         //Para manter o número de semanas exibidas fixas em 6

    if (indiceTurno < 0) indiceTurno = 10 + indiceTurno
    //começa no sábado e não é fevereiro ou começa na sexta e tem 31 dias
    if (firstDayofMonth == 6 && currMonth != 1 || firstDayofMonth == 5 && lastDateofMonth == 31) { 
        diasMesQVem = 6  
    } else if (lastDateofMonth == 28 && firstDayofMonth == 0) { //fevereiro de ano bissexto e começa no domingo
        diasMesQVem = 20
    }

    for (let i = firstDayofMonth; i > 0; i--) {

        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;

    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isHoliday = ''
        let description = ''
        let tagAbbr = ''
        let fechaAbbr = ''

        if (indiceTurno > -1 && indiceTurno < 2) turno = ' manha'
        else if (indiceTurno < 4) turno = ' tarde'
        else if (indiceTurno < 6) turno = ' noite'
        else turno = ''
        
        for (let feriado = 0 ; feriado < listaFeriados.length ; feriado++) {
            if (new Date(listaFeriados[feriado].date+"T03:00:00.000Z").toLocaleDateString() == new Date(currYear, currMonth, i).toLocaleDateString()) {
                isHoliday = ' feriado';
                description = `${listaFeriados[feriado].type.charAt(0).toUpperCase()+listaFeriados[feriado].type.slice(1)}  ${listaFeriados[feriado].level}:  ${listaFeriados[feriado].name}`;
                tagAbbr = `<abbr title="${description}">`
                fechaAbbr = '</abbr>';                
            }
        }

        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                      && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}${turno}${isHoliday}">${tagAbbr}${i}${fechaAbbr}</li>`;

        indiceTurno++
        if (indiceTurno == 10) indiceTurno = 0
    }

    for (let i = lastDayofMonth; i < diasMesQVem ; i++) {

        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;

    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

function obterFeriados() {
    const ajax = new XMLHttpRequest();
    
    ajax.onload = function () {
        listaFeriados = JSON.parse(this.responseText); 
        //alert(listaFeriados.length);  
        renderCalendar();     
    }

    ajax.open('GET', `https://api.invertexto.com/v1/holidays/${currYear}?token=16211|bz6VfM9tYxsIgGZxH5x2GEcFbqVcjyMH&state=SP`);
    ajax.send();
}

obterFeriados();


prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
            obterFeriados();
        } else {
            date = new Date();
            renderCalendar();
        }
        
    });
});

// Adicionar funcionalidade de clique nos dias
daysTag.addEventListener("click", (e) => {
    if(e.target.tagName === "LI" && !e.target.classList.contains("inactive")) {
        const selectedDay = e.target.innerText;
        const selectedDate = new Date(currYear, currMonth, selectedDay);
        console.log(`Data selecionada: ${selectedDate.toLocaleDateString('pt-BR')}`);
        
        // Remove classe active de qualquer dia anteriormente selecionado
        document.querySelectorAll(".days li").forEach(day => {
            if(!day.classList.contains("inactive")) {
                day.classList.remove("active");
            }
        });
        
        // Adiciona classe active ao dia selecionado
        e.target.classList.add("active");
    }
});

