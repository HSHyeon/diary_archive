import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IgStory, RootState } from "../src/types";
import { fetchDiaries } from "../src/store/actions";
import StoryComp from "../src/components/StoryComp";
import { format } from "date-fns";
function calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 클릭된 날짜의 상태 저장
  const [diariesOnSelectedDate, setDiariesOnSelectedDate] = useState<any[]>([]); // 선택된 날짜의 일기

  const dispatch = useDispatch();
  const igStories: IgStory[] = useSelector((state: RootState) => state.items);
  useEffect(() => {
    dispatch(fetchDiaries()); // 백엔드에서 데이터를 가져오는 액션
  }, [dispatch]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return format(date, "yyyy-MM-dd");
  };

  const handleDateClick = (info: { dateStr: string }) => {
    setSelectedDate(info.dateStr); // 클릭된 날짜 저장
    const filteredDiaries = igStories.filter(
      (story) => formatDate(story.creation_timestamp) === info.dateStr
    );

    console.log(formatDate(igStories[0].creation_timestamp), info.dateStr);
    setDiariesOnSelectedDate(filteredDiaries); // 해당 날짜의 일기 리스트 설정
  };

  const eventDates = igStories.map((story) =>
    formatDate(story.creation_timestamp)
  );

  const handleDayCellClassNames = (arg: { date: Date }) => {
    const dateStr = format(arg.date, "yyyy-MM-dd"); // YYYY-MM-DD 형식으로 변환
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
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        height="auto"
        dateClick={handleDateClick}
        dayCellClassNames={handleDayCellClassNames}
      />
      {selectedDate && (
        <Modal>
          <button className="close" onClick={() => setSelectedDate(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="#fff"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="contents">
            {diariesOnSelectedDate.length > 0 ? (
              <>
                {diariesOnSelectedDate.map((story, index) => (
                  <StoryComp story={story}></StoryComp>
                ))}
              </>
            ) : (
              <p>이 날짜에 일기가 없습니다.</p>
            )}
          </div>
        </Modal>
      )}
    </CalendarWrapper>
  );
}

export default calendar;
const CalendarWrapper = styled.div`
  .fc {
    min-width: 50vw;
    width: 30rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
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
    width: 3.4rem;
    height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #6b6b6b;
    box-sizing: border-box;
    border-radius: 0.1rem;
    border-top-right-radius: 1.2rem;
    border-top-left-radius: 1.2rem;
    z-index: 10; /* 다른 요소와 겹칠 때 위에 오도록 설정 */
  }

  /* 작은 화면 (모바일) */
  @media (max-width: 600px) {
    .fc-daygrid-day-top {
      width: 2.5rem;
      height: 1.5rem;
      border-top-right-radius: 0.7rem;
      border-top-left-radius: 0.7rem;
      font-size: 0.8rem; /* 텍스트 크기 조정 */
    }
    .fc-daygrid-day-frame {
      height: 3rem;
    }
  }
  .fc-scrollgrid {
    border: none;
  }
  /* 날짜 셀의 숫자 */
  .fc-daygrid-day-number {
    font-size: small;
    font-weight: 400;
  }

  /* 주말이나 다른 월의 날짜를 회색 처리 */
  .fc-day-other .fc-daygrid-day-top {
    background-color: #535353 !important;
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
    background-color: rgba(235, 255, 157, 0.5); /* 1개 글의 경우 */
  }

  .highlight-day-2 .fc-daygrid-day-top {
    background-color: rgba(235, 255, 157, 0.7); /* 2개 글의 경우 */
  }

  .highlight-day-3 .fc-daygrid-day-top {
    background-color: rgba(235, 255, 157, 1); /* 3개 글의 경우 */
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #333;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .contents {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 500px;
  }
  .close {
    align-self: end;
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    padding: 10px; /* 패딩 제거 */
    margin: 0; /* 마진 제거 */
    cursor: pointer; /* 커서를 포인터로 변경 */
    outline: none; /* 포커스 시 아웃라인 제거 */
  }
`;
