import React, { useState, useEffect} from 'react';
import "./ShoppingCart.css";
import ItemCart from "../ItemCart/ItemCart"
import { getAllProducts} from '../../service/product'
import { useHistory } from "react-router-dom";

export default function ShoppingCart({updateCart,func,updateProductId}) {
  const [closeCart,setCloseCart]=useState(true)
  const [payment,setPayment]=useState(JSON.parse(localStorage.payment))
  const [allProduct,setAllProduct]=useState([])

  let userCart=JSON.parse(localStorage.userCart)
 let tmp=JSON.parse(localStorage.payment)
let history=useHistory()

const [items,setItems]=useState(Object.entries(userCart).map(([key, num])=>{
  return (<div><ItemCart num={num} id={key} updateProduct={(id,num)=>updateProductId(id,num)}   fun={func}/></div>)
}))

//get products
  useEffect(()=>{
  const getProducts=async()=>{
    setAllProduct(await getAllProducts())
  }
  getProducts()
  },[])


useEffect(()=>{
  //update payment
  if (allProduct!=undefined) tmp=0
  userCart=JSON.parse(localStorage.userCart)
  setItems(  Object.entries(userCart).map(([key, num])=>{
    allProduct.map((value)=>{
      if(value.id==key){
        tmp+=num*value.price
        localStorage.payment =JSON.stringify(tmp.toFixed(2))
      setPayment(tmp.toFixed(2))
      
      return
      }
    })
    return (<div><ItemCart num={num} id={key} updateProduct={(id,num)=>updateProductId(id,num)}   fun={func}/></div>)
}))

},[updateCart])

  return (
    <div >
      <h1 className="header-reception">סל הקניות שלך </h1>
      {closeCart &&(<div className="productsDiv">{ 
items
}</div>)}
      <div className="gridContainerCart">
      <button type="button" onClick={()=>{if(JSON.parse(localStorage.userDetails)&&JSON.parse(localStorage.payment)!=0.00) history.push('../payment')}} className=" btn-payment gridCart">לתשלום</button>
      <div  className="price gridCart"><span>
      <small><span>₪</span></small>{payment}</span>
      <div className="send">תשלום כולל משלוח</div>
      </div>
      <button type="button" onClick={()=>{closeCart? setCloseCart(false):setCloseCart(true)}} className={`gridCart btnCart ${closeCart ? "" : "isSelectedCart"}`}>^</button>
      </div>
    </div>
  );
}
