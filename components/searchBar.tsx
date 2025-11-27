'use client'; 

import React, { useState, useMemo } from 'react';
import { OfficeLocation } from '@/types/office.d';

interface SearchBarProps {
  locations: OfficeLocation[];
}

export default function SearchBar({ locations }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);

  // Lógica de filtrado con límite de 20 resultados
  const filteredOptions = useMemo(() => {
    if (!searchTerm || selectedOffice) return [];
    
    const normalizedTerm = searchTerm.toLowerCase();

    // Filtra basándose en las propiedades en ESPAÑOL (nombre, piso, ubicacion)
    return locations.filter(office => 
      office.nombre.toLowerCase().includes(normalizedTerm) ||
      office.piso.toLowerCase().includes(normalizedTerm) || 
      office.ubicacion.toLowerCase().includes(normalizedTerm)
    ).slice(0, 20);
    
  }, [searchTerm, locations, selectedOffice]);

  // Maneja la selección de una opción
  const handleSelect = (office: OfficeLocation) => {
    setSearchTerm(office.nombre);
    setSelectedOffice(office);
  };

  // Maneja el cambio en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedOffice(null); 
  }

  // Función para borrar la búsqueda y selección
  const handleClear = () => {
    setSearchTerm('');
    setSelectedOffice(null);
  };

  return (
    <div className="w-full relative">
      
      {/* Contenedor del Input y Botón de Borrar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Ingresa el nombre como figura en tu remito..."
          value={searchTerm}
          onChange={handleChange}
          // pr-10 para dar espacio al botón y text-gray-800 para visibilidad
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 shadow-md text-gray-800 pr-10"
        />

        {/* Botón de Borrar (solo visible si hay texto) */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-0 top-0 mt-3 mr-3 text-gray-500 hover:text-gray-700 transition duration-150"
            aria-label="Borrar búsqueda"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Lista de Sugerencias (Autocompletado) */}
      {searchTerm && !selectedOffice && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-96 overflow-y-auto">
          {filteredOptions.map((office) => (
            <li
              key={office.id}
              onClick={() => handleSelect(office)}
              className="p-3 cursor-pointer hover:bg-blue-50 transition duration-150 border-b border-gray-100 last:border-b-0"
            >
              <span className="font-semibold text-gray-800">{office.nombre}</span>
              <span className="text-sm text-gray-500 block">
                Edificio: {office.piso} | Piso: {office.edificio}
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
              <p className="text-lg font-semibold text-blue-600">{selectedOffice.edificio}</p> 
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Piso / Nivel</p>
              <p className="text-lg font-semibold text-blue-600">{selectedOffice.piso}</p> 
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Ubicación Detallada / Notas</p>
            <p className="text-base text-gray-800 italic">{selectedOffice.ubicacion}</p>
          </div>
        </div>
      )}
    </div>
  );
}