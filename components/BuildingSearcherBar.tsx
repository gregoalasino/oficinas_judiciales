'use client'; 

import React, { useState, useMemo } from 'react';
import { OfficeLocation } from '@/types/office.d';

interface BuildingSearchBarProps {
  title: string;
  locations: OfficeLocation[];
}

export default function BuildingSearchBar({ title, locations }: BuildingSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);

  // Lógica de filtrado
  const filteredOptions = useMemo(() => {
    if (!searchTerm || selectedOffice) return [];
    
    const normalizedTerm = searchTerm.toLowerCase();

    // Filtra el subconjunto de datos
    return locations.filter(office => 
      office.nombre.toLowerCase().includes(normalizedTerm) ||
      office.piso.toLowerCase().includes(normalizedTerm) || 
      office.ubicacion.toLowerCase().includes(normalizedTerm)
    ).slice(0, 10); // Límite de 10 resultados para los buscadores pequeños
    
  }, [searchTerm, locations, selectedOffice]);

  const handleSelect = (office: OfficeLocation) => {
    setSearchTerm(office.nombre);
    setSelectedOffice(office);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedOffice(null); 
  }

  const handleClear = () => {
    setSearchTerm('');
    setSelectedOffice(null);
  };

  // El componente se limita a un ancho de 96 (casi 400px) para caber en una fila horizontal
  return (
    <div className="w-full md:w-96 p-4 bg-white rounded-xl shadow-lg border border-gray-100 relative mb-4">
      
      <h3 className="text-lg font-bold mb-3 text-blue-600 border-b pb-2">{title}</h3>
      
      {/* Contenedor del Input y Botón de Borrar */}
      <div className="relative">
        <input
          type="text"
          placeholder={`Buscar en ${title}...`}
          value={searchTerm}
          onChange={handleChange}
          // Clases de estilo más compactas
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-800 pr-8"
        />

        {/* Botón de Borrar */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-0 top-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 transition duration-150 text-sm"
            aria-label="Borrar búsqueda"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Lista de Sugerencias (Autocompletado) */}
      {searchTerm && !selectedOffice && filteredOptions.length > 0 && (
        <ul className="absolute z-20 w-full left-0 bg-white border border-blue-200 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto">
          {filteredOptions.map((office) => (
            <li
              key={office.id}
              onClick={() => handleSelect(office)}
              className="p-3 cursor-pointer hover:bg-blue-50 transition duration-150 border-b border-gray-100 last:border-b-0"
            >
              <span className="font-semibold text-gray-800">{office.nombre}</span>
              <span className="text-xs text-gray-500 block">
                Piso: {office.piso}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Vista de la Oficina Seleccionada */}
      {selectedOffice && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-sm">
          <p className="font-bold text-gray-800">{selectedOffice.nombre}</p>
          <p className="text-gray-600">Piso: {selectedOffice.piso}</p>
          <p className="text-gray-600">Detalle: {selectedOffice.ubicacion}</p>
        </div>
      )}
    </div>
  );
}