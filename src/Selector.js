import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Selector extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { book, updateShelf } = this.props
    return <div className="book-shelf-changer">
        <select value = {book.shelf || 'none'} onChange={(event) => {
            updateShelf(book, event.target.value);
          }}>
          <option value="moveto" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">
            None
          </option>
        </select>
      </div>;
  }
}

export default Selector;
