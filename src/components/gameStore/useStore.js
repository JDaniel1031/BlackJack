// store.js
import create from 'zustand';

const useStore = create((set) => ({
  stateObject: {
    isGameOver:false,
    playerOneStay:false
  }, // Your initial state object

  // Method to update the state object
  updateStateObject: (newState) => {
    set((state) => ({
      stateObject: {
        ...state.stateObject,
        ...newState,
      },
    }));
  },
}));

export default useStore;
