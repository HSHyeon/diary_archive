import surveyReducer from "../store/reducer";

interface InputFormProps {
  onSubmit: (text: string) => void;
}

export interface Item {
  title: string;
  id: number;
  date: number;
}

export interface TodoState {
  items: Item[];
}

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: Item;
}
interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: number;
}


export type TodosActionTypes =
  | AddItemAction
  | UpdateItemAction
  | DeleteItemAction;

export type RootState = TodoState;
