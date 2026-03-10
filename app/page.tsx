"use client";

import { useState } from 'react';
import { officeLocations } from '../data/office'; 
import SearchBar from '../components/searchBar'; 
import BuildingSearchBar from '../components/BuildingSearcherBar';
// 1. IMPORTAMOS EL NUEVO COMPONENTE
import ModificationForm from '../components/ModificationForm'; 
import { HelpCircle, X, MapPin, Briefcase, Building2 } from 'lucide-react';


const TRIBUNALES_1_DATA = officeLocations.filter(o => o.id >= 1 && o.id <= 110);
const TRIBUNALES_2_DATA = officeLocations.filter(o => o.id >= 111 && o.id <= 282);
const POLO_LABORAL_DATA = officeLocations.filter(o => o.id >= 283 && o.id <= 323);
const FAMILIA_DATA = officeLocations.filter(o => o.id >= 324 && o.id <= 342);
const EXBANCO_DATA = officeLocations.filter(o => o.id >= 343 && o.id <= 359);
const ADMINISTRACION_DATA = officeLocations.filter(o => o.id >= 360 && o.id <= 375);
const SANJERONIMO_DATA = officeLocations.filter(o => o.id >= 376 && o.id <= 443 );

export default function HomePage() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center pt-20 pb-12 bg-[#f8fafc]">
      
      {/* HEADER CON BOTÓN DE INFO INTEGRADO */}
      <div className="relative flex items-center gap-3 mb-12">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          Buscador de Oficinas
        </h1>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="group relative p-2 text-slate-400 hover:text-blue-600 transition-all"
        >
          <HelpCircle size={28} strokeWidth={2.5} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </button>

        {/* POPOVER MEJORADO */}
        {showInfo && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowInfo(false)} />
            
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[360px] sm:w-[500px] bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              
              <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 p-1 rounded-md"><Building2 size={16}/></div>
                  <span className="font-bold text-sm uppercase tracking-wider">Guía de Identificación</span>
                </div>
                <button onClick={() => setShowInfo(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={18}/>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-[0.2em]">Estructura del ID de Red</p>
                  <div className="text-2xl font-mono tracking-[0.3em] font-bold">
                    <span className="text-blue-600 underline decoration-4 underline-offset-8">J</span>
                    <span className="text-emerald-500 underline decoration-4 underline-offset-8">CV</span>
                    <span className="text-slate-300">09XXXP01C01</span>
                    <span className="text-rose-500 underline decoration-4 underline-offset-8">A</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-100 text-blue-700 p-2 rounded-lg"><Building2 size={20}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">1. Tipo de Oficina</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">J (Juzgado), C (Cámara), S (Secretaría), F (Fiscalía), M (Mesa Entradas), R (Relatoría), T (Tribunal Superior), A (Asesoría).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-emerald-100 text-emerald-700 p-2 rounded-lg"><Briefcase size={20}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">2-3. Fuero Correspondiente</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">CV (Civil), CS(Contencioso), CN(Conciliación), CQ(Civil Quiebras), MN (Menores), CL (Correccional), CR (Crimen), PR (Protocolo) , PN (Penal), LB (Laboral), FM (Familia), CT (Control), EL (Electoral).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-rose-100 text-rose-700 p-2 rounded-lg"><MapPin size={20}/></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">15. Ubicación Física (Edificio)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">A (Trib. I), B (Trib. II), C (Trib. III), D (Trib. IV), E (Contencioso), F (Justicia Electoral), G (27 de Abril - Mediación), H (A.M Bas - Admin), I-M (Policia Judicial), J (Anexo), K (San Jerónimo), L (Cámaras Familia), N (Moplo).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium italic">Referencia oficial del Área de Informática</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="w-full max-w-xl px-4 mb-16">
        <SearchBar locations={officeLocations} />
      </div>

      <h2 className="text-xl font-semibold mb-8 text-slate-500 uppercase tracking-[0.2em]">Búsqueda por Edificio</h2>
      
      <div className="w-full max-w-6xl px-4 flex flex-wrap justify-center gap-6">
        <BuildingSearchBar title="Tribunales 1" locations={TRIBUNALES_1_DATA} />
        <BuildingSearchBar title="Tribunales 2" locations={TRIBUNALES_2_DATA} />
        <BuildingSearchBar title="Polo Laboral" locations={POLO_LABORAL_DATA} />
        <BuildingSearchBar title="Tucuman 360 / Familia" locations={FAMILIA_DATA} />
        <BuildingSearchBar title="Ex-Banco" locations={EXBANCO_DATA} />
        <BuildingSearchBar title="Administración / Arturo M. Bas" locations={ADMINISTRACION_DATA} />
        <BuildingSearchBar title="San Jerónimo" locations={SANJERONIMO_DATA} />
      </div>

      {/* 2. AGREGAMOS EL COMPONENTE AQUÍ ABAJO */}
      <ModificationForm />

    </main>
  );
}