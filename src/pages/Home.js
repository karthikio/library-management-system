import React, { useState } from 'react';
import BookList from '../components/BookList';
import Navbar from '../components/Navbar';
import { Modal, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (bookId) => {
    setSelectedBook(bookId);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7); // Due date is 7 days from now
    setDueDate(nextWeek.toISOString().substring(0, 10)); // Set due date
    setShow(true);
  };

  const handleBorrowBook = async (e) => {
    e.preventDefault();
    if (selectedBook && borrowerName && dueDate) {
      await addDoc(collection(db, 'borrowedBooks'), {
        bookId: selectedBook,
        borrowerName: borrowerName,
        dueDate: new Date(dueDate),
        returned: false,
      });
      setSelectedBook('');
      setBorrowerName('');
      setDueDate('');
      handleClose();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.heading}>Welcome to the Library</h1>
      <BookList handleShow={handleShow} /> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Borrow Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleBorrowBook}>
            <input
              type="text"
              placeholder="Borrower Name"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.borrowButton}>
              Borrow Book
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  modalHeader: {
    backgroundColor: '#f8f9fa',
  },
  closeButton: {
    color: '#000',
    fontSize: '1.5rem',
  },
};

export default HomePage;