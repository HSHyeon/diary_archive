import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextPage, GetStaticProps } from "next";
import StoryComp from "../src/components/StoryComp";
import styled from "styled-components";
import { fetchDiaries } from "../src/store/actions";
import { IgStory, RootState } from "../src/types";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const igStories: IgStory[] = useSelector((state: RootState) => state.items);
console.log(igStories)
  useEffect(() => {
    dispatch(fetchDiaries()); // 백엔드에서 데이터를 가져오는 액션
  }, [dispatch]);

  return (
    <>
      <div className="storyList">
        <FilmContainer>
          {igStories.map((story) => (
            <StoryComp story={story} key={story.creation_timestamp} />
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
