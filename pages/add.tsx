import React, { ChangeEvent, FormEvent, useState } from "react";
import UploadJson from "../src/components/UploadJson";
import { addDiary } from "../src/store/actions";
import { useDispatch } from "react-redux";

const InputForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setLoading(true); // 로딩 시작
      try {
        await dispatch(addDiary(text)); // 비동기 액션 호출
        setText(""); // 입력 초기화
      } catch (error) {
        console.error("일기 추가 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoInput">할 일:</label>
        <input
          id="todoInput"
          type="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="해야할 일을 입력하세요"
        />
        <button type="submit" disabled={loading}>
          {loading ? "로딩 중..." : "추가"}
        </button>
      </form>
      <h1>JSON 파일 업로드</h1>
      <UploadJson />
    </>
  );
};

export default InputForm;
