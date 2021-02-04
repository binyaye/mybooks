import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Books from './Books'

class SearchBooks extends Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    searchBook: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { searchBook, updateShelf, searchedBooks } = this.props
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                className="search-book"
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {
                  searchBook(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks.length > 0 ? (
                searchedBooks.map((book) => (
                  <li key={book.id}>
                    <Books book={book} updateShelf={updateShelf} />
                  </li>
                ))
              ) : (
                <li />
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
