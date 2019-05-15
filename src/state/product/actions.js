export const LIST_PRODUCTS_REQUESTED = 'product/LIST_PRODUCTS_REQUESTED';
export const LIST_PRODUCTS_FULFILLED = 'product/LIST_PRODUCTS_FULFILLED';
export const LIST_PRODUCTS_REJECTED = 'product/LIST_PRODUCTS_REJECTED';

export const listProductsRequested = () => ({
  type: LIST_PRODUCTS_REQUESTED
});

export const listProductsFulfilled = payload => ({
  type: LIST_PRODUCTS_FULFILLED,
  payload: payload
});

export const listProductsRejected = payload => ({
  type: LIST_PRODUCTS_REJECTED,
  payload: payload
});
