export const StatusTask = {
  InCompleted: 'incompleted',
  Completed: 'completed',
} as const;

export type StatusTask = (typeof StatusTask)[keyof typeof StatusTask];
