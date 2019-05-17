import React, { useEffect } from 'react'
import useProducts from '../../state/product/hooks/useProducts'

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
    <h1>Home</h1>
    {
      console.log(product)
    }
    {
      isLoading && <h1>LOADING...</h1>
    }
    {
      product.list && product.list.map((p) =>
        <div key={p.id}>{p.title}</div>
      )
    }
   </div> 
  )
}

export default Home