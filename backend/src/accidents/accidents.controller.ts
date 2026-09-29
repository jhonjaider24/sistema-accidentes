import { Body, Controller, Get, Post } from '@nestjs/common';

import { AccidentsService } from './accidents.service';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  getAccidents() {
    return this.accidentsService.getAccidents();
  }

  @Post()
  createAccident(@Body() body: any) {
    return this.accidentsService.createAccident(body);
      
    
    
  }

}