import React, { useState } from "react";
import Boton from "../botonMercadoPago/Boton";
import "./llenarDatos.css";

const LlenarDatos = ({ plato }) => {
  console.log(plato);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [paquete, setPaquete] = useState("no"); // Estado para el paquete adicional

  // Precio del paquete 3
  const parejaPrecio = 900000;
  let precioFinal = plato.precio;

  // Si se selecciona "sí", sumamos el precio del paquete 3
  if (paquete === "si") {
    precioFinal += parejaPrecio;
  }

  let titulo = plato.titulo;
  if (paquete === "si") {
    titulo += " + ¿Estás siendo vos mismo con la persona que tenés a tu lado?";
  }

  const datosCompletos = {
    ...plato,
    usuario: {
      name,
      email,
      numero,
    },
    precio: precioFinal, // Incluimos el precio final con el posible paquete adicional
    titulo: titulo, // Actualizamos el título para que incluya el paquete 3
  };

  return (
    <div className="llenarDatosContainer">
      <div className="llenarDatos">
        <h2>Detalles de contacto necesarios para la compra</h2>
        <input
          className="inputPago"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="inputPago"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inputPago"
          type="number"
          placeholder="Celular"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
        {plato.titulo !== "UN VIAJE HACIA TU VERDADERO POTENCIAL" &&
          plato.titulo !== "VOY A TU EMPRESA" && (
            <div className="selectPaquete">
              <div className="selectPaquete">
                <h3>Solo para parejas. Incorpora un paquete adicional:</h3>
              </div>

              <div className="selectPaqueteRadio">
                <label>
                  <input
                    type="radio"
                    name="paquete"
                    value="si"
                    checked={paquete === "si"}
                    onChange={(e) => setPaquete(e.target.value)}
                  />
                  ¿Estás siendo vos mismo con la persona que tenés a tu lado?
                </label>
              </div>
              <div className="selectPaqueteRadio">
                <label>
                  <input
                    type="radio"
                    name="paquete"
                    value="no"
                    checked={paquete === "no"}
                    onChange={(e) => setPaquete(e.target.value)}
                  />
                  No
                </label>
              </div>
            </div>
          )}
        <Boton plato={datosCompletos} />
      </div>
    </div>
  );
};

export default LlenarDatos;
