export const prerender = false;

import { Resend } from "resend";

const resend = new Resend("re_8mgSScxX_9UgfTvJa7746iXT5hmuKTNme");

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, email, matter, message } = body;

    // Validación simple
    if (!name || !email || !matter) {
      return new Response("Faltan datos", { status: 400 });
    }

    const data = {
      from: "Cobarde Web <contacto@cobarde.com.ar>",
      to: "agus.urien3@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name} - ${matter}`,
      text: ` Has recibido un nuevo mensaje de contacto:
Nombre: ${name}
Email: ${email}
Motivo: ${matter} 
${message ? `\nMensaje: ${message}` : ""}`,
    };
    await resend.emails.send(data);
    return new Response("Correo enviado correctamente", { status: 200 });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return new Response("Error en el servidor", { status: 500 });
  }
}
