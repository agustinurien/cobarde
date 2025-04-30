import React, { useState } from "react";
import Boton from "../botonMercadoPago/Boton";
import "./llenarDatos.css";

const LlenarDatos = ({ plato }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");

  const datosCompletos = {
    ...plato,
    usuario: {
      nombre,
      email,
      numero,
    },
  };

  console.log(datosCompletos);

  return (
    <div className="llenarDatosContainer">
      <div className="llenarDatos">
        <h2>Completa con tus Datos Personales.</h2>
        <input
          className="inputPago"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="inputPago"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputPago"
          type="number"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <Boton plato={datosCompletos} />
      </div>
    </div>
  );
};

export default LlenarDatos;
