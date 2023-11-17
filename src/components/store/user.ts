import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { loginUser } from "../api/userLogin";

//객체 타입 추론
export interface ILogin {
  userId: string;
  isLoading: boolean;
  error?: string;
}

//스테이트 타입 추론
export interface IPersonState {
  persons: ILogin;
}

//스테이트 초기상태 설정
const initialState: IPersonState = {
  persons: {
    userId: "",
    isLoading: false,
    error: "",
  },
};
//로그인 슬라이스
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (
      // 세션 스토리지 저장용
      state,
      action: PayloadAction<{ isLoading: boolean; userId: string }>
    ) => {
      state.persons.userId = action.payload.userId;
      state.persons.isLoading = action.payload.isLoading;
    },
    logout: (state) => {
      state.persons.userId = "";
      state.persons.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    //비동기 통신
    builder.addCase(loginUser.pending, (state) => {
      state.persons.userId = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.persons.userId = action.payload;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.persons.userId = "";
      state.persons.isLoading = false;
      state.persons.error = action.error.message;
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export default loginSlice.reducer;
export const { setUser } = loginSlice.actions;
