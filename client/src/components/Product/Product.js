import React, { useState, useEffect } from "react";
import './Product.css'
import Message from '../Message/Message'

export default function Product({ image, name, description, price, id, updateCartFunction, numProducts,updateProduct }) {
    const [numItem, setNumItem] = useState(0)
    const [changeBtn, setchangeBtn] = useState(false)
    const [messageLastProducts, setMessageLastProducts] = useState(false);
    const [userUnlogin, setUserUnlogin] = useState(false);
let lastNum;
    let userCart = JSON.parse(localStorage.userCart)
   //add product to cart
    const addProductToCart = (num) => {
        if (num == 0) delete userCart[id];
        else userCart[id] = num;
        localStorage.userCart = JSON.stringify(userCart);
        let total=JSON.parse(localStorage.payment)
        console.log(numItem)
        console.log(lastNum)
        total=parseFloat(total)+(num-lastNum)*price
        localStorage.payment = JSON.stringify(total.toFixed(2));
        updateCartFunction()
    }
//updete the num product
    async function changeNum(num) {
         lastNum=numItem
        if (num == 0) {
            setchangeBtn(false)
            addProductToCart(num);}
  
        if (num > 0 && num < 100) {
  
            if (numProducts < num) {
                setMessageLastProducts(true)
                num=numProducts
            }
           
            setNumItem(num)
            addProductToCart(num);
        }
        
    }

    useEffect(() => {
        //updete the num product on the screem
        if(JSON.parse(localStorage.userDetails)){ 
            
            Object.entries(userCart).map(([key, num])=>{
            if(id==key){
                if (num == 0) {
                    let tmp=userCart
                    delete tmp[id];setchangeBtn(false);
                    localStorage.userCart = JSON.stringify(tmp);
                    updateCartFunction()}
               else{ setchangeBtn(true)
           setNumItem(num)}
            }
          })
          
          return
        }
       if( updateProduct.id==id){
       setchangeBtn(true)
       setNumItem(updateProduct.num)
       if (updateProduct.num == 0) {delete userCart[id];setchangeBtn(false);}
    }

   }, [updateProduct]);

//add to cart
function addToCart(){
if(!JSON.parse(localStorage.userDetails)){
    setUserUnlogin(true)
    return
}
setchangeBtn(true); 
changeNum(1) 
}


    let imageSrc = require('../../asset/Images/' + image);

    return (
        <div className="card cardBody" >
         <Message show={userUnlogin} onHide={()=>{setUserUnlogin(false)}} bodymessage={ "לא ניתן להזמין לפני התחברות"} />
        <Message show={messageLastProducts} onHide={()=>{setMessageLastProducts(false)}} bodymessage={  " המוצר אזל מן המלאי נשארו "+numProducts+" יחידות "+"(מספר המוצרים יתעדכן) "} />
            <div className="cardDivImg"><img src={imageSrc.default} className="cardImg" alt={name}></img></div>
            <div className="card-body cardDetails">

                <h5 className="card-title">{name}</h5>
                <p className="cardText">{description}</p>
                <h5 className="ProductPrice">{" ₪" + price.toFixed(2)}</h5>
                <button onClick={addToCart} className={`btnAddProduct ${changeBtn ? "distroyBtn" : ""}`} >הוספה לסל</button>
                {changeBtn && (<div> <button  className="numItem" type="button" onClick={() => changeNum(numItem - 1)}>-</button>
                    <input type="tel" value={numItem} onChange={(e) => changeNum(parseInt(e.target.value))} className="numItem" />
                    <button type="button"  className="numItem" onClick={() => changeNum(numItem + 1)}>+</button></div>)}

            </div>
        </div>
    )
}