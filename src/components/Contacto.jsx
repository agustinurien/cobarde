import React, { useState } from "react";
import "./contact.css";
import { MdArrowOutward } from "react-icons/md";

const Contacto = () => {
  const [textarea, setTextarea] = useState("Subscripcion");
  return (
    <form className="contactoForm">
      <div className="inputs">
        <h3>
          Escribí tus datos y no seas{" "}
          <span style={{ color: "red" }}>cobarde</span>.
        </h3>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Email" />
        <select
          name="opcion"
          id="opcion"
          onChange={(e) => setTextarea(e.target.value)}
        >
          <option value="Subscripcion">SUBSCRIPCION</option>
          <option value="Consulta">CONSULTA</option>
        </select>
        {textarea === "Consulta" && (
          <textarea
            name="consulta"
            id="consulta"
            cols="30"
            rows="10"
            placeholder="Escriba su consulta..."
          ></textarea>
        )}
      </div>
      <div className="buttons">
        <a href="">ENVIAR</a>
        <a href="" className="arrow">
          <MdArrowOutward />
        </a>
      </div>
    </form>
  );
};
export default Contacto;
