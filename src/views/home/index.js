import React, { useEffect } from 'react'
import useProducts from '../../state/product/hooks/useProducts'

import Spinner from '../../components/spinner'
import List from './components/list'
import Card from './components/card'

const Home = () => {
  const [product, listProducts, isLoading] = useProducts();

  useEffect(() => {
    const fetch = async () => {
      await listProducts();
    } 
  

    fetch();
  }, []);

  return (
   <div>
     <Spinner show={isLoading} />
     <List >
      {
        product.list && product.list.map((p) =>
          <Card key={p.id}>
            <h1>{p.title}</h1>
            <span>${p.price}</span>
          </Card>
        )
      }
    </List>
   </div> 
  )
}

export default Home