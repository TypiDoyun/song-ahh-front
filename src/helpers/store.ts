import { create } from 'zustand'

export const useStore = create((set: any) => ({
    selectedMusic: 0,
    updateSelectMusic: (newData: any) => set({selectedMusic: newData})
}))