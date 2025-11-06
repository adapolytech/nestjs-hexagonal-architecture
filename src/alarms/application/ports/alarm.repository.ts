import { Alarm } from 'src/alarms/domain/alarm';

export abstract class AlarmRepositoty {
  abstract findAll(): Promise<Alarm[]>;
  abstract save(alarm: Alarm): Promise<Alarm>;
}
