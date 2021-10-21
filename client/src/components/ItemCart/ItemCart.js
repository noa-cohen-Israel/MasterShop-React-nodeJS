import React, { useState, useEffect } from 'react';
import "./ItemCart.css";
import { findProductById } from '../../service/product'
import Message from '../Message/Message'
export default function ItemCart({ id, num, fun,updateProduct }) {

  const [numItem, setNumItem] = useState(num);
  const [product, setProduct] = useState({});
  const [imageSrc, setImageSrc] = useState({});
  const [messageLastProducts, setMessageLastProducts] = useState(false);

  let userCart = JSON.parse(localStorage.userCart)

  //update the cart in localStorage
  const updateLocalStorage = (num) => {
     userCart[id] = num
    localStorage.userCart = JSON.stringify(userCart);
    fun()
    updateProduct(id,num)
  }
//add product
  function addProduct(num) {

    if (num == 0) { setNumItem(num); updateLocalStorage(num);}
   //check validation
    if (num > 0 && num < 100) {
      if (product.numProducts < num) {
        setMessageLastProducts(true)
        num=product.numProducts
    }
      setNumItem(num)
      updateLocalStorage(num);
    }

    
  }

  useEffect(() => {
    const getDataItem = async () => {
      let tmp = await findProductById(id);
      setProduct(tmp)
    };

    getDataItem();
    setNumItem(num);
   //check the num products in tha store
      if (product.numProducts < num) {
        setMessageLastProducts(true)
        num=product.numProducts
        addProduct(num)
      }
  }, [id,num]);



  useEffect(() => {
    if (product.price != undefined) {
      setImageSrc(require('../../asset/Images/' + product.image))
    }
  }, [product]);

  
  return (

    <div className="gridContainerItemCart ">
<Message show={messageLastProducts} onHide={()=>{setMessageLastProducts(false)}} bodymessage={  " המוצר אזל מן המלאי נשארו " + product.numProducts + " יחידות "+"(מספר המוצרים יתעדכן) "} />
      <div>
        <button type="button" onClick={() => updateLocalStorage(0)} className=" btn-exit gridItemCart numItem">x</button>
        <br></br>
        {"₪" + (product.price * numItem).toFixed(2)}
      </div>
      <div className="gridItemCart">
        <div className="nameItem"><a href="" >{product.name} </a></div>
        <div>ליח' {" ₪" + product.price}</div>
        <button type="button" onClick={() => addProduct(numItem - 1)} className="numItem">-</button>
        <input type="tel" value={numItem} onChange={(e) => addProduct(parseInt(e.target.value))} className="numItem" />
        <button type="button" onClick={() => addProduct(numItem + 1)} className="numItem">+</button>
      </div>
      <img src={imageSrc.default} className="imgItem gridItemCart" />
    </div>

  );
}