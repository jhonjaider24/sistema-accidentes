import { useState } from 'react';
import { createAccident } from './services/accidentsService';

function App() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await createAccident({
        titulo,
        descripcion,
        ubicacion,
      });

      console.log(response);

      setMensaje('Accidente registrado correctamente');

      setTitulo('');
      setDescripcion('');
      setUbicacion('');
    } catch (error) {
      console.error('Error al registrar el accidente:', error);
      setMensaje('Error al registrar el accidente');
    }
  };

  return (
    <div>
      <h1>Sistema de Gestión de Accidentes</h1>

      <h2>Registrar accidente</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <br />
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Descripción</label>
          <br />
          <textarea
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Ubicación</label>
          <br />
          <input
            type="text"
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Registrar accidente
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default App;