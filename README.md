### wireframe idea
- 내 일기를 영화의 필름처럼 보여주면 좋을 것 같다는 아이디어에서 시작된 사이드 프로젝트
- 흑백만을 이용해서 대략적인 디자인을 진행할 예정입니다

![아이디어와이어프레임](https://github.com/user-attachments/assets/bbf9c78a-d2c9-47d9-8f51-b6d8f53d7ce5)
![image](https://github.com/user-attachments/assets/bff55bff-8ed1-4b1a-933e-815feccf17e7) 
달력은 영화 좌석표같이

### 기술스택
`next.js`, `react`, `styled-component`, `redux`, `TypeScript`
- 백엔드 또한 next를 이용해 구현해볼 예정
- 라이브러리 - `Fullcalendar`

### 대략적인 기능
- 다운로드한 json 형식의 인스타그램의 스토리 기록을 뿌려주기
- 일기장 업로드(텍스트, 이미지 선택 가능)
- 캘린더를 통한 일기 확인
- 무한스크롤 및 스크롤을 직접 내려서 인스타 스토리 보관함처럼 날짜에 맞게 빠르게 볼 수 있도록 하기



### 실행
- `npm install`
- 클라이언트: `npm run dev`
- 서버: `npx json-server@0.17.4 --port 9999 --watch db.json`
