export interface LogEntry {
  time: string;
  action: string;
  status: 'Success' | 'Failed';
  verificationId: string;
}
