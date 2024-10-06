import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IgStory, RootState } from "../src/types";
import { fetchDiaries } from "../src/store/actions";
function calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 클릭된 날짜의 상태 저장
  const [diariesOnSelectedDate, setDiariesOnSelectedDate] = useState<any[]>([]); // 선택된 날짜의 일기

  const dispatch = useDispatch();
  const igStories: IgStory[] = useSelector((state: RootState) => state.items);
  useEffect(() => {
    dispatch(fetchDiaries()); // 백엔드에서 데이터를 가져오는 액션
  }, [dispatch]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Unix 타임스탬프는 밀리초로 변환 필요
    return date.toLocaleDateString().split("T")[0]; // YYYY-MM-DD 형식 반환
  };
  // Redux에서 가져온 데이터를 FullCalendar 이벤트 형식으로 변환
  const events = igStories.map((story) => ({
    id: story.uri, // 각 데이터의 고유 URI를 id로 사용
    title: "", // 일기의 제목
    start: formatDate(story.creation_timestamp), // 변환된 날짜
  }));
  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr); // 클릭된 날짜 저장
    const filteredDiaries = igStories.filter(
      (story) => formatDate(story.creation_timestamp) === info.dateStr
    );
    setDiariesOnSelectedDate(filteredDiaries); // 해당 날짜의 일기 리스트 설정
  };
  const eventDates = igStories.map((story) =>
    formatDate(story.creation_timestamp)
  );

  const handleDayCellClassNames = (arg: { date: Date }) => {
    const dateStr = arg.date.toLocaleDateString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
    const filteredDiariesCount = eventDates.filter(
      (date) => date === dateStr
    ).length;
    if (eventDates.includes(dateStr)) {
      return [`highlight-day-${filteredDiariesCount}`]; // 이벤트가 있는 날짜에 하이라이트 클래스 추가
    }
    return [];
  };

  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        dayCellClassNames={handleDayCellClassNames}
      />
    </CalendarWrapper>
  );
}

export default calendar;
const CalendarWrapper = styled.div`
  .fc {
    min-width: 50vw;
    width: 550px;
    margin: 0 auto;
    box-sizing: content-box;
    border: none;
  }

  /* 스타일을 적용할 날짜 셀 */
  .fc-daygrid-day-frame {
    position: relative;
    width: 100%;
    height: 3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 날짜 셀의 탑 레이블 중앙 겹치기 */
  .fc-daygrid-day-top {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.6rem;
    height: 2.1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #6b6b6b;
    box-sizing: border-box;
    border-top-right-radius: 1.2rem;
    border-top-left-radius: 1.2rem;
    z-index: 10; /* 다른 요소와 겹칠 때 위에 오도록 설정 */
  }
  .fc-scrollgrid {
    border: none;
  }
  /* 날짜 셀의 숫자 */
  .fc-daygrid-day-number {
    color: #000000;
  }

  /* 주말이나 다른 월의 날짜를 회색 처리 */
  .fc-day-other .fc-daygrid-day-top {
    background-color: #1a1a1a !important;
  }

  /* 오늘 날짜를 강조 */
  .fc-day-today .fc-daygrid-day-top {
    background-color: #dd5656 !important;
  }
  .fc .fc-daygrid-day.fc-day-today {
    background-color: transparent;
  }

  /* 필요에 따라 추가적으로 조정 */
  .fc .fc-scrollgrid-section-sticky > * {
    background-color: #000;
  }
  .highlight-day-1 .fc-daygrid-day-top {
    background-color: rgba(255, 246, 162, 0.5); /* 1개 글의 경우 */
  }

  .highlight-day-2 .fc-daygrid-day-top {
    background-color: rgba(255, 246, 162, 0.7); /* 2개 글의 경우 */
  }

  .highlight-day-3 .fc-daygrid-day-top {
    background-color: rgba(255, 246, 162, 1); /* 3개 글의 경우 */
  }
`;
