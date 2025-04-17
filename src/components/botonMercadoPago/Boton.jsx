import React from 'react'
import { MdArrowOutward } from 'react-icons/md';
import './Boton.css'

const Boton = (plato) => {
    const crearPreferenciaCompra = async () => {
        try {
            const respuesta = await fetch('/api/crear-preferencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: plato.plato.titulo,
                    quantity: 1,
                    unit_price: plato.plato.precio,
                }),
            });

            const data = await respuesta.json();


            if (data.init_point) {
                // Redirigir al usuario a la página de pago de Mercado Pago
                window.location.href = data.init_point;
            } else {
                // Manejo de errores
                alert('Hubo un error al crear la preferencia de pago');
            }
        } catch (error) {
            console.error('Error en la creación de la preferencia:', error);

        }
    };
    return (
        <div className="buttons">
            <button onClick={crearPreferenciaCompra}>Pagar con Mercado Pago</button>
            <button onClick={crearPreferenciaCompra} className="arrow"><MdArrowOutward /></button>
        </div>

    )
}

export default Boton
