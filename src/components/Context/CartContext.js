import React, { Component } from 'react';

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends Component {
  state = {
    cart: [],
    itemNames: [],
    quantities: [],
    currentItem: '',
  };

  addItem = (object, itemName) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, object],
      itemNames: [...this.state.itemNames, itemName],
    }));
  };

  addQuantity = (quantity) => {
    this.setState({
      quantities: [...this.state.quantities, quantity],
    });
  };

  removeQuantity = (toremove) => {
    this.setState({
      quantities: this.state.quantities.filter((prod) => prod !== toremove),
    });
  };

  removeItem = (index) => {
    this.setState({
      cart: this.state.cart.filter((_, i) => i !== index),
    });
  };

  emptyCart = () => {
    this.setState({
      cart: [],
      itemNames: [],
      quantities: [],
    });
  };

  render() {
    const { cart, itemNames, quantities, sum, currentItem } = this.state;
    const {
      addItem,
      emptyCart,
      addQuantity,
      removeQuantity,
      removeItem,

      addSum,
    } = this;
    return (
      <CartContext.Provider
        value={{
          cart,
          itemNames,
          sum,
          quantities,
          currentItem,

          addQuantity,
          removeQuantity,
          removeItem,
          addItem,
          emptyCart,

          addSum,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
