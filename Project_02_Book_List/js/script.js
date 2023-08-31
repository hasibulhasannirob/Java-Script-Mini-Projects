// UI element
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list')
// Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    static addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" style="color: #f72f2f; font-weight: bold;">X</a></td>`;

        list.appendChild(row);
    }
    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {

        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteFromList(target) {

        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book removed successfully!', 'remove');
        }
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayBooks() {
        let books = Store.getBooks();


        books.forEach(book => {
            UI.addToBookList(book);
        });
    }
    static removeBook(isbn) {
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event listener 
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());
// Functions
function newBook(e) {

    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;


    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all the fields!', 'error');
    } else {
        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearField();
        UI.showAlert('Book added successfully!', 'success');
        Store.addBook(book);
    }

    e.preventDefault();
}

function removeBook(e) {


    UI.deleteFromList(e.target);
    e.preventDefault();
}