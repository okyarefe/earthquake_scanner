import type { TimeWindow } from '@/features/filters/store';

const timeWindowToFeed: Record<TimeWindow, string> = {
  hour: 'all_hour',
  day: 'all_day',
  week: 'all_week',
  month: 'all_month',
};

export const feedForWindow = (window: TimeWindow): string =>
  timeWindowToFeed[window];
