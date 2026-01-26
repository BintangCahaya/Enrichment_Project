import { create } from "zustand";

export const useKosStore = create((set) => ({
    // state
    kosList: [],
    selectedKos: null,

    // actions
    setKosList: (data) => set({ kosList: data }),
    setSelectedKos: (kos) => set({ selectedKos: kos }),
    clearSelectedKos: () => set({ selectedKos: null }),
}));