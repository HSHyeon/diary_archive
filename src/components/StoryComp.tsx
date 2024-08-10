import React from "react";
import styles from "./index.module.css";

interface IgStory {
  uri: string;
  creation_timestamp: number;
  title: string;
  text: string;
  cross_post_source: {
    source_app: string;
  };
}

interface StoryComponentProps {
  story: IgStory;
}
const StoryComp = ({ story }: StoryComponentProps) => {
  const fileExtension = story.uri ? story.uri.split(".").pop() : "";
  return (
    <div className={styles.storyContainer} key={story.uri}>
      <div className={styles.content}>
        {story.uri ? (
          fileExtension === "mp4" ||
          fileExtension === "mov" ||
          fileExtension === "avi" ? (
            <video src={story.uri} controls className={styles.storyVideo} />
          ) : (
            <img
              src={story.uri}
              alt="Story Image"
              className={styles.storyImage}
            />
          )
        ) : (
          <p>
            {story.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
      <p>{new Date(story.creation_timestamp * 1000).toLocaleString()}</p>
    </div>
  );
};

export default StoryComp;
