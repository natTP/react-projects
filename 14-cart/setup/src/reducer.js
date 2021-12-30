// it's called reducer because it returns the accumulation of states (is a reducer of state)
// creates a new state from previous state and new values
// works like Array.prototype.reduce() in that regard
// what an unintuitive name lol

const reducer = (state, action) => {
  if (action.type === "LOADING") return { ...state, loading: true };

  if (action.type === "DISPLAY_ITEMS")
    return { ...state, loading: false, cart: action.payload };

  if (action.type === "CLEAR_CART") return { ...state, cart: [] };

  if (action.type === "REMOVE")
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };

  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc")
            return { ...cartItem, amount: cartItem.amount + 1 };
          if (action.payload.type === "dec")
            return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount > 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.total += price * amount;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  throw new Error("no matching action type");
};

export default reducer;
