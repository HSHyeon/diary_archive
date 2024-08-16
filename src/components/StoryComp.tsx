import React, { useEffect, useState } from "react";
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
  const [isValid, setIsValid] = useState(true);

  const handleError = () => {
    setIsValid(false);
  };

  useEffect(() => {
    // If the story is marked as invalid, skip rendering
    if (!isValid) {
      return;
    }
  }, [isValid]);

  if (!isValid) {
    return null; // Do not render anything if the image is invalid
  }
  const fileExtension = story.uri ? story.uri.split(".").pop() : "";
  return (
    <>
  
        <div className={styles.storyContainer} key={story.uri}>
          <p>{new Date(story.creation_timestamp * 1000).toLocaleString()}</p>
          <div className={styles.content}>
            {story.uri ? (
              fileExtension === "mp4" ||
              fileExtension === "mov" ||
              fileExtension === "avi" ? (
                <video src={story.uri} controls className={styles.storyVideo} 
                onError={handleError}/>
              ) : (
                <img
                  src={story.uri}
                  alt="Story Image"
                  className={styles.storyImage}
                  onError={handleError}
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
        </div>
      
    </>
  );
};

export default StoryComp;
