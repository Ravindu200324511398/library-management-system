function BookList({ books, onEdit, onDelete }) {

    return (
        <div className="book-list-container">

            <h2>Books</h2>

            {books.length === 0 ? (

                <p className="no-books">
                    No books found.
                </p>

            ) : (

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>

                    </thead>


                    <tbody>

                        {books.map((book) => (

                            <tr key={book.id}>

                                <td>
                                    {book.id}
                                </td>

                                <td>
                                    {book.title}
                                </td>

                                <td>
                                    {book.author}
                                </td>

                                <td>
                                    {book.isbn}
                                </td>

                                <td>

                                    {book.available
                                        ? "Yes"
                                        : "No"
                                    }

                                </td>

                                <td>

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            onEdit(book)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            onDelete(book.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default BookList;