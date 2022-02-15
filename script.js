const list = document.getElementById('book_list');
const _add_book = document.getElementById('_add_book');

class book_Collection {
    constructor(books_container) {
        this.books = [];
        this.books_container = books_container;
        this._storage = false;
        this._check_storage('localStorage');
        this._init_data();
        this.books.forEach((book) => this.add_to_page(book));
    }

    add_to_collection(data) {
        const { id, title, author } = data;
        this.books.push({
            id,
            title,
            author,
        });

        this._u_storage();
        this.add_to_page(data);
    }

    add_to_page(data) {
        const { id, title, author } = data;

        this.books_container.innerHTML += `
    <li id ="${id}">
    <div class="_title">
      <h3>"${title}"</h3>
      </div>
      <div class="_author">
      <p><b><i>By : </b>${author}</i></p>
      </div>
      <button class="rm_book">Remove</button>
    </li>
    `;

        this.updateEventListeners(this.books_container);
    }

    updateEventListeners(element = document) {
        const _rm_btn = element.querySelectorAll('.rm_book');

        _rm_btn.forEach((_rmBtn) => {
            _rmBtn.addEventListener('click', (e) => {
                const { parentNode } = e.target;
                this.rm_book(parentNode.id);
                parentNode.remove();
            });
        });
    }

    rm_book(id) {
        this.books = this.books.filter((book) => book.id !== id);
        this._u_storage();
    }

    _init_data() {
        if (this._storage) {
            const localData = window.localStorage.getItem('books');
            if (localData) {
                this.books = JSON.parse(localData);
            }
        }
    }

    _check_storage(type) {
        let storage;
        try {
            storage = window[type];
            const st = '_test_storage_';
            storage.setItem(st, st);
            storage.rm_item(st);
            this._storage = true;
        } catch (e) {
            this._storage = false;
        }
    }

    _u_storage() {
        if (this._storage) {
            const storage = window.localStorage;
            storage.setItem('books', JSON.stringify(this.books));
        }
    }
}

const book_collection = new book_Collection(list);

_add_book.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now().toString();
    const title = _add_book.title.value.trim();
    const author = _add_book.author.value.trim();

    book_collection.add_to_collection({
        id,
        title,
        author,
    });

    _add_book.title.value = '';
    _add_book.author.value = '';
});
