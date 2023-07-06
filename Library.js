const container = document.querySelector(".container");
const addBookButton = document.querySelector("#addBook");
const newBookForm = document.querySelector("#newBookForm");
const newBookButton = document.querySelector("#newBookButton");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const numPageInput = document.getElementById("numPageInput");
const readStatusInputYes = document.querySelector('input[type="radio"]#isRead');

class Book{
    constructor(title, author, numPages, read){
        this.title = title,
        this.author = author,
        this.numPages = numPages,
        this.read = read
    }
}

let myLibrary = [];


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayNewBook(card){
    const libraryCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const numPages = document.createElement('div');
    const readStatus = document.createElement('div'); 
    const removeBookButton = document.createElement('button');
    const changeReadStatusButton = document.createElement('button');

    title.setAttribute('style', 'font-size: 150%; font-weight: bolder; display: flex; justify-content: center; margin-bottom: 10px;');


    libraryCard.appendChild(title);
    libraryCard.appendChild(author);
    libraryCard.appendChild(numPages);
    libraryCard.appendChild(readStatus);

    removeBookButton.setAttribute('id', 'removeBook');
    removeBookButton.innerHTML = '&times';

    changeReadStatusButton.setAttribute('id', 'readBookUpdate');
    changeReadStatusButton.innerHTML = 'Read';

    libraryCard.appendChild(removeBookButton);
    libraryCard.appendChild(changeReadStatusButton);

    libraryCard.setAttribute('style', 'height: 220px; width: 180px; color: #78350f; background-color: rgba(84, 35, 1, 0.4); border: none; border-radius: 10px; display: flex; flex-direction: column; align-items: center; padding: 25px 15px; gap: 20px; font-weight: bold; position: relative;');
    title.textContent = `${card.title}`;
    author.textContent = `Author: ${card.author}`;
    numPages.textContent = `Number of Pages: ${card.numPages}`;
    if (card.read == true){
        readStatus.textContent = `Read Status: Read`;
    } else{
        readStatus.textContent = `Read Status: Not Read`;
    }

    myLibrary.forEach((data, index) => {
        libraryCard.setAttribute('data-index', index);
    });

    removeBookButton.addEventListener('click', () => {
        const dataIndex = parseInt(libraryCard.getAttribute('data-index'), 10);
        myLibrary.splice(dataIndex, 1);
        container.removeChild(libraryCard);
    });

    changeReadStatusButton.addEventListener('click', () => {
        card.read = true;
        if (card.read == true){
            readStatus.textContent = `Read Status: Read`;
        } else{
            readStatus.textContent = `Read Status: Not Read`;
        }
    
    });

    container.appendChild(libraryCard);
}


addBookButton.addEventListener('click', () => {
    if (newBookForm.style.display === "none"){
        newBookForm.style.display = "flex";
    } else {
        newBookForm.style.display = 'none';
    }
});

newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const numPage = numPageInput.value;
    let isRead;

    if(readStatusInputYes.checked) {
        isRead = true;
    } else {
        isRead = false;
    }
    const newBook = new Book(title, author, numPage, isRead);
    addBookToLibrary(newBook);

    console.log(myLibrary);

    titleInput.value = '';
    authorInput.value = '';
    numPageInput.value = '';

    newBookForm.style.display = 'none';

    let newestBook = myLibrary[myLibrary.length - 1];

    displayNewBook(newestBook);


});

