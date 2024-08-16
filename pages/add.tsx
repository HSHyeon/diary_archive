import React from "react";
import InputForm from "../src/components/InputForm";
import { useDispatch } from "react-redux";
import { addItem } from "../src/store/actions";

function NewTodo() {
  const dispatch = useDispatch();

  const handleAddQuestion = (text: string) => {
    const newItem = {
      date: Date.now(),
      id: Date.now(),
      title: text,
    };
    dispatch(addItem(newItem));
  };

  return (
    <>

      <InputForm onSubmit={handleAddQuestion} />

    </>
  );
}

export default NewTodo;
