import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: import.meta.env.MP_ACCESS_TOKENPRUEBA,
});

const preferenceClient = new Preference(mercadopago); // 👈 se pasa la instancia

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const preference = {
      items: [
        {
          title: body.title,
          quantity: body.quantity,
          unit_price: body.unit_price,
        },
      ],
      payer: {
        name: body.payer?.name || "No especificado",
        email: body.payer?.email || "No especificado",
        identification: {
          type: "phone",
          number: body.payer?.identification?.number || "",
        },
      },
      back_urls: {
        success: "http://localhost:4321/success",
        failure: "http://localhost:4321/failure",
        pending: "http://localhost:4321/pending",
      },
    };

    const response = await preferenceClient.create({ body: preference }); // ✅ así sí

    return new Response(JSON.stringify({ init_point: response.init_point }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear la preferencia" }),
      {
        status: 500,
      }
    );
  }
}
