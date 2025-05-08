import { Resend } from "resend";

export const prerender = false;

const resend = new Resend("re_8mgSScxX_9UgfTvJa7746iXT5hmuKTNme");

const mpAccessToken = import.meta.env.MP_ACCESS_TOKEN;

export async function POST({ request }) {
  try {
    const body = await request.json();

    // Aseguramos que sea un pago
    if (body.type !== "payment") {
      return new Response("No es evento de pago", { status: 200 });
    }

    const paymentId = body.data.id;

    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${mpAccessToken}`,
        },
      }
    );

    const payment = await res.json();

    // Solo actuamos si el pago fue aprobado
    if (payment.status !== "approved") {
      return new Response("Pago no aprobado", { status: 200 });
    }

    console.log("Detalles del pago:", payment);

    // 📧 DATOS DEL COMPRADOR
    const buyerName = payment.payer?.name || "Sin nombre";
    const buyerEmail = payment.payer?.email || "Sin email";
    const purchasedItem =
      payment.additional_info?.items?.[0]?.title || "Producto desconocido";
    const amount = payment.transaction_amount;

    // 1️⃣ Enviamos correo a vos
    await resend.emails.send({
      from: "Cobarde Web <noreply@cobarde.com.ar>",
      to: "cobardeoficial@gmail.com",
      subject: "💰 Nueva venta realizada",
      text: `
Se ha realizado una nueva compra en Cobarde Web.

🧍 Comprador: ${buyerName}
📧 Email: ${buyerEmail}
🛒 Producto: ${purchasedItem}
💵 Monto: $${amount}

ID de pago: ${payment.id}
      `,
    });

    // 2️⃣ Enviamos correo al comprador
    await resend.emails.send({
      from: "Cobarde Web <web@cobarde.com.ar>",
      to: buyerEmail,
      replyTo: "cobardeoficial@gmail.com",
      subject: "¡Gracias por tu compra!",
      text: `
Hola ${buyerName},

¡Gracias por comprar "${purchasedItem}" en Cobarde Web!

Ahora podés agendar tu reunión directamente desde este enlace:
👉 https://calendly.com/tu-link-personalizado

Cualquier consulta, respondé este mail.

Saludos,
El equipo de Cobarde Web
      `,
    });

    return new Response("Webhook procesado con éxito", { status: 200 });
  } catch (error) {
    console.error("❌ Error en Webhook:", error);
    return new Response("Error en el servidor", { status: 500 });
  }
}
