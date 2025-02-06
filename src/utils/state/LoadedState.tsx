import { create } from "zustand";

export interface ResourceLoadedState {
  GLTFloaded: boolean;
  setGLTFLoaded: (loaded: boolean) => void;
  codingLoaded: boolean;
  setCodingLoaded: (loaded: boolean) => void;
}

export const useLoadedState = create<ResourceLoadedState>((set) => ({
  GLTFloaded: false,
  setGLTFLoaded: (loaded: boolean) => set(() => ({ GLTFloaded: loaded })),
  codingLoaded: false,
  setCodingLoaded: (loaded: boolean) => set(() => ({ codingLoaded: loaded })),
}));
