class Book {
    constructor(title, author, isbn, year, pages, abstract){
        this.title = title
        this.author = author
        this.isbn = isbn
        this.year = year
        this.pages = pages
        this.abstract = abstract
    }
}

class BookStock {
    

    static saveBook(newBook){
        if(!BookStock.ISBNAvailable(newBook)){
            alert("yes")
            let alertISBN = document.createElement("button")
            alertISBN.type ="button"
            alertISBN.id = "isbn-alert"
            alertISBN.classList = "btn btn-warning"
            alertISBN.style.display = "block"
            alertISBN.style.width = "100%"
            alertISBN.style.marginTop = "5px"
            alertISBN.innerHTML = `L'ISBN ${newBook.isbn} est non disponible et est déja dans la base de données`
            document.querySelector("#book-form").appendChild(alertISBN)
            return false
        }
        let books = BookStock.getBooks()
        console.log("ici")
        if(books !== null){
            books.push(newBook)
            books = JSON.stringify(books)
            localStorage.setItem("books", books)
        }else{
            let books = []
            books.push(newBook)
            books = JSON.stringify(books)
            localStorage.setItem("books", books)
                
        }
        return true
    }

    static deleteBook(isbn){
        let books = BookStock.getBooks()
        let booksTosave = books.filter(book => {
            book.isbn !== isbn   
        })

        booksTosave = JSON.stringify(booksTosave)
        localStorage.setItem("books", booksTosave)
    }

    static ISBNAvailable(newBook){
        let books = BookStock.getBooks(), available = true
        if(books == null){
            return available;
        }
        for (let i = 0; i < books.length; i++) {
            if(books[i].isbn == newBook.isbn){
                available =  false
                break
            }      
        }
       
        return available
    }

    static getBooks(){
        let books = null
        if(localStorage.getItem("books") !== null){
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books
    }
}

class BookValidator {

    static titleValidator(title){
        if(title.value === ""){
            BookValidator.createDangerSpanElement(title)
        }else{
            return true
        }
    }
    static authorValidator(author){
        if(author.value === ""){
            BookValidator.createDangerSpanElement(author)
        }else{
            
            return true
        }
    }
    static isbnValidator(isbn){
        if(isbn.value === ""){
            BookValidator.createDangerSpanElement(isbn)
        }else{
            return true
        }
    }

    static yearValidator(year){
        if(year.value === ""){
            BookValidator.createDangerSpanElement(year)
        }else{
            return true
        }
    }
    static pagesValidator(pages){
        if(pages.value === ""){
            BookValidator.createDangerSpanElement(pages)
        }else{
            return true
        }
    }

    static abstractValidator(abstract){
        if(abstract.value === ""){
            BookValidator.createDangerSpanElement(abstract)
        }else{
            return true
        }
    }
    static createDangerSpanElement(elemntAfter){
        let span = document.createElement("span")
        span.classList = "text-danger errors"
        span.innerHTML = `le champ ${elemntAfter.id} ne peut être vide`
        elemntAfter.parentNode.insertBefore(span, elemntAfter)
    }
}

class TableUpdator {
    static addLine(book){
        let tableBody = document.querySelector("#book-list")
        let tr = document.createElement("tr")
        for (let key in book){
            if(typeof(book[key] !== "function")){
                let td = document.createElement("td")
                td.innerHTML = book[key]
                tr.appendChild(td)
            }
        }
        let tdSuppresion = document.createElement("td")
        tdSuppresion.innerHTML = `<a href="#" id="${book.isbn}" class="delete-books"><i class="far fa-trash-alt"></i></a>`
        tr.appendChild(tdSuppresion)
        tableBody.appendChild(tr)
        
        
    }
    static addBooksToTbody(books){
        let tableBody = document.querySelector("#book-list")
        
        books.forEach(book => {
            let tr = document.createElement("tr")
            for (let key in book){
                if(typeof(book[key] !== "function")){
                    let td = document.createElement("td")
                    td.innerHTML = book[key]
                    tr.appendChild(td)
                }
            }
            let tdSuppresion = document.createElement("td")
            tdSuppresion.innerHTML = `<a href="#" id="${book.isbn}" class="delete-books"><i class="far fa-trash-alt"></i></a>`
            tr.appendChild(tdSuppresion)
            tableBody.appendChild(tr)
        })
        
        
        
    }
    static removeLine(link){
        let tableBody = document.querySelector("#book-list")
        tableBody.removeChild(link.parentNode.parentNode)
    }
}
const title = document.querySelector("#title")
const isbn = document.querySelector("#isbn")
const author = document.querySelector("#author")
const year = document.querySelector("#year")
const pages = document.querySelector("#pages")
const abstract = document.querySelector("#abstract")
let deleteLinks = document.querySelectorAll(".delete-books")

const submitBtn = document.querySelector("input[type='submit'")
const deleteTr = function(e){
    e.preventDefault()
    BookStock.deleteBook(this.id)
    TableUpdator.removeLine(this)
    deleteLinks = document.querySelectorAll(".delete-books")
    deleteLinks.forEach(deleteLink => {
        deleteLink.addEventListener("click", deleteTr)
    })
}

// functions

const formSubmit = function(e){
    e.preventDefault()
    let errors = document.querySelectorAll(".errors")
    if(errors !== null){
        errors.forEach(error => error.parentNode.removeChild(error))
    }

    let isbnAlert = document.querySelector("#isbn-alert")
    if(isbnAlert !== null){
        isbnAlert.parentNode.removeChild(isbnAlert)
    }
    // console.log(BookValidator.authorValidator(author))
    if(BookValidator.titleValidator(title) && BookValidator.isbnValidator(isbn) && BookValidator.authorValidator(author) 
    && BookValidator.yearValidator(year) && BookValidator.pagesValidator(pages) && BookValidator.abstractValidator(abstract)){
        let book = new Book(title.value, author.value, isbn.value, year.value, pages.value, abstract.value)
        
        if(BookStock.saveBook(book)){
            TableUpdator.addLine(book)
            deleteLinks = document.querySelectorAll(".delete-books")
            deleteLinks.forEach(deleteLink => {
                deleteLink.addEventListener("click", deleteTr)
            })
        }
        
    }

}
submitBtn.addEventListener("click", formSubmit)
TableUpdator.addBooksToTbody(BookStock.getBooks())
deleteLinks = document.querySelectorAll(".delete-books")
deleteLinks.forEach(deleteLink => {
    deleteLink.addEventListener("click", deleteTr)
})
// console.log(submitBtn)


