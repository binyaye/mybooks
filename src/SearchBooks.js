import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from './snack'
import {
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap"
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Link } from 'react-router-dom'
import Books from './Books'

class SearchBooks extends Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    searchBook: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  snackbarRef = React.createRef();

  _showSnackbarHandler = () => {
    this.snackbarRef.current.openSnackBar(
      "Your book is added successfully"
    )
  }
  render() {
    const { searchBook, updateShelf, searchedBooks } = this.props;
    return <div className="container"> 
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Search</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <Fade in>
                <h3>Search Book</h3>
                <hr />
              </Fade>
            </div>
          </div>
        <Stagger in>
          <FadeTransform in transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}>
            <div className="search-books" style={{ paddingTop: 50 }}>
              <div className="search-books-bar">
                <Link className="close-search" to="/">
                  close
                </Link>
                <div className="search-books-input-wrapper">
                  <input className="search-book" type="text" placeholder="Search by title or author" onChange={(event) => {
                      searchBook(event.target.value);
                    }} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {searchedBooks.length > 0 ? searchedBooks.map((book) => (
                      <li key={book.id}>
                        <Books book={book} updateShelf={updateShelf} />
                      </li>
                    )) : <li />}
                </ol>
              </div>
            </div>
          </FadeTransform>
          <Snackbar ref={this.snackbarRef} />
        </Stagger>
      </div>;
  }
}

export default SearchBooks;
