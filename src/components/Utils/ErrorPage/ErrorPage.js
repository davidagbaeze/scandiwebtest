import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/errorpage.scss';
class ErrorPage extends Component {
  render() {
    return (
      <div className='error-message'>
        <p>Oooops!</p>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to='/sw-erd-test/all'>Go back</Link>
      </div>
    );
  }
}

export default ErrorPage;
