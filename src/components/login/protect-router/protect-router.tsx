import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import { getCookie, removeCookie, setCookie } from "../../cookies/cookies";
import { decodeToken } from "react-jwt";
import { AppThunkDispatch } from "../../store/store";
import { refreshToken } from "../../api/userLogin";
import { persistor } from "../../..";
import { useNavigate } from "react-router-dom";

interface IJwtToken {
  exp: number;
  iat: number;
  id: number;
  iss: string;
  roll: string;
  userId: string;
}

// 라우터는 사용자가 페이지를 이동할때마다 토큰 검사 가장 최상단 부모 컴포넌트
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const appDispatch = useDispatch();
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigator = useNavigate();
  // redux로 사용할떄
  useEffect(() => {
    if (getCookie("accessToken")) {
      try {
        axios({
          url: "http://localhost:8080/login/success",
          method: "GET",
          withCredentials: true,
        })
          .then((result) => {
            if (result.data) {
              if (result.data === getCookie("accessToken")) {
                //토큰 디코딩
                const myDecodedToken: IJwtToken | null = decodeToken(
                  result.data
                );
                //사용자 권한 쿠키저장
                if (myDecodedToken?.roll !== undefined) {
                  setCookie("roll", myDecodedToken?.roll);
                }

                if (myDecodedToken?.userId !== undefined) {
                  appDispatch(
                    setUser({ userId: myDecodedToken?.userId, isLoading: true })
                  );
                }
              }
            }
          })
          .catch((error) => {
            if (error.response.data === "토큰만료") {
              const getRegreshToken = getCookie("refreshToken");
              if (getRegreshToken) {
                dispatch(refreshToken());
              } else {
                removeCookie("accessToken");
                removeCookie("roll");
                persistor.purge();
                navigator("/login");
              }
            }
          });
      } catch (error) {
        return;
      }
    }
  }, []);

  // setTimeout(() => {
  //   dispatch(refreshToken());
  // }, 60000);

  //react - query
  // useEffect(() => {
  //   if (getCookie("accessToken")) {
  //     console.log(1);
  //   }
  // }, []);

  return <>{children}</>;
}
