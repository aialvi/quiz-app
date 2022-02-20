import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AnswerState {
  value: Array<any>;
  selectedQuestionId: number;
}

export interface Answer {
  id: number;
  answer: string;
  userId: number;
  questionId: number;
}

const initialState: AnswerState = {
  value: !!localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers")!)
    : [],
  selectedQuestionId: 0,
};

export const AnswerSlice = createSlice({
  name: "Answer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    giveAnswer: (state, action: PayloadAction<string>) => {
      let tempObject = {
        id: state.value.length + 1,
        answer: action.payload,
        userId: 1,
        questionId: state.selectedQuestionId,
      };
      state.value = [...state.value, tempObject];

      localStorage.setItem("answers", JSON.stringify(state.value));
    },
    assignQuestionId: (state, action: PayloadAction<number>) => {
      state.selectedQuestionId = action.payload;
    },
    updateAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.value.findIndex(
        (answer) => answer.id === action.payload.id
      );
      state.value[index] = action.payload;
      localStorage.setItem("answers", JSON.stringify(state.value));
    },
    deleteAnswer: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        (answer) => answer.id !== action.payload
      );
      localStorage.setItem("answers", JSON.stringify(state.value));
    },
  },
});

export const { giveAnswer } = AnswerSlice.actions;
export const { assignQuestionId } = AnswerSlice.actions;
export const { updateAnswer } = AnswerSlice.actions;
export const { deleteAnswer } = AnswerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Answer.value)`
export const selectAnswer = (state: RootState) =>
  state.user.value.filter(
    (answer) => answer.questionId === state.user.selectedQuestionId
  );
export const selectedQuestionId = (state: RootState) =>
  state.user.selectedQuestionId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default AnswerSlice.reducer;
