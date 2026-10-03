import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AccidentsService } from './accidents.service';
import { CreateAccidentDto } from './create-accident.dto';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  getAccidents(@Query('q') q?: string) {
    return this.accidentsService.getAccidents(q);
  }

  @Post()
  createAccident(@Body() body: CreateAccidentDto) {
    return this.accidentsService.createAccident(body);
  }
}