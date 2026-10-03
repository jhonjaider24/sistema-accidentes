import { useEffect, useState } from 'react';
import { createAccident, getAccidents } from './services/accidentsService';
import type { Accident } from './types/accident';
import './App.css';

type Mensaje = {
  tipo: 'exito' | 'error';
  texto: string;
};

// Convierte "2026-09-28T03:40:29.143Z" en una fecha legible para Colombia.
function formatearFecha(fechaIso: string): string {
  return new Date(fechaIso).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function App() {
  // Estado del formulario
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState<Mensaje | null>(null);

  // Estado de la lista
  const [accidentes, setAccidentes] = useState<Accident[]>([]);
  const [cargando, setCargando] = useState(true); // solo true en la primera carga
  const [errorLista, setErrorLista] = useState<string | null>(null);

  // Estado de la búsqueda
  // textoBusqueda: lo que el usuario escribe en el campo (cambia con cada tecla).
  // busqueda: el texto ya "aplicado" al pulsar Buscar (es el que dispara la consulta).
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Contador que usamos como "señal" para volver a cargar la lista.
  const [recarga, setRecarga] = useState(0);

  // Carga la lista al abrir la página y cuando cambia `recarga` o `busqueda`.
  useEffect(() => {
    let activo = true; // pasa a false si este efecto se limpia antes de terminar

    const cargarAccidentes = async () => {
      try {
        const datos = await getAccidents(busqueda);
        if (!activo) return; // llegó una respuesta vieja: la ignoramos
        setAccidentes(datos);
        setErrorLista(null);
      } catch (error) {
        console.error('Error al cargar los accidentes:', error);
        if (activo) setErrorLista('No se pudo cargar la lista de accidentes');
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarAccidentes();

    return () => {
      activo = false;
    };
  }, [recarga, busqueda]);

  const handleBuscar = (event: React.FormEvent) => {
    event.preventDefault();
    setBusqueda(textoBusqueda.trim());
  };

  const handleLimpiarBusqueda = () => {
    setTextoBusqueda('');
    setBusqueda('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const datos = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      ubicacion: ubicacion.trim(),
    };

    if (!datos.titulo || !datos.descripcion || !datos.ubicacion) {
      setMensaje({
        tipo: 'error',
        texto: 'Completa el título, la descripción y la ubicación antes de registrar',
      });
      return;
    }

    try {
      await createAccident(datos);

      setMensaje({ tipo: 'exito', texto: 'Accidente registrado correctamente' });

      setTitulo('');
      setDescripcion('');
      setUbicacion('');

      // Cambiar el contador dispara el useEffect y se vuelve a pedir la lista.
      setRecarga((n) => n + 1);
    } catch (error) {
      console.error('Error al registrar el accidente:', error);
      setMensaje({ tipo: 'error', texto: 'Error al registrar el accidente' });
    }
  };

  return (
    <div>
      <header className="encabezado">
        <h1>Gestión de Accidentes</h1>
      </header>

      <main>
        <section className="tarjeta">
          <h2>Registrar accidente</h2>

          <form className="formulario" onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                rows={4}
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                id="ubicacion"
                type="text"
                value={ubicacion}
                onChange={(event) => setUbicacion(event.target.value)}
              />
            </div>

            <button type="submit" className="boton">
              Registrar accidente
            </button>
          </form>

          {mensaje && (
            <p
              className={`mensaje mensaje-${mensaje.tipo}`}
              role={mensaje.tipo === 'error' ? 'alert' : 'status'}
            >
              {mensaje.texto}
            </p>
          )}
        </section>

        <section className="tarjeta">
          <h2>Accidentes registrados</h2>

          <form className="busqueda" onSubmit={handleBuscar} role="search">
            <div className="campo busqueda-campo">
              <label htmlFor="busqueda">Buscar por título o ubicación</label>
              <input
                id="busqueda"
                type="search"
                value={textoBusqueda}
                onChange={(event) => setTextoBusqueda(event.target.value)}
              />
            </div>

            <div className="busqueda-acciones">
              <button type="submit" className="boton">
                Buscar
              </button>
              <button
                type="button"
                className="boton boton-secundario"
                onClick={handleLimpiarBusqueda}
              >
                Limpiar
              </button>
            </div>
          </form>

          {cargando && <p>Cargando lista de accidentes...</p>}

          {!cargando && errorLista && (
            <p className="mensaje mensaje-error" role="alert">
              {errorLista}
            </p>
          )}

          {!cargando && !errorLista && accidentes.length === 0 && (
            <p>
              {busqueda
                ? `No se encontraron accidentes registrados para "${busqueda}".`
                : 'No hay accidentes registrados.'}
            </p>
          )}

          {!cargando && !errorLista && accidentes.length > 0 && (
            <ul className="lista">
              {accidentes.map((accidente) => (
                <li key={accidente.id} className="lista-item">
                  <h3 className="lista-titulo">{accidente.titulo}</h3>
                  <p>{accidente.descripcion}</p>
                  <p className="lista-meta">
                    <span>Ubicación: {accidente.ubicacion}</span>
                    <span>{formatearFecha(accidente.fecha)}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;