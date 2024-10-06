import React, { ChangeEvent, FormEvent, useState } from "react";
import UploadJson from "../src/components/UploadJson";
import { addDiary } from "../src/store/actions";
import { useDispatch } from "react-redux";
import { IgStory } from "../src/types";

const InputForm = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null); // 이미지 상태 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]); // 선택한 파일 저장
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (text.trim()) {
      setLoading(true);

      const newDiary: IgStory = {
        uri: "", // 필요에 따라 설정
        creation_timestamp: Math.floor(Date.now() / 1000), // UNIX timestamp
        title: "제목을 입력하세요", // 제목을 설정
        text: text, // 사용자가 입력한 텍스트
        cross_post_source: {
          source_app: "FB",
        },
      };

      try {
        await dispatch(addDiary(newDiary)); // FormData를 전달
        setText("");
        setImage(null); // 이미지 초기화
      } catch (error) {
        console.error("일기 추가 중 오류 발생:", error);
        setError("일기 추가 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("할 일을 입력하세요.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoInput">할 일:</label>
        <input
          id="todoInput"
          type="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="해야할 일을 입력하세요"
        />
        <label htmlFor="imageInput">이미지 업로드:</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <p>선택한 이미지: {image.name}</p>} {/* 이미지 이름 표시 */}
        <button type="submit" disabled={loading}>
          {loading ? "로딩 중..." : "추가"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <h1>JSON 파일 업로드</h1>
      <UploadJson />
    </>
  );
};

export default InputForm;
