import React from "react";
import "./contact.css";
import { MdArrowOutward } from "react-icons/md";

const Contacto = () => {
  return (
    <form className="contactoForm">
      <div class="inputs">
        <h3>
          Escribí tus datos y no seas{" "}
          <span style={{ color: "red" }}>cobarde</span>.
        </h3>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Email" />
      </div>
      <div class="buttons">
        <a href="">RECIBIR EMAILS</a>
        <a href="" class="arrow">
          <MdArrowOutward />
        </a>
      </div>
    </form>
  );
};
export default Contacto;
