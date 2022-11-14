import React, { Component } from 'react';
import { CartConsumer } from '../../../../../Context/CartContext';
import { Link } from 'react-router-dom';
import './style/cartoverlay.scss';
import { getOccurrence } from '../../../../util_functions';

class CartOverlay extends Component {
  render() {
    return (
      <div>
        <div className='cart-overlay'>
          <div id='myCart' className='sidebar'>
            <div className='cart-overlay-content'>
              <CartConsumer>
                {(props) => {
                  const { cart, quantities } = props;

                  if (cart.length >= 1) {
                    return (
                      <div className='bag-quantity'>
                        <p>My bag,</p>
                        <p>
                          {cart.length + quantities.length}{' '}
                          {cart.length + quantities.length > 1
                            ? 'items'
                            : 'item'}
                        </p>
                      </div>
                    );
                  } else {
                    return <p>Your bag is empty.</p>;
                  }
                }}
              </CartConsumer>

              <div className='bag-content'>
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
                          <div className='cart-page-bag'>
                            <div className='img-section-cart-page-bag'>
                              <div className='cart-page-quantity-bag'>
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
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M12 8V16'
                                      stroke='#1D1F22'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <path
                                      d='M8 12H16'
                                      stroke='#1D1F22'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <rect
                                      x='0.5'
                                      y='0.5'
                                      width='23'
                                      height='23'
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
                                  //removeItem(0);
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
                                        quantities[
                                          quantities.length - 1
                                        ].charAt(
                                          quantities[quantities.length - 1]
                                            .length - 1
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
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M8 12H16'
                                      stroke='#1D1F22'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                    <rect
                                      x='0.5'
                                      y='0.5'
                                      width='23'
                                      height='23'
                                      stroke='#1D1F22'
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className='bag-img'>
                                <img
                                  src={item.gallery[0]}
                                  alt={item.name}
                                ></img>
                              </div>
                            </div>
                            <div className='details-section details-section-cart-page-bag'>
                              <div className='cart-page-brand-and-name-bag'>
                                <p>{item.brand}</p>
                                <p>{item.name}</p>
                              </div>

                              <div className='cart-page-price-bag'>
                                <p>
                                  {
                                    item.prices[this.props.currency].currency
                                      .symbol
                                  }
                                  {item.prices[this.props.currency].amount}
                                </p>
                              </div>

                              {item.attributes.map((atr, index) => {
                                if (atr.name !== 'Color') {
                                  return (
                                    <div className='attributes-section-product-page-bag'>
                                      <p className='attribute-name-bag'>
                                        {atr.name}:
                                      </p>
                                      <ul className='product-attributes-bag'>
                                        {atr.items.map((atr2, index2) => {
                                          return (
                                            <li
                                              className={
                                                arr[1][0].find((el) => {
                                                  return el.value == atr2.value;
                                                }) &&
                                                arr[1][0].find(
                                                  (ind) =>
                                                    ind.id ==
                                                    `${index}${index2}`
                                                )
                                                  ? 'attribute-selected-bag'
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
                                      <p className='attribute-name-bag'>
                                        {atr.name}:
                                      </p>
                                      <ul className='product-color-bag'>
                                        {atr.items.map((atr2, index2) => {
                                          return (
                                            <li
                                              className={
                                                arr[2][0].find(
                                                  (el) => el.value == atr2.value
                                                ) &&
                                                arr[2][0].find(
                                                  (ind) =>
                                                    ind.id ==
                                                    `${index}${index2}`
                                                )
                                                  ? 'color-selected-bag'
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
              </div>

              <div className='bag-checkout'>
                <CartConsumer>
                  {(props) => {
                    const { cart, quantities, emptyCart } = props;

                    let s = [];

                    cart.map((arr) => {
                      return arr[0].map((item) => {
                        return s.push(
                          item.prices[this.props.currency].amount *
                            getOccurrence(
                              quantities,
                              arr[3].join(''),
                              arr[3].join('')
                            )
                        );
                      });
                    });

                    let total = s.reduce((a, b) => a + b, 0);
                    let tax = (21 / 100) * total;

                    if (cart.length + quantities.length >= 1) {
                      return (
                        <div>
                          <div className='bag-price'>
                            <p>Total</p>
                            <p>
                              {
                                cart[0][0][0].prices[this.props.currency]
                                  .currency.symbol
                              }
                              {(parseFloat(total) + parseFloat(tax)).toFixed(2)}
                            </p>
                          </div>
                          <div className='bag-checkout-buttons'>
                            <Link to='/sw-erd-test/cart'>
                              <button
                                className='view-bag-button'
                                onClick={() => {
                                  document
                                    .getElementById('myCart')
                                    .classList.toggle('show-cart');
                                }}
                              >
                                view bag
                              </button>
                            </Link>

                            <button
                              className='checkout-button'
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Pressing 'OK' will empty your bag."
                                  )
                                ) {
                                  emptyCart();
                                  document
                                    .getElementById('myCart')
                                    .classList.toggle('show-cart');
                                }
                              }}
                            >
                              check out
                            </button>
                          </div>
                        </div>
                      );
                    }
                  }}
                </CartConsumer>
              </div>
            </div>
          </div>
        </div>

        <div className='cart-overlay'>
          <div id='myCart' className='sidebar'>
            <div className='cart-overlay-content'>
              <p className='empty-bag'>Your bag is empty.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
