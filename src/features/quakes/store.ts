import { create } from 'zustand';

interface SelectionState {
  selectedQuakeId: string | null;
  setSelectedQuakeId: (id: string | null) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedQuakeId: null,
  setSelectedQuakeId: (id) => set({ selectedQuakeId: id }),
}));
