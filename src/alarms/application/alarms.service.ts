import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmRepositoty } from './ports/alarm.repository';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmFactory: AlarmFactory,
    private readonly repository: AlarmRepositoty,
  ) {}
  create(payload: CreateAlarmCommand) {
    const alarm = this.alarmFactory.createAlarm(payload.name, payload.severity);
    return this.repository.save(alarm);
  }

  findAll() {
    return this.repository.findAll();
  }
}
