import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Accident } from './accident.entity';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private accidentsRepository: Repository<Accident>,
  ) {}

  async getAccidents() {
    return await this.accidentsRepository.find({
      order: { fecha: 'DESC', id: 'DESC' },
    });
  }

  async createAccident(body: any) {
    const accident = this.accidentsRepository.create(body);

    return await this.accidentsRepository.save(accident);
  }
}