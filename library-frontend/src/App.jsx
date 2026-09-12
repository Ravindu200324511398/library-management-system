import { useEffect, useState } from "react";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

import {
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "./services/bookService";


function App() {

    const [books, setBooks] = useState([]);

    const [editingBook, setEditingBook] = useState(null);

    const [error, setError] = useState("");


    // =========================
    // GET ALL BOOKS
    // =========================

    async function loadBooks() {

        try {

            setError("");

            const data = await getBooks();

            setBooks(data);

        } catch (error) {

            console.error(error);

            setError("Failed to load books.");

        }
    }


    // =========================
    // LOAD BOOKS WHEN APP STARTS
    // =========================

    useEffect(() => {

        loadBooks();

    }, []);


    // =========================
    // CREATE / UPDATE BOOK
    // =========================

    async function handleBookSaved(book) {

        try {

            setError("");

            if (editingBook) {

                // UPDATE
                await updateBook(editingBook.id, book);

                setEditingBook(null);

            } else {

                // CREATE
                await createBook(book);

            }

            // Reload books from backend
            await loadBooks();

        } catch (error) {

            console.error(error);

            setError("Failed to save book.");

            throw error;
        }
    }


    // =========================
    // EDIT BOOK
    // =========================

    function handleEdit(book) {

        setEditingBook(book);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // =========================
    // CANCEL EDIT
    // =========================

    function handleCancelEdit() {

        setEditingBook(null);

    }


    // =========================
    // DELETE BOOK
    // =========================

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteBook(id);

            await loadBooks();

        } catch (error) {

            console.error(error);

            setError("Failed to delete book.");

        }
    }


    return (

        <div className="app">

            <header>

                <h1>
                    📚 Library Management System
                </h1>

                <p>
                    Manage your library books
                </p>

            </header>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            <main>

                <BookForm
                    onBookSaved={handleBookSaved}
                    editingBook={editingBook}
                    onCancelEdit={handleCancelEdit}
                />


                <BookList
                    books={books}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </main>

        </div>
    );
}

export default App;