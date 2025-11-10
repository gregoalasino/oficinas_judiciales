export type OfficeLocation = {
  id: number;
  // Nombre clave para la búsqueda (Ej: 'Oficina Central A', 'Sala de Reuniones 305')
  nombre: string; 
  // Edificio o complejo
  piso: string;
  // Piso/Nivel
  ubicacion: string; 
  // Ubicación más detallada (Ej: Ala Este, cerca de la cafetería)
  edificio: string; 
};