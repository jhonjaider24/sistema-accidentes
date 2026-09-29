import { Controller, Get } from '@nestjs/common';

@Controller("accidentes")
export class AppController {
  
  @Get()
  getAccidentes() {
    return{
      mensaje: "sistema de accidentes",
      estado: "activo",
    }
  } 
  
  }
