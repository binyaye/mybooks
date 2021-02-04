import React, {Component} from 'react'
import no_image from './icons/no-image.png'
import Selector from './Selector'
import PropTypes from 'prop-types'

class Books extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
  };
  render() {
    const { book, updateShelf, selectorCheck } = this.props
    const backgroundImage =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : no_image;
    return <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${backgroundImage})` }} />
          <Selector updateShelf={updateShelf} book={book} books={this.props.books} selectorCheck={selectorCheck} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>;
  }
}

export default Books