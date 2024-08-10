// type 관련 정의는 해당 폴더에 작성합니다. 이 파일은 제거해도 됩니다.
export interface Question{
    id: number,
    text : string
}

export const ADD_QUESTION = 'ADD_QUESTION'

 interface AddQuestionAction {
    type: typeof ADD_QUESTION,
    payload: Question
}

export const QuestionActionTypes = AddQuestionAction
export const RootState = Question;