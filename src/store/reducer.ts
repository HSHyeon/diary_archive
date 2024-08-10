import { ADD_ITEM, DELETE_ITEM, TodoState, TodosActionTypes, UPDATE_ITEM } from "../types/index.d";

const initialState: TodoState = {
  items: [],
};

const todoReducer = (
  state = initialState,
  action: TodosActionTypes
): TodoState => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (question) => question.id != action.payload
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
