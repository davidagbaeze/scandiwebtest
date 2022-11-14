import React, { Component } from 'react';
import { Query } from '@apollo/react-components';
import { productRequest } from '../../queries/getQueries';
import './style/productpage.scss';

import CartContext from '../Context/CartContext';
import {
  getOccurrence,
  convertHexToSwatch,
  getSelectedAtr,
  getSelectedCol,
} from '../Utils/util_functions';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: '',
    };
  }

  static contextType = CartContext;

  changeImage(e) {
    const imgRight = document.querySelector('.img-right').firstChild;
    imgRight.src = e.target.src;
  }

  createToggle() {
    const allAttributes = document.querySelectorAll('.product-attributes');

    allAttributes.forEach((attribute) => {
      attribute = attribute.childNodes;
      for (let i = 0; i <= attribute.length - 1; i++) {
        attribute[i].addEventListener('click', () => {
          attribute.forEach((option) => {
            option.classList.remove('attribute-selected');
          });

          attribute[i].classList.add('attribute-selected');
        });
      }
    });

    const colorAttributes = document.querySelector('.product-color').childNodes;
    for (let i = 0; i <= colorAttributes.length - 1; i++) {
      colorAttributes[i].addEventListener('click', () => {
        colorAttributes.forEach((option) => {
          option.classList.remove('color-selected');
        });
        colorAttributes[i].classList.add('color-selected');
      });
    }
  }

  componentDidMount() {
    let id = window.location.pathname;
    id = id.split('/');
    id = id[id.length - 1];

    this.setState({
      productId: id,
    });


  }

  // componentDidUpdate() {
  //   try {
  //     convertHexToSwatch();
  //   } catch (error) {}

  //   try {
  //     this.createToggle();
  //   } catch (error) {}
  // }

  render() {
    const { productId } = this.state;
    const { currency } = this.props;
    return (
      <Query query={productRequest(productId)}>
        {({ loading, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          } else {
            const { product } = data;
            const { itemNames, addItem, quantities, addQuantity } =
              this.context;

            const parse = require('html-react-parser');

            return (
              <div className='product-page'>
                <div
                  onLoad={() => {
                    this.createToggle();
                    convertHexToSwatch();
                  }}
                  on
                  className='product-info'
                >
                  <div className='img-section'>
                    <div className='img-left'>
                      {product.gallery.map((img, index) => {
                        return (
                          <img
                            key={product.name + index}
                            className={`small-img-${index}`}
                            onClick={(e) => {
                              this.changeImage(e);
                            }}
                            src={img}
                            alt={product.name}
                          ></img>
                        );
                      })}
                    </div>

                    <div className='img-right'>
                      <img src={product.gallery[0]} alt={product.name}></img>
                    </div>
                  </div>
                  <div className='details-section'>
                    <div className='brand-and-name'>
                      <p>{product.brand}</p>
                      <p>{product.name}</p>
                    </div>

                    {product.attributes.map((atr, index) => {
                      if (atr.name !== 'Color') {
                        return (
                          <div key={atr + index} className='attributes-section'>
                            <p className='attribute-name'>{atr.name}:</p>
                            <ul className='product-attributes'>
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    key={atr2 + index2}
                                    data-index={`${index}${index2}`}
                                    value={atr2.value}
                                  >
                                    {atr2.value}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      } else {
                        return (
                          <div key={atr + index} className='attributes-section'>
                            <p className='attribute-name'>{atr.name}:</p>
                            <ul className='product-color'>
                              {atr.items.map((atr2, index2) => {
                                return (
                                  <li
                                    key={atr2 + index2}
                                    value={atr2.value}
                                    data-index={`${index}${index2}`}
                                  ></li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      }
                    })}

                    <div className='product-price'>
                      <p>Price: </p>
                      <p>
                        {product.prices[currency].currency.symbol}

                        {(
                          Math.round(product.prices[currency].amount * 100) /
                          100
                        ).toFixed(2)}
                      </p>
                    </div>

                    {product.inStock ? (
                      <button
                        onClick={() => {
                          let allAttributes = document.querySelectorAll(
                            '.product-attributes'
                          );
                          let colorAttributes =
                            document.querySelectorAll('.product-color');

                          if (
                            getSelectedAtr().length !== allAttributes.length ||
                            getSelectedCol().length !== colorAttributes.length
                          ) {
                            alert('Please select product attributes');
                          } else {
                            if (
                              !itemNames.includes(
                                product.name +
                                  getSelectedAtr()
                                    .map((val) => val.value)
                                    .join('') +
                                  getSelectedCol()
                                    .map((val) => val.value)
                                    .join('')
                              )
                            ) {
                              addItem(
                                [
                                  [product],
                                  [getSelectedAtr()],
                                  [getSelectedCol()],
                                  [
                                    product.name +
                                      getSelectedAtr()
                                        .map((val) => val.value)
                                        .join('') +
                                      getSelectedCol()
                                        .map((val) => val.value)
                                        .join(''),
                                  ],
                                ],

                                product.name +
                                  getSelectedAtr()
                                    .map((val) => val.value)
                                    .join('') +
                                  getSelectedCol()
                                    .map((val) => val.value)
                                    .join('')
                              );
                            } else {
                              addQuantity(
                                product.name +
                                  getSelectedAtr()
                                    .map((val) => val.value)
                                    .join('') +
                                  getSelectedCol()
                                    .map((val) => val.value)
                                    .join('') +
                                  getOccurrence(quantities, product.name)
                              );
                            }
                          }
                        }}
                      >
                        add to cart
                      </button>
                    ) : (
                      <button className='out-of-stock'>out of stock</button>
                    )}

                    <div className='product-description'>
                      {parse(product.description)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default ProductPage;
