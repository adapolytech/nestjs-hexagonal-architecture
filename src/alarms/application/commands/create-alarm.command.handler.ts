import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmRepositoty } from '../ports/alarm.repository';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  constructor(
    private readonly alarmFactory: AlarmFactory,
    private readonly alarmRepository: AlarmRepositoty,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand): Promise<any> {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.createAlarm(command.name, command.severity);
    const newAlarm = await this.alarmRepository.save(alarm);
    this.eventBus.publish(new AlarmCreatedEvent(newAlarm));
    return newAlarm;
  }
}
