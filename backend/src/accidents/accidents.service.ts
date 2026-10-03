import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Accident } from './accident.entity';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private accidentsRepository: Repository<Accident>,
  ) {}

  async getAccidents(busqueda?: string) {
    // Si ?q= llega repetido (?q=a&q=b), Nest lo entrega como arreglo.
    // Solo se acepta un texto.
    const texto = typeof busqueda === 'string' ? busqueda.trim() : '';

    // En LIKE, % y _ son comodines. Los escapamos con \ para que
    // el usuario busque esos caracteres literalmente.
    const textoSeguro = texto.replace(/[\\%_]/g, '\\$&');

    // Un arreglo en `where` significa OR:
    // titulo ILIKE '%texto%'  OR  ubicacion ILIKE '%texto%'
    const where = texto
      ? [
          { titulo: ILike(`%${textoSeguro}%`) },
          { ubicacion: ILike(`%${textoSeguro}%`) },
        ]
      : undefined; // sin texto: sin filtro,

    return await this.accidentsRepository.find({
      where,
      order: { fecha: 'DESC', id: 'DESC' },
    });
  }

  async createAccident(body: any) {
    const accident = this.accidentsRepository.create(body);

    return await this.accidentsRepository.save(accident);
  }
}