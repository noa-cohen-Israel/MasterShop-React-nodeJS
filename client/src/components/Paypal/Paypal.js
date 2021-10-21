import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Message from '../Message/Message';
 
export default class MyApp extends React.Component {

   
    render() {
        const onSuccess = (payment) => {
    
                    console.log("The payment was succeeded!", payment);
                    this.props.getPaymentToken(payment.paymentToken)

        }
 
        const onCancel = (data) => {

            console.log('The payment was cancelled!', data);
            
        }
 
        const onError = (err) => {
 
            console.log("Error!", err);

        }
 
        let env = 'sandbox'; 
        let currency = 'ILS'; 
        let total = this.props.total; 
     
        const client = {
            sandbox:    'AVSiQWj5u0cGqzRL0yEeFyUIjmu9OgOXI2vJVrfr3-6DzTFbmFlhar4s85wgYxdarlvBCj2modHkfZ7H',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={parseFloat(total)} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}