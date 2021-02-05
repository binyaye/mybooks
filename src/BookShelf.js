import React, { Component } from 'react'
import Books from "./Books"
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap"
import { Link } from "react-router-dom"
import { FadeTransform, Fade, Stagger } from "react-animation-components"
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, updateShelf } = this.props
    const wantToRead = Object.values(books).filter((book) => book.shelf === "wantToRead");
    const read = Object.values(books).filter((book) => book.shelf === "read");
    const currentlyReading = Object.values(books).filter((book) => book.shelf === "currentlyReading");
    return <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem active>Home</BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/search">Search</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <Fade in>
                <h3>My Book Reading</h3>
                <hr />
              </Fade>
            </div>
          </div>
        <Stagger in>
          <FadeTransform in transformProps={{ exitTransform: "scale(0.5) translateX(-50%)" }}>
            <Card style={{ background: "white", margin: "10px", height: "auto" }}>
              <CardBody>
                <CardHeader className="h1-responsive" style={{ color: "#26293A" }}>
                  Currently reading
                </CardHeader>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {currentlyReading.map((book) => <li key={book.id}>
                        <Books book={book} updateShelf={updateShelf} />
                      </li>)}
                  </ol>
                </div>
              </CardBody>
            </Card>
          </FadeTransform>
          <FadeTransform in transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}>
            <Card style={{ background: "white", margin: "10px", height: "auto" }}>
              <CardBody>
                <CardHeader className="h1-responsive" style={{ color: "#26293A" }}>
                  Want to Read
                </CardHeader>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead.map((book) => <li key={book.id}>
                        <Books book={book} updateShelf={updateShelf} />
                      </li>)}
                  </ol>
                </div>
              </CardBody>
            </Card>
          </FadeTransform>
          <FadeTransform in transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}>
            <Card style={{ background: "white", margin: "10px", height: "auto" }}>
              <CardBody>
                <CardHeader className="h1-responsive" style={{ color: "#26293A" }}>
                  Read
                </CardHeader>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read.map((book) => <li key={book.id}>
                        <Books book={book} updateShelf={updateShelf} />
                      </li>)}
                  </ol>
                </div>
              </CardBody>
            </Card>
          </FadeTransform>
        </Stagger>
      </div>;
  }
}

export default BookShelf