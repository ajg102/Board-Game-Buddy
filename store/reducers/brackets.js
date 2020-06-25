const initialState = {
  brackets: [
    {
      id: "1",
      title: "Demo 1",
      subtitle: "Test number 1",
      players: [
        { name: "Alex", seed: 1 },
        { name: "Sam", seed: 2 },
        { name: "Mom", seed: 3 },
        { name: "Dad", seed: 4 },
        { name: "Lucas", seed: 5 },
        { name: "Greg", seed: 6 },
        { name: "Matt", seed: 7 },
        { name: "Reg", seed: 8 },
        { name: "Norman", seed: 9 },
        { name: "Anth", seed: 10 },
      ],
      rounds: [
        [
          [
            {name: "Alex",seed: 1},
            null,
          ],
          [
            {name: "Norman",seed: 9},
            {name: "Reg",seed: 8},
          ],
          [
            {name: "Lucas",seed: 5},
            null,
          ],
          [
            null,
            {
              name: "Dad",
              seed: 4,
            },
          ],
          [
            {
              name: "Mom",
              seed: 3,
            },
            null,
          ],
          [
            null,
            {
              name: "Greg",
              seed: 6,
            },
          ],
          [
            {
              name: "Matt",
              seed: 7,
            },
            {
              name: "Anth",
              seed: 10,
            },
          ],
          [
            null,
            {
              name: "Sam",
              seed: 2,
            },
          ],
        ]
      ],
      type: "single-elimination",
      image: "",
    },
    {
      id: "2",
      title: "Demo 2",
      subtitle: "Test number 2",
      players: [],
      type: "single-elimination",
      image: "",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRACKETS:ADD": {
      return {
        ...state,
        brackets: [...state.brackets, action.bracket],
      };
    }
    case "BRACKETS:DELETE": {
      return {
        ...state,
        brackets: [...state.brackets.filter((item) => item.id !== action.id)],
      };
    }
    case "BRACKETS:RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
