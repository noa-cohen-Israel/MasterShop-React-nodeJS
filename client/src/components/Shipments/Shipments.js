import React, { useEffect, useState } from "react";
import Paypal from "../Paypal/Paypal";
import { useHistory } from 'react-router-dom';
import { editShipment, findShipmentsByArea, findShipmentsById } from "../../service/shipments"
import { getAllAreas } from "../../service/areas"
import { getSeq } from "../../service/seq"
import { addOrder } from "../../service/orders"
import { editUser } from "../../service/users"
import { editSeq } from "../../service/seq"
import "./Shipments.css";
import moment from 'moment';
import { validation } from "../../shared/Validation"
import InputField from "../InputField/InputField"
import { editProduct, findProductById } from "../../service/product";
import Message from '../Message/Message';

export default function Shipments({ updateCart }) {
  let history = useHistory()
  const [shipmentsTimes, setShipmentsTimes] = useState([])
  const [areas, setAreas] = useState([])
  const [shipmentChecked, setShipmentChecked] = useState("")
  const [errorsShipment, setErrorsShipment] = useState("")
  const [paymentToken, setPaymentToken] = useState(false)
  const [status, setStatus] = useState(false);
  const [fullFields, setFullFields] = useState(false);
  const [orderId, setOrderId] = useState("");
  let areaChecked = 0

  let order = {};
  const [errors, setErrors] = useState({
    adress: "",
    city: "",
    numAdress: ""

  })
  const [valuesFeilds, setValuesFeilds] = useState({
    adress: "",
    city: "",
    numAdress: ""
  })

  const gotoHome = () => { 
    history.push("/");
  setStatus(false); 
   updateCart()
  

   }




 


  //check validation fields
  function checkIsFullFields() {
    for (let value of Object.values(errors)) {
      if (value != null) {
        setFullFields(false)
        return false
      }
    }
    if (errorsShipment != null) {
      setFullFields(false)
      return false
    }
    setFullFields(true)
    return true
  }
  function shipmentCheckedFunc(event) {
    setShipmentChecked(
      event.target.value
    );

    setErrorsShipment(null)
    checkIsFullFields()
  }
//get dates of shipments in the area that selected
  async function getDates(area) {
    let now = moment();
    let shipments = await findShipmentsByArea(area)
    setShipmentsTimes(shipments.map((value) => {
      let dateShipment = moment(value.date, "DD/MM/YYYY");

      if (dateShipment.isAfter(now)) {
        return <div>
          <label htmlFor="time" className="">
            {value.date} - {value.time}
          </label>
          <input type="radio" onChange={shipmentCheckedFunc} value={value.id} name="time" />
        </div>
      }

    }))

  };

//check validation areas
  function areaCheckedFunc(event) {
    areaChecked = event.target.value
    if (errorsShipment == "")
      setErrorsShipment("בחר תאריך משלוח")

    getDates(areaChecked)
  }

//get areas
  async function getAreas() {
    const allAreas = await getAllAreas()
    setAreas(
      <select onChange={areaCheckedFunc} >
        {allAreas.map((value) => {
          return <option value={value.id}>{value.area}</option>
        })}
        </select>)

  };
//update in the store the num product that sold 
  const updateNumSoldProduct = async (id, num) => {
    let tmp = await findProductById(id);
    tmp.numProducts -= num
    tmp.numProductsSold += num
    editProduct(id, tmp)
  };

   useEffect(() => {
     getAreas();   }, [])

  
   //save the order and given a num shipment
  async function saveOrder() {
    

    let seq = await getSeq()
    seq.lastOrder = seq.lastOrder + 1
    let shipment = await findShipmentsById(shipmentChecked)
    shipment.orders.push(seq.lastOrder)
    editShipment(shipmentChecked, shipment)
    let userDetails = JSON.parse(localStorage.userDetails)
    userDetails.ordersId.push(seq.lastOrder)
    localStorage.userDetails=JSON.stringify(userDetails)
    editSeq(seq)

    order.id = seq.lastOrder
    order.products = JSON.parse(localStorage.userCart)
    order.payment = JSON.parse(localStorage.payment)
    order.adress = valuesFeilds.adress
    order.city = valuesFeilds.city
    order.numAdress = valuesFeilds.numAdress
    order.paymentToken = paymentToken
    order.email=userDetails.email
    order.firstName=userDetails.firstName
    setOrderId(order.id)
    Object.entries(order.products).map(([key, num]) => {
    updateNumSoldProduct(key, num) 
  })
    localStorage.userCart = JSON.stringify({})
    localStorage.payment = JSON.stringify(0)
    userDetails.payment = 0
    userDetails.shoppingCart = {}
    editUser(userDetails.id, userDetails)
    addOrder(order)
    setStatus(true)

  }

   useEffect(() => {
    //end the order
    
     if (paymentToken != false) {
          saveOrder()
    
      
     }
 }, [paymentToken])
   function checkValue(event) {
     //checks if the input is valid
     const errorsValue = validation(
       [event.target.name],
       event.target.value
     );

     setErrors({
       ...errors,
       [event.target.name]: errorsValue
     });
     setValuesFeilds({
      ...valuesFeilds,
     [event.target.name]: event.target.value
     });
     checkIsFullFields()
   }

  return (
    <div className="paymentBackground">
      { <div className="shipingBody">
        <br />

        <h6>בחר אזור שליחה</h6>
        {areas}
        <br />
        <small>{errorsShipment}</small>
        <br />
        {shipmentsTimes}
        <div className="shipingInputs">
        < InputField label="עיר" small={errors.city} name="city" type="text" value={valuesFeilds.city} onChange={checkValue} placeholder="הזן עיר" />
          < InputField label="כתובת" small={errors.adress} name="adress" type="text" value={valuesFeilds.adress} onChange={checkValue} placeholder="הזן כתובת" />
          < InputField label="מספר בית" small={errors.numAdress} name="numAdress" type="tel" value={valuesFeilds.numAdress} onChange={checkValue} placeholder="הזן מספר בית" />
        </div>
        {!fullFields && (<button className="shipingButton" onClick={() => { checkIsFullFields() }}><span>המשך לתשלום</span></button>)}
        {(fullFields && !status) && (<div><Paypal history={history} getPaymentToken={(value) => { console.log(value); setPaymentToken(value) }} total={JSON.parse(localStorage.payment)} />
        </div>)}

        <Message show={status} onHide={ gotoHome } bodymessage="ההזמנה התקבלה בהצלחה" />
      </div> }
      </div>
  );
}


