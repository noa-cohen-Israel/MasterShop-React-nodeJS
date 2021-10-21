import React from 'react'
import './Error404.css';
import { useHistory } from "react-router-dom";
import white_logo from '../../asset/Images/white_logo.png'

//Component displayed when there is no redirect to the page - error, With a back to home buttonץ
export default function Error404() {
  let history = useHistory();
  
  function gotohome(){
    history.push("/" )
  }

  return <div className="backgroundError404">
    <div>
    <img src={white_logo} className="imgError404" alt="home_img"></img> 
<div className="error404">
<h1 className="error404Text">אופס.....</h1>
<h4 className="error404Text">  הדף שחיפשת אינו נמצא :(</h4>
<br/><br/>
<button className="error404Button" onClick={()=>{gotohome()}}>חזרה לדף הבית</button>
        </div> </div></div>
}    
