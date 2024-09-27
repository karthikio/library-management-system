import React from 'react';

const Book = ({ book, onBorrow, onReturn }) => {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.genre}</p>
      <p>Publication Date: {book.publicationDate}</p>
      <p>Available Copies: {book.availableCopies}</p>
      <button onClick={() => onBorrow(book)}>Borrow</button>
      <button onClick={() => onReturn(book)}>Return</button>
    </div>
  );
};

export default Book;