'use client'
import { useState } from 'react';
import { sendModificationProposal } from '@/app/actions';

export default function ModificationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Definimos el tipo del formulario para TypeScript
  async function handleFormAction(formData: FormData) {
    setStatus('loading');
    try {
      const result = await sendModificationProposal(formData);
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-700 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-blue-800 transition-all font-medium z-40"
      >
        📢 Proponer modificación
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Reportar cambio</h2>
            <p className="text-slate-500 mb-6 text-sm">Si los datos de una oficina son incorrectos, informalo acá.</p>
            
            {status === 'success' ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-medium">
                ¡Gracias! Reporte enviado correctamente.
              </div>
            ) : (
              <form action={handleFormAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Edificio</label>
                  <input name="edificio" placeholder="Ej: Tribunales I" required className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-800" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Oficina / Dependencia</label>
                  <input name="oficina" placeholder="Ej: Juzgado Civil 25" required className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-800" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase">Nueva Ubicación</label>
                  <textarea name="ubicacion" placeholder="Piso, pasillo o descripcion..." required className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none text-slate-800" />
                </div>
                
                {status === 'error' && <p className="text-red-500 text-sm">Hubo un error al enviar. Probá de nuevo.</p>}

                <div className="flex gap-3 mt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="flex-1 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="flex-1 bg-blue-700 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-blue-800 disabled:opacity-50 shadow-md transition"
                  >
                    {status === 'loading' ? 'Enviando...' : 'Enviar Reporte'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}