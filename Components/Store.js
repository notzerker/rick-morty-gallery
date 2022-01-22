import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  gender: "",
  setGender: (gender) => set((state) => ({ gender: gender })),
  search: "",
  setSearch: (search) => set((state) => ({ search: search })),
  lol: {},
});

const useStore = create(devtools(store));

export default useStore;
