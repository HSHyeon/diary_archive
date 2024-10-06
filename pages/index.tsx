import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextPage } from "next";
import StoryComp from "../src/components/StoryComp";
import styled from "styled-components";
import { fetchDiaries } from "../src/store/actions"; // 초기 데이터를 가져오는 액션
import { IgStory, RootState } from "../src/types";

const ITEMS_PER_PAGE = 5; // 페이지당 불러올 항목 수
const DEBOUNCE_DELAY = 300; // 디바운싱 시간 (ms)
let scrollTimeout: NodeJS.Timeout | null = null;

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const igStories: IgStory[] = useSelector((state: RootState) => state.items);
  const hasMore = useSelector((state: RootState) => state.hasMore); // 더 많은 데이터 여부

  const [page, setPage] = useState(1); // 현재 페이지

  useEffect(() => {
    dispatch(fetchDiaries(page, ITEMS_PER_PAGE)); // 페이지와 아이템 수에 따라 데이터 요청
  }, [dispatch, page]);

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout); // 기존 타이머를 정리
    }

    scrollTimeout = setTimeout(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore) {
          setPage((prev) => prev + 1); // 다음 페이지로 이동
        }
      }
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [handleScroll]);

  return (
    <>
      <div className="storyList">
        <FilmContainer>
          {igStories.map((story) => (
            <StoryComp story={story} />
          ))}
        </FilmContainer>
      </div>
    </>
  );
};

export default Home;

const FilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
