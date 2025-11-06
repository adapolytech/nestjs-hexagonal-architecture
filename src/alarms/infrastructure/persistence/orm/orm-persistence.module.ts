import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmOrmEntity } from './entities/alarm.entity';
import { AlarmRepositoty } from 'src/alarms/application/ports/alarm.repository';
import { OrmAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmOrmEntity])],
  providers: [
    {
      provide: AlarmRepositoty,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepositoty],
})
export class OrmAlarmPersistenceModule {}
