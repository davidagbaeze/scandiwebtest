import React, { Component } from 'react';
import { CartProvider } from './components/Context/CartContext';

import './style/App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ProductPage from './components/ProductPage/ProductPage';
import ErrorPage from './components/Utils/ErrorPage/ErrorPage';
import Header from './components/Utils/Header/Header';
import CartPage from './components/CartPage/CartPage';
import { Query } from '@apollo/react-components';
import { getAllCategories } from "./queries/getQueries";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyKey: 0,
    };
  }

  componentDidMount() {
    const currencyDropdown = document.querySelector('.dropdown-text');

    document.addEventListener('click', () => {
      switch (currencyDropdown.textContent.charAt(0)) {
        case '£':
          this.setState({
            currencyKey: 1,
          });
          break;
        case 'A':
          this.setState({
            currencyKey: 2,
          });
          break;
        case '¥':
          this.setState({
            currencyKey: 3,
          });
          break;
        case '₽':
          this.setState({
            currencyKey: 4,
          });
          break;
        default:
          this.setState({
            currencyKey: 0,
          });
      }
    });
  }

  render() {
    const { currencyKey } = this.state;
    return (
      <div className='App'>
        <CartProvider>
          <Header />
          <Query query={getAllCategories}>
            {({ loading, data }) => {
              if (loading) {
                return;
              } else {
                const { categories } = data;
                return (
                  <Routes>
                    <Route
                      path='/sw-erd-test'
                      element={<Navigate to='/sw-erd-test/all' />}
                    />
                    <Route
                      path={`/sw-erd-test/${categories[0].name}`}
                      element={
                        <CategoryPage
                          currency={currencyKey}
                          categoryName={categories[0].name}
                        />
                      }
                    />
                    <Route
                      path={`/sw-erd-test/${categories[1].name}`}
                      element={
                        <CategoryPage
                          currency={currencyKey}
                          categoryName={categories[1].name}
                        />
                      }
                    />
                    <Route
                      path={`/sw-erd-test/${categories[2].name}`}
                      element={
                        <CategoryPage
                          currency={currencyKey}
                          categoryName={categories[2].name}
                        />
                      }
                    />

                    <Route
                      path='/sw-erd-test/product/:productID'
                      element={
                        <ProductPage category='0' currency={currencyKey} />
                      }
                    />
                    <Route
                      exact
                      path='/sw-erd-test/cart'
                      element={<CartPage currency={currencyKey} />}
                    />
                    <Route path='*' element={<ErrorPage />} />
                  </Routes>
                );
              }
            }}
          </Query>
        </CartProvider>
      </div>
    );
  }
}

export default App;
