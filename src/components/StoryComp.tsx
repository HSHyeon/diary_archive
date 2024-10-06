import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { IgStory } from "../types";
import { removeDiary } from "../store/actions";
import { AppDispatch } from "../store";

interface StoryComponentProps {
  story: IgStory;
}

const StoryComp = ({ story }: StoryComponentProps) => {
  const [isValid, setIsValid] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const handleError = () => {
    setIsValid(false);
  };

  const handleDelete = () => {
    console.log("삭제", story.id);
    dispatch(removeDiary(story.id)); // 삭제 액션 디스패치
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
  const formattedDate = new Date(
    story.creation_timestamp * 1000
  ).toLocaleString();

  return (
    <>
      <FilmStrip>
        <FilmFrame>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>{" "}
          {/* 삭제 버튼 */}
          <div key={story.uri}>
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
                  {story.text?.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />}
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              )}
            </Content>
            <DateText>{formattedDate}</DateText>
          </div>
        </FilmFrame>
      </FilmStrip>
    </>
  );
};

export default StoryComp;

const Content = styled.div`
  background-color: #b3b3b3;
  color: white;
  display: flex;
  max-height: 90vh;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 1.2rem;
  overflow: auto;
  min-height: 30rem;
  p {
    padding: 1rem;
  }
`;

const StoryImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const StoryVideo = styled.video`
  width: 100%;
`;

const DateText = styled.p`
  font-size: 12px;
  text-align: end;
  color: #aaa;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const FilmFrame = styled.div`
  border-radius: 5px;
  font-size: 18px;
  flex: 1;
`;

const FilmStrip = styled.div`
  width: calc(100% - 3.4rem);
  position: relative;
  border-radius: 10px;
  display: flex;
  margin: 0.3rem 0;
  justify-content: space-between;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0.7rem;
    height: 100%;
    background: repeating-linear-gradient(
      #cbcbcb,
      #cbcbcb 0.7rem,
      transparent 0.7rem,
      transparent 1.4rem
    );
  }

  &::before {
    left: -1.2rem;
  }

  &::after {
    right: -1.2rem;
  }
`;
