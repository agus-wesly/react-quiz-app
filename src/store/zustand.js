import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuestionStore = create(
  persist(
    (set) => ({
      question: [],
      error: null,
      totalTime: 0,
      trueAnswer: 0,
      falseAnswer: 0,
      auth: {},
      fetchQuestion: async (query) => {
        try {
          const response = await fetch(`https://opentdb.com/api.php${query}`);

          const data = await response.json();

          return set((state) => ({ ...state, question: data.results }));
        } catch (error) {
          return set((state) => ({ ...state, error: error }));
        }
      },

      authUser: (auth) => set((state) => ({ ...state, auth })),
      trueAction: () =>
        set((state) => ({ ...state, trueAnswer: state.trueAnswer + 1 })),
      falseAction: () =>
        set((state) => ({ ...state, falseAnswer: state.falseAnswer + 1 })),
      logoutUser: () =>
        set({
          question: [],
          error: null,
          auth: {},
        }),
      resetQuestion: () =>
        set((state) => ({
          ...state,
          question: [],
          trueAnswer: 0,
          falseAnswer: 0,
          error: null,
        })),
      setTimeStamp: (time) =>
        set((state) => ({
          ...state,
          totalTime: time,
        })),
    }),
    {
      name: "question-storage",
    }
  )
);

export default useQuestionStore;
