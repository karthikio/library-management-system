// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';

const BookList = ({ handleShow }) => { 
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books'); 
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Books</h2>
      <ul style={styles.bookList}>
        {books.map(book => (
          <li key={book.id} style={styles.bookItem}>
            <span style={styles.bookTitle}>{book.title}</span>
            <button onClick={() => handleShow(book.id)} style={styles.borrowButton}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '15px',
  },
  bookList: {
    listStyleType: 'none', 
    padding: '0',
  },
  bookItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  bookTitle: {
    fontSize: '18px',
    color: '#555',
  },
  borrowButton: {
    backgroundColor: '#007bff', 
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

styles.borrowButton[':hover'] = {
  backgroundColor: '#0056b3', 
};

export default BookList;