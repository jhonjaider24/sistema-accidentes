import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident } from './accident.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Accident])],
  controllers: [AccidentsController],
  providers: [AccidentsService],
})
export class AccidentsModule {}