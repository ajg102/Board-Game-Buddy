const initialState = {
  counters: [],
};

let data = [];
let indexToUpdate = -1;
let childIndex = -1;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "COUNTERS:CLEAR": {
      return {
        ...state,
        counters: [],
      };
    }
    case "COUNTERS:ADD": {
      data = [...state.counters];
      data.push(action.counter);
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:REMOVE": {
      data = [...state.counters];
      const index = data.findIndex((item) => item.id === action.id);
      for (var j = 0; j < data.length; j++) {
        if (data[j].children) {
          if (data[j].children.includes(action.id)) {
            childIndex = data[j].children.findIndex(
              (item) => item === action.id
            );
            data[j].children.splice(childIndex, 1);
          }
        }
        if (data[j].parents) {
          if (data[j].parents.includes(action.id)) {
            childIndex = data[j].parents.findIndex(
              (item) => item === action.id
            );
            data[j].parents.splice(childIndex, 1);
          }
        }
      }
      data.splice(index, 1);
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:UPDATE_TITLE": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = { ...data[indexToUpdate], title: action.title };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:VALUE_ADD": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        value: data[indexToUpdate].value + action.increment,
      };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:VALUE_SUBTRACT": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        value: data[indexToUpdate].value - action.increment,
      };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:UPDATE_INCREMENT": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        increment: action.increment,
      };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:UPDATE_CUSTOM_INCREMENT": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        [action.incType]: action.val,
      };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:UPDATE_ALL_CUSTOM_INCREMENTS": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        increment_1: action.inc_1,
        increment_2: action.inc_2,
        increment_3: action.inc_3,
        increment_4: action.inc_4,
        increment: action.inc_1,
      };
      return {
        ...state,
        counters: data,
      };
    }
    case "COUNTERS:UPDATE_AGGREGATORS": {
      data = [...state.counters];
      indexToUpdate = data.findIndex((item) => item.id === action.id);
      if (indexToUpdate < 0) return;
      data[indexToUpdate] = {
        ...data[indexToUpdate],
        children: action.children,
      };
      for (var i = 0; i < data.length; i++) {
        if (
          data[i].parents &&
          data[i].parents.includes(action.id) &&
          action.children.includes(data[i].id)
        ) {
          //we gucci
          //already there, leave it
        } else if (
          data[i].parents &&
          data[i].parents.includes(action.id) &&
          !action.children.includes(data[i].id)
        ) {
          //was there,
          //need to remove
          childIndex = data[i].parents.findIndex((item) => item === action.id);
          data[i].parents.splice(childIndex, 1);
        } else if (data[i].parents && action.children.includes(data[i].id)) {
          data[i].parents.push(action.id);
        } else if (!data[i].parents && action.children.includes(data[i].id)) {
          data[i] = {
            ...data[i],
            parents: [action.id],
          };
        }
      }
      return {
        ...state,
        counters: data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
