import React,{useState} from 'react'
import './Home.css';
import Footer from '../Footer/Footer'


export default function Home({history}) {
    const gotoshoping = () => {
        history.push("/products");
    }


    function gotoProductsCategory(category){
      history.push("/products/"+category);
      console.log("/products/"+category)
    }

   

 
  return <div className="back">
 
            <button id="shoping" className="shopBtn btn btn-primary" onClick={gotoshoping}> {"<<  "}לקניה אונליין</button>
<div  className="divCtegoty">
            <button className="buttonCtegoty" onClick={()=>{gotoProductsCategory("MeatAndFish")}}>בשר ודגים</button><br/>
 <button  className="buttonCtegoty" onClick={()=>{gotoProductsCategory("DairyAndEggs")}}> מוצרי חלב וביצים</button><br/>
 <button className="buttonCtegoty" onClick={()=>{gotoProductsCategory("Sweets&Snacks")}}>חטיפים ומתוקים</button><br/>
 <button  className="buttonCtegoty" onClick={()=>{gotoProductsCategory("frozen")}}>קפואים</button><br/>
 </div>
  <Footer/>
        </div> 
}    
