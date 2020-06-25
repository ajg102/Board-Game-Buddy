export const migrations = {
  0: (state) => {
    return {
      ...state,
      screens: {
        ...state.screens,
        screens: [
          ...state.screens.screens,
          // { label: "Brackets", nav: "Brackets", fav: false },
          { label: "Spades", nav: "Spades", fav: false },
        ],
      },
    };
  },
};
