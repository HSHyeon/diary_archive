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
  const BACKEND_URL = process.env.BACKEND_URL;
  const res1 = await fetch(`${BACKEND_URL}/ig_stories`);
  const res2 = await fetch(`${BACKEND_URL}/diaries`);

  const data1 = await res1.json();
  const data2 = await res2.json();

  // Combine the data from both files
  const data: IgStory[] = [...data1, ...data2];

  // Sort the combined data by creation_timestamp
  const sortedData = data.sort(
    (a, b) => a.creation_timestamp - b.creation_timestamp
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
