document.addEventListener('DOMContentLoaded', function() {

  async function getData() {
    const url = "https://bibliotecasocial.pythonanywhere.com/catalogo/api/livros/";
    try {
      const response = await fetch(url);
      type: 
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      const bookList = json;

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
          document.querySelectorAll('.page-item').forEach(item => item.classList.remove('active'));
          document.getElementById(`page-${currentPage}`).classList.add('active');

        const totalPages = Math.ceil(bookList.length / itemsPerPage);
        document.getElementById('previous-page').classList.toggle('disabled', currentPage === 1);
        document.getElementById('next-page').classList.toggle('disabled', currentPage === totalPages);

            document.getElementById('next-page').querySelector('a').setAttribute('data-page', currentPage + 1);
            document.getElementById('previous-page').querySelector('a').setAttribute('data-page', currentPage - 1);
      }

      // Configuração inicial
      displayBooks(currentPage);
      updatePaginationButtons();

      // Event listeners para os botões de paginação
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
    } catch (error) {
      console.error(error.message);
    }
  }

  getData();
  
  
});