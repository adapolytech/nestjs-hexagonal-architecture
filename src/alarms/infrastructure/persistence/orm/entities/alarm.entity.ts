import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('alarms')
export class AlarmOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;
}
