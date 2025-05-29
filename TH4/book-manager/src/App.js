import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Load từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) setBooks(JSON.parse(stored));
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    const updatedList = books.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedList);
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id) => {
    const filtered = books.filter(book => book.id !== id);
    setBooks(filtered);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Quản Lý Sách</h1>
      <BookForm
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editingBook={editingBook}
      />
      <BookList
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;
