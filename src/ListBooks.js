import React, { Component } from 'react'
import Books from "./Books"
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, updateShelf } = this.props
    const wantToRead = Object.values(books).filter((book) => book.shelf === "wantToRead");
    const read = Object.values(books).filter((book) => book.shelf === "read");
    const currentlyReading = Object.values(books).filter((book) => book.shelf === "currentlyReading");
    return <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {currentlyReading.map((book) => <li key={book.id}>
                  <Books book={book} updateShelf={updateShelf} />
                </li>)}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {wantToRead.map((book) => <li key={book.id}>
                  <Books book={book} updateShelf={updateShelf} />
                </li>)}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {read.map((book) => <li key={book.id}>
                  <Books book={book} updateShelf={updateShelf} />
                </li>)}
            </ol>
          </div>
        </div>
      </div>;
  }
}

export default ListBooks