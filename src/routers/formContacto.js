import dotenv from "dotenv";
dotenv.config(); // Esto carga tu .env

import { RESEND_API_KEY } from '../config.js'; // o desde donde lo tengas

import { Router } from "express";
import { Resend } from "resend";

const router = Router();

const resend = new Resend(RESEND_API_KEY);

//prueba
console.log("RESEND_API_KEY en entorno:", RESEND_API_KEY);


router.post("/", async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  try {
    await resend.emails.send({
      from: "Formulario Web <onboarding@resend.dev>",
      to: "danielabh1997@gmail.com",
      subject: "Nuevo mensaje del formulario",
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
      `
    });

    res.status(200).json({ mensaje: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
});

export default router;


