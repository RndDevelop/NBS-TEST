import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//객체 타입 추론
// export interface IPerson {
//   id?: number;
//   name: string;
//   email: string;
//   nickName: string;
//   password: string;
// }

export interface IPerson {
  userId: string;
  password: string;
  pwCheck?: string;
  email: string;
  tel: string;
  phone: string;
  roll: string;
  position: string;
  bigo?: string;
}

//스테이트 타입 추론
interface IPersonState {
  persons: IPerson[];
}

//스테이트 초기상태 설정
const initialState: IPersonState = {
  persons: [],
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (
      state,
      action: PayloadAction<{
        userId: string;
        password: string;
        pwCheck: string;
        email: string;
        tel: string;
        phone: string;
        roll: string;
        position: string;
        bigo: string;
      }>
    ) => {
      state.persons.push({
        userId: action.payload.userId,
        password: action.payload.password,
        email: action.payload.email,
        tel: action.payload.tel,
        phone: action.payload.phone,
        roll: action.payload.roll,
        position: action.payload.position,
        bigo: action.payload.bigo,
      });
    },
  },
});

export default personSlice.reducer;
export const { addPerson } = personSlice.actions;
