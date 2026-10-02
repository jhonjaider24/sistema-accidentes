import { Body, Controller, Get, Post } from '@nestjs/common';

import { AccidentsService } from './accidents.service';
import { CreateAccidentDto } from './create-accident.dto';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  getAccidents() {
    return this.accidentsService.getAccidents();
  }

  @Post()
  createAccident(@Body() body: CreateAccidentDto) {
    return this.accidentsService.createAccident(body);
  }
}