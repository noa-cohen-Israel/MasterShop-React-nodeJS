import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/Products/Products';
import Home from './components/Home/Home';
import NavigationBar from './components/NavigationBar/NavigationBar';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Message from './components/Message/Message';
import About from './components/About/About';
import Error404 from './components/Error404/Error404';
import Shipments from './components/Shipments/Shipments';
import { useEffect, useState } from 'react';

function App() {
  
  const [cart,setCart]=useState(false)
  const [status,setstatus]=useState(false)
  const [updateCart, setUpdateCart] = useState(false);

useEffect(()=>{
  if(localStorage.userDetails==undefined){
   localStorage.userDetails=JSON.stringify(false);
   localStorage.userCart=JSON.stringify({});
   localStorage.payment=JSON.stringify(0);
  }
},[])

const changeUpdateCart=()=>{
  updateCart?setUpdateCart(false):setUpdateCart(true)
}

const [updateProductById, setUpdateProductById] = useState(false);

  return (

    <div>
      <div className="header">
      <NavigationBar updateCartAndProducts={()=>{setUpdateProductById(!updateProductById);updateCart?setUpdateCart(false):setUpdateCart(true)}} onCart={(val)=>setCart(val)}/></div>
      {cart && (<div className="shoppingCart"><ShoppingCart updateProductId={(id,num)=>{setUpdateProductById({"id":id, "num":num})}} func={changeUpdateCart} updateCart={updateCart}/></div>)}
      <div className="main">
      <Switch >
        <Route exact path='/' component={Home}/>
        <Route path='/about'><About/></Route>
        <Route exact path='/products'><Products updateCart={changeUpdateCart} updateProductId={updateProductById} cart={cart}  nameCategory="all"/></Route>
        <Route path='/products/MeatAndFish'><Products updateCart={changeUpdateCart} updateProductId={updateProductById} cart={cart} nameCategory="Meat&Fish"/></Route>
        <Route path='/products/DairyAndEggs'><Products updateCart={changeUpdateCart}updateProductId={updateProductById}  cart={cart} nameCategory="Dairy&Eggs"/></Route>
        <Route path='/products/frozen'><Products updateCart={changeUpdateCart} updateProductId={updateProductById} cart={cart} nameCategory="frozen"/></Route>
        <Route path='/products/Sweets&Snacks'><Products updateCart={changeUpdateCart} updateProductId={updateProductById} cart={cart} nameCategory="Sweets&Snacks"/></Route>
        <Route path='/payment'><Shipments updateCart={()=>{setCart(false)}}/></Route>
        <Route ><Error404/></Route>
      </Switch></div>
      <div className="footer">נוצר עי נעה</div>
    </div>
  );
}

export default App;