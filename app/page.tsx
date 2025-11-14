import { officeLocations } from '../data/office'; 
import SearchBar from '../components/searchBar'; 
import BuildingSearchBar from '../components/BuildingSearcherBar'; // NUEVO componente

// 1. FILTRADO DE DATOS BASADO EN ID (Server-side)
// Tribunales 1: id 1 al 103
const TRIBUNALES_1_DATA = officeLocations.filter(o => o.id >= 1 && o.id <= 104);
// Tribunales 2: id 104 al 276
const TRIBUNALES_2_DATA = officeLocations.filter(o => o.id >= 105 && o.id <= 276);
// Polo Laboral: id 271 al 317
const POLO_LABORAL_DATA = officeLocations.filter(o => o.id >= 277 && o.id <= 317);
// Familia: id 271 al 311
const FAMILIA_DATA = officeLocations.filter(o => o.id >= 318 && o.id <= 336);

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 bg-gray-50">
      
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800">
        🔎 Buscador de Oficinas
      </h1>
      
      {/* BUSCADOR GENERAL */}
      <div className="w-full max-w-xl px-4 sm:px-0 mb-16">
        <SearchBar locations={officeLocations} />
      </div>

      {/* --- SECCIÓN DE BUSCADORES ESPECÍFICOS --- */}
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Búsqueda Rápida por Edificio
      </h2>
      
      {/* Contenedor Flex para alinear horizontalmente */}
      <div className="w-full max-w-6xl px-4 sm:px-0 flex flex-wrap justify-center gap-6">
        
        {/* Componente 1: Tribunales 1 */}
        <BuildingSearchBar title="Tribunales 1" locations={TRIBUNALES_1_DATA} />
        
        {/* Componente 2: Tribunales 2 */}
        <BuildingSearchBar title="Tribunales 2" locations={TRIBUNALES_2_DATA} />
        
        {/* Componente 3: Polo Laboral */}
        <BuildingSearchBar title="Polo Laboral" locations={POLO_LABORAL_DATA} />

        {/* Componente 4: Familia */}
        <BuildingSearchBar title="Tucuman 360 / Familia" locations={FAMILIA_DATA} />

      </div>

    </main>
  );
}