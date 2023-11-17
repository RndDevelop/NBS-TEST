import axios from "axios";
import { getCookie, setCookie } from "../cookies/cookies";
import { useMutation } from "react-query";
import { useNavigate, useNavigation } from "react-router-dom";

export const BASE_URL = "http://localhost:8080";

//유저 로그인 타입 추론
interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserAccount {
  userId: string;
  password: string;
  email: string;
  group: string;
  spot: string;
  tel: string;
  phone: string;
  bigo: string;
}

//통신할때 기본적으로 사용하는 헤더 와 url를 지정
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

//비동기 통신 로그인 react-query
export const signQuery = async (
  url: string,
  { email, password }: ILoginUser
) => {
  const result = await authApi.post(url, { email, password }).then((res) => {
    const accessToken = res.data.token;
    setCookie("accessToken", accessToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
      "accessToken"
    )}`;
  });
  return result;
};

//리엑트 쿼리 유저 정보
export const userInfo = async (url: string) => {
  const response = await authApi
    .get(BASE_URL + `/login/${url}`, {
      headers: { Authorization: getCookie("accessToken") },
    })
    .then((res) => res.data);

  return response;
};

//리엑트 쿼리 useMutation
export const userAccount = async (url: string, user: IUserAccount) => {
  const result = await authApi
    .post(BASE_URL + url, user)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

//유저정보
export const userProfile = async () => {
  const result = await authApi
    .get(BASE_URL + "/userprofile")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.message === "Request failed with status code 500") {
        return "서버에러";
      }
    });
  return result;
};
