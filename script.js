const book_list = document.getElementById('book_list');
const initialData = document.getElementById('initialData');

class BookCollection {
    constructor(container) {
        this.books = [];
        this.container = container;
        this.books.forEach((book) => this.add_to_page(book));
        this.check_storage('localStorage');
        this.initialData();
        this.storage = null;
    }

    add_to_page(data) {
        const {title, author } = data;

        this.container.innerHTML += `
    <div>
      <h3>${title}</h3>
      <p>${author}</p>
      <button class="removeBookBtn">Remove</button>
      <hr>
      </div>
    `;
        this.updateEventListeners(this.container);
    }

    addBook(data) {
        const { title, author } = data;

        this.books.push({
            title,
            author,
        });

        this.u_storage();

        this.add_to_page(data);
    }

    updateEventListeners(element = document) {
        const remove_btn = element.querySelectorAll('.removeBookBtn');

        remove_btn.forEach((removeBtn) => {
            removeBtn.addEventListener('click', (e) => {
                const { parentNode } = e.target;
                this.removeBook(parentNode.title);
                parentNode.remove();
            });
        });
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
        this.u_storage();
    }

    initialData() {
        if (this.storage) {
            const l_data = window.localStorage.get_book('books');
            if (l_data) {
                this.books = JSON.parse(l_data);
            }
        }
    }

    check_storage(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.set_book(x, x);
            storage.remove_book(x);
            this.storage = true;
        } catch (e) {
            this.storage = false;
        }
    }

    u_storage() {
        if (this.storage) {
            const storage = window.localStorage;
            storage.set_book('books', JSON.stringify(this.books));
        }
    }
}

const bookCollection = new BookCollection(book_list);

initialData.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = initialData.title.value.trim();
    const author = initialData.author.value.trim();

    bookCollection.addBook({
        title,
        author,
    });

    initialData.title.value = '';
    initialData.author.value = '';
});

