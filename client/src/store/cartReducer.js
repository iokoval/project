const defaultState = {
  length: 0,
  open: false,
};

const ADD_ITEM = "ADD_ITEM";
const OPEN_CART = "OPEN_CART";

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        length: state.length + 1,
      };
    case OPEN_CART:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
};

export const addCartAction = (payload) => ({ type: ADD_ITEM, payload });
export const openCartAction = (payload) => ({ type: OPEN_CART, payload });
