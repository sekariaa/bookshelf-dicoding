const localStorageKey = 'BOOKS_DATA'

const btnSubmit = document.getElementById('bookSubmit')

const searchValue = document.getElementById('searchBookTitle')
const btnSearch = document.getElementById('searchSubmit')

const title = document.getElementById('inputBookTitle')
const author = document.getElementById('inputBookAuthor')
const year = document.getElementById('inputBookYear')

const errorTitle = document.getElementById('errorTitle')
const errorAuthor = document.getElementById('errorAuthor')
const errorYear = document.getElementById('errorYear')

const sectionTitle = document.getElementById('sectionInputBookTitle')
const sectionAuthor = document.getElementById('sectionInputAuthor')
const sectionYear = document.getElementById('sectionInputYear')

const readed = document.getElementById('inputBookIsComplete')

let checkInput = []
let checkTitle = null
let checkAuthor = null
let checkYear = null

window.addEventListener('load', function () {
	if (this.localStorage.getItem(localStorageKey) !== null) {
		const booksData = getData()
		showData(booksData)
	}
})

btnSubmit.addEventListener('click', function () {
	if (btnSubmit.value == '') {
		checkInput = []

		title.classList.remove('error')
		author.classList.remove('error')
		year.classList.remove('error')

		errorTitle.classList.add('error-display')
		errorAuthor.classList.add('error-display')
		errorYear.classList.add('error-display')

		if (title.value == '') {
			checkTitle = false
		} else {
			checkTitle = true
		}

		if (author.value == '') {
			checkAuthor = false
		} else {
			checkAuthor = true
		}

		if (year.value == '') {
			checkYear = false
		} else {
			checkYear = true
		}

		checkInput.push(checkTitle, checkAuthor, checkYear)
		let resultCheck = validation(checkInput)

		if (resultCheck.includes(false)) {
			return false
		} else {
			const newBook = {
				id: +new Date(),
				title: title.value.trim(),
				author: author.value.trim(),
				year: parseInt(year.value),
				isCompleted: readed.checked,
			}
			insertData(newBook)

			title.value = ''
			author.value = ''
			year.value = ''
			readed.checked = false
		}
	} else {
		const bookData = getData().filter((a) => a.id != btnSubmit.value)
		localStorage.setItem(localStorageKey, JSON.stringify(bookData))

		const newBook = {
			id: btnSubmit.value,
			title: title.value.trim(),
			author: author.value.trim(),
			year: parseInt(year.value),
			isCompleted: readed.checked,
		}
		insertData(newBook)
		btnSubmit.innerHTML = 'Insert Book'
		btnSubmit.value = ''
		title.value = ''
		author.value = ''
		year.value = ''
		readed.checked = false
		alert('The book has been successfully edited')
	}
})

btnSearch.addEventListener('click', function (e) {
	e.preventDefault()
	if (localStorage.getItem(localStorageKey) == null) {
		return alert('There is no book data')
	} else {
		const getByTitle = getData().filter((a) => a.title == searchValue.value.trim())
		if (getByTitle.length == 0) {
			const getByAuthor = getData().filter((a) => a.author == searchValue.value.trim())
			if (getByAuthor.length == 0) {
				const getByYear = getData().filter((a) => a.year == searchValue.value.trim())
				if (getByYear.length == 0) {
					alert(`No data found with keywords: ${searchValue.value}`)
				} else {
					showSearchResult(getByYear)
				}
			} else {
				showSearchResult(getByAuthor)
			}
		} else {
			showSearchResult(getByTitle)
		}
	}

	searchValue.value = ''
})

function validation(check) {
	let resultCheck = []

	check.forEach((a, i) => {
		if (a == false) {
			if (i == 0) {
				title.classList.add('error')
				errorTitle.classList.remove('error-display')
				resultCheck.push(false)
			} else if (i == 1) {
				author.classList.add('error')
				errorAuthor.classList.remove('error-display')
				resultCheck.push(false)
			} else {
				year.classList.add('error')
				errorYear.classList.remove('error-display')
				resultCheck.push(false)
			}
		}
	})

	return resultCheck
}

function insertData(book) {
	let bookData = []

	if (localStorage.getItem(localStorageKey) == null) {
		localStorage.setItem(localStorageKey, 0)
	} else {
		bookData = JSON.parse(localStorage.getItem(localStorageKey))
	}

	bookData.unshift(book)
	localStorage.setItem(localStorageKey, JSON.stringify(bookData))
	showData(getData())
}

function getData() {
	return JSON.parse(localStorage.getItem(localStorageKey)) || []
}

function showData(books = []) {
	const inCompleted = document.querySelector('#incompleteBookshelfList')
	const completed = document.querySelector('#completeBookshelfList')

	inCompleted.innerHTML = ''
	completed.innerHTML = ''

	books.forEach((book) => {
		if (book.isCompleted == false) {
			let el = `
            <article class="book-item">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>

            <div class="action">
                <button class="green" onclick="readedBook('${book.id}')">Done Reading</button>
                <button class="blue" onclick="editBook('${book.id}')">Edit Book</button>
                <button class="red" onclick="deleteBook('${book.id}')">Remove Book</button>
            </div>
        </article>`

			inCompleted.innerHTML += el
		} else {
			let el = `
            <article class="book-item">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Year: ${book.year}</p>

                <div class="action">
                    <button class="green" onclick="unreadedBook('${book.id}')">Not Finished Reading</button>
                    <button class="blue" onclick="editBook('${book.id}')">Edit Book</button>
                    <button class="red" onclick="deleteBook('${book.id}')">Remove Book</button>
                </div>
            </article>
            `
			completed.innerHTML += el
		}
	})
}

function showSearchResult(books) {
	const searchResult = document.querySelector('#searchResult')

	searchResult.innerHTML = ''

	books.forEach((book) => {
		let el = `
        <article class="book-item">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <p>${book.isCompleted ? 'Done Reading' : 'Not Finished Reading'}</p>
        </article>
        `
		searchResult.innerHTML += el
	})
}

function readedBook(id) {
	let confirmation = confirm('Move to Finished Reading?')

	if (confirmation == true) {
		const bookDataDetail = getData().filter((a) => a.id == id)
		const newBook = {
			id: bookDataDetail[0].id,
			title: bookDataDetail[0].title,
			author: bookDataDetail[0].author,
			year: bookDataDetail[0].year,
			isCompleted: true,
		}

		const bookData = getData().filter((a) => a.id != id)
		localStorage.setItem(localStorageKey, JSON.stringify(bookData))

		insertData(newBook)
	} else {
		return 0
	}
}

function unreadedBook(id) {
	let confirmation = confirm('Move to Unfinished Reading?')

	if (confirmation == true) {
		const bookDataDetail = getData().filter((a) => a.id == id)
		const newBook = {
			id: bookDataDetail[0].id,
			title: bookDataDetail[0].title,
			author: bookDataDetail[0].author,
			year: bookDataDetail[0].year,
			isCompleted: false,
		}

		const bookData = getData().filter((a) => a.id != id)
		localStorage.setItem(localStorageKey, JSON.stringify(bookData))

		insertData(newBook)
	} else {
		return 0
	}
}

function editBook(id) {
	const bookDataDetail = getData().filter((a) => a.id == id)
	title.value = bookDataDetail[0].title
	author.value = bookDataDetail[0].author
	year.value = bookDataDetail[0].year
	bookDataDetail[0].isCompleted ? (readed.checked = true) : (readed.checked = false)

	btnSubmit.innerHTML = 'Edit Book'
	btnSubmit.value = bookDataDetail[0].id
}

function deleteBook(id) {
	let confirmation = confirm('Are You Sure Want to Delete It?')

	if (confirmation == true) {
		const bookDataDetail = getData().filter((a) => a.id == id)
		const bookData = getData().filter((a) => a.id != id)
		localStorage.setItem(localStorageKey, JSON.stringify(bookData))
		showData(getData())
		alert(`The ${bookDataDetail[0].title} Book Has Been Deleted`)
	} else {
		return 0
	}
}
