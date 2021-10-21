import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import InputField from "../../components/InputField/InputField";
import { addUser, findUserByEmail, findUser, findUserById, editUser } from "../../service/users";
import { validation } from "../../shared/Validation";
import Recaptcha from "../Recaptcha/Recaptcha";
import Message from "../Message/Message";
import "./RegistrationForm.css";


const labelFields = {
  email: "דואר אלקטרוני",
  id: "תעודת זהות",
  firstName: "שם פרטי",
  lastName: "שם משפחה",
  phone: "מס' טלפון נייד",
  exampleFirstName: "ישראל",
  examplelastName: "ישראלי",
  password: "סיסמא",
  confirmPassword: "אימות סיסמא"
};

//Component returns a registration form according to the selected language
function RegistrationForm(props) {


  const [register, setregister] = useState(false);
  const [button, setbutton] = useState("כניסה");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelected, setisSelected] = useState(true);
  const [recaptcha, setrecaptcha] = useState(true);
  const [bodymessage, setbodymessage] = useState("");
  const [status, setstatus] = useState(false);
  let fullForm=true;
  let userDetails;
  let userInfo=false;


  const fields = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [RegistrationFormValues, setRegistrationFormValues] = useState(fields);
  const [error, seterror] = useState(fields);

  useEffect(() => {
    clearForm();
  }, [props.show])


  //A function updates the fields and checks if the input is valid and if the form is complete
  const updateFieldValues = (event) => {
    //checks if the input is valid
    const errorsValue = validation(
      [event.target.name],
      event.target.value
    );

    seterror({
      ...error,
      [event.target.name]: errorsValue
    });
    if (event.target.name == "confirmPassword") {
      if (errorsValue == "יש להכניס קודם סיסמא תקינה") {
        event.target.value = ""
      }
    }
    //updates the fields
    setRegistrationFormValues({
      ...RegistrationFormValues,
      [event.target.name]: event.target.value
    });
    fullForm = true;
    //if the form is complete
    seterror((error) => {
      if (register) { 
        for (let value of Object.values(error)) {
          if (value != null) {
            setIsDisabled(true)
            fullForm = false;
          }
        }
      }
      else {
         //if the form is complete in login
        if (error.email != null || error.password != null) {
          setIsDisabled(true)
          fullForm = false;
        }
        else {
          setIsDisabled(false)
        }
      }
      if (fullForm == true) {
        if (recaptcha == true) setIsDisabled(false)
      }

      return error;
    });
  };

  //clear form fields and errors
  const clearForm = (event) => {
    setIsDisabled(true);
    setRegistrationFormValues(fields);
    seterror(fields);
    setrecaptcha(false);
  };



  //Called at the end of filling out the form sends the data to the console and displays a termination message to the screen by set the variable "showMessage" to true and clear fields and errors
  const saveDataForm = async (event) => {
    event.preventDefault();

    if (register === false) {

      userDetails = await findUser(
        RegistrationFormValues.email,
        RegistrationFormValues.password
      );
      if (userDetails!=undefined) {
        setbodymessage("ברוכים השבים")
        setstatus(true)

        let userInfo = JSON.parse(localStorage.userDetails)
        if (userInfo != false) {//save the last user
          userInfo.shoppingCart = JSON.parse(localStorage.userCart)
          userInfo.payment = JSON.parse(localStorage.payment)
          editUser(userInfo.id, userInfo)
        }
        if (userDetails.shoppingCart!=undefined){
        localStorage.userCart = JSON.stringify(userDetails.shoppingCart);}
        else localStorage.userCart = JSON.stringify({})
        localStorage.payment=JSON.stringify(userDetails.payment);
        delete userDetails.payment
        delete userDetails.shoppingCart
        localStorage.userDetails = JSON.stringify(userDetails);
        props.onHide()
        props.updateCartAndProducts()
        props.changeUser(JSON.parse(localStorage.userDetails).firstName)


      } else {
        seterror({
          ...error,
          password: "דואר אלקטרוני או הסיסמא אינם תואמים."
        });
      }

    } else {
 
      userDetails = await findUserByEmail(RegistrationFormValues.email);

      if (userDetails!=undefined) {
        setbodymessage("מייל זה כבר קיים במערכת")
        setstatus(true)
        return;
      }
      userDetails = await findUserById(RegistrationFormValues.id);
      if (userDetails!=undefined) {
        setbodymessage("תעודת זהות זו כבר קיימת במערכת")
        setstatus(true)
        return;
      }



      delete RegistrationFormValues.confirmPassword
      RegistrationFormValues.ordersId=[]
      addUser(RegistrationFormValues);
      setbodymessage("ברוכים הבאים")
      setstatus(true)
      userInfo = JSON.parse(localStorage.userDetails)
      if (userInfo != false) {//save the last user
        userInfo.shoppingCart = JSON.parse(localStorage.userCart)
        userInfo.payment=JSON.parse(localStorage.payment)
        editUser(userInfo.id, userInfo)
      }
      props.onHide()
      localStorage.userCart = JSON.stringify({});
      localStorage.payment = JSON.stringify(0);
      localStorage.userDetails = JSON.stringify(RegistrationFormValues);
      props.updateCartAndProducts();
      props.changeUser(JSON.parse(localStorage.userDetails).firstName)
   
      clearForm();
    }

  };


  function onRegister() {

    setregister(true);
    setbutton("שמירה");
    setisSelected(false);
    setrecaptcha(false)
    setIsDisabled(true)
    if (error.password == "שם משתמש או הסיסמא אינם נכונים.") {
      seterror({
        ...error,
        password: null
      });
    }

  }
  function onLogin() {
    setregister(false);
    setbutton("כניסה");
    setisSelected(true);
    setrecaptcha(true)
    if (error.email == null && error.password == null) {
      setIsDisabled(false);
    }
  }
  return (
    <>
      <Message bodymessage={bodymessage} show={status} onHide={() => setstatus(false)} />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <button
            className={`btnLogin ${isSelected ? "" : "isSelected"}`}
            onClick={onRegister}
          >
            הרשמה לאתר
          </button>
          <button
            className={`btnLogin ${isSelected ? "isSelected" : ""}`}
            onClick={onLogin}
          >
            התחברות לחשבון שלך
          </button>
        </Modal.Header>

        <Modal.Body>
          <p className="form-group divForm">
            <form onSubmit={saveDataForm}>
              <div className="formFiled">
                {register && (
                  <div>
                    {" "}
                    <InputField
                      onChange={updateFieldValues}
                      value={RegistrationFormValues.firstName}
                      type="text"
                      name="firstName"
                      label={labelFields.firstName}
                      small={error.firstName}
                      placeholder={labelFields.exampleFirstName}
                    />
                    <InputField
                      onChange={updateFieldValues}
                      value={RegistrationFormValues.lastName}
                      type="text"
                      name="lastName"
                      label={labelFields.lastName}
                      small={error.lastName}
                      placeholder={labelFields.examplelastName}
                    />
                    <InputField
                      onChange={updateFieldValues}
                      value={RegistrationFormValues.id}
                      type="text"
                      name="id"
                      label={labelFields.id}
                      small={error.id}
                      placeholder="999999999"
                    />
                    <InputField
                      onChange={updateFieldValues}
                      value={RegistrationFormValues.phone}
                      type="text"
                      name="phone"
                      label={labelFields.phone}
                      small={error.phone}
                      placeholder="0548888888"
                    />{" "}
                  </div>
                )}
                <InputField
                  onChange={updateFieldValues}
                  value={RegistrationFormValues.email}
                  type="text"
                  name="email"
                  label={labelFields.email}
                  small={error.email}
                  placeholder="aaa@gmail.com"
                />
                <InputField
                  onChange={updateFieldValues}
                  value={RegistrationFormValues.password}
                  type="password"
                  name="password"
                  label={labelFields.password}
                  small={error.password}
                  placeholder="חובה לפחות אות גדולה וקטנה ומספר"
                />
                {register && (
                  <div>
                    <InputField
                      onChange={updateFieldValues}
                      value={RegistrationFormValues.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      label={labelFields.confirmPassword}
                      small={error.confirmPassword}
                      placeholder="הכנס סיסמא שוב"
                    />
                    <div id="divRecaptcha">
                      <Recaptcha
                        onRecaptcha={() => {
                          setrecaptcha(true);
                          console.log(fullForm)
                          if (fullForm == true) setIsDisabled(false)
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="divButton">
                <button className="btn btn-info" disabled={isDisabled} type="submit">
                  {button}

                </button>
              </div>
            </form>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegistrationForm;
