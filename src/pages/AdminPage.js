import React, { useEffect, useState } from 'react';
import AddBook from '../components/AddBook';
import Navbar from '../components/Navbar';
import { db } from '../firebase/config';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBorrowedBooks();
      await fetchAllBooks();
    };

    fetchData();
  }, []);

  const fetchBorrowedBooks = async () => {
    const borrowedBooksCollection = collection(db, 'borrowedBooks');
    const borrowedBooksSnapshot = await getDocs(borrowedBooksCollection);
    const borrowedBooksList = borrowedBooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBorrowedBooks(borrowedBooksList);
  };

  const fetchAllBooks = async () => {
    const allBooksCollection = collection(db, 'books'); 
    const allBooksSnapshot = await getDocs(allBooksCollection);
    const allBooksList = allBooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllBooks(allBooksList);
  };

  const getFineStatus = (dueDate) => {
    const currentDate = new Date(); 
    const due = new Date(dueDate.seconds * 1000); 
    return currentDate > due; 
  };

  const handleReturnBook = async (bookId) => {
    const bookRef = doc(db, 'borrowedBooks', bookId);
    await updateDoc(bookRef, { returned: true });
    await fetchBorrowedBooks();
  };

  const handleDeleteBook = async (bookId) => {
    const bookRef = doc(db, 'books', bookId);
    await deleteDoc(bookRef);
    await fetchAllBooks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <AddBook />
      
      <h2>Borrowed Books</h2>
      {borrowedBooks.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Book ID</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Borrower Name</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Due Date</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Returned</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Fine Status</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map(book => (
              <tr key={book.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.bookId}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.borrowerName}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  {new Date(book.dueDate.seconds * 1000).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.returned ? 'Yes' : 'No'}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <span style={{ color: getFineStatus(book.dueDate) ? 'red' : 'green' }}>
                    {getFineStatus(book.dueDate) ? "Fine" : "No Fine"}
                  </span>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  {!book.returned && (
                    <button onClick={() => handleReturnBook(book.id)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No borrowed books found.</p>
      )}

      <h2 style={{ marginTop: '20px' }}>All Books</h2>
      {allBooks.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Book ID</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Book Title</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Author</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map(book => (
              <tr key={book.id}>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.title}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>{book.author}</td>
                <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <button onClick={() => handleDeleteBook(book.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default AdminPage;