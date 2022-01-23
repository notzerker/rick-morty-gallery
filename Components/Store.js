import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  gender: "",
  setGender: (gender) => set((state) => ({ gender: gender })),
  search: "",
  setSearch: (search) => set((state) => ({ search: search })),
  status: "",
  setStatus: (status) => set((state) => ({ status: status })),
});

const useStore = create(devtools(store));

export default useStore;
