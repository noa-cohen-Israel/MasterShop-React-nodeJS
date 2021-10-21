import React,{useEffect, useState} from 'react'
import Product from '../Product/Product'
import './Products.css'
import {getAllProducts} from '../../service/product'


export default function Products({cart,nameCategory,updateCart,updateProductId}) {

  const [products, setProducts] = useState([]);


useEffect(async () => {
  let tmp = await getAllProducts();
  setProducts(tmp)
}, []);

  return(<div className="productsBody">

    
<div className={` ${cart ? "gridContainerProductsWithCart" : "gridContainerProducts"}`} >
    { products.map((product)=>{
        if(product.category==nameCategory || nameCategory=="all") return (<div className="gridProducts"><Product image={product.image} name={product.name} description={product.description} price={product.price} id={product.id} numProducts={product.numProducts} updateProduct={updateProductId} updateCartFunction={updateCart}/></div>)
})

}</div>
  </div>);
}