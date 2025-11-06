import { Module } from '@nestjs/common';
import { AlarmRepositoty } from 'src/alarms/application/ports/alarm.repository';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepositoty,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepositoty],
})
export class InMemoryAlarmPersistenceModule {}
