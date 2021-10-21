import React from "react";
import "./Footer.css";
import { useHistory } from "react-router-dom";

//Componnent with footer and links to pages.
export default function Footer() {

  let history = useHistory();
  function gotolocation(location){
    history.push("/" + location)
  }

  return (
<footer>
<div className="containerFooter">
  <div className="itemFooter">

  </div>
  <div className="itemFooter">
  <button className="buttonFooter" onClick={()=>{gotolocation("")}}>בית</button><br/>
 <button  className="buttonFooter" onClick={()=>{gotolocation("about")}}>אודותינו</button><br/>
  </div>
  </div>
<p></p>
  <span>נוצר ע"י נעה כהן</span>
</footer>
  );
}
