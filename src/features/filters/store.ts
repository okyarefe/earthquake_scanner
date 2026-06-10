import { create } from 'zustand';

export type TimeWindow = 'hour' | 'day' | 'week' | 'month';
interface FiltersState {
  minMagnitude: number;
  timeWindow: TimeWindow;
  setMinMagnitude: (minMagnitude: number) => void;
  setTimeWindow: (timeWindow: TimeWindow) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  minMagnitude: 0,
  timeWindow: 'day',
  setMinMagnitude: (minMagnitude: number) =>
    set({ minMagnitude: minMagnitude }),
  setTimeWindow: (timeWindow: TimeWindow) => set({ timeWindow: timeWindow }),
}));
