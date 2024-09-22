export const ADD_DIARY = "ADD_DIARY";
export const REMOVE_DIARY = "REMOVE_DIARY";
export const FETCH_DIARIES = "FETCH_DIARIES";

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

// 상태 정의
export interface DiaryState {
  items: IgStory[];
}

// 액션 정의
export interface AddDiaryAction {
  type: typeof ADD_DIARY; // 상수 타입
  payload: IgStory; // IgStory 타입에 맞게 수정
}

export interface RemoveDiaryAction {
  type: typeof REMOVE_DIARY; // 상수 타입
  payload: { id: number }; // id를 포함하는 payload
}

export interface FetchDiariesAction {
  type: typeof FETCH_DIARIES; // 상수 타입
  payload: IgStory[]; // IgStory 배열
}

// 모든 액션을 묶은 타입
export type DiaryActionTypes =
  | AddDiaryAction
  | RemoveDiaryAction
  | FetchDiariesAction;

// 루트 상태 타입 정의
export type RootState = DiaryState;
