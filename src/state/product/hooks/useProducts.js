import { useStateValue } from '../../index'
import { loadProducts } from '../queries'
import { 
  listProductsRequested,
  listProductsFulfilled,
  listProductsRejected
} from '../actions'

const useProducts = () => {
  const [{product}, dispatch] = useStateValue()

  const formData = async () => {
    dispatch(listProductsRequested())
  
    const response = await loadProducts();

    if (!response) {
      let err = 'Error'
      dispatch(listProductsRejected(err))
    }

    dispatch(listProductsFulfilled(response))
  }


  return [product, formData]
}

export default useProducts