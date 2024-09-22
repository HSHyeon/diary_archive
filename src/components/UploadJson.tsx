import React, { useState } from 'react';

const UploadJson: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const jsonData = JSON.parse(event.target?.result as string);
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
      try {
        const response = await fetch(`${backend_url}/diaries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData.diaries), // 배열 형태로 전달
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다.');
        }

        const result = await response.json();
        console.log('업로드 완료:', result);
      } catch (error) {
        console.error('업로드 중 오류 발생:', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
};

export default UploadJson;
