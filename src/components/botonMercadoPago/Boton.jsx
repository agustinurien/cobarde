import React from "react";
import { MdArrowOutward } from "react-icons/md";
import "./boton.css";

const Boton = (plato) => {
  const crearPreferenciaCompra = async () => {
    try {
      const respuesta = await fetch("/api/crear-preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: plato.plato.titulo,
          quantity: 1,
          unit_price: plato.plato.precio,
          payer: {
            name: plato.plato.usuario.nombre,
            email: plato.plato.usuario.email,
            identification: {
              type: "phone",
              number: plato.plato.usuario.numero,
            },
          },
        }),
      });

      const data = await respuesta.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        // Manejo de errores
        alert("Hubo un error al crear la preferencia de pago");
      }
    } catch (error) {
      console.error("Error en la creación de la preferencia:", error);
    }
  };
  return (
    <div className="buttonsMercadoPago">
      <button onClick={crearPreferenciaCompra}>Pagar con Mercado Pago</button>
      <button onClick={crearPreferenciaCompra} className="arrow">
        <MdArrowOutward />
      </button>
    </div>
  );
};

export default Boton;
