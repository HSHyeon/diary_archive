import React from 'react'
import InputForm from '../src/components/InputForm'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../src/store/actions';
import { RootState } from '../src/types';
import Link from 'next/link';

function NewTodo() {
const dispatch = useDispatch();
const todoState = useSelector((state: RootState) => state);

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
    <Link href={'/'}>Todo 확인하기</Link>
    <InputForm onSubmit={handleAddQuestion}></InputForm>
 </> )
}

export default NewTodo