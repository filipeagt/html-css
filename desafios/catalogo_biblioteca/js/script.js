async function getLivros(pesquisa='', autor_id='', genero_id='') {
  let addr = `https://bibliotecasocial.pythonanywhere.com/catalogo/api/livros/`;
  if (pesquisa != '') addr += `?pesquisa=${pesquisa}`;
  if (autor_id != '') addr += `?autor_id=${autor_id}`;
  if (genero_id != '') addr += `?genero_id=${genero_id}`;
  const url = addr;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const bookList = await response.json();

    const bookListSection = document.querySelector('#book-list .row');
    const itemsPerPage = 10;
    let currentPage = 1;

    function displayBooks(page) {
      bookListSection.innerHTML = ''; // Limpa a lista de livros

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const booksToDisplay = bookList.slice(startIndex, endIndex);

      booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card', 'col-sm-6', 'col-md-4'); 

        bookCard.innerHTML = `
          <img src="${book.capa}" alt="${book.título}" class="img-fluid">
          <h3>${book.título}</h3>
          <p><strong>Autor:</strong> ${book.autor.nome} ${book.autor.sobrenome}</p>
        `;

        bookListSection.appendChild(bookCard);
      });
    }

    function updatePaginationButtons() {
      const totalPages = Math.ceil(bookList.length / itemsPerPage);
      const paginationElement = document.querySelector('.pagination');

      // Remover a classe 'active' de todos os itens de página
      paginationElement.querySelectorAll('.page-item').forEach(item => item.classList.remove('active'));

      // Marcar a página atual como ativa
      const currentPageItem = document.getElementById(`page-${currentPage}`);
      if (currentPageItem) {
        currentPageItem.classList.add('active');
      }

      // Habilitar ou desabilitar os botões de "Próxima" e "Anterior"
      document.getElementById('previous-page').classList.toggle('disabled', currentPage === 1);
      document.getElementById('next-page').classList.toggle('disabled', currentPage === totalPages);

      // Atualizar os atributos 'data-page' dos botões de navegação
      document.getElementById('next-page').querySelector('a').setAttribute('data-page', currentPage);
      document.getElementById('previous-page').querySelector('a').setAttribute('data-page', currentPage);

      // Criar os botões de página dinamicamente, se necessário
      for (let i = 1; i <= totalPages; i++) {
        let pageItem = document.getElementById(`page-${i}`);
        if (!pageItem) {
          pageItem = document.createElement('li');
          pageItem.classList.add('page-item');
          pageItem.id = `page-${i}`;
          pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
          paginationElement.insertBefore(pageItem, document.getElementById('next-page'));
        }
      }
    }

    // Configuração inicial
    displayBooks(currentPage);
    updatePaginationButtons();

    // Event listeners para os botões de navegação por número de página
    document.querySelectorAll('.pagination .page-link').forEach(item => {
      item.addEventListener('click', function(event) {
        event.preventDefault();
        const page = parseInt(this.getAttribute('data-page'));
        if (page !== currentPage) {
          currentPage = page;
          displayBooks(currentPage);
          updatePaginationButtons();
        }
      });
    });

    // Event listeners para os botões de "Próxima" e "Anterior"
    document.getElementById('next-page').addEventListener('click', function(event) {
      event.preventDefault();
      if (currentPage < Math.ceil(bookList.length / itemsPerPage)) {
        currentPage++; // Avança uma página
        displayBooks(currentPage);
        updatePaginationButtons();
      }
    });

    document.getElementById('previous-page').addEventListener('click', function(event) {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage--; // Retrocede uma página
        displayBooks(currentPage);
        updatePaginationButtons();
      }
    });

  } catch (error) {
    console.error(error.message);
  }
}

function pesquisar() {
  let pesquisa = document.getElementById('pesquisa').value;
  
  const main = document.getElementById('main');
  main.innerHTML = 
   `<section id="book-list">
      <h1>Resultados da pesquisa</h1>
      <div class="row">
        <!-- Livros serão adicionados aqui via JavaScript -->
      </div>
    </section>

    <!-- Paginação -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled" id="previous-page">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
        </li>
        <li class="page-item active" aria-current="page" id="page-1"><a class="page-link" href="#" data-page="1">1</a></li>
        
        <li class="page-item disabled" id="next-page">
          <a class="page-link" href="#" data-page="2">Próxima</a>
        </li>
      </ul>
    </nav>`;

  getLivros(pesquisa);
}

function seenter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('btn-pesquisa').click();
  }
}

async function listaAutores(id='') {
  const url = "https://bibliotecasocial.pythonanywhere.com/catalogo/api/autores/" + id;
  const autor_list = document.getElementById('autor-list');
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const autores = await response.json();
    // console.log(autores)
    if(id == '') {
      autor_list.innerHTML = '<h1 class="mb-3">Autores</h1>';
      autor_list.innerHTML += '<ul class="list-group">';
      for(let autor in autores) {
        autor_list.innerHTML += `<button class="list-group-item list-group-item-action" onclick="listaAutores('${autores[autor].id}')">${autores[autor].nome} ${autores[autor].sobrenome}</button>`;
      }
      autor_list.innerHTML += '</ul>';
    }
    else {
      const main = document.getElementById('main');
      main.innerHTML = 
     `<section id="book-list">
        <h1>Autor</h1>
        <h2>${autores.nome} ${autores.sobrenome}</h2>
        <div class="row">
          <!-- Livros serão adicionados aqui via JavaScript -->
        </div>
      </section>

      <!-- Paginação -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled" id="previous-page">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
          </li>
          <li class="page-item active" aria-current="page" id="page-1"><a class="page-link" href="#" data-page="1">1</a></li>
          
          <li class="page-item disabled" id="next-page">
            <a class="page-link" href="#" data-page="2">Próxima</a>
          </li>
        </ul>
      </nav>`;
      getLivros('',autores.id);
    }

  } catch (error) {
    console.error(error.message);
  }
}