// component 관련 파일은 해당 폴더에 작성합니다. 이 파일은 제거해도 됩니다.
import React, { ChangeEvent, FormEvent, useState } from "react";
import { InputFormProps } from "../types";

const InputForm = ({ onSubmit }: InputFormProps) => {
  const [newTodoText, setNewTodoText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newTodoText);
    setNewTodoText("");
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
