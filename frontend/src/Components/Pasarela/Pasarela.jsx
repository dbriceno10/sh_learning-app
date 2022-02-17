import React, { useEffect,useState} from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import {useSelector,useDispatch} from 'react-redux'

import { Form, Field } from "react-final-form";
import {useSearchParams, useNavigate } from 'react-router-dom'

import Card from "./Card";
import {

  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Pasarela() {

  const [query, setquery]=useSearchParams()
  const orderId=query.get('orderId')
  const studentId=query.get('studentId')
  const total=query.get('total')
  console.log(total)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function validacion(correo){
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
   let valido=expReg.test(correo)
   return valido 
  }
  
  useEffect(() => {
    
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51KRO5jAHGoDWCP4Rov2etBG70oz1TPbmhQB5VrWaYzwrQZibQkmI7lVvEHBysvFqC5FguniyK77hJN1NtJJYXuTa00fvsNgG6I"
          );
      };
      window.document.body.appendChild(s);
    }
  }, []);
  
  
  
  const onSubmit = async (values) => {
    if(!validacion(values.email)){
      alert('Introduzca un correo valido')
    }
    else{ await sleep(0);
    
    try {
      
      window.Stripe.card.createToken(
        {
          number: values.number,
          exp_month:values.expiry.split("/")[0],
          exp_year:values.expiry.split("/")[1],
          cvc:values.cvc,
          name:values.name,
        },
        (status, response) => {
          if (status === 200) {
            
            axios
              .post("/stripe/pay", {
                token: response,
                email: values.email,
                amount:total,
                orderId:orderId,
               
                
              })
              .then((hola) =>{
                
              alert(hola)
                 //window.alert(JSON.stringify(res.data, 0, 2))
                //alert('Comprado')
              navigate('/home')}
               //retorno()
               )
              .catch((err) => console.log(`Error: ${err}`));
          } else {
            // console.log(`Error: ${response.error.message}`);
            alert(response.error.message)
          }
        }
      );
    } catch (error) {
      console.log(error)
    }}
  };

  return (
    <Styles>
      <h1>Compra</h1>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              
            
                <div>
               
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Your email"
                  autoComplete='off'
                 
                  
                />
              </div>
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                  autoComplete='off'
                  
                  
                 
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  autoComplete='off'
                  
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  autoComplete='off'
                 
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  autoComplete='off'
                 
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                 Pagar {total} $
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                 Limpiar campos
                </button>
              </div>
              
            </form>
          );
        }}
      />
    </Styles>
  );
}


