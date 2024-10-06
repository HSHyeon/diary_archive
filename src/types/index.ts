// 액션 타입 상수
export const ADD_DIARY = "ADD_DIARY";
export const REMOVE_DIARY = "REMOVE_DIARY";
export const FETCH_DIARIES = "FETCH_DIARIES";
export const HAS_MORE = "SET_HAS_MORE";

// IgStory 인터페이스 정의
export interface IgStory {
  id: number; // 스토리 고유 ID
  uri: string;
  creation_timestamp: number;
  title: string;
  text: string;
  cross_post_source: {
    source_app: string;
  };
}
export interface postStory {
  uri: string;
  title: string;
  text: string;
}

// 상태 정의
export interface DiaryState {
  items: IgStory[]; // IgStory 배열
  hasMore: boolean; // 더 많은 데이터가 있는지 여부
}

// 액션 정의
export interface AddDiaryAction {
  type: typeof ADD_DIARY; // ADD_DIARY 액션 타입
  payload: IgStory; // IgStory 타입으로 수정
}

export interface RemoveDiaryAction {
  type: typeof REMOVE_DIARY; // REMOVE_DIARY 액션 타입
  payload: { id: number }; // 삭제할 다이어리 ID 포함
}

export interface FetchDiariesAction {
  type: typeof FETCH_DIARIES; // FETCH_DIARIES 액션 타입
  payload: IgStory[]; // IgStory 배열
}

export interface SetHasMoreAction {
  type: typeof HAS_MORE; // HAS_MORE 액션 타입
  payload: boolean; // 더 많은 데이터가 있는지 여부
}

// 모든 액션을 묶은 타입
export type DiaryActionTypes =
  | AddDiaryAction
  | RemoveDiaryAction
  | FetchDiariesAction
  | SetHasMoreAction; // HAS_MORE 액션 추가

// 루트 상태 타입 정의
export type RootState = DiaryState; // DiaryState로 루트 상태 정의
