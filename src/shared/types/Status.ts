export const STATUS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETED: 'incompleted',
} as const;

export type ChoosedStatus = (typeof STATUS)[keyof typeof STATUS];
