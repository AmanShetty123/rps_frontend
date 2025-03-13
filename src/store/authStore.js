import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Fix here
    }
  )
);

export default useAuthStore;
