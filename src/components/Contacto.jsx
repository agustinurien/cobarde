import React, { useState } from "react";
import "./contact.css";
import { MdArrowOutward } from "react-icons/md";

const Contacto = () => {
  const [textarea, setTextarea] = useState("Subscripcion");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const matter = form.opcion.value;
    const message = form.consulta?.value || "";

    // No enviar mensaje si es Subscripción
    if (matter === "Subscripcion") return alert("Gracias por suscribirte!");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, matter, message }),
    });

    if (res.ok) {
      alert("Mensaje enviado correctamente.", res.status);
      form.reset();
    } else {
      alert("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <form className="contactoForm" onSubmit={handleSubmit}>
      <div className="inputs">
        <h3>
          Escribí tus datos y no seas{" "}
          <span style={{ color: "red" }}>cobarde</span>.
        </h3>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />

        <select
          name="opcion"
          id="opcion"
          onChange={(e) => setTextarea(e.target.value)}
        >
          <option value="Subscripcion">SUSCRIPCION</option>
          <option value="Consulta">CONSULTA</option>
        </select>

        {textarea === "Consulta" && (
          <textarea
            name="consulta"
            id="consulta"
            cols="30"
            rows="10"
            placeholder="Escriba su consulta..."
            required
          ></textarea>
        )}
      </div>

      <div className="buttons">
        <button type="submit">ENVIAR</button>
        <a href="" className="arrow">
          <MdArrowOutward />
        </a>
      </div>
    </form>
  );
};
export default Contacto;
