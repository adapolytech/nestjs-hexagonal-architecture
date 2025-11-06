import { Body, Controller, Post } from '@nestjs/common';
import { AlarmsService } from 'src/alarms/application/alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.input';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  createAlarm(@Body() data: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(data.name, data.severity),
    );
  }
}
