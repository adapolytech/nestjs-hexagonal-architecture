import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmRepositoty } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmOrmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class OrmAlarmRepository implements AlarmRepositoty {
  constructor(
    @InjectRepository(AlarmOrmEntity)
    private readonly alarmRepository: Repository<AlarmOrmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((entity) => AlarmMapper.toDomain(entity));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const peristenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(peristenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
