import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='not-found'>
    <Link to="/">
      Go Home
    </Link>
    <h1>404 page not found</h1>
  </div>
);

export default NotFound;