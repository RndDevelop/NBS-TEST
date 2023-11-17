import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../cookies/cookies";
import { decodeToken } from "react-jwt";
import { BASE_URL } from "./authApi";
import { IUserState } from "../store/userUpdate";
interface ILoginUser {
  userId: string;
  password: string;
}

//회원가입 정보
interface IUserAccount {
  userId: string;
  password: string;
  email: string;
  group: string;
  spot: string;
  tel: string;
  phone: string;
  bigo: string;
}

//로그인 한 유저 정보
interface IUserInfo {
  data: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };
}

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "accessToken"
)}`;

//비동기 통신 Redux 로그인
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userId, password }: ILoginUser, thunkAPI) => {
    try {
      await axios
        .post("/login", { userId, password })
        .then((res: IUserInfo) => {
          const accessToken = res.data.accessToken;

          const refreshToken = res.data.refreshToken;
          //사용자 토큰
          setCookie("accessToken", accessToken);
          //사용자 리프레쉬 토큰
          setCookie("refreshToken", refreshToken);
        })
        .catch((error) => console.log(error.message));
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 비동기 통신 회원가입 Redux
export const createAccount = createAsyncThunk(
  "createAccount",
  async (user: IUserAccount, thunkAPI) => {
    try {
      const response = await axios.post("/createaccount", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//비동기 레프리쉬 토큰
export const refreshToken = createAsyncThunk("refreshToken", async () => {
  try {
    const reponse = await axios.get("/refreshtoken").then((res) => {
      const accessToken = res.data.accessToken;
      setCookie("accessToken", accessToken);
      removeCookie("refreshToken");
    });
    return reponse;
  } catch (error) {
    return error;
  }
});

//유저업데이트
export const profileUpdate = createAsyncThunk(
  "userUpdate",
  async (user: any, thunkAPI) => {
    const response = await axios
      .post("/userupdate", user)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });

    return response;
  }
);

//비동기 통신
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ email, password }: ILoginUser, thunkAPI) => {
//     try {
//       await axios({
//         url: "http://localhost:8080/login",
//         method: "POST",
//         withCredentials: true,
//         data: {
//           email: email,
//           password: password,
//         },
//       }).then((result) => {
//         if (result.status === 200) {
//           const { accessToken } = result.data.token;
//           axios.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${accessToken}`;
//           setCookie("accessToken", result.data.token);
//         }
//       });
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
