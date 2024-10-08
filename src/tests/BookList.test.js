import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from '../components/BookList.js';

const books = [
  {
    _id: '1',
    title: 'Book 1',
    author: { _id: '1', name: 'Author 1' },
  },
  {
    _id: '2',
    title: 'Book 2',
    author: { _id: '2', name: 'Author 2' },
  },
  {
    _id: '3',
    title: 'Book 3',
    author: null,
  },
];

test('renders BookList with book details', () => {
  render(<BookList books={books} editBook={jest.fn()} deleteBook={jest.fn()} />);

  books.forEach(book => {
    const authorName = book.author ? book.author.name : 'unknown';
    expect(screen.getByText(new RegExp(`${book.title} by ${authorName}`))).toBeInTheDocument();
  });
});

test('edit button clicked', () => {
  const editBook = jest.fn();
  render(<BookList books={books} editBook={editBook} deleteBook={jest.fn()} />);

  const editButtons = screen.getAllByText('Edit');
  fireEvent.click(editButtons[0]);

  expect(editBook).toHaveBeenCalledWith(books[0]);
});

test('delete button clicked', () => {
  const deleteBook = jest.fn();
  render(<BookList books={books} editBook={jest.fn()} deleteBook={deleteBook} />);

  const deleteButtons = screen.getAllByText('Delete');
  fireEvent.click(deleteButtons[0]);

  expect(deleteBook).toHaveBeenCalledWith(books[0]._id);
});
