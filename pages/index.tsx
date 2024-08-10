import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import StoryComp from "../src/components/StoryComp";

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
      <Link href="/add">
        <a className="addButton">추가하기</a>
      </Link>
      <div className="storyList">
        {igStories.map((story) => (
          <StoryComp story={story} key={story.creation_timestamp} />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res1 = await fetch("http://localhost:3000/stories.json");
  const res2 = await fetch("http://localhost:3000/diary_entries.json");

  const data1 = await res1.json();
  const data2 = await res2.json();

  // Combine the data from both files
  const data: IgStory[] = [...data1.ig_stories, ...data2.diaries];

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
