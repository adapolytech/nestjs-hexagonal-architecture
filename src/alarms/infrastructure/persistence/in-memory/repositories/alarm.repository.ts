import { Injectable } from '@nestjs/common';
import { AlarmRepositoty } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmInMemoryEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepositoty {
  private readonly alarms = new Map<string, AlarmInMemoryEntity>();
  constructor() {}

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((entity) => AlarmMapper.toDomain(entity));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const peristenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(peristenceModel.id, peristenceModel);
    return AlarmMapper.toDomain(peristenceModel);
  }
}
