import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Alarm } from '../alarm';
import { AlarmSeverity } from '../value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  createAlarm(name: string, severity: string) {
    const id = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    return new Alarm(id, name, alarmSeverity);
  }
}
