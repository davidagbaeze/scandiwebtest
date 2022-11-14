import React, { Component } from 'react';
import './style/cartpage.scss';
import { CartConsumer } from '../Context/CartContext';
import ImageSlider from './utils/ImageSlider/ImageSlider';
import { getOccurrence } from '../Utils/util_functions';

class CartPage extends Component {
  convertAllHexToSwatch() {
    const productColor = document.querySelectorAll('.product-color');
    productColor.forEach((child) => {
      const gChild = child.childNodes;
      gChild.forEach((col) => {
        col.style.backgroundColor = col.getAttribute('value');

        if (col.getAttribute('value') === '#FFFFFF') {
          col.classList.add('color-visibility');
        }
      });
    });
  }

  componentDidMount() {
    try {
      this.convertAllHexToSwatch();
    } catch (error) {}
  }

  componentDidUpdate() {
    try {
      this.convertAllHexToSwatch();
    } catch (error) {}
  }

  render() {
    const { currency } = this.props;
    return (
      <div className='cart'>
        <h1>Cart</h1>
        <CartConsumer>
          {(props) => {
            const {
              cart,
              quantities,
              addQuantity,
              removeQuantity,
              removeItem,
              emptyCart,
            } = props;

            return cart.map((arr, index) => {
              return arr[0].map((item) => {
                return (
                  <div className='product-info cart-page'>
                    <div className='img-section img-section-cart-page'>
                      <div className='cart-page-quantity'>
                        <div
                          onClick={() => {
                            addQuantity(
                              arr[3].join('') +
                                getOccurrence(
                                  quantities,
                                  arr[3].join(''),
                                  arr[3].join('')
                                )
                            );
                          }}
                        >
                          <svg
                            width='45'
                            height='45'
                            viewBox='0 0 45 45'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22.5 15V30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <path
                              d='M15 22.5H30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='44'
                              height='44'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </div>
                        <div>
                          <p>
                            {getOccurrence(
                              quantities,
                              arr[3].join(''),
                              arr[3].join('')
                            )}
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            if (
                              getOccurrence(
                                quantities,
                                arr[3].join(''),
                                arr[3].join('')
                              ) >= 2
                            ) {
                              removeQuantity(
                                arr[3].join('') +
                                  parseInt(
                                    getOccurrence(
                                      quantities,
                                      arr[3].join(''),
                                      arr[3].join('')
                                    ) - 1
                                  ),
                                quantities[quantities.length - 1].charAt(
                                  quantities[quantities.length - 1].length - 1
                                )
                              );
                            } else {
                              if (cart.length >= 2) {
                                removeItem(index);
                              } else {
                                emptyCart();
                              }
                            }
                          }}
                        >
                          <svg
                            width='45'
                            height='45'
                            viewBox='0 0 45 45'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M15 22.5H30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='44'
                              height='44'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </div>
                      </div>

                      <ImageSlider
                        length={item.gallery.length}
                        imgGallery={item.gallery}
                        imgAlt={item.name}
                      />
                    </div>
                    <div className='details-section details-section-cart-page'>
                      <div className='brand-and-name cart-page-brand-and-name'>
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                      </div>

                      <div className='product-price cart-page-price'>
                        <p>
                          {item.prices[currency].currency.symbol}
                          {item.prices[currency].amount}
                        </p>
                      </div>

                      {item.attributes.map((atr, index) => {
                        if (atr.name !== 'Color') {
                          return (
                            <div className='attributes-section attributes-section-product-page'>
                              <p className='attribute-name'>{atr.name}:</p>
                              <ul className='product-attributes product-attributes-cart-page'>
                                {atr.items.map((atr2, index2) => {
                                  return (
                                    <li
                                      className={
                                        arr[1][0].find((el) => {
                                          return el.value == atr2.value;
                                        }) &&
                                        arr[1][0].find(
                                          (ind) => ind.id == `${index}${index2}`
                                        )
                                          ? 'attribute-selected'
                                          : ''
                                      }
                                      value={atr2.value}
                                      data-index={`${index}${index2}`}
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
                            <div className='attributes-section attributes-section-product-page'>
                              <p className='attribute-name'>{atr.name}:</p>
                              <ul className='product-color product-color-cart-page'>
                                {atr.items.map((atr2, index2) => {
                                  return (
                                    <li
                                      className={
                                        arr[2][0].find(
                                          (el) => el.value == atr2.value
                                        ) &&
                                        arr[2][0].find(
                                          (ind) => ind.id == `${index}${index2}`
                                        )
                                          ? 'color-selected'
                                          : ''
                                      }
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
                    </div>
                  </div>
                );
              });
            });
          }}
        </CartConsumer>

        <CartConsumer>
          {(props) => {
            const { cart, emptyCart, quantities } = props;
            let s = [];

            cart.map((arr) => {
              return arr[0].map((item) => {
                return s.push(
                  item.prices[currency].amount *
                    getOccurrence(quantities, arr[3].join(''), arr[3].join(''))
                );
              });
            });

            let total = s.reduce((a, b) => a + b, 0);
            let tax = (21 / 100) * total;

            return cart.length > 0 ? (
              <div className='order-section'>
                <div className='order-details'>
                  <div className='order-col-1'>
                    <p>Tax 21%:</p>
                    <p>Quantity: </p>
                    <p>Total:</p>
                  </div>
                  <div className='order-col-2'>
                    <p>
                      {cart[0][0][0].prices[currency].currency.symbol}

                      {(Math.round(tax * 100) / 100).toFixed(2)}
                    </p>
                    <p>{cart.length + quantities.length}</p>
                    <p id='sum'>
                      {cart[0][0][0].prices[currency].currency.symbol}

                      {(Math.round((total + tax) * 100) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.confirm("Pressing 'OK' will empty your cart.") &&
                      emptyCart();
                  }}
                >
                  order
                </button>
              </div>
            ) : (
              <div className='empty-cart'>
                <h2>Your cart is empty.</h2>
              </div>
            );
          }}
        </CartConsumer>
      </div>
    );
  }
}

export default CartPage;
