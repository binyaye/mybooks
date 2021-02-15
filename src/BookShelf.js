import React from 'react'
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

function BookShelf (props) {
  const wantToRead = Object.values(props.books).filter((book) => book.shelf === "wantToRead");
  const read = Object.values(props.books).filter((book) => book.shelf === "read");
  const currentlyReading = Object.values(props.books).filter((book) => book.shelf === "currentlyReading");
  const allCategories = [currentlyReading, wantToRead, read];
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
          {allCategories.map((category, index) => <diV>
              <Card style={{ background: "white", margin: "10px", height: "auto" }}>
                <CardBody>
                  <CardHeader className="h1-responsive" style={{ color: "#26293A" }}>
                    {(() => {
                      switch (index) {
                        case 0:
                          return "Currently Reading";
                        case 1:
                          return "Want to Read";
                        case 2:
                          return "Read";
                        default:
                          break;
                      }
                    })()}
                  </CardHeader>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {Object.values(category).map((book) => <li key={book.id}>
                          <Books book={book} updateShelf={props.updateShelf} />
                        </li>)}
                    </ol>
                  </div>
                </CardBody>
              </Card>
            </diV>)}
        </FadeTransform>
      </Stagger>
    </div>;           
}

BookShelf.propType = {
  updateShelf : PropTypes.func.isRequired,  
}

export default BookShelf