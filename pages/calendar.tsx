import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/types";
import { deleteItem } from "../src/store/actions";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
function calendar() {
  const dispatch = useDispatch();
  const todoState = useSelector((state: RootState) => state);

  const handleDeleteQuestion = (itemId: number) => {
    dispatch(deleteItem(itemId));
  };
  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      {/* {todoState.items.map((item) => (
        <div className="todo-container" key={item.id}>
          <p>{item.title}</p>
          <p>{item.date}</p>
          <button onClick={() => handleDeleteQuestion(item.id)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
}

export default calendar;
