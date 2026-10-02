// Forma de un accidente tal como lo devuelve el backend.
export type Accident = {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
};

// Lo que enviamos al crear: el backend genera `id` y `fecha`,
// así que los excluimos del tipo derivándolo de Accident.
export type NewAccident = Omit<Accident, 'id' | 'fecha'>;