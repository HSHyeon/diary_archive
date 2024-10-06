import {
  IgStory,
  DiaryActionTypes,
  ADD_DIARY,
  REMOVE_DIARY,
  FETCH_DIARIES,
  HAS_MORE,
} from "../types";
import { Dispatch } from "redux";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addDiary = (form: IgStory) => {
  return async (dispatch: Dispatch<DiaryActionTypes>) => {
    const response = await fetch(`${BACKEND_URL}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const newDiary: IgStory = await response.json();

    dispatch({
      type: ADD_DIARY,
      payload: newDiary,
    });
  };
};

export const removeDiary = (id: number) => {
  return async (dispatch: Dispatch<DiaryActionTypes>) => {
    await fetch(`${BACKEND_URL}/diaries/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: REMOVE_DIARY,
      payload: { id },
    });
  };
};
export const fetchDiaries = (page: number, limit: number) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(
      `${BACKEND_URL}/diaries?_page=${page}&_limit=${limit}&_sort=creation_timestamp&_order=desc`
    );
    const data = await response.json();
    const totalCount = response.headers.get("X-Total-Count"); // 총 데이터 수를 가져오는 방법

    dispatch({
      type: FETCH_DIARIES,
      payload: data,
    });

    // hasMore 설정 (가져온 데이터 수가 요청한 수와 같으면 더 이상 없음)
    dispatch({
      type: HAS_MORE,
      payload: data.length === limit, // 추가 데이터가 더 있는지 여부
    });
  };
};
