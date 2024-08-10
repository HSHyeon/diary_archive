import { ADD_ITEM, DELETE_ITEM, Item, TodosActionTypes, UPDATE_ITEM } from "../types/index.d";

export const addItem = (item: Item): TodosActionTypes => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteItem = (itemId: number): TodosActionTypes => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const updateItem = (item: Item): TodosActionTypes => ({
  type: UPDATE_ITEM,
  payload: item,
});
