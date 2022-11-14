import React, { Component } from 'react';
import { categoryRequest } from '../../queries/getQueries';
import Card from './utils/Card/Card';
import spinner from './assets/img/spinner.gif';
import './style/category.scss';
import { Query } from '@apollo/react-components';
import CartContext from '../Context/CartContext';
import { getOccurrence } from '../Utils/util_functions';

class CategoryPage extends Component {
  static contextType = CartContext;

  render() {
    const { categoryName, currency } = this.props;
    return (
      <div className='category-page'>
        <Query query={categoryRequest(categoryName)}>
          {({ loading, data }) => {
            if (loading) {
              return (
                <img className='spinner' src={spinner} alt='Loading...'></img>
              );
            } else {
              const { category } = data;
              const { itemNames, addItem, quantities, addQuantity } =
                this.context;

              return (
                <div className='category-page'>
                  <h2>{categoryName}</h2>
                  <div className='product-cards-section'>
                    {category.products.map((item) => {
                      return (
                        <div>
                          <Card
                            productId={item.id}
                            dataInStock={item.inStock}
                            thumbnail={item.gallery[0]}
                            productTitle={`${item.brand} ${item.name}`}
                            productPrice={
                              item.prices[currency].currency.symbol +
                              (
                                item.prices[currency].amount
                              ).toFixed(2)
                            }
                            item={item}
                            itemNames={itemNames}
                            addItem={addItem}
                            quantities={quantities}
                            addQuantity={addQuantity}
                            getOccurrence={getOccurrence}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default CategoryPage;
