import React from "react";
import Checkout from "./Checkout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const MercadoPago = () => {
  const [datos, setDatos] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/mercadopago")
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
