import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

// Quita espacios al inicio y al final, solo si el valor es un texto.
// Así "   " se convierte en "" y falla la regla @IsNotEmpty().
const quitarEspacios = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateAccidentDto {
  @Transform(quitarEspacios)
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @Transform(quitarEspacios)
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @Transform(quitarEspacios)
  @IsString({ message: 'La ubicación debe ser un texto' })
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  ubicacion: string;
}