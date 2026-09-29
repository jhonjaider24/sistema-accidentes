import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accidents')
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  ubicacion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}