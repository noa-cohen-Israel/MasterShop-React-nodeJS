
let password="";


//validation message by language
const errorMessage = {
    mustField: "שדה חובה",
    email: "דואר אלקטרוני לא תקין",
    id: "תעודת זהות לא תקינה יש להזין ספרות בלבד",
    firstName: "שם פרטי לא תקין",
    lastName: "שם משפחה לא תקין",
    password: "סיסמא לא תקינה",
    confirmPassword: "ססמאות לא תואמות",
    phone: "מספר טלפון סלולרי לא תקין",
    numAdress:"הזן מספר בית חוקי",
    adress:"הזן כתובת חוקית",
    city:"הזן עיר חוקית"
};


//function check valid id number
const checkId = (number) => {
  let numTemp = 0;
  let sumVal = 0;
  while (number.length < 9) {
    number = "0" + number;
  }
  for (let i = 0; i < 9; i++) {
    if (i % 2 == 0) {
      numTemp = number.substr(i, 1) * 1;
    } else {
      numTemp = number.substr(i, 1) * 2;
    }
    if (numTemp > 9) numTemp = (numTemp % 10) + 1;
    sumVal = numTemp + sumVal;
  }
  sumVal = sumVal % 10;
  if (sumVal > 0) {
    return "תעודת זהות לא תקינה";

  }
  return null;
};
//function check valid confirmPassword
function checkConfirmPassword(value,field){
  if (value === "") {
    return errorMessage.mustField;
  }
  if (password!=value) {
    return errorMessage[field];
  }
  return null;
};



//function check empty field and valid by regular expretion
const defaultFieldValidation = (value, regex, field) => {
  if (value === "") {
    return errorMessage.mustField;
  }
  if (!regex.test(value)) {
    return errorMessage[field];
  }
  return null;
};


//function that calls validation is appropriate for the field
const validation = (field, value) => {
  let fieldError = null;
  if (field == "firstName" || field == "lastName" ) {
    fieldError = defaultFieldValidation(
      value,
      /^[א-תA-Za-z\s'-]{2,20}$/,
      field
    );
  } else if (field == "email") {
    fieldError = defaultFieldValidation(
      value,
      /^[a-zA-Z0-9]{6,30}@[a-zA-Z0-9]+\.[A-Za-z]+$/,
      field
    );
  } else if (field == "id") {
    fieldError = defaultFieldValidation(value, /^[0-9]{2,9}$/, field);
    if (fieldError == null) {
      fieldError = checkId(value);
    }
  } else if (field == "phone") {
    fieldError = defaultFieldValidation(
      value,
      /^0?(([5,7]{1}\d{8}))$/,
      field
    );
  } else if (field == "password") {
    password=value;
    fieldError = defaultFieldValidation(
      value,
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/,
      field
    );
  }
  else if (field == "numAdress") {
    fieldError = defaultFieldValidation(
      value,
      /^[0-9]{1,3}$/,
      field
    );
  }
  else if (field == "adress") {
    fieldError = defaultFieldValidation(
      value,
      /^[א-ת\s'-]{2,20}$/,
      field
    );}
    else if (field == "city") {
      fieldError = defaultFieldValidation(
        value,
        /^[א-ת\s'-]{2,20}$/,
        field
      );}
   else if (field == "confirmPassword") {
if(validation("password",password)==null){
 return fieldError = checkConfirmPassword(value,field);
}
return "יש להכניס קודם סיסמא תקינה"
  }
  return fieldError;
};

export { validation };
