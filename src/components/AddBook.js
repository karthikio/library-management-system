import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase/config';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [copies, setCopies] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'books'), {
        title,
        author,
        genre,
        publicationDate,
        copies: parseInt(copies, 10),
        availableCopies: parseInt(copies, 10) 
      });
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
      setCopies('');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="date"
          placeholder="Publication Date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Copies"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;