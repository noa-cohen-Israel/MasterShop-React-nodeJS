import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({onRecaptcha}) => {


  return (
    <div>
    <ReCAPTCHA
      sitekey="6LfQTIIaAAAAAHy4Ti9KApMl1Xfws9PuwG0O6okC"
      onChange={onRecaptcha}
    />
    </div>
  );
};
export default Recaptcha;