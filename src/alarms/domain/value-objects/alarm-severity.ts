export class AlarmSeverity {
  constructor(readonly value: 'critical' | 'medium' | 'high' | 'low') {}

  equals(severity: AlarmSeverity) {
    return this.value === severity.value;
  }
}
