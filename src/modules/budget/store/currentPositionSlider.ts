import {create} from "zustand";

interface props {
	position: number
	setPosition: (e: number) => void
}

export const currentPositionStore = create<props>((set) => ({
	position: 1,
	setPosition: (e) => set(() => ({position: e})),
}))