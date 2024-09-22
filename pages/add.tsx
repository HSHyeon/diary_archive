import React, { ChangeEvent, FormEvent, useState } from "react";
import { InputFormProps } from "../types";

const InputForm = ({ onSubmit }: InputFormProps) => {
  const [newTodoText, setNewTodoText] = useState("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 빈 입력을 방지
    if (!newTodoText.trim()) {
      alert("해야할 일을 입력하세요.");
      return;
    }

    // 백엔드 API 호출
    try {
      const response = await fetch(`${BACKEND_URL}/diaries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          uri: "", // 필요에 따라 값 설정
          creation_timestamp: Math.floor(Date.now() / 1000), // 현재 시간의 UNIX 타임스탬프
          title: "제목을 입력하세요", // 제목을 여기에 추가
          text: newTodoText, // 사용자가 입력한 텍스트
          cross_post_source: {
            source_app: "FB" // 예시로 설정
          }
        }),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }

      const data = await response.json();
      onSubmit(data); // 새로 추가된 할 일을 부모 컴포넌트로 전달

      // 입력 필드 초기화
      setNewTodoText(""); 

    } catch (error) {
      console.error("Error adding todo:", error);
      alert("할 일을 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Todo:</label>
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="해야할 일을 입력하세요"
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default InputForm;
