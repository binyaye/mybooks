import React from 'react'
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Header from './Header'
import BookShelf from "./BookShelf"
import NotFound from './NotFound'
import swal from "sweetalert"
import { Snackbar } from "./snack"

class BooksApp extends React.Component {
  _isMounted = false;
  state = {
    books: [],
    searchedBooks: [],
    selectedBook: [],
  }

  snackbarRef = React.createRef();

  _showSnackbarHandler = () => {
    this.snackbarRef.current.openSnackBar(
      "Your book reading status changed successfully!"
    );
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }));
      })
      .catch(() =>  swal(
          "error",
          "Something went wrong...",
          "error"
        ))
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        .catch(() => {
          this.setState(() => ({ searchedBooks: [] }))
           swal("", "no item matched your search", "error");
      });
    } else {
      this.setState(() => ({
        searchedBooks: [],
      }));
    }
  };

  updateShelf = (includedBook, shelf) => {
    if (shelf === 'none') {
      console.log('none selected')
    } else {
    BooksAPI.update(includedBook, shelf).then(() => {
      includedBook.shelf = shelf;
    }).catch(err =>{
       swal(err, "something went wrong while updating the shelf", "error");
    });
    let addedBooks = this.state.books.filter(
      (book) => book.id !== includedBook.id
    );
    addedBooks.push(includedBook);
    this.setState({ books: includedBook });
    swal("Success", includedBook.title + " is added to " + shelf , "success")
    }
    this.componentDidMount();
  }

  render() {
    return <div className="app">
        <Header />
        <div className="main-container">
          <Router>
            <Switch>
              <Route exact path="/" render={() => <div>
                <BookShelf books={this.state.books} updateShelf={this.updateShelf} />
                <div className="open-search">
                  <Link to="/search">
                    <button />
                  </Link>
                </div>
                <Snackbar ref={this.snackbarRef} />
              </div>} />
              <Route path="/search" render={() => <SearchBooks searchedBooks={this.state.searchedBooks} updateShelf={this.updateShelf} searchBook={this.searchBook} />} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>;
  }
}

export default BooksApp
