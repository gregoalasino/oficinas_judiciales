'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendModificationProposal(formData: FormData) {
  const tipo = formData.get('tipo')?.toString() === 'nueva' ? 'NUEVA OFICINA' : 'MODIFICACIÓN';
  const edificio = formData.get('edificio')?.toString();
  const oficina = formData.get('oficina')?.toString();
  const ubicacion = formData.get('ubicacion')?.toString();

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gregoalasino@gmail.com',
      subject: `[${tipo}] - ${oficina}`, // El asunto ahora te dice qué es
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #1d4ed8;">${tipo} Reportada</h2>
          <p><strong>Edificio:</strong> ${edificio}</p>
          <p><strong>Oficina:</strong> ${oficina}</p>
          <p><strong>Detalles:</strong> ${ubicacion}</p>
        </div>
      `
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}