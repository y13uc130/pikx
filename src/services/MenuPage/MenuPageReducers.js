const initialState = {
  cart_items: [],
  totalPayable: 0,
  totalCartItems: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart_items: action.data.cart_items,
        totalPayable: action.data.totalPayable,
        totalCartItems: action.data.totalCartItems
      }
    default:
      return state;
  }
};
