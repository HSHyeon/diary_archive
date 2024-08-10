import { createStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer";

// 전역상태 관련 파일은 해당 폴더에 작성합니다. 이 파일은 제거해도 됩니다.
const store = createStore(todoReducer);
export default store;
