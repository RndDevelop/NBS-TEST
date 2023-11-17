import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { IPersonState } from "../store/user";
import { getCookie } from "../cookies/cookies";

export default function DataGrid() {
  const navigate = useNavigate();
  // const user = useAppSelector((state) => state.setUser.persons.userId);
  const cookie = getCookie("token");
  return (
    <div>
      {/* <div>{user}</div> */}
      <div>{cookie}</div>
    </div>
  );
}
