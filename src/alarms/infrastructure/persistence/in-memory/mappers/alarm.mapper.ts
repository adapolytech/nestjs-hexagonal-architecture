import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmInMemoryEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

export class AlarmMapper {
  static toDomain(data: AlarmInMemoryEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      data.severity as AlarmSeverity['value'],
    );
    const alarm = new Alarm(data.id, data.name, alarmSeverity);
    return alarm;
  }

  static toPersistence(alarm: Alarm): AlarmInMemoryEntity {
    const entity = new AlarmInMemoryEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    return entity;
  }
}
