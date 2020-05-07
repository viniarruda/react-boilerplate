import { useState } from 'react';
import { useStateValue } from '../../index';
import { loadProducts } from '../queries';
import { listProducts } from '../actions';

const useProducts = () => {
  const [{ product }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await loadProducts();

    if (response) {
      dispatch(listProducts(response));
    } else {
      const err = [];
      dispatch(listProducts(err));
    }
    setIsLoading(false);
  };

  return [product, isLoading, request];
};

export default useProducts;
