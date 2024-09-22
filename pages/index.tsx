import { NextPage, GetStaticProps } from "next";
import StoryComp from "../src/components/StoryComp";
import styled from "styled-components";

interface IgStory {
  uri: string;
  creation_timestamp: number;
  title: string;
  text: string;
  cross_post_source: {
    source_app: string;
  };
}

interface Props {
  igStories: IgStory[];
}

const Home: NextPage<Props> = ({ igStories }) => {
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${BACKEND_URL}/diaries`);

  const data: IgStory[] = await res.json();

  // Sort the combined data by creation_timestamp
  const sortedData = data.sort(
    (a, b) => b.creation_timestamp - a.creation_timestamp
  );

  return {
    props: {
      igStories: sortedData,
    },
  };
};

export default Home;

const FilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
