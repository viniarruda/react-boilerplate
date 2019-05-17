import React, { useEffect, useState } from 'react'
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
    {
      console.log(product)
    }
    {
      isLoading && <h1>LOADING...</h1>
    }
    {
      product.list && product.list.map((p) =>
        <div key={p.id}>
          <h1>{p.title}</h1>
          <span>$   {p.price}</span>
        </div>
      )
    }
   </div> 
  )
}

export default Home