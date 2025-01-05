let contador = 0
let input = document.getElementById('inputTarefa')
let btnAdd = document.getElementById('btn-add')
let main = document.getElementById('areaLista')

function addItem() {
    let valorInput = input.value;
    if (valorInput !== "" && valorInput !== null && valorInput !== undefined) {
        ++contador
        console.log(contador)
        let novoItem = `<div id="${contador}" class="item">
            <div class="item-icone" onclick="marcarTarefa(${contador})">
                <i class="mdi mdi-circle-outline" id="icone_${contador}"></i>
            </div>
            <div class="item-nome" onclick="marcarTarefa(${contador})">
                ${valorInput}
            </div>
            <div class="item-botao">
                <button class="delete" onclick="deletar(${contador})"><i class="mdi mdi-delete"></i>Delete</button>
            </div>
        </div>`;
        main.innerHTML += novoItem
        input.value = ''
        input.focus()
    }
    salvarLista()
}

function deletar(id) {
    var tarefa = document.getElementById(id)
    tarefa.remove()
    salvarLista()
    if(main.innerHTML.toString() == '') {
        contador = 0
    }
}

function marcarTarefa(id) {
    var item = document.getElementById(id)
    var classe = item.getAttribute('class')
    // alert(classe)
    if (classe == 'item') {
        item.classList.add('clicado')

        var icone = document.getElementById(`icone_${id}`)
        icone.classList.remove('mdi-circle-outline')
        icone.classList.add('mdi-check-circle')

        item.parentNode.appendChild(item)
    } else {
        item.classList.remove('clicado')

        var icone = document.getElementById(`icone_${id}`)
        icone.classList.add('mdi-circle-outline')
        icone.classList.remove('mdi-check-circle')   
    }
    salvarLista()
}

input.addEventListener('keydown', function (event) {
    //Se teclou enter
    if (event.key === 'Enter') {
        event.preventDefault()
        btnAdd.click()
    }
})

function salvarLista() {
    localStorage.setItem('compras', main.innerHTML.toString())
    localStorage.setItem('contadorCompras', contador.toString())
}

function carregarLista() {
    main.innerHTML = localStorage.getItem('compras')
    contador = parseInt(localStorage.getItem('contadorCompras'))
}