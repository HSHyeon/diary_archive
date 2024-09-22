import { IgStory, DiaryActionTypes, ADD_DIARY, REMOVE_DIARY, FETCH_DIARIES } from "../types";
import { Dispatch } from "redux";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addDiary = (newText: string) => {
  return async (dispatch: Dispatch<DiaryActionTypes>) => {
    const response = await fetch(`${BACKEND_URL}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uri: "", // 필요에 따라 값 설정
        creation_timestamp: Math.floor(Date.now() / 1000),
        title: "제목을 입력하세요",
        text: newText,
        cross_post_source: {
          source_app: "FB",
        },
      }),
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

export const fetchDiaries = () => {
  return async (dispatch: Dispatch<DiaryActionTypes>) => {
    const res = await fetch(`${BACKEND_URL}/diaries`);
    const data: IgStory[] = await res.json();

    const sortedData = data.sort(
      (a, b) => b.creation_timestamp - a.creation_timestamp
    );

    dispatch({
      type: FETCH_DIARIES,
      payload: sortedData,
    });
  };
};
