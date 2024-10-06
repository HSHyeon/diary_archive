import {
  DiaryActionTypes,
  IgStory,
  ADD_DIARY,
  FETCH_DIARIES,
  REMOVE_DIARY,
  HAS_MORE,
} from "../types";

// 초기 상태 정의
const initialState: {
  items: IgStory[]; // IgStory 배열
  hasMore: boolean; // 더 많은 데이터가 있는지 여부
} = {
  items: [],
  hasMore: true,
};

// 다이어리 리듀서
export const diaryReducer = (
  state = initialState,
  action: DiaryActionTypes
): { items: IgStory[]; hasMore: boolean } => {
  switch (action.type) {
    case HAS_MORE:
      return { ...state, hasMore: action.payload }; // 더 많은 데이터가 있는지 설정
    case FETCH_DIARIES:
      return {
        ...state,
        items: [...state.items, ...action.payload], // 새로운 다이어리 목록으로 대체
      };
    case ADD_DIARY:
      return {
        ...state,
        items: [...state.items, action.payload], // 새로운 다이어리 추가
      };
    case REMOVE_DIARY:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id), // 주어진 ID의 다이어리 삭제
      };
    default:
      return state; // 상태를 그대로 반환
  }
};
