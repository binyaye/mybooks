import React from 'react'
import { Route, Link } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    selectedBook:[]
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }));
      })
      .catch((err) => console.error("Error " + err));
  }


  searchBook = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query)
        .then((searchedBooks) => {
          let searchResult = [];
          for (const searchedBook of searchedBooks) {
            for (const book of this.state.books) {
              if (searchedBook.id === book.id) {
                searchedBook.shelf = book.shelf;
              }
            }
            searchResult.push(searchedBook);
          }
          return searchResult;
        })
        .then((searchedBooks) => {
          this.setState(() => ({ searchedBooks }));
        })
        .catch((searched) => this.setState(() => ({ searchedBooks: [] })));
    } else {
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  };

  updateShelf = (includedBook, shelf) => {
    BooksAPI.update(includedBook, shelf).then(() => {
      includedBook.shelf = shelf;
    });

    let addedBooks = this.state.books.filter(
      (book) => book.id !== includedBook.id
    );
    addedBooks.push(includedBook);
    this.setState({ books: includedBook });
    
    this.componentDidMount();
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <ListBooks
                books={this.state.books}
                updateShelf={this.updateShelf}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              searchedBooks={this.state.searchedBooks}
              updateShelf={this.updateShelf}
              searchBook={this.searchBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp
