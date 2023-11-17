import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../cookies/cookies";
export default function DashBoard() {
  const navigate = useNavigate();
  const logOut = () => {
    axios({
      url: "http://localhost:8080/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        removeCookie("token");
        console.log("로그아웃성공");
      }
    });
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
      <button onClick={() => navigate("/datagrid")}>DataGrid</button>
      <button onClick={() => navigate("/chart")}>chart</button>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/create-account")}>createAccout</button>
      <button onClick={() => navigate("/profile")}>profile</button>
    </h1>
  );
}
