import React, { useEffect, useState } from "react";
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

interface StoryComponentProps {
  story: IgStory;
}
const StoryComp = ({ story }: StoryComponentProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleError = () => {
    setIsValid(false);
  };

  useEffect(() => {
    if (!isValid) {
      return;
    }
  }, [isValid]);

  if (!isValid) {
    return null;
  }
  const fileExtension = story.uri ? story.uri.split(".").pop() : "";
  return (
    <>
      <div key={story.uri}>
        <p>{new Date(story.creation_timestamp * 1000).toLocaleString()}</p>
        <Content>
          {story.uri ? (
            fileExtension === "mp4" ||
            fileExtension === "mov" ||
            fileExtension === "avi" ? (
              <StoryVideo src={story.uri} controls onError={handleError} />
            ) : (
              <StoryImg
                src={story.uri}
                alt="Story Image"
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
        </Content>
      </div>
    </>
  );
};

export default StoryComp;

const Content = styled.div`
  height: 500px;
  background-color: black;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 1.2rem;
  overflow: auto;
`;
const StoryImg = styled.img`
  height: 500px;
`;
const StoryVideo = styled.video`
  height: 500px;
`;
