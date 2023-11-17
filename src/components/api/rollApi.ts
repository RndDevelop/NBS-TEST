import { BASE_URL, authApi } from "./authApi";

//권한그룹
export const rollData = async () => {
  return authApi
    .get(BASE_URL + "/lookUpdata", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

//직급
export const userPosition = async () => {
  return authApi
    .get(BASE_URL + "/user-position", { withCredentials: true })
    .then((response) => {
      console.log("데이터 바인딩성공");
      return response.data;
    })
    .catch((error) => {
      console.log("데이터 바인딩 실패");
      return error.message;
    });
};
