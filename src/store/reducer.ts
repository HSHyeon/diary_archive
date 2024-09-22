import { DiaryActionTypes, IgStory , ADD_DIARY, FETCH_DIARIES, REMOVE_DIARY } from "../types";

const initialState: { items: IgStory[] } = {
  items: [], // 빈 배열로 초기화
};

export const diaryReducer = (
  state = initialState,
  action: DiaryActionTypes
): { items: IgStory[] } => {
  switch (action.type) {
    case FETCH_DIARIES:
      return {
        ...state,
        items: action.payload, // action.payload는 IgStory[] 타입으로 가정
      };
    case ADD_DIARY:
      return {
        ...state,
        items: [...state.items, action.payload], // action.payload는 IgStory 타입
      };
    case REMOVE_DIARY:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};
