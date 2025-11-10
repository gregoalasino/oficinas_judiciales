import { officeLocations } from '../data/office'
import SearchBar from '../components/searchBar'; 

export default function HomePage() {
  return (
    // Aplicamos estilos a <main>:
    // min-h-screen: Ocupa toda la altura visible de la pantalla.
    // flex, flex-col, items-center: Centra el contenido vertical y horizontalmente.
    // pt-24: Padding superior para que no esté pegado al borde.
    // bg-gray-50: Un fondo gris muy claro para darle contraste al buscador blanco.
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 bg-gray-50">
      
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800">
        🔎 Buscador de Oficinas Judiciales
      </h1>
      
      {/* El buscador ocupa la parte central de la vista */}
      <div className="w-full max-w-xl px-4 sm:px-0">
        <SearchBar locations={officeLocations} />
      </div>

    </main>
  );
}