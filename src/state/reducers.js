import authReducer from './auth/reducers';
import productReducer from './product/reducers';

export default ({ auth, product }, action) => ({
  auth: authReducer(auth, action),
  product: productReducer(product, action)
});