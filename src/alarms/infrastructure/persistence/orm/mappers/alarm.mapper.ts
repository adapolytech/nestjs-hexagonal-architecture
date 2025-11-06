import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmOrmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

export class AlarmMapper {
  static toDomain(data: AlarmOrmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      data.severity as AlarmSeverity['value'],
    );
    const alarm = new Alarm(data.id, data.name, alarmSeverity);
    return alarm;
  }

  static toPersistence(alarm: Alarm): AlarmOrmEntity {
    const entity = new AlarmOrmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    return entity;
  }
}
