import React from 'react'
import useProducts from '../../state/product/hooks/useProducts'

const Home = () => {
  const [product, listProducts] = useProducts()

  const handleClick = async() => {
    await listProducts()
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