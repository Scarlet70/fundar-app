import { create } from "zustand";
import { defaultAllocationOptions } from "@/data/allocatonData";

export type AllocationOption = {
   id: number;
   name: string;
};

interface AllocationStore {
   allocationOptions: AllocationOption[];

   addAllocationOption: (optionValue: string) => void;

   deleteAllocationOption: (id: number) => void;
}

export const useAllocationStore = create<AllocationStore>((set, get) => ({
   allocationOptions: defaultAllocationOptions,

   addAllocationOption: (optionValue) =>
      set((state) => {
         const option = optionValue.trim().toLowerCase();
         const matchedOption = state.allocationOptions.find(
            (item) => item.name.trim().toLowerCase() === option,
         );

         if (!option || matchedOption) {
            return state;
         }

         const newId =
            state.allocationOptions[state.allocationOptions.length - 1].id +
               1 || 1;

         const modifiedValue =
            option.slice(0, 1).toUpperCase() + option.slice(1);

         const newOption = { id: newId, name: modifiedValue };

         return {
            allocationOptions: [...state.allocationOptions, newOption],
         };
      }),

   deleteAllocationOption: (id) =>
      set((state) => ({
         allocationOptions: state.allocationOptions.filter(
            (option) => option.id !== id,
         ),
      })),
}));
