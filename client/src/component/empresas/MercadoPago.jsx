import React from "react";
import Checkout from "./Checkout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


const MercadoPago = () => {
  const [datos, setDatos] = useState("");

  const { user } = useAuth0();

  const email = JSON.stringify(user.email);
  const email2 = email.substring(1, email.length - 1);


  useEffect(() => {
    axios
      .post("http://localhost:3001/mercadopago", {email : email2})
      .then((data) => {
        setDatos(data.data);
        console.info("Contenido de data:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  const productos = [
    { title: "Premium", quantity: 5, price: 10.52 },

  ];
  return (
    <div className="App">
      {!datos ? (
        <p>Aguarde un momento....</p>
       ) : (
        <Checkout productos={productos} data={datos} />
       )}
    </div>
  );
};

export default MercadoPago;
