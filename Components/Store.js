import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  gender: "",
  setGender: (gender) => set((state) => ({ gender: gender })),
  search: "",
  setSearch: (search) => set((state) => ({ search: search })),
  status: "",
  setStatus: (status) => set((state) => ({ status: status })),
  species: "",
  setSpecies: (species) => set((state) => ({ species: species })),
});

const useStore = create(devtools(store));

export default useStore;
