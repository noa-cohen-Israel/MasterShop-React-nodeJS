import React, { useState,useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {editUser} from '../../service/users'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import { useHistory } from "react-router-dom";


export default function NavigationBar({onCart,updateCartAndProducts}) {

  const [status, setStatus] = useState(false)
  const [login, setLogin] = useState("התחברות")
  
  let history = useHistory();
  let cartOpen=false
  
  function gotoProducts(){
    history.push("/products");
  }


  function gotoProductsCategory(category){
    history.push("/products/"+category);
    console.log("/products/"+category)
  }

  function gotoHome(){
    history.push("/");
  }
  
  //Saves the user's data (shopping cart) and disconnects it
function exitUser(){
  let userInfo=JSON.parse(localStorage.userDetails)
  userInfo.shoppingCart = JSON.parse(localStorage.userCart)
  userInfo.payment = JSON.parse(localStorage.payment)
  editUser(userInfo.id, userInfo)
  localStorage.userDetails=JSON.stringify(false);
  localStorage.userCart=JSON.stringify({});
  localStorage.payment=JSON.stringify(0);
  onCart(false)
  gotoHome()
  setLogin("התחברות")
}

  useEffect(()=>{
    if (localStorage.userDetails!=undefined){
    if(JSON.parse(localStorage.userDetails)!=false){
      setLogin(JSON.parse(localStorage.userDetails).firstName)
    }}
  },[])

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand onClick={gotoHome}>master-shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="/about">אודותינו <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16"> <path  d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/> <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/></svg></Nav.Link>
          <Nav.Link onClick={() => { setStatus(true); }}>{login+" "}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg></Nav.Link>
           <RegistrationForm changeUser={(user)=>{setLogin(user)}}  updateCartAndProducts={updateCartAndProducts} show={status} onHide={() => setStatus(false)} />
           
         {(login !="התחברות") && (<Nav.Link onClick={exitUser}>יציאה   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
  <path fill="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
</svg></Nav.Link>)}
        </Nav>
        <Nav>
          <NavDropdown title="קטגוריות מוצרים" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={()=>{gotoProductsCategory("MeatAndFish")}}>בשר ודגים</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{gotoProductsCategory("DairyAndEggs")}}> מוצרי חלב וביצים</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{gotoProductsCategory("frozen")}}>קפואים</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{gotoProductsCategory("Sweets&Snacks")}}>חטיפים ומתוקים</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={gotoProducts}>כל המוצרים</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={()=>{cartOpen=!cartOpen;onCart(cartOpen)}}>סל קניות <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></Nav.Link>
 

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}