# Bookshelf App

This repository contains the code for the Bookshelf App, which is a web application for managing your book collection. This app allows you to add, edit, search, and categorize your books as either "Done Reading" or "Not Finished Reading."

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Description

The Bookshelf App is a web application built as part of the ["Belajar Membuat Front-End Web untuk Pemula"](https://www.dicoding.com/academies/315) course on Dicoding. It provides a simple and intuitive interface for users to manage their book collections. The app allows users to:

- Add new books, including details such as title, author, publication year, and whether the book is completed or not.
- Edit existing books.
- Search for books by title, author, or publication year.
- Categorize books as "Done Reading" or "Not Finished Reading."

The app uses local storage to persist book data, ensuring that your collection is saved between sessions.

## Features

- **Add New Books:** You can easily add new books to your collection by providing the title, author, publication year, and marking if you've completed reading it.

- **Edit Books:** If you want to update the details of a book, you can do so by clicking the "Edit Book" button.

- **Search Books:** The app allows you to search for books by title, author, or publication year, helping you quickly find specific books in your collection.

- **Categorize Books:** You can categorize books as "Done Reading" or "Not Finished Reading" to keep track of your progress.

## Getting Started

To get started with the Bookshelf App on your local machine, follow these steps:

1. Clone this repository to your local machine using your preferred method (HTTPS or SSH):

   ```bash
   git clone https://github.com/your-username/bookshelf-app.git
   ```

2. Open the project directory:

   ```bash
   cd bookshelf-app
   ```

3. Open the `index.html` file in your web browser to run the application.

## Usage

1. **Adding a New Book:**

   - Open the app in your web browser.
   - On the "Enter New Book" section, fill in the book's title, author, publication year, and mark whether you've completed reading it.
   - Click the "Submit" button to add the book to your collection.

2. **Editing a Book:**

   - To edit an existing book's details, click the "Edit Book" button next to the book you want to edit.
   - Modify the book's details in the form that appears.
   - Click the "Edit Book" button again to save your changes.

3. **Searching for Books:**

   - In the "Search Book" section on the right, enter a keyword (title, author, or publication year) in the input field.
   - Click the "Search" button to search for books that match the keyword.
   - The search results will be displayed below the search form.

4. **Categorizing Books:**

   - Books are automatically categorized as "Not Finished Reading" when added.
   - To change the category of a book, click the "Done Reading" or "Not Finished Reading" button next to the book in the respective bookshelf section.

5. **Deleting a Book:**

   - To delete a book, click the "Remove Book" button next to the book you want to delete.
   - A confirmation dialog will appear; click "OK" to confirm the deletion.
