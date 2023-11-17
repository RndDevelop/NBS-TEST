import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileUpdate } from "../api/userLogin";

export interface IUserUpdate {
  bigo?: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  tell: string;
  roll: string;
  userId: string;
}

export interface IUserState {
  user: IUserUpdate;
}

const initialState: IUserState = {
  user: {
    email: "",
    password: "",
    phone: "",
    position: "",
    tell: "",
    userId: "",
    roll: "",
  },
};

export const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    setUpdaetUser: (state, action: PayloadAction<IUserUpdate>) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.phone = action.payload.phone;
      state.user.position = action.payload.position;
      state.user.tell = action.payload.tell;
      state.user.userId = action.payload.userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileUpdate.pending, (state) => {});
    builder.addCase(
      profileUpdate.fulfilled,
      (state, action: PayloadAction<IUserUpdate>) => {
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
        state.user.phone = action.payload.phone;
        state.user.position = action.payload.position;
        state.user.roll = action.payload.roll;
        state.user.tell = action.payload.tell;
        state.user.userId = action.payload.userId;
      }
    );
    builder.addCase(profileUpdate.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default userUpdateSlice.reducer;
export const { setUpdaetUser } = userUpdateSlice.actions;
