const book_container = document.getElementById('book_container');
const f_title = document.forms[0].title;
const f_author = document.forms[0].author;
const addBtn = document.forms[0].add;

const stored_books = JSON.parse(localStorage.getItem('storedBook'));
const awesome_books = stored_books || [];

const add_book = (book) => {
    const _title = document.createElement('p');
    const _author = document.createElement('p');
    const new_book = document.createElement('div');
    const button = document.createElement('button');
    const hr = document.createElement('hr');

    _title.classList.add('title');
    _author.classList.add('author');
    button.classList.add('remove');

    _title.textContent = book.title;
    _author.textContent = book.author;
    button.textContent = 'Remove';

    new_book.appendChild(_title);
    new_book.appendChild(_author);
    new_book.appendChild(button);
    new_book.appendChild(hr);

    book_container.appendChild(new_book);
};

awesome_books.forEach((book) => {
    add_book(book);
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const new_book = {
        title: f_title.value,
        author: f_author.value,
    };
    awesome_books.push(new_book);
    localStorage.setItem('storedBook', JSON.stringify(awesome_books));

    add_book(new_book);

    f_title.value = '';
    f_author.value = '';
});

const rm_book = (e) => {
    if (e.target.classList.contains('remove')) {
        const removing_book = awesome_books.find(
            (book) => book.title === e.target.parentElement.firstChild.textContent,
        );

        awesome_books.splice(awesome_books.indexOf(removing_book), 1);
        localStorage.setItem('storedBook', JSON.stringify(awesome_books));

        book_container.innerHTML = '';
        awesome_books.forEach((book) => {
            add_book(book);
        });
    }
};

book_container.addEventListener('click', rm_book);
