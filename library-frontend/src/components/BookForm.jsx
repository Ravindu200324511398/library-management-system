import { useEffect, useState } from "react";

function BookForm({ onBookSaved, editingBook, onCancelEdit }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [available, setAvailable] = useState(true);

    const [loading, setLoading] = useState(false);

    // When editingBook changes, fill the form
    useEffect(() => {

        if (editingBook) {

            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setIsbn(editingBook.isbn);
            setAvailable(editingBook.available);

        } else {

            setTitle("");
            setAuthor("");
            setIsbn("");
            setAvailable(true);

        }

    }, [editingBook]);


    async function handleSubmit(event) {

        event.preventDefault();

        const book = {
            title: title,
            author: author,
            isbn: isbn,
            available: available
        };

        try {

            setLoading(true);

            await onBookSaved(book);

            // Clear form after successful creation
            if (!editingBook) {
                setTitle("");
                setAuthor("");
                setIsbn("");
                setAvailable(true);
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }


    function handleCancel() {

        setTitle("");
        setAuthor("");
        setIsbn("");
        setAvailable(true);

        onCancelEdit();
    }


    return (
        <div className="form-container">

            <h2>
                {editingBook ? "Edit Book" : "Add New Book"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Enter book title"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Author</label>

                    <input
                        type="text"
                        value={author}
                        onChange={(event) =>
                            setAuthor(event.target.value)
                        }
                        placeholder="Enter author name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>ISBN</label>

                    <input
                        type="text"
                        value={isbn}
                        onChange={(event) =>
                            setIsbn(event.target.value)
                        }
                        placeholder="Enter ISBN"
                        required
                    />

                </div>


                <div className="form-group checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            checked={available}
                            onChange={(event) =>
                                setAvailable(event.target.checked)
                            }
                        />

                        Available

                    </label>

                </div>


                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : editingBook
                            ? "Update Book"
                            : "Add Book"
                    }

                </button>


                {editingBook && (

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                )}

            </form>

        </div>
    );
}

export default BookForm;