'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendModificationProposal(formData: FormData) {
  const edificio = formData.get('edificio');
  const oficina = formData.get('oficina');
  const ubicacion = formData.get('ubicacion');

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gregoalasino@gmail.com', // Cambialo por el tuyo
      subject: `Nueva propuesta de modificación: ${oficina}`,
      html: `
        <h2>Propuesta de cambio detectada</h2>
        <p><strong>Edificio:</strong> ${edificio}</p>
        <p><strong>Oficina:</strong> ${oficina}</p>
        <p><strong>Nueva Ubicación:</strong> ${ubicacion}</p>
        <hr />
        <p>Enviado desde la App de Búsqueda de Oficinas.</p>
      `
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}