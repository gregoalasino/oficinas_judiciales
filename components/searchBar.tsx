'use client'; // Necesario para usar estado (useState)

import React, { useState, useMemo } from 'react';
import { OfficeLocation } from '@/types/office.d';

// Propiedades que recibirá el componente
interface SearchBarProps {
  locations: OfficeLocation[];
}

export default function SearchBar({ locations }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);

  // Lógica de filtrado
  const filteredOptions = useMemo(() => {
    if (!searchTerm || selectedOffice) return [];
    
    const normalizedTerm = searchTerm.toLowerCase();

    // FILTRADO: Buscando en las propiedades tal como están definidas
    return locations.filter(office => 
      // Busca en el Nombre principal
      office.nombre.toLowerCase().includes(normalizedTerm) ||
      // Busca en el Edificio (que está en la variable 'piso' según tu tipo)
      office.piso.toLowerCase().includes(normalizedTerm) || 
      // Busca en el Piso/Nivel (que está en la variable 'ubicacion' según tu tipo)
      office.ubicacion.toLowerCase().includes(normalizedTerm)
    ).slice(0, 7);
    
  }, [searchTerm, locations, selectedOffice]);


  const handleSelect = (office: OfficeLocation) => {
    setSearchTerm(office.nombre);
    setSelectedOffice(office);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedOffice(null); 
  }

  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Busca una oficina, sala o edificio..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 shadow-md text-gray-800"
      />

      {/* Lista de Sugerencias */}
      {searchTerm && !selectedOffice && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-80 overflow-y-auto">
          {filteredOptions.map((office) => (
            <li
              key={office.id}
              onClick={() => handleSelect(office)}
              className="p-3 cursor-pointer hover:bg-blue-50 transition duration-150 border-b border-gray-100 last:border-b-0"
            >
              <span className="font-semibold text-gray-800">{office.nombre}</span>
              <span className="text-sm text-gray-500 block">
                Edificio: **{office.edificio}** | Piso: **{office.piso}** {/* Nota: Usamos 'piso' para Edificio y 'ubicacion' para Piso/Nivel según tu tipo */}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Vista de la Oficina Seleccionada */}
      {selectedOffice && (
        <div className="mt-8 p-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedOffice.nombre}</h2>
          
          <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Edificio o Complejo</p>
              {/* Mostramos el Edificio (que está en la propiedad 'piso') */}
              <p className="text-lg font-semibold text-blue-600">{selectedOffice.edificio}</p> 
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Piso / Nivel</p>
              {/* Mostramos el Piso/Nivel (que está en la propiedad 'ubicacion') */}
              <p className="text-lg font-semibold text-blue-600">{selectedOffice.piso}</p> 
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Ubicación Detallada / Notas</p>
            {/* Mostramos la Ubicación Detallada (que está en la propiedad 'edificio') */}
            <p className="text-base text-gray-800 italic">{selectedOffice.ubicacion}</p>
          </div>
        </div>
      )}
    </div>
  );
}