import React from 'react'
import { loadProducts } from '../../state/product/queries'
import { useStateValue } from '../../state'
import { listProductsRequested, listProductsFulfilled, listProductsRejected } from '../../state/product/actions'

const Home = () => {
  const [{product}, dispatch] = useStateValue()

  const handleClick = async() => {
    await dispatch(listProductsRequested())
    const response = await loadProducts()

    try {
      await dispatch(listProductsFulfilled(response))
    } catch (err) {
      listProductsRejected(err)
    }
    
  }

  return (
   <div>    
    <h1>Home</h1>
    {
      product.loading && <h1>LOADING...</h1>
    }
    <button onClick={() => handleClick()}>Load</button>
    <button>Atualizar</button>
    {
      product.list && product.list.map((p) =>
        <div key={p.id}>{p.title}</div>
      )
    }
   </div> 
  )
}

export default Home