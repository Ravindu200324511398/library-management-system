const API_URL = "http://localhost:8080/api/books";

// GET ALL BOOKS
export async function getBooks() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }

    return await response.json();
}


// CREATE BOOK
export async function createBook(book) {
    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(book)
    });

    if (!response.ok) {
        throw new Error("Failed to create book");
    }

    return await response.json();
}


// UPDATE BOOK
export async function updateBook(id, book) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(book)
    });

    if (!response.ok) {
        throw new Error("Failed to update book");
    }

    return await response.json();
}


// DELETE BOOK
export async function deleteBook(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete book");
    }
}